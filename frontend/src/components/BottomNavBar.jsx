import React from 'react';
import { Home, Calendar, PieChart, User, Plus } from 'lucide-react';

export const BottomNavBar = ({ activeTab, onTabChange, onOpenNewTask }) => {
  return (
    <div className="sticky bottom-0 left-0 right-0 w-full h-[85px] pointer-events-none z-30 font-['Poppins']">
      {/* Figma Rectangle 7 (70px white background bar) */}
      <div className="absolute bottom-0 left-0 right-0 h-[70px] bg-white border-t border-[#F0F0F0] pointer-events-auto flex items-center px-6">
        {/* Icons Grid with exact spacing */}
        <div className="flex items-center justify-between w-[240px]">
          {/* Home */}
          <button
            onClick={() => onTabChange('home')}
            className={`w-6 h-6 flex items-center justify-center transition-colors ${
              activeTab === 'home' ? 'text-[#4566EC]' : 'text-[#C0C0C0] hover:text-[#090E23]'
            }`}
            title="Home"
          >
            <Home className="w-[20px] h-[20px] stroke-[2.2]" />
          </button>

          {/* Calendar */}
          <button
            onClick={() => onTabChange('calendar')}
            className={`w-6 h-6 flex items-center justify-center transition-colors ${
              activeTab === 'calendar' ? 'text-[#4566EC]' : 'text-[#C0C0C0] hover:text-[#090E23]'
            }`}
            title="Calendar"
          >
            <Calendar className="w-[20px] h-[20px] stroke-[2]" />
          </button>

          {/* Statistic */}
          <button
            onClick={() => onTabChange('stats')}
            className={`w-6 h-6 flex items-center justify-center transition-colors ${
              activeTab === 'stats' ? 'text-[#4566EC]' : 'text-[#C0C0C0] hover:text-[#090E23]'
            }`}
            title="Statistics"
          >
            <PieChart className="w-[20px] h-[20px] stroke-[2]" />
          </button>

          {/* Profile */}
          <button
            onClick={() => onTabChange('profile')}
            className={`w-6 h-6 flex items-center justify-center transition-colors ${
              activeTab === 'profile' ? 'text-[#4566EC]' : 'text-[#C0C0C0] hover:text-[#090E23]'
            }`}
            title="Profile"
          >
            <User className="w-[20px] h-[20px] stroke-[2]" />
          </button>
        </div>
      </div>

      {/* Figma Ellipse 1 Floating Plus Button on Right */}
      <button
        onClick={onOpenNewTask}
        className="absolute bottom-[20px] right-6 w-[56px] h-[56px] bg-[#4566EC] hover:bg-[#3B57DB] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#4566EC]/40 pointer-events-auto active:scale-95 transition-all"
        title="Add New Task"
      >
        <Plus className="w-6 h-6 stroke-[3]" />
      </button>
    </div>
  );
};
