import React from 'react';
import { CheckSquare, AlertCircle, TrendingUp, Flame } from 'lucide-react';

export const StatsTabView = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;
  const open = total - completed;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const highPriority = tasks.filter((t) => t.priority === 'High').length;
  const medPriority = tasks.filter((t) => t.priority === 'Medium').length;
  const lowPriority = tasks.filter((t) => t.priority === 'Low').length;

  return (
    <div className="w-full px-6 py-2 font-['Poppins'] space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-bold text-[#090E23]">
          Productivity Stats
        </h2>
        <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
          <Flame className="w-3.5 h-3.5" /> High Output
        </span>
      </div>

      {/* Completion Big Metric Box */}
      <div className="bg-[#4566EC] text-white rounded-2xl p-5 shadow-md shadow-[#4566EC]/25">
        <span className="text-xs text-white/80 font-medium">Overall Progress</span>
        <div className="flex items-baseline justify-between mt-1 mb-3">
          <span className="text-3xl font-bold">{percent}%</span>
          <span className="text-xs text-white/90">{completed} of {total} Tasks Completed</span>
        </div>
        <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* 2 Metric Cards */}
      <div className="grid grid-cols-2 gap-3.5">
        <div className="bg-[#EFF2FF] rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckSquare className="w-4 h-4 text-[#4566EC]" />
            <span className="text-xs text-[#090E23] font-medium">Completed</span>
          </div>
          <span className="text-2xl font-bold text-[#090E23]">{completed}</span>
        </div>

        <div className="bg-[#FFE6E7] rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-[#FF464D]" />
            <span className="text-xs text-[#090E23] font-medium">Pending</span>
          </div>
          <span className="text-2xl font-bold text-[#090E23]">{open}</span>
        </div>
      </div>

      {/* Priority Distribution */}
      <div className="bg-white rounded-2xl border border-[#EAEAEA] p-4 space-y-3">
        <h4 className="text-xs font-semibold text-[#090E23] uppercase tracking-wider">
          Task Priority Distribution
        </h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[#FF464D] font-medium">High Priority</span>
            <span className="font-semibold text-[#090E23]">{highPriority} tasks</span>
          </div>
          <div className="w-full bg-[#FFE6E7] h-1.5 rounded-full overflow-hidden">
            <div className="h-full bg-[#FF464D]" style={{ width: `${total ? (highPriority / total) * 100 : 0}%` }} />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-amber-600 font-medium">Medium Priority</span>
            <span className="font-semibold text-[#090E23]">{medPriority} tasks</span>
          </div>
          <div className="w-full bg-amber-100 h-1.5 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500" style={{ width: `${total ? (medPriority / total) * 100 : 0}%` }} />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-emerald-600 font-medium">Low Priority</span>
            <span className="font-semibold text-[#090E23]">{lowPriority} tasks</span>
          </div>
          <div className="w-full bg-emerald-100 h-1.5 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${total ? (lowPriority / total) * 100 : 0}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};
