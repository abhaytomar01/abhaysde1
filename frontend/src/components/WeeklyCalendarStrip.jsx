import React from 'react';
import { format, addDays, isSameDay } from 'date-fns';

export const WeeklyCalendarStrip = ({ selectedDate, onSelectDate, currentWeekMonday }) => {
  // Generate Monday to Sunday for the current week (or Sunday to Sunday 8 days as in Figma)
  const weekDays = Array.from({ length: 8 }, (_, i) => addDays(currentWeekMonday, i));

  return (
    <div className="w-full px-6 mb-6">
      {/* 8 Days Horizontal Strip matching Figma Calendar Frame 1-8 */}
      <div className="flex items-center justify-between gap-1 select-none">
        {weekDays.map((day, idx) => {
          const isSelected = isSameDay(day, selectedDate);
          return (
            <div
              key={day.toISOString()}
              onClick={() => onSelectDate(day)}
              className={`flex flex-col items-center justify-center cursor-pointer transition-all ${
                isSelected
                  ? 'w-[39px] h-[63px] bg-[#4566EC] rounded-[10px] text-white shadow-sm'
                  : 'w-[35px] h-[51px] text-[#C0C0C0] hover:text-[#090E23]'
              }`}
            >
              <span
                className={`text-[10px] font-['Poppins'] font-normal leading-[20px] text-center ${
                  isSelected ? 'text-white' : 'text-[#C0C0C0]'
                }`}
              >
                {format(day, 'EEE')}
              </span>
              <span
                className={`text-[12px] font-['Poppins'] font-normal leading-[20px] text-center ${
                  isSelected ? 'text-white font-medium' : 'text-[#C0C0C0]'
                }`}
              >
                {format(day, 'dd')}
              </span>
              {isSelected && (
                <span className="w-[4px] h-[4px] bg-white rounded-full mt-0.5" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
