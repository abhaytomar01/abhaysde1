import React from 'react';
import { Check, Megaphone } from 'lucide-react';

export const ReminderMetricCards = ({ completedCount, openCount }) => {
  const total = completedCount + openCount;
  const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  return (
    <div className="w-full px-6 mb-7 font-['Poppins']">
      {/* 2 Metric Reminder Cards (Figma Rectangle 4) */}
      <div className="grid grid-cols-2 gap-[17px] mb-6">
        {/* Task Complete Card */}
        <div className="w-full h-[96px] bg-[#EFF2FF] rounded-[14px] p-3.5 flex flex-col justify-between">
          <div className="flex items-center gap-2.5">
            {/* Rectangle 13 icon container */}
            <div className="w-7 h-7 bg-[#99ADFF] rounded-[6px] flex items-center justify-center text-[#4566EC] shrink-0">
              <div className="w-4 h-4 border-[1.5px] border-[#4566EC] rounded-[3px] flex items-center justify-center">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
            </div>
            <span className="text-[12px] font-normal text-[#090E23] leading-[18px]">
              Task Complete
            </span>
          </div>

          <div className="flex items-baseline gap-1.5 pl-0.5">
            <span className="text-[22px] font-semibold text-[#090E23] leading-none">
              {String(completedCount).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-normal text-[#6E7180]">
              This Week
            </span>
          </div>
        </div>

        {/* Task Pending Card */}
        <div className="w-full h-[96px] bg-[#FFE6E7] rounded-[14px] p-3.5 flex flex-col justify-between">
          <div className="flex items-center gap-2.5">
            {/* Rectangle 13 icon container */}
            <div className="w-7 h-7 bg-[#FFB1B5] rounded-[6px] flex items-center justify-center text-[#FF464D] shrink-0">
              <div className="w-4 h-4 border-[1.5px] border-[#FF464D] rounded-[3px] flex items-center justify-center">
                <Megaphone className="w-2.5 h-2.5 stroke-[2.2]" />
              </div>
            </div>
            <span className="text-[12px] font-normal text-[#090E23] leading-[18px]">
              Task Pending
            </span>
          </div>

          <div className="flex items-baseline gap-1.5 pl-0.5">
            <span className="text-[22px] font-semibold text-[#090E23] leading-none">
              {String(openCount).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-normal text-[#6E7180]">
              This Week
            </span>
          </div>
        </div>
      </div>

      {/* Weekly Progress Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-semibold text-[#090E23]">
            Weekly Progress
          </span>
          <span className="text-[12px] font-medium text-[#4566EC]">
            {percent}%
          </span>
        </div>
        <div className="w-full bg-[#EFF2FF] h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2A3B8F] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
