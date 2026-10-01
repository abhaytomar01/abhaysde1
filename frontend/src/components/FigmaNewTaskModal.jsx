import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export const FigmaNewTaskModal = ({ isOpen, onClose, onSave, taskToEdit = null }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:30');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || '');
      setDescription(taskToEdit.description || '');
      if (taskToEdit.dateTime) {
        const d = new Date(taskToEdit.dateTime);
        setTaskDate(format(d, 'yyyy-MM-dd'));
        setStartTime(format(d, 'HH:mm'));
      } else {
        setTaskDate(format(new Date(), 'yyyy-MM-dd'));
        setStartTime('09:00');
      }
      setPriority(taskToEdit.priority || 'Medium');
    } else {
      setTitle('');
      setDescription('');
      setTaskDate(format(new Date(), 'yyyy-MM-dd'));
      setStartTime('09:00');
      setEndTime('10:30');
      setPriority('Medium');
    }
    setError('');
  }, [taskToEdit, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }
    if (!taskDate) {
      setError('Date is required');
      return;
    }

    // Combine date and start time into ISO string
    const combinedDate = new Date(`${taskDate}T${startTime || '09:00'}:00`);

    onSave({
      _id: taskToEdit ? taskToEdit._id : undefined,
      title: title.trim(),
      description: description.trim(),
      dateTime: combinedDate.toISOString(),
      priority,
      status: taskToEdit ? taskToEdit.status : 'In Progress',
    });

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all p-0 sm:p-4"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="w-full max-w-md bg-white rounded-t-[28px] sm:rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto font-['Poppins'] pb-[max(1.75rem,env(safe-area-inset-bottom))]"
          >
            {/* Header (Figma Add New Task) */}
            <div className="flex items-center justify-between pb-4 mb-2 border-b border-[#F0F0F0]">
              <h2 className="text-[18px] font-semibold text-[#090E23]">
                {taskToEdit ? 'Edit Task' : 'Add New Task'}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-full text-[#090E23] hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[2]" />
              </button>
            </div>

            {error && (
              <div className="p-3 mb-4 rounded-xl bg-[#FFE6E7] text-[#FF464D] text-xs font-medium border border-[#FF464D]/20">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Task Title (Figma Task Title) */}
              <div>
                <label className="block text-[12px] font-medium text-[#717171] mb-1.5">
                  Task title
                </label>
                <input
                  type="text"
                  placeholder="Doing Homework"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (error) setError('');
                  }}
                  className="w-full h-11 px-3.5 bg-white border border-[#EAEAEA] rounded-xl text-[14px] text-[#090E23] placeholder-[#A0A3BD] focus:outline-none focus:border-[#4566EC] transition-all"
                />
              </div>

              {/* Set Time (Figma Start / Ends) */}
              <div>
                <label className="block text-[12px] font-medium text-[#717171] mb-1.5">
                  Set Time
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Clock className="w-4 h-4 text-[#090E23] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full h-11 pl-9 pr-2.5 bg-white border border-[#EAEAEA] rounded-xl text-[13px] text-[#090E23] focus:outline-none focus:border-[#4566EC] transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-[#090E23] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full h-11 pl-9 pr-2.5 bg-white border border-[#EAEAEA] rounded-xl text-[13px] text-[#090E23] focus:outline-none focus:border-[#4566EC] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Set Date (Figma Set Date) */}
              <div>
                <label className="block text-[12px] font-medium text-[#717171] mb-1.5">
                  Set Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#090E23] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    value={taskDate}
                    onChange={(e) => setTaskDate(e.target.value)}
                    className="w-full h-11 px-3.5 bg-white border border-[#EAEAEA] rounded-xl text-[14px] text-[#090E23] focus:outline-none focus:border-[#4566EC] transition-all"
                  />
                </div>
              </div>

              {/* Priority Selection */}
              <div>
                <label className="block text-[12px] font-medium text-[#717171] mb-1.5">
                  Priority
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Low', 'Medium', 'High'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        priority === p
                          ? p === 'High'
                            ? 'bg-[#FFE6E7] border-[#FF464D] text-[#FF464D]'
                            : p === 'Low'
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-600'
                            : 'bg-amber-50 border-amber-500 text-amber-600'
                          : 'bg-white border-[#EAEAEA] text-[#717171] hover:border-slate-300'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description (Figma Description) */}
              <div>
                <label className="block text-[12px] font-medium text-[#717171] mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Add Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3.5 bg-white border border-[#EAEAEA] rounded-xl text-[14px] text-[#090E23] placeholder-[#A0A3BD] focus:outline-none focus:border-[#4566EC] transition-all resize-none"
                />
              </div>

              {/* CTA (Figma Rectangle 19 / Create task) */}
              <button
                type="submit"
                className="w-full h-12 bg-[#4566EC] hover:bg-[#3B57DB] text-white font-medium text-[16px] rounded-xl transition-all shadow-lg shadow-[#4566EC]/30 mt-3 cursor-pointer"
              >
                {taskToEdit ? 'Save Changes' : 'Create task'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
