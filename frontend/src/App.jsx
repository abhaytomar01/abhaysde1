import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { OnboardingScreen } from './components/OnboardingScreen';
import { HomeHeader } from './components/HomeHeader';
import { WeeklyCalendarStrip } from './components/WeeklyCalendarStrip';
import { ReminderMetricCards } from './components/ReminderMetricCards';
import { FigmaTaskItem } from './components/FigmaTaskItem';
import { FigmaNewTaskModal } from './components/FigmaNewTaskModal';
import { FigmaSearchView } from './components/FigmaSearchView';
import { BottomNavBar } from './components/BottomNavBar';
import { DesktopDashboard } from './components/DesktopDashboard';
import { CalendarTabView } from './components/CalendarTabView';
import { StatsTabView } from './components/StatsTabView';
import { ProfileTabView } from './components/ProfileTabView';
import { getMondayOfWeek } from './utils/dateUtils';
import * as api from './services/api';
import { isSameDay, startOfWeek, endOfWeek, subWeeks, addWeeks, format } from 'date-fns';
import { Loader2, Plus, Smartphone, Monitor } from 'lucide-react';

export default function App() {
  const [hasOnboarded, setHasOnboarded] = useState(() => {
    return localStorage.getItem('taskflow_onboarded') === 'true';
  });

  // UI Mode: 'auto' (responsive), 'desktop', or 'mobile-frame'
  const [viewMode, setViewMode] = useState('auto');
  
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Selected date and week state (Monday to Sunday)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeekMonday, setCurrentWeekMonday] = useState(() => getMondayOfWeek(new Date()));
  const [viewAll, setViewAll] = useState(false);

  // Search, Modal, and Active Tab states
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [activeTab, setActiveTab] = useState('home');

  // Fetch tasks from API
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.fetchTasks();
      setTasks(res.data || []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Filter tasks for the selected week (Monday to Sunday)
  const weekStart = startOfWeek(currentWeekMonday, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentWeekMonday, { weekStartsOn: 1 });

  const weekTasks = useMemo(() => {
    return tasks.filter((t) => {
      const d = t.dateTime ? new Date(t.dateTime) : new Date();
      return d >= weekStart && d <= weekEnd;
    });
  }, [tasks, weekStart, weekEnd]);

  // Counts for the week
  const completedCount = weekTasks.filter((t) => t.status === 'Completed').length;
  const openCount = weekTasks.length - completedCount;

  // Tasks to display in list (either selected day or all week tasks)
  const displayedTasks = useMemo(() => {
    if (viewAll) return weekTasks;
    return weekTasks.filter((t) => {
      const d = t.dateTime ? new Date(t.dateTime) : new Date();
      return isSameDay(d, selectedDate);
    });
  }, [weekTasks, selectedDate, viewAll]);

  // Search results across all tasks
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return tasks;
    const q = searchQuery.toLowerCase().trim();
    return tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        (t.description && t.description.toLowerCase().includes(q))
    );
  }, [tasks, searchQuery]);

  // Handlers
  const handleGetStarted = () => {
    setHasOnboarded(true);
    localStorage.setItem('taskflow_onboarded', 'true');
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setViewAll(false);
  };

  const handlePrevWeek = () => {
    const newMonday = subWeeks(currentWeekMonday, 1);
    setCurrentWeekMonday(newMonday);
    setSelectedDate(newMonday);
  };

  const handleNextWeek = () => {
    const newMonday = addWeeks(currentWeekMonday, 1);
    setCurrentWeekMonday(newMonday);
    setSelectedDate(newMonday);
  };

  const handleCreateOrUpdate = async (taskData) => {
    try {
      if (taskData._id) {
        const res = await api.updateTask(taskData._id, taskData);
        setTasks((prev) => prev.map((t) => (t._id === taskData._id ? res.data : t)));
      } else {
        const res = await api.createTask(taskData);
        setTasks((prev) => [...prev, res.data]);
      }
    } catch (err) {
      console.error('Error saving task:', err);
      alert('Failed to save task.');
    }
  };

  const handleToggleStatus = async (id) => {
    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) =>
        t._id === id
          ? { ...t, status: t.status === 'Completed' ? 'In Progress' : 'Completed' }
          : t
      )
    );

    try {
      await api.toggleTaskStatus(id);
    } catch (err) {
      console.error('Error toggling status:', err);
      loadTasks();
    }
  };

  const handleDelete = async (id) => {
    setTasks((prev) => prev.filter((t) => t._id !== id));
    try {
      await api.deleteTask(id);
    } catch (err) {
      console.error('Error deleting task:', err);
      loadTasks();
    }
  };

  const handleOpenCreateModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  // 1. Show Onboarding Screen if not yet completed
  if (!hasOnboarded) {
    return (
      <div className="min-h-screen bg-[#4566EC] flex items-center justify-center p-0 sm:p-4 font-['Poppins']">
        <div className="w-full max-w-md min-h-screen sm:min-h-[844px] bg-white sm:rounded-[36px] overflow-hidden shadow-2xl relative">
          <OnboardingScreen onGetStarted={handleGetStarted} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EEF2F9] font-['Poppins'] text-[#090E23]">
      {/* Top Floating View Mode Switcher for Desktop */}
      <div className="hidden lg:flex fixed top-4 right-6 z-50 bg-white/90 backdrop-blur-md border border-[#EAEAEA] p-1.5 rounded-2xl shadow-lg items-center gap-1">
        <button
          onClick={() => setViewMode('desktop')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            viewMode === 'desktop' || viewMode === 'auto'
              ? 'bg-[#4566EC] text-white shadow-sm'
              : 'text-[#717171] hover:text-[#090E23] hover:bg-slate-100'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Desktop View</span>
        </button>
        <button
          onClick={() => setViewMode('mobile-frame')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            viewMode === 'mobile-frame'
              ? 'bg-[#4566EC] text-white shadow-sm'
              : 'text-[#717171] hover:text-[#090E23] hover:bg-slate-100'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile View</span>
        </button>
      </div>

      {/* RENDER DESKTOP DASHBOARD (Default on large screens unless mobile frame chosen) */}
      {(viewMode === 'desktop' || viewMode === 'auto') && (
        <div className="hidden lg:block">
          <DesktopDashboard
            tasks={tasks}
            weekTasks={weekTasks}
            displayedTasks={displayedTasks}
            selectedDate={selectedDate}
            currentWeekMonday={currentWeekMonday}
            completedCount={completedCount}
            openCount={openCount}
            viewAll={viewAll}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onSelectDate={handleSelectDate}
            onPrevWeek={handlePrevWeek}
            onNextWeek={handleNextWeek}
            onToggleViewAll={() => setViewAll(!viewAll)}
            onOpenCreateModal={handleOpenCreateModal}
            onOpenEditModal={handleOpenEditModal}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDelete}
            onOpenSearch={() => setIsSearching(true)}
            onSwitchToMobileFrame={() => setViewMode('mobile-frame')}
            onResetOnboarding={() => setHasOnboarded(false)}
          />
        </div>
      )}

      {/* RENDER 1:1 FIGMA MOBILE UI (On mobile viewports, or when mobile frame mode is selected) */}
      <div className={`flex items-center justify-center p-0 sm:p-4 min-h-screen ${
        viewMode === 'mobile-frame' ? 'block' : 'lg:hidden'
      }`}>
        <div className="w-full max-w-md min-h-screen sm:min-h-[844px] bg-[#FDFDFF] sm:rounded-[36px] shadow-2xl overflow-hidden relative flex flex-col pb-24 border border-slate-200/60">
          
          {/* Top Search Header */}
          <HomeHeader
            onOpenSearch={() => setIsSearching(true)}
          />

          {/* TAB 1: HOME SCREEN (Default Figma Screen 2) */}
          {activeTab === 'home' && (
            <>
              {/* Weekly Calendar Strip (Monday to Sunday) */}
              <WeeklyCalendarStrip
                selectedDate={selectedDate}
                onSelectDate={handleSelectDate}
                currentWeekMonday={currentWeekMonday}
                onPrevWeek={handlePrevWeek}
                onNextWeek={handleNextWeek}
              />

              {/* Metric Reminder Cards */}
              <ReminderMetricCards
                completedCount={completedCount}
                openCount={openCount}
              />

              {/* Tasks Section (Figma Tasks Today & View All) */}
              <main className="w-full px-6 flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[18px] font-semibold text-[#090E23]">
                    {viewAll ? "This Week's Tasks" : "Tasks Today"}
                  </h3>
                  <button
                    onClick={() => setViewAll(!viewAll)}
                    className="text-[14px] font-medium text-[#4566EC] hover:underline"
                  >
                    {viewAll ? 'Tasks Today' : 'View All'}
                  </button>
                </div>

                {/* Loading Indicator */}
                {loading && (
                  <div className="py-10 flex flex-col items-center justify-center text-[#717171] gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-[#4566EC]" />
                    <span className="text-xs">Loading tasks...</span>
                  </div>
                )}

                {/* Tasks List */}
                {!loading && (
                  <div>
                    {displayedTasks.length === 0 ? (
                      <div className="py-12 text-center">
                        <p className="text-[14px] font-medium text-[#090E23] mb-1">
                          No tasks for today
                        </p>
                        <p className="text-[12px] text-[#717171]">
                          Tap the + button below to add a new task.
                        </p>
                      </div>
                    ) : (
                      displayedTasks.map((task) => (
                        <FigmaTaskItem
                          key={task._id}
                          task={task}
                          onToggleStatus={handleToggleStatus}
                          onEdit={handleOpenEditModal}
                          onDelete={handleDelete}
                        />
                      ))
                    )}
                  </div>
                )}
              </main>
            </>
          )}

          {/* TAB 2: CALENDAR VIEW */}
          {activeTab === 'calendar' && (
            <CalendarTabView
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
              tasks={tasks}
              onToggleStatus={handleToggleStatus}
              onEdit={handleOpenEditModal}
              onDelete={handleDelete}
            />
          )}

          {/* TAB 3: STATS VIEW */}
          {activeTab === 'stats' && (
            <StatsTabView tasks={tasks} />
          )}

          {/* TAB 4: PROFILE VIEW */}
          {activeTab === 'profile' && (
            <ProfileTabView
              onResetOnboarding={() => setHasOnboarded(false)}
              tasksCount={tasks.length}
            />
          )}

          {/* Bottom Navigation Bar */}
          <BottomNavBar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onOpenNewTask={handleOpenCreateModal}
          />
        </div>
      </div>

      {/* Search Modal View (Figma Frame 9) */}
      <AnimatePresence>
        {isSearching && (
          <FigmaSearchView
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            tasks={searchResults}
            onClose={() => {
              setIsSearching(false);
              setSearchQuery('');
            }}
            onToggleStatus={handleToggleStatus}
            onEdit={handleOpenEditModal}
            onDelete={handleDelete}
          />
        )}
      </AnimatePresence>

      {/* New / Edit Task Modal (Figma New Task Bottom Sheet) */}
      <FigmaNewTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateOrUpdate}
        taskToEdit={taskToEdit}
      />
    </div>
  );
}
