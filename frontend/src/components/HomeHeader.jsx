import React from 'react';
import { Search } from 'lucide-react';

export const HomeHeader = ({ onOpenSearch }) => {
  return (
    <header className="w-full px-6 pt-9 pb-5 font-['Poppins']">
      {/* Figma Rectangle 41 Search Box */}
      <div
        onClick={onOpenSearch}
        className="w-full h-[47px] bg-white border border-[#E6E6E6] rounded-[6px] px-4 flex items-center justify-between cursor-pointer transition-all shadow-xs hover:border-[#4566EC]/40"
      >
        <span className="text-[12px] font-light text-black/60 select-none">
          Search for a task
        </span>
        <Search className="w-[18px] h-[18px] text-[#090E23]" />
      </div>
    </header>
  );
};
