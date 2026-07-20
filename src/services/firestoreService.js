import { db, rtdb, storage } from '../firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import { 
  ref as rtdbRef, 
  set as rtdbSet, 
  get as rtdbGet, 
  remove as rtdbRemove 
} from 'firebase/database';
import { 
  ref as storageRef, 
  uploadBytes, 
  uploadString, 
  getDownloadURL 
} from 'firebase/storage';
import { baseCatalog } from '../catalogData';

/**
 * Upload a File object or base64 data string to Firebase Storage and return its public download URL.
 */
export async function uploadImageToStorage(fileOrBase64, folder = 'product-images') {
  try {
    if (!fileOrBase64) return null;
    const filename = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.png`;
    const fullPath = `${folder}/${filename}`;
    const fileRef = storageRef(storage, fullPath);

    if (typeof fileOrBase64 === 'string' && fileOrBase64.startsWith('data:image/')) {
      await uploadString(fileRef, fileOrBase64, 'data_url');
    } else if (fileOrBase64 instanceof File || fileOrBase64 instanceof Blob) {
      await uploadBytes(fileRef, fileOrBase64);
    } else {
      return fileOrBase64; // Already a URL
    }

    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image to Firebase Storage:', error);
    return null;
  }
}

// All valid Firestore category document IDs
const ALL_CATEGORY_IDS = [
  'water-purifiers',
  'water-softeners',
  'kitchen-appliances',
  'home-appliances',
  'new-energy'
];

// Map display category name → Firestore document ID
const CATEGORY_NAME_TO_ID = {
  'Water Purifiers': 'water-purifiers',
  'Water Softeners': 'water-softeners',
  'Kitchen Appliances': 'kitchen-appliances',
  'Home Appliances': 'home-appliances',
  'New Energy': 'new-energy'
};

/**
 * Add a new document to a collection. Appends server timestamps.
 */
export async function addDocument(collectionName, data) {
  try {
    if (collectionName === 'products') {
      // Accept either a valid Firestore ID or a display name
      let categoryId = data.categoryId || 'water-purifiers';
      if (!ALL_CATEGORY_IDS.includes(categoryId)) {
        // Try converting display name to ID
        categoryId = CATEGORY_NAME_TO_ID[categoryId] || CATEGORY_NAME_TO_ID[data.categoryName] || 'water-purifiers';
      }

      // Extract image to save directly in Realtime Database
      let imageToSave = null;
      const cleanData = { ...data };
      if (cleanData.imageURLs && cleanData.imageURLs[0]) {
        imageToSave = cleanData.imageURLs[0];
        cleanData.imageURLs = ['rtdb-placeholder'];
      }

      const colRef = collection(db, 'categories', categoryId, 'products');
      const docRef = await addDoc(colRef, {
        ...cleanData,
        categoryId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Save product image in Firebase Realtime Database under productImages/{docId}
      if (imageToSave) {
        await rtdbSet(rtdbRef(rtdb, `productImages/${docRef.id}`), {
          image: imageToSave,
          updatedAt: Date.now()
        });
      }

      return docRef.id;
    }

    const colRef = collection(db, collectionName);
    const docRef = await addDoc(colRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error(`Error adding document in ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Retrieve all documents from a collection.
 */
export async function getDocuments(collectionName) {
  try {
    if (collectionName === 'products') {
      // Read directly from each category's subcollection — no index required
      const list = [];
      for (const catId of ALL_CATEGORY_IDS) {
        try {
          const colRef = collection(db, 'categories', catId, 'products');
          const snap = await getDocs(colRef);
          snap.forEach((docSnap) => {
            const data = docSnap.data();
            list.push({
              ...data,
              id: docSnap.id,
              categoryId: catId,
              customId: data.id || null
            });
          });
        } catch (e) {
          // category may not exist yet during seeding
        }
      }

      // Fetch product images from Realtime Database in a single query with a 1.5s timeout
      try {
        const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), 1500));
        const imagesSnap = await Promise.race([
          rtdbGet(rtdbRef(rtdb, 'productImages')),
          timeoutPromise
        ]);
        
        if (imagesSnap) {
          const allImages = imagesSnap.val() || {};
          list.forEach((p) => {
            if (p.imageURLs && p.imageURLs[0] === 'rtdb-placeholder') {
              const rtdbImg = allImages[p.id]?.image;
              if (rtdbImg) {
                p.imageURLs = [rtdbImg];
              }
            }
          });
        } else {
          console.warn("Realtime Database image query timed out. Skipping image injection.");
        }
      } catch (e) {
        console.error("Error loading images from Realtime Database:", e);
      }

      return list;
    }

    const colRef = collection(db, collectionName);
    const querySnapshot = await getDocs(colRef);
    const list = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      list.push({
        ...data,
        id: doc.id,
        customId: data.id || null
      });
    });
    return list;
  } catch (error) {
    console.error(`Error getting documents from ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Retrieve a single document by ID from a collection.
 */
export async function getDocumentById(collectionName, id) {
  try {
    if (collectionName === 'products') {
      for (const catId of ALL_CATEGORY_IDS) {
        try {
          const docRef = doc(db, 'categories', catId, 'products', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            const product = {
              ...data,
              id: docSnap.id,
              categoryId: catId,
              customId: data.id || null
            };

            // Fetch image from RTDB if placeholder with a 1.5s timeout
            if (product.imageURLs && product.imageURLs[0] === 'rtdb-placeholder') {
              try {
                const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), 1500));
                const imgSnap = await Promise.race([
                  rtdbGet(rtdbRef(rtdb, `productImages/${id}`)),
                  timeoutPromise
                ]);
                
                if (imgSnap) {
                  const imgData = imgSnap.val();
                  if (imgData && imgData.image) {
                    product.imageURLs = [imgData.image];
                  }
                } else {
                  console.warn(`RTDB image fetch timed out for product ${id}`);
                }
              } catch (e) {
                console.error("Error loading product image from RTDB:", e);
              }
            }

            return product;
          }
        } catch (e) { /* category may not exist */ }
      }
      return null;
    }

    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        ...data,
        id: docSnap.id,
        customId: data.id || null
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error getting document ${id} from ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Update an existing document in a collection. Updates updatedAt.
 */
export async function updateDocument(collectionName, id, data) {
  try {
    if (collectionName === 'products') {
      let imageToSave = null;
      const cleanData = { ...data };
      if (cleanData.imageURLs && cleanData.imageURLs[0] && cleanData.imageURLs[0] !== 'rtdb-placeholder') {
        imageToSave = cleanData.imageURLs[0];
        cleanData.imageURLs = ['rtdb-placeholder'];
      }

      for (const catId of ALL_CATEGORY_IDS) {
        try {
          const docRef = doc(db, 'categories', catId, 'products', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const updateData = { ...cleanData, updatedAt: serverTimestamp() };
            delete updateData.createdAt;
            await updateDoc(docRef, updateData);

            // Save image in Realtime Database under productImages/{id}
            if (imageToSave) {
              await rtdbSet(rtdbRef(rtdb, `productImages/${id}`), {
                image: imageToSave,
                updatedAt: Date.now()
              });
            }
            return true;
          }
        } catch (e) {
          // Skip if product not in this category
        }
      }
      throw new Error(`Product ${id} not found to update.`);
    }

    const docRef = doc(db, collectionName, id);
    const updateData = { ...data, updatedAt: serverTimestamp() };
    delete updateData.createdAt;
    await updateDoc(docRef, updateData);
    return true;
  } catch (error) {
    console.error(`Error updating document ${id} in ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Delete a document from a collection.
 */
export async function deleteDocument(collectionName, id) {
  try {
    if (collectionName === 'products') {
      for (const catId of ALL_CATEGORY_IDS) {
        try {
          const docRef = doc(db, 'categories', catId, 'products', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            await deleteDoc(docRef);
            // Delete image from RTDB
            await rtdbRemove(rtdbRef(rtdb, `productImages/${id}`));
            return true;
          }
        } catch (e) { /* category may not exist */ }
      }
      throw new Error(`Product ${id} not found to delete.`);
    }

    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(`Error deleting document ${id} in ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Seeds products and categories collections if products is empty.
 */
export async function seedCatalogIfNeeded() {
  try {
    const products = await getDocuments('products');
    if (products.length === 0) {
      console.log('Seeding products and categories collections in Firestore...');
      
      // 1. Seed all 5 category documents with fixed IDs
      const categoriesList = [
        { id: 'water-purifiers',    name: 'Water Purifiers' },
        { id: 'water-softeners',    name: 'Water Softeners' },
        { id: 'kitchen-appliances', name: 'Kitchen Appliances' },
        { id: 'home-appliances',    name: 'Home Appliances' },
        { id: 'new-energy',         name: 'New Energy' }
      ];
      
      for (const cat of categoriesList) {
        await setDoc(doc(db, 'categories', cat.id), {
          categoryName: cat.name,
          description: `Premium ${cat.name} catalog.`,
          imageURL: '',
          createdAt: serverTimestamp()
        });
      }

      // 2. Seed products inside subcollections using the correct category mapping
      for (const [subCat, productsList] of Object.entries(baseCatalog)) {
        let categoryId = 'water-purifiers';
        let categoryName = 'Water Purifiers';
        if (['Air Purifiers', 'Vacuum Cleaners', 'Vegetable Cleaners', 'Dew Humidifier', 'Steam Irons'].includes(subCat)) {
          categoryId = 'home-appliances';
          categoryName = 'Home Appliances';
        } else if (['Air Fryers', 'Induction Cooktop', 'Mixer Grinders', 'Hand Blenders', 'Electric Chopper'].includes(subCat)) {
          categoryId = 'kitchen-appliances';
          categoryName = 'Kitchen Appliances';
        } else if (['KENT Autosoft', 'KENT Iron Removal Filters', 'KENT Sand Filters', 'KENT Bathroom Water Softener', 'KENT Pressure Boosting System'].includes(subCat)) {
          categoryId = 'water-softeners';
          categoryName = 'Water Softeners';
        } else if (['Solar Panels', 'Solar Inverters', 'Lithium Batteries', 'Hybrid Inverters'].includes(subCat)) {
          categoryId = 'new-energy';
          categoryName = 'New Energy';
        }

        for (const p of productsList) {
          const colRef = collection(db, 'categories', categoryId, 'products');
          await addDoc(colRef, {
            productName: p.name,
            categoryId: categoryId,
            categoryName: categoryName,
            subCategory: subCat,
            description: p.desc || p.specs || 'Premium Product',
            price: p.price || 0,
            discountPrice: p.basePrice || p.price || 0,
            SKU: p.id || 'SKU-' + Math.floor(1000 + Math.random()*9000),
            stock: 10,
            specifications: p.specs || '',
            features: p.features || [],
            imageURLs: p.image ? [p.image] : [],
            brochureURL: '',
            isFeatured: p.roFeatures?.includes('Best Selling') || false,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
        }
      }
      console.log('Seeding complete!');
    }

    // 3. Seed employees if empty
    const employeesList = await getDocuments('employees');
    if (employeesList.length === 0) {
      console.log('Seeding default employee in Firestore...');
      await addDoc(collection(db, 'employees'), {
        employeeId: 'EMP-101',
        fullName: 'Rajesh Kumar',
        mobile: '9876543210',
        email: 'rajesh@kentro.in',
        address: 'Sector 62, Noida, UP',
        userID: 'rajesh',
        password: 'password123',
        specialization: 'General',
        status: 'Active',
        createdAt: serverTimestamp()
      });
      console.log('Employee seeding complete!');
    }
  } catch (err) {
    console.error('Error seeding database:', err);
  }
}
