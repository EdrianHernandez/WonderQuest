import React from 'react';
import { Flame, Crown, Hexagon } from 'lucide-react';

const AvatarProfile = ({ user, onAvatarClick }) => {
  return (
    <div className="avatar-frame sticky top-4 z-40 mx-4 mb-6">
      <div className="bg-white rounded-2xl p-3 shadow-card border-2 border-gray-100 flex items-center justify-between max-w-2xl mx-auto backdrop-blur-sm bg-opacity-95">
        
        {/* Avatar & Level */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={onAvatarClick}
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-brand-purple bg-brand-purple/10">
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-brand-blue text-white text-xs font-black px-1.5 py-0.5 rounded-md border-2 border-white shadow-sm">
              Lvl {user.level}
            </div>
          </div>
          
          <div className="hidden sm:block">
            <h2 className="font-extrabold text-gray-700 text-lg leading-tight">{user.name}</h2>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">Learner</div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Streak */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-gray-50 transition-colors cursor-help group relative">
            <Flame className="w-5 h-5 text-brand-orange fill-brand-orange" />
            <span className="font-bold text-brand-orange/90">{user.streak}</span>
             <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Day Streak
            </div>
          </div>

          {/* Crowns */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-gray-50 transition-colors cursor-help group relative">
            <Crown className="w-5 h-5 text-brand-yellow fill-brand-yellow" />
            <span className="font-bold text-brand-yellow/90">{user.totalCrowns}</span>
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Total Crowns
            </div>
          </div>

           {/* XP Hexagon */}
           <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-gray-50 transition-colors cursor-help group relative">
            <Hexagon className="w-5 h-5 text-brand-blue fill-brand-blue" />
            <span className="font-bold text-brand-blue/90">{user.xp} XP</span>
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Total XP
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AvatarProfile;
