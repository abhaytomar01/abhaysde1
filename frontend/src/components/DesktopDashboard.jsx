import React from 'react';
import {
  Home,
  Calendar as CalendarIcon,
  PieChart,
  Settings,
  Plus,
  Search,
  Bell,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  AlertCircle,
  Smartphone,
  TrendingUp,
  ListTodo,
  Flame,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { format, isSameDay, addDays, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';
import { FigmaTaskItem } from './FigmaTaskItem';

export const DesktopDashboard = ({
  tasks,
  weekTasks,
  displayedTasks,
  selectedDate,
  currentWeekMonday,
  completedCount,
  openCount,
  viewAll,
  activeTab = 'home',
  onTabChange,
  onSelectDate,
  onPrevWeek,
  onNextWeek,
  onToggleViewAll,
  onOpenCreateModal,
  onOpenEditModal,
  onToggleStatus,
  onDelete,
  onOpenSearch,
  onSwitchToMobileFrame,
  onResetOnboarding,
}) => {
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekMonday, i));
  const totalWeekTasks = weekTasks.length;
  const percent = totalWeekTasks > 0 ? Math.round((completedCount / totalWeekTasks) * 100) : 0;

  // Calendar calculations for Desktop Calendar view
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const calendarStartDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEndDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const monthDays = eachDayOfInterval({ start: calendarStartDate, end: calendarEndDate });

  // Priority counts for Stats view
  const totalTasksCount = tasks.length;
  const totalCompletedCount = tasks.filter((t) => t.status === 'Completed').length;
  const totalOpenCount = totalTasksCount - totalCompletedCount;
  const overallPercent = totalTasksCount > 0 ? Math.round((totalCompletedCount / totalTasksCount) * 100) : 0;
  const highPriority = tasks.filter((t) => t.priority === 'High').length;
  const medPriority = tasks.filter((t) => t.priority === 'Medium').length;
  const lowPriority = tasks.filter((t) => t.priority === 'Low').length;

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-[#090E23] flex font-['Poppins']">
      {/* 1. Left Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-[#EAEAEA] flex flex-col justify-between p-5 shrink-0 hidden lg:flex shadow-xs sticky top-0 h-screen">
        <div className="space-y-6">
          {/* Logo Branding */}
          <div className="flex items-center gap-3 px-2 cursor-pointer" onClick={() => onTabChange('home')}>
            <div className="w-10 h-10 rounded-xl bg-[#4566EC] flex items-center justify-center text-white shadow-md shadow-[#4566EC]/30">
              <CheckSquare className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="font-bold text-[17px] text-[#090E23] leading-tight tracking-tight">
                TaskFlow
              </h1>
              <p className="text-[11px] text-[#717171]">Weekly Planner</p>
            </div>
          </div>

          {/* New Task Primary Button */}
          <button
            onClick={onOpenCreateModal}
            className="w-full h-11 bg-[#4566EC] hover:bg-[#3B57DB] text-white font-medium text-[14px] rounded-xl flex items-center justify-center gap-2 shadow-md shadow-[#4566EC]/25 transition-all transform active:scale-98"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Create New Task</span>
          </button>

          {/* Navigation Links with Active States */}
          <nav className="space-y-1.5 pt-2">
            <button
              onClick={() => onTabChange('home')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                activeTab === 'home'
                  ? 'bg-[#EFF2FF] text-[#4566EC]'
                  : 'text-[#717171] hover:bg-slate-50 hover:text-[#090E23]'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => onTabChange('calendar')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                activeTab === 'calendar'
                  ? 'bg-[#EFF2FF] text-[#4566EC]'
                  : 'text-[#717171] hover:bg-slate-50 hover:text-[#090E23]'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Weekly Calendar</span>
            </button>

            <button
              onClick={() => onTabChange('stats')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                activeTab === 'stats'
                  ? 'bg-[#EFF2FF] text-[#4566EC]'
                  : 'text-[#717171] hover:bg-slate-50 hover:text-[#090E23]'
              }`}
            >
              <PieChart className="w-4 h-4" />
              <span>Productivity Stats</span>
            </button>

            <button
              onClick={() => onTabChange('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                activeTab === 'settings' || activeTab === 'profile'
                  ? 'bg-[#EFF2FF] text-[#4566EC]'
                  : 'text-[#717171] hover:bg-slate-50 hover:text-[#090E23]'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* View Switcher & Profile Widget */}
        <div className="space-y-3 pt-4 border-t border-[#EAEAEA]">
          <button
            onClick={onSwitchToMobileFrame}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-[#090E23] text-xs font-semibold rounded-xl transition-all"
            title="Preview Mobile Figma Device Frame"
          >
            <Smartphone className="w-4 h-4 text-[#4566EC]" />
            <span>Switch to Mobile View</span>
          </button>

          <div
            onClick={() => onTabChange('settings')}
            className="flex items-center gap-3 px-2 pt-1 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-9 h-9 rounded-full bg-[#99ADFF]/40 border border-[#4566EC]/30 flex items-center justify-center text-[#4566EC] font-semibold text-xs">
              AM
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-[#090E23] truncate">Alex Morgan</p>
              <p className="text-[11px] text-[#717171] truncate">alex.morgan@work.io</p>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. Main Desktop Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-[#EAEAEA] px-8 py-4 flex items-center justify-between gap-4 sticky top-0 z-20 shadow-xs">
          <div>
            <h2 className="text-[20px] font-bold text-[#090E23] leading-tight">
              {activeTab === 'home' && 'Weekly Overview'}
              {activeTab === 'calendar' && 'Calendar Planner'}
              {activeTab === 'stats' && 'Productivity Analytics'}
              {(activeTab === 'settings' || activeTab === 'profile') && 'Account Settings'}
            </h2>
            <p className="text-[12px] text-[#717171]">
              {format(currentWeekMonday, 'MMMM yyyy')} • Week {format(currentWeekMonday, 'I')} (Monday – Sunday)
            </p>
          </div>

          {/* Search Bar & Quick Actions */}
          <div className="flex items-center gap-3">
            <div
              onClick={onOpenSearch}
              className="w-72 h-10 bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#4566EC] rounded-xl px-3.5 flex items-center justify-between cursor-pointer transition-colors"
            >
              <span className="text-[13px] text-[#94A3B8]">Search tasks (Press /)...</span>
              <Search className="w-4 h-4 text-[#64748B]" />
            </div>

            <button
              onClick={onOpenCreateModal}
              className="h-10 px-4 bg-[#4566EC] hover:bg-[#3B57DB] text-white rounded-xl flex items-center gap-1.5 text-xs font-semibold shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </button>
          </div>
        </header>

        {/* TAB CONTENT */}
        <div className="p-8 max-w-6xl w-full mx-auto space-y-6">
          {/* ================= TAB 1: DASHBOARD (HOME) ================= */}
          {activeTab === 'home' && (
            <>
              {/* Top Metrics Cards Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-[#EFF2FF] rounded-2xl p-5 border border-[#4566EC]/20 relative shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#99ADFF]/50 flex items-center justify-center text-[#4566EC]">
                        <CheckSquare className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <span className="text-[13px] font-medium text-[#090E23]">
                        Task Complete
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#4566EC] bg-white px-2 py-0.5 rounded-full shadow-xs">
                      {percent}%
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[28px] font-bold text-[#090E23] leading-none">
                      {String(completedCount).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] text-[#6E7180]">This Week</span>
                  </div>
                </div>

                <div className="bg-[#FFE6E7] rounded-2xl p-5 border border-[#FF464D]/20 relative shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#FFB1B5]/50 flex items-center justify-center text-[#FF464D]">
                        <AlertCircle className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <span className="text-[13px] font-medium text-[#090E23]">
                        Task Pending
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#FF464D] bg-white px-2 py-0.5 rounded-full shadow-xs">
                      {openCount} Open
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[28px] font-bold text-[#090E23] leading-none">
                      {String(openCount).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] text-[#6E7180]">This Week</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-[#EAEAEA] shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-[#090E23]">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <span className="text-[13px] font-semibold text-[#090E23]">
                        Weekly Progress
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#4566EC]">
                      {completedCount}/{totalWeekTasks} Done
                    </span>
                  </div>
                  <div className="space-y-1.5 mt-2">
                    <div className="w-full bg-[#EFF2FF] h-2.5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#4566EC] rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-[#717171] text-right">
                      {totalWeekTasks === 0 ? 'No tasks scheduled' : `${percent}% completed`}
                    </p>
                  </div>
                </div>
              </div>

              {/* 7-Day Monday-Sunday Strip */}
              <div className="bg-white rounded-2xl p-5 border border-[#EAEAEA] shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-[#4566EC]" />
                    <h3 className="text-[15px] font-semibold text-[#090E23]">
                      Weekly Calendar (Monday – Sunday)
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={onPrevWeek}
                      className="p-1.5 rounded-xl border border-[#EAEAEA] text-[#717171] hover:text-[#090E23] hover:bg-slate-50 transition-colors"
                      title="Previous Week"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={onNextWeek}
                      className="p-1.5 rounded-xl border border-[#EAEAEA] text-[#717171] hover:text-[#090E23] hover:bg-slate-50 transition-colors"
                      title="Next Week"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-3">
                  {weekDays.map((day) => {
                    const isSelected = isSameDay(day, selectedDate);
                    const dayTasksCount = weekTasks.filter((t) => {
                      const d = t.dateTime ? new Date(t.dateTime) : new Date();
                      return isSameDay(d, day);
                    }).length;

                    return (
                      <button
                        key={day.toISOString()}
                        onClick={() => onSelectDate(day)}
                        className={`py-3 px-2 rounded-2xl flex flex-col items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-[#4566EC] text-white shadow-md shadow-[#4566EC]/30'
                            : 'bg-[#FDFDFF] border border-[#EAEAEA] text-[#717171] hover:border-[#4566EC]/40'
                        }`}
                      >
                        <span className={`text-[11px] uppercase tracking-wider ${isSelected ? 'text-white/80' : 'text-[#A0A3BD]'}`}>
                          {format(day, 'EEE')}
                        </span>
                        <span className={`text-[18px] font-bold mt-0.5 ${isSelected ? 'text-white' : 'text-[#090E23]'}`}>
                          {format(day, 'dd')}
                        </span>
                        <span className={`text-[10px] mt-1 px-2 py-0.2 rounded-full ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#717171]'
                        }`}>
                          {dayTasksCount} {dayTasksCount === 1 ? 'task' : 'tasks'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tasks List */}
              <div className="bg-white rounded-2xl border border-[#EAEAEA] shadow-xs p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#EAEAEA]">
                  <div>
                    <h3 className="text-[17px] font-bold text-[#090E23]">
                      {viewAll ? 'All Tasks for This Week' : `Tasks for ${format(selectedDate, 'EEEE, MMMM dd')}`}
                    </h3>
                    <p className="text-[12px] text-[#717171]">
                      {displayedTasks.length} {displayedTasks.length === 1 ? 'task' : 'tasks'} scheduled
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={onToggleViewAll}
                      className="px-3.5 py-1.5 rounded-xl border border-[#4566EC] text-[#4566EC] hover:bg-[#EFF2FF] text-xs font-semibold transition-colors"
                    >
                      {viewAll ? 'View Selected Day' : 'View Full Week'}
                    </button>
                    <button
                      onClick={onOpenCreateModal}
                      className="px-4 py-1.5 bg-[#4566EC] hover:bg-[#3B57DB] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>New Task</span>
                    </button>
                  </div>
                </div>

                {displayedTasks.length === 0 ? (
                  <div className="py-14 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-[#EFF2FF] text-[#4566EC] flex items-center justify-center mx-auto mb-3">
                      <ListTodo className="w-6 h-6" />
                    </div>
                    <h4 className="text-[15px] font-semibold text-[#090E23] mb-1">
                      No tasks scheduled for this {viewAll ? 'week' : 'day'}
                    </h4>
                    <p className="text-[12px] text-[#717171] max-w-sm mx-auto mb-4">
                      Create a task to keep track of your weekly milestones and deliverables.
                    </p>
                    <button
                      onClick={onOpenCreateModal}
                      className="px-4 py-2 bg-[#4566EC] text-white rounded-xl text-xs font-semibold shadow-sm hover:bg-[#3B57DB] transition-all"
                    >
                      Create Task Now
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {displayedTasks.map((task) => (
                      <FigmaTaskItem
                        key={task._id}
                        task={task}
                        onToggleStatus={onToggleStatus}
                        onEdit={onOpenEditModal}
                        onDelete={onDelete}
                      />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* ================= TAB 2: WEEKLY & MONTHLY CALENDAR ================= */}
          {activeTab === 'calendar' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-7 bg-white rounded-2xl border border-[#EAEAEA] p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-[#090E23]">
                    {format(selectedDate, 'MMMM yyyy')}
                  </h3>
                  <span className="text-xs font-semibold text-[#4566EC] bg-[#EFF2FF] px-3 py-1 rounded-full">
                    {tasks.length} Total Tasks
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-[#94A3B8] pb-2 border-b border-[#F0F0F0]">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {monthDays.map((day) => {
                    const isSelected = isSameDay(day, selectedDate);
                    const isCurrentMonth = day.getMonth() === selectedDate.getMonth();
                    const dayTasks = tasks.filter((t) => isSameDay(new Date(t.dateTime), day));

                    return (
                      <button
                        key={day.toISOString()}
                        onClick={() => onSelectDate(day)}
                        className={`h-16 rounded-xl p-1.5 flex flex-col justify-between transition-all border ${
                          isSelected
                            ? 'bg-[#4566EC] text-white border-[#4566EC] shadow-md shadow-[#4566EC]/30'
                            : isCurrentMonth
                            ? 'bg-white border-[#EAEAEA] text-[#090E23] hover:border-[#4566EC]/50'
                            : 'bg-slate-50 border-transparent text-[#C0C0C0]'
                        }`}
                      >
                        <span className={`text-xs font-bold ${isSelected ? 'text-white' : ''}`}>
                          {format(day, 'd')}
                        </span>
                        {dayTasks.length > 0 && (
                          <div className="flex items-center gap-1 justify-end">
                            <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-[#EFF2FF] text-[#4566EC]'
                            }`}>
                              {dayTasks.length}
                            </span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tasks Scheduled on Selected Date */}
              <div className="md:col-span-5 bg-white rounded-2xl border border-[#EAEAEA] p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#EAEAEA]">
                  <div>
                    <h4 className="text-base font-bold text-[#090E23]">
                      {format(selectedDate, 'EEEE, MMM d')}
                    </h4>
                    <p className="text-xs text-[#717171]">
                      {tasks.filter((t) => isSameDay(new Date(t.dateTime), selectedDate)).length} tasks scheduled
                    </p>
                  </div>
                  <button
                    onClick={onOpenCreateModal}
                    className="p-2 bg-[#4566EC] text-white rounded-xl hover:bg-[#3B57DB]"
                    title="Add task for this date"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1">
                  {tasks.filter((t) => isSameDay(new Date(t.dateTime), selectedDate)).length === 0 ? (
                    <div className="py-12 text-center text-xs text-[#717171]">
                      No tasks scheduled for this date.
                    </div>
                  ) : (
                    tasks
                      .filter((t) => isSameDay(new Date(t.dateTime), selectedDate))
                      .map((task) => (
                        <FigmaTaskItem
                          key={task._id}
                          task={task}
                          onToggleStatus={onToggleStatus}
                          onEdit={onOpenEditModal}
                          onDelete={onDelete}
                        />
                      ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 3: PRODUCTIVITY STATS ================= */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-[#4566EC] text-white rounded-2xl p-6 shadow-md shadow-[#4566EC]/25 flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-white/80 font-semibold uppercase tracking-wider">Overall Completion</span>
                    <h3 className="text-4xl font-black mt-2 mb-1">{overallPercent}%</h3>
                    <p className="text-xs text-white/90">{totalCompletedCount} of {totalTasksCount} tasks completed</p>
                  </div>
                  <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden mt-4">
                    <div className="h-full bg-white rounded-full" style={{ width: `${overallPercent}%` }} />
                  </div>
                </div>

                <div className="bg-[#EFF2FF] rounded-2xl p-6 border border-[#4566EC]/20 flex flex-col justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#99ADFF]/50 flex items-center justify-center text-[#4566EC]">
                      <CheckSquare className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <span className="text-xs text-[#717171] uppercase font-semibold">Completed</span>
                      <h4 className="text-2xl font-bold text-[#090E23]">{totalCompletedCount} Tasks</h4>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-600 font-semibold mt-4">Active Deliverables Finished</span>
                </div>

                <div className="bg-[#FFE6E7] rounded-2xl p-6 border border-[#FF464D]/20 flex flex-col justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FFB1B5]/50 flex items-center justify-center text-[#FF464D]">
                      <AlertCircle className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <span className="text-xs text-[#717171] uppercase font-semibold">Pending / In Progress</span>
                      <h4 className="text-2xl font-bold text-[#090E23]">{totalOpenCount} Tasks</h4>
                    </div>
                  </div>
                  <span className="text-xs text-rose-600 font-semibold mt-4">Pending Execution</span>
                </div>
              </div>

              {/* Priority Distribution Card */}
              <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-[#090E23]">Priority Distribution</h4>
                  <span className="text-xs text-[#717171]">Breakdown by urgency</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span className="text-[#FF464D]">High Priority</span>
                      <span>{highPriority} tasks</span>
                    </div>
                    <div className="w-full bg-[#FFE6E7] h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-[#FF464D]" style={{ width: `${totalTasksCount ? (highPriority / totalTasksCount) * 100 : 0}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span className="text-amber-600">Medium Priority</span>
                      <span>{medPriority} tasks</span>
                    </div>
                    <div className="w-full bg-amber-100 h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: `${totalTasksCount ? (medPriority / totalTasksCount) * 100 : 0}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span className="text-emerald-600">Low Priority</span>
                      <span>{lowPriority} tasks</span>
                    </div>
                    <div className="w-full bg-emerald-100 h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${totalTasksCount ? (lowPriority / totalTasksCount) * 100 : 0}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 4: SETTINGS ================= */}
          {(activeTab === 'settings' || activeTab === 'profile') && (
            <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6 shadow-xs space-y-6 max-w-2xl">
              <div className="flex items-center gap-4 pb-4 border-b border-[#F0F0F0]">
                <div className="w-16 h-16 rounded-2xl bg-[#EFF2FF] border-2 border-[#4566EC] flex items-center justify-center text-[#4566EC] text-2xl font-black">
                  AM
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#090E23]">Alex Morgan</h3>
                  <p className="text-xs text-[#717171]">alex.morgan@work.io</p>
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full mt-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Pro Workspace
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-[#090E23] uppercase tracking-wider">
                  App Configuration
                </h4>
                <button
                  onClick={onResetOnboarding}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-slate-50 border border-[#EAEAEA] text-xs font-medium text-[#090E23] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <RotateCcw className="w-4 h-4 text-[#4566EC]" />
                    <span>Replay Onboarding Screen Flow</span>
                  </div>
                  <span className="text-xs text-[#4566EC] font-semibold bg-[#EFF2FF] px-2.5 py-1 rounded-md">
                    Preview
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
