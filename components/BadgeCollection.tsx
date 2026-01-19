import React from 'react';
import { Badge } from '../types';
import { Award, Lock, Sun, Book, Zap, Calendar, Crown, Globe } from 'lucide-react';

interface BadgeCollectionProps {
  badges: Badge[];
  onClose: () => void;
}

// Helper to map string icon names to Lucide components
const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Sun': return Sun;
    case 'Book': return Book;
    case 'Zap': return Zap;
    case 'Calendar': return Calendar;
    case 'Crown': return Crown;
    case 'Globe': return Globe;
    default: return Award;
  }
};

const BadgeCollection: React.FC<BadgeCollectionProps> = ({ badges, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-3xl rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-slide-up">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-gray-700 mb-1">Your Trophy Case</h2>
            <p className="text-gray-400 font-bold">Collect them all!</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 max-h-[60vh] overflow-y-auto pr-2 pb-4 scrollbar-thin">
          {badges.map((badge) => {
            const IconComponent = getIcon(badge.icon);
            return (
              <div 
                key={badge.id}
                className={`badge-icon-wrapper group relative flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300 ${
                  badge.unlocked 
                    ? 'bg-yellow-50 border-brand-yellow hover:-translate-y-1 hover:shadow-lg' 
                    : 'bg-gray-50 border-gray-200 opacity-60 grayscale'
                }`}
              >
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-3 shadow-inner ${
                   badge.unlocked ? 'bg-gradient-to-br from-yellow-300 to-brand-orange' : 'bg-gray-200'
                }`}>
                  {badge.unlocked ? (
                    <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-md" strokeWidth={2.5} />
                  ) : (
                    <Lock className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                
                <h3 className={`font-black text-center text-sm mb-1 ${badge.unlocked ? 'text-gray-700' : 'text-gray-400'}`}>
                  {badge.name}
                </h3>
                
                {/* Tooltip on Hover */}
                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bottom-full mb-2 bg-gray-800 text-white text-xs p-2 rounded-xl text-center w-full max-w-[150px] shadow-xl pointer-events-none z-10">
                   {badge.description}
                   <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-800"></div>
                </div>

                {badge.unlocked && badge.dateUnlocked && (
                  <span className="text-[10px] font-bold text-brand-orange uppercase bg-yellow-100 px-2 py-0.5 rounded-full">
                    Earned
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BadgeCollection;