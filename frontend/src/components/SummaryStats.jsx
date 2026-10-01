import React from 'react';
import { ListTodo, Clock, CheckCircle2, TrendingUp } from 'lucide-react';

export const SummaryStats = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;
  const open = total - completed;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <div className="glass-panel p-3.5 sm:p-4 rounded-2xl border border-slate-800/80 flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
          <ListTodo className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block truncate">
            Total Tasks
          </span>
          <span className="text-xl sm:text-2xl font-black text-slate-100">{total}</span>
        </div>
      </div>

      <div className="glass-panel p-3.5 sm:p-4 rounded-2xl border border-slate-800/80 flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
          <Clock className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block truncate">
            Open Tasks
          </span>
          <span className="text-xl sm:text-2xl font-black text-amber-300">{open}</span>
        </div>
      </div>

      <div className="glass-panel p-3.5 sm:p-4 rounded-2xl border border-slate-800/80 flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block truncate">
            Completed
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-emerald-300">{completed}</span>
            <span className="text-xs font-semibold text-emerald-400/80">({percent}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
