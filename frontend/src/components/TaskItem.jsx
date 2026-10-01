import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { CheckCircle2, Circle, Clock, Edit3, Trash2, Tag, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

const priorityColors = {
  High: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  Medium: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  Low: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
};

export const TaskItem = ({ task, onToggleStatus, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const x = useMotionValue(0);
  const deleteOpacity = useTransform(x, [-100, -50, 0], [1, 0.5, 0]);
  const deleteScale = useTransform(x, [-100, -50, 0], [1, 0.8, 0.5]);

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -80) {
      // Swiped left sufficiently -> trigger delete
      setIsDeleting(true);
      setTimeout(() => {
        onDelete(task._id);
      }, 200);
    }
  };

  const isCompleted = task.status === 'Completed';
  const taskDate = task.dateTime ? new Date(task.dateTime) : new Date();

  return (
    <div className="relative overflow-hidden rounded-xl my-2.5">
      {/* Background Swipe Action Reveal (Red Delete Zone) */}
      <motion.div
        style={{ opacity: deleteOpacity, scale: deleteScale }}
        className="absolute inset-y-0 right-0 w-24 bg-rose-600/90 backdrop-blur-md rounded-r-xl flex items-center justify-center text-white font-medium text-sm gap-1.5 shadow-inner"
      >
        <Trash2 className="w-5 h-5" />
        <span>Delete</span>
      </motion.div>

      {/* Main Task Item Box (Draggable Left) */}
      <motion.div
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -100, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        animate={{ opacity: isDeleting ? 0 : 1, y: isDeleting ? -10 : 0 }}
        className={`glass-card p-4 rounded-xl border transition-colors relative z-10 ${
          isCompleted
            ? 'bg-slate-900/40 border-slate-800/80 opacity-75'
            : 'hover:border-indigo-500/40 border-slate-800/90'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          {/* Status Checkbox Toggle */}
          <button
            onClick={() => onToggleStatus(task._id)}
            className="mt-0.5 text-slate-400 hover:text-indigo-400 transition-colors focus:outline-none"
            title={isCompleted ? 'Mark as In Progress' : 'Mark as Completed'}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-950/40" />
            ) : (
              <Circle className="w-5 h-5 text-slate-400 hover:text-indigo-400" />
            )}
          </button>

          {/* Task Info Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h4
                className={`font-semibold text-base leading-snug break-words ${
                  isCompleted ? 'line-through text-slate-400' : 'text-slate-100'
                }`}
              >
                {task.title}
              </h4>
              
              {/* Priority Badge */}
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                  priorityColors[task.priority] || priorityColors.Medium
                }`}
              >
                {task.priority || 'Medium'}
              </span>
            </div>

            {/* Description */}
            {task.description && (
              <p
                className={`text-sm mb-2.5 line-clamp-2 ${
                  isCompleted ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                {task.description}
              </p>
            )}

            {/* Date & Time Badge */}
            <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
              <div className="flex items-center gap-1 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>{format(taskDate, 'EEE, MMM dd • hh:mm a')}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons (Edit & Delete buttons for accessibility) */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(task)}
              className="p-1.5 text-slate-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-lg transition-colors"
              title="Edit Task"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
              title="Delete Task"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Swipe Left Hint on Hover/Touch */}
        <div className="text-[10px] text-slate-500 mt-2 text-right italic font-light sm:hidden">
          ← Swipe left to delete
        </div>
      </motion.div>
    </div>
  );
};
