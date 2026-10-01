import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Trash2, Edit3, Check } from 'lucide-react';

export const FigmaTaskItem = ({ task, onToggleStatus, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const x = useMotionValue(0);
  const deleteOpacity = useTransform(x, [-80, -30, 0], [1, 0.5, 0]);

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -60) {
      setIsDeleting(true);
      setTimeout(() => {
        onDelete(task._id);
      }, 180);
    }
  };

  const isCompleted = task.status === 'Completed';

  return (
    <div className="relative overflow-hidden font-['Poppins']">
      {/* Background Swipe Red Delete Action */}
      <motion.div
        style={{ opacity: deleteOpacity }}
        className="absolute inset-y-0 right-0 w-16 bg-[#FF464D] flex items-center justify-center text-white font-medium text-[11px]"
      >
        <Trash2 className="w-4 h-4" />
      </motion.div>

      {/* Main Task Item (Figma Task 1 / Task 2 / Task done) */}
      <motion.div
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -70, right: 0 }}
        dragElastic={0.08}
        onDragEnd={handleDragEnd}
        animate={{ opacity: isDeleting ? 0 : 1, y: isDeleting ? -6 : 0 }}
        className="bg-transparent py-3 flex items-center justify-between gap-3 relative z-10 select-none"
      >
        {/* Checkbox (Rectangle 14) + Title */}
        <div className="flex items-center gap-3.5 flex-1 min-w-0">
          <button
            type="button"
            onClick={() => onToggleStatus(task._id)}
            className={`w-5 h-5 rounded-[2px] border transition-all flex items-center justify-center shrink-0 ${
              isCompleted
                ? 'bg-[#4566EC] border-[#4566EC] text-white'
                : 'bg-white border-[#4566EC] hover:bg-[#EFF2FF]'
            }`}
          >
            {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </button>

          <span
            className={`text-[14px] font-medium font-['Poppins'] truncate ${
              isCompleted
                ? 'line-through text-[#090E23]/60'
                : 'text-[#090E23]'
            }`}
          >
            {task.title}
          </span>
        </div>

        {/* Action icons (Figma Group 6 Edit & Delete) */}
        <div className="flex items-center gap-1.5 shrink-0 text-[#C4C4C4]">
          <button
            onClick={() => onDelete(task._id)}
            className="p-1 hover:text-[#FF464D] transition-colors"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4 stroke-[1.8]" />
          </button>
          <button
            onClick={() => onEdit(task)}
            className="p-1 hover:text-[#4566EC] transition-colors"
            title="Edit task"
          >
            <Edit3 className="w-4 h-4 stroke-[1.8]" />
          </button>
        </div>
      </motion.div>

      {/* Figma Line 1 Divider */}
      <div className="h-[1px] bg-[#EAEAEA] ml-8" />
    </div>
  );
};
