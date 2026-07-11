import React from 'react';

export default function HeroSlider() {
  return (
    <div className="relative w-full h-[320px] sm:h-[400px] md:h-[500px] bg-slate-100 overflow-hidden select-none ">
      <img 
        src="/img-2.png" 
        alt="Healthy living with purity Kent Hero Banner" 
        className="w-full h-full object-cover"
        loading="eager"
      />
    </div>
  );
}
