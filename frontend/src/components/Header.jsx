import React from 'react';
import { Plus, Search, CheckSquare, CalendarDays } from 'lucide-react';

export const Header = ({ onOpenCreateModal, isSearching, onToggleSearch, totalCount, openCount, completedCount }) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 mb-6">
      <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
        {/* App Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <h1 className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-2">
              TaskFlow
            </h1>
            <p className="text-xs text-slate-400 font-medium">Weekly Schedule & Task Planner</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Toggle Button */}
          <button
            onClick={onToggleSearch}
            className={`p-2.5 rounded-xl border transition-all ${
              isSearching
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 ring-1 ring-indigo-500/30'
                : 'glass-card text-slate-300 hover:text-white hover:border-slate-700'
            }`}
            title="Search Tasks"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Add Task Primary Action Button */}
          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 shadow-lg shadow-indigo-500/25 transition-all transform active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span className="hidden sm:inline">Add Task</span>
          </button>
        </div>
      </div>
    </header>
  );
};
