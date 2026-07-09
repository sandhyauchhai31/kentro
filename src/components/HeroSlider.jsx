import React from 'react';

export default function HeroSlider() {
  return (
    <div className="relative w-full h-[320px] sm:h-[400px] md:h-[500px] bg-slate-100 overflow-hidden select-none ">
      <img 
        src="https://placehold.co/1500x500" 
        alt="Hero Banner Placeholder" 
        className="w-full h-full object-cover"
        loading="eager"
      />
    </div>
  );
}
