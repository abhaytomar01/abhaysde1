import React from 'react';
import { User, Sparkles, RotateCcw, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ProfileTabView = ({ onResetOnboarding, tasksCount }) => {
  return (
    <div className="w-full px-6 py-2 font-['Poppins'] space-y-5">
      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl border border-[#EAEAEA] p-5 flex items-center gap-4 shadow-xs">
        <div className="w-14 h-14 rounded-full bg-[#EFF2FF] border-2 border-[#4566EC] flex items-center justify-center text-[#4566EC] text-xl font-bold">
          AM
        </div>
        <div>
          <h3 className="text-base font-bold text-[#090E23]">Alex Morgan</h3>
          <p className="text-xs text-[#717171]">alex.morgan@work.io</p>
          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
            <ShieldCheck className="w-3 h-3" /> Pro Member
          </span>
        </div>
      </div>

      {/* Account Settings / Actions */}
      <div className="bg-white rounded-2xl border border-[#EAEAEA] p-4 space-y-3">
        <h4 className="text-xs font-semibold text-[#090E23] uppercase tracking-wider mb-2">
          App Settings
        </h4>

        {/* Replay Onboarding Flow Button */}
        <button
          onClick={onResetOnboarding}
          className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-[#EAEAEA] text-xs font-medium text-[#090E23] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <RotateCcw className="w-4 h-4 text-[#4566EC]" />
            <span>View Onboarding Screen Again</span>
          </div>
          <span className="text-[10px] text-[#4566EC] font-semibold bg-[#EFF2FF] px-2 py-0.5 rounded-md">
            Preview
          </span>
        </button>
      </div>
    </div>
  );
};
