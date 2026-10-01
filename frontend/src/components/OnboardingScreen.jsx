import React from 'react';
import { motion } from 'framer-motion';

export const OnboardingScreen = ({ onGetStarted }) => {
  return (
    <div className="relative w-full h-full bg-[#4566EC] flex flex-col justify-between overflow-hidden">
      {/* Decorative Wave/Zigzag vectors and shapes from Figma */}
      <div className="absolute top-12 -left-10 w-36 h-36 border-4 border-[#5677FF] rotate-45 opacity-60 rounded-3xl pointer-events-none" />
      <div className="absolute -top-10 right-0 w-24 h-24 bg-[#5677FF] rounded-full opacity-60 pointer-events-none" />

      {/* Center Wave Patterns - flex-1 min-h-0 ensures it fits all mobile heights */}
      <div className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-center p-6">
        <div className="space-y-3 opacity-90 scale-90 sm:scale-100">
          <svg width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#5677FF]">
            <path d="M10 20 L30 40 L50 20 L70 40 L90 20" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 40 L30 60 L50 40 L70 60 L90 40" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 60 L30 80 L50 60 L70 80 L90 60" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className="absolute bottom-64 right-6 w-32 h-32 border-4 border-[#5677FF] rotate-45 opacity-50 rounded-2xl pointer-events-none" />

      {/* Bottom White Card from Figma (Rectangle 40) - Fixed at bottom without scrolling */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full shrink-0 bg-white rounded-t-[32px] p-6 sm:p-8 shadow-2xl relative z-20 pb-8 sm:pb-10"
      >
        <h1 className="text-[22px] sm:text-[24px] font-semibold text-[#000000] leading-tight mb-2 font-['Poppins']">
          Manage What To Do
        </h1>
        <p className="text-[13px] text-[#717171] leading-relaxed mb-6 max-w-xs font-['Poppins']">
          The best way to manage what you have to do, don't forget your plans
        </p>

        {/* CTA Button */}
        <button
          onClick={onGetStarted}
          className="w-full h-12 bg-[#4566EC] hover:bg-[#3B57DB] active:scale-[0.98] text-white font-medium text-base rounded-xl transition-all shadow-lg shadow-[#4566EC]/30 flex items-center justify-center font-['Poppins'] cursor-pointer"
        >
          Get Started
        </button>
      </motion.div>
    </div>
  );
};
