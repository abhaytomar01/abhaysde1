import React from 'react';
import { motion } from 'framer-motion';
import { Search, X, AlertCircle } from 'lucide-react';
import { TaskItem } from './TaskItem';

export const SearchView = ({
  searchQuery,
  onSearchChange,
  tasks,
  onClose,
  onToggleStatus,
  onEdit,
  onDelete,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="glass-panel rounded-2xl p-4 sm:p-5 mb-6 border border-indigo-500/30 shadow-2xl"
    >
      {/* Search Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search tasks by keyword in title or description..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-11 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>
        <button
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          title="Close Search"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-3 px-1">
        <span>
          {searchQuery.trim() === ''
            ? 'All Tasks'
            : `Search Results for "${searchQuery}"`}
        </span>
        <span>{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} found</span>
      </div>

      {/* Task List */}
      <div className="max-h-[60vh] overflow-y-auto pr-1">
        {tasks.length === 0 ? (
          <div className="py-10 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
            <AlertCircle className="w-8 h-8 text-slate-500 mb-1" />
            <p className="text-sm font-medium">No matching tasks found.</p>
            <p className="text-xs text-slate-500">Try searching for a different keyword or title.</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggleStatus={onToggleStatus}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </motion.div>
  );
};
