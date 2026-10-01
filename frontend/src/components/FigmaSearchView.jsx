import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search } from 'lucide-react';
import { FigmaTaskItem } from './FigmaTaskItem';

export const FigmaSearchView = ({
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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="fixed inset-0 z-50 bg-[#FDFDFF] flex flex-col font-['Poppins'] overflow-hidden"
    >
      <div className="max-w-md w-full mx-auto flex-1 flex flex-col p-5">
        {/* Top Header with Back Arrow */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white border border-[#EAEAEA] flex items-center justify-center text-[#090E23] hover:bg-slate-50 transition-colors shrink-0 shadow-sm"
            title="Go back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2]" />
          </button>
          
          {/* Search Box (Figma Frame 9 search bar) */}
          <div className="flex-1 h-11 bg-white border border-[#E6E6E6] rounded-xl px-3.5 flex items-center gap-2 shadow-sm">
            <input
              type="text"
              autoFocus
              placeholder="Finish..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-transparent text-[14px] text-[#090E23] placeholder-[#A0A3BD] focus:outline-none"
            />
            <Search className="w-4 h-4 text-[#090E23] shrink-0" />
          </div>
        </div>

        {/* Search Results Summary */}
        <div className="text-[12px] text-[#717171] mb-3 px-1">
          {searchQuery ? `Found ${tasks.length} tasks` : 'All tasks'}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto bg-white rounded-2xl border border-[#EAEAEA] p-2 shadow-sm">
          {tasks.length === 0 ? (
            <div className="py-16 text-center text-[#A0A3BD] text-sm">
              No matching tasks found.
            </div>
          ) : (
            tasks.map((task) => (
              <FigmaTaskItem
                key={task._id}
                task={task}
                onToggleStatus={onToggleStatus}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};
