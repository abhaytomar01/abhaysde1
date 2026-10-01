import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronDown, ChevronUp, CheckCircle2, Clock, ListTodo } from 'lucide-react';
import { TaskItem } from './TaskItem';

export const WeekCard = ({ weekGroup, isDefaultExpanded = false, onToggleStatus, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(isDefaultExpanded);

  const totalTasks = weekGroup.tasks.length;
  const completedCount = weekGroup.completedCount;
  const openCount = weekGroup.openCount;
  const percent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel rounded-2xl mb-4 overflow-hidden shadow-xl border border-slate-800/80 hover:border-slate-700/80 transition-all"
    >
      {/* Week Card Header (Interactive Expand/Collapse Trigger) */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 sm:p-5 cursor-pointer select-none bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 hover:from-slate-800/60 hover:to-slate-800/60 transition-all"
      >
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-100 tracking-tight">
                {weekGroup.label}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Monday to Sunday • {totalTasks} {totalTasks === 1 ? 'Task' : 'Tasks'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700/50">
              {percent}% Done
            </span>
            <div className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200">
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </div>
        </div>

        {/* Task Summary Metrics Bar */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3">
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-2 rounded-xl">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-[11px] text-amber-300/80 block uppercase tracking-wider font-semibold">
                Open Tasks
              </span>
              <span className="text-base font-bold text-amber-300">{openCount}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-[11px] text-emerald-300/80 block uppercase tracking-wider font-semibold">
                Completed
              </span>
              <span className="text-base font-bold text-emerald-300">{completedCount}</span>
            </div>
          </div>
        </div>

        {/* Visual Completion Progress Bar */}
        <div className="w-full bg-slate-950/80 rounded-full h-2 overflow-hidden border border-slate-800/50">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-indigo-500 via-indigo-400 to-emerald-400 rounded-full"
          />
        </div>
      </div>

      {/* Expandable Task List Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-slate-800/80 px-4 py-3 bg-slate-950/40"
          >
            {totalTasks === 0 ? (
              <div className="text-center py-6 text-slate-500 text-sm">
                No tasks scheduled for this week yet.
              </div>
            ) : (
              weekGroup.tasks.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onToggleStatus={onToggleStatus}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
