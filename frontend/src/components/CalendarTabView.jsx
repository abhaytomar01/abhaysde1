import React from 'react';
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';
import { CheckSquare, Clock } from 'lucide-react';
import { FigmaTaskItem } from './FigmaTaskItem';

export const CalendarTabView = ({
  selectedDate,
  onSelectDate,
  tasks,
  onToggleStatus,
  onEdit,
  onDelete,
}) => {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const dayTasks = tasks.filter((t) => {
    const d = t.dateTime ? new Date(t.dateTime) : new Date();
    return isSameDay(d, selectedDate);
  });

  return (
    <div className="w-full px-6 py-2 font-['Poppins'] space-y-5">
      {/* Month Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-bold text-[#090E23]">
          {format(selectedDate, 'MMMM yyyy')}
        </h2>
        <span className="text-[12px] font-medium text-[#4566EC] bg-[#EFF2FF] px-2.5 py-1 rounded-full">
          {tasks.length} Total Tasks
        </span>
      </div>

      {/* Mini Month Calendar Grid */}
      <div className="bg-white rounded-2xl border border-[#EAEAEA] p-4 shadow-xs">
        <div className="grid grid-cols-7 gap-1 mb-2 text-center text-[10px] font-medium text-[#A0A3BD]">
          <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day) => {
            const isSelected = isSameDay(day, selectedDate);
            const isCurrentMonth = day.getMonth() === selectedDate.getMonth();
            const hasTasks = tasks.some((t) => isSameDay(new Date(t.dateTime), day));

            return (
              <button
                key={day.toISOString()}
                onClick={() => onSelectDate(day)}
                className={`h-9 rounded-xl flex flex-col items-center justify-center relative transition-all ${
                  isSelected
                    ? 'bg-[#4566EC] text-white font-bold shadow-sm'
                    : isCurrentMonth
                    ? 'text-[#090E23] hover:bg-[#EFF2FF]'
                    : 'text-[#C0C0C0]'
                }`}
              >
                <span className="text-[12px]">{format(day, 'd')}</span>
                {hasTasks && !isSelected && (
                  <span className="w-1 h-1 bg-[#4566EC] rounded-full absolute bottom-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day's Tasks */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[15px] font-semibold text-[#090E23]">
            Tasks on {format(selectedDate, 'EEEE, MMM d')}
          </h3>
          <span className="text-[11px] text-[#717171]">
            {dayTasks.length} {dayTasks.length === 1 ? 'task' : 'tasks'}
          </span>
        </div>

        {dayTasks.length === 0 ? (
          <div className="py-8 text-center text-[12px] text-[#717171] bg-white rounded-2xl border border-[#EAEAEA]">
            No tasks scheduled for this day.
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#EAEAEA] p-3">
            {dayTasks.map((task) => (
              <FigmaTaskItem
                key={task._id}
                task={task}
                onToggleStatus={onToggleStatus}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
