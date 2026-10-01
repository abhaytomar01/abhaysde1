import React from 'react';
import { format, addDays, isSameDay } from 'date-fns';

export const WeeklyCalendarStrip = ({ selectedDate, onSelectDate, currentWeekMonday }) => {
  // Generate Monday to Sunday for the current week (8 days as designed)
  const weekDays = Array.from({ length: 8 }, (_, i) => addDays(currentWeekMonday, i));

  return (
    <div className="w-full px-4 sm:px-6 mb-5 select-none">
      {/* 8 Days Horizontal Strip matching Figma Calendar Frame 1-8 */}
      <div className="flex items-center justify-between gap-1 w-full">
        {weekDays.map((day) => {
          const isSelected = isSameDay(day, selectedDate);
          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => onSelectDate(day)}
              className={`flex-1 min-w-0 max-w-[40px] h-[58px] sm:h-[62px] rounded-[10px] flex flex-col items-center justify-center cursor-pointer transition-all duration-150 ${
                isSelected
                  ? 'bg-[#4566EC] text-white shadow-sm'
                  : 'text-[#C0C0C0] hover:text-[#090E23] hover:bg-slate-50'
              }`}
            >
              <span
                className={`text-[10px] font-['Poppins'] font-normal leading-[16px] text-center ${
                  isSelected ? 'text-white' : 'text-[#C0C0C0]'
                }`}
              >
                {format(day, 'EEE')}
              </span>
              <span
                className={`text-[12px] font-['Poppins'] leading-[18px] text-center ${
                  isSelected ? 'text-white font-medium' : 'text-[#C0C0C0]'
                }`}
              >
                {format(day, 'dd')}
              </span>
              {isSelected && (
                <span className="w-[4px] h-[4px] bg-white rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
