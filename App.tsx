import React, { useState } from 'react';
import { INITIAL_USER, LESSONS, BADGES, MOCK_QUIZ } from './constants';
import { User, Lesson } from './types';
import AvatarProfile from './components/AvatarProfile';
import SubjectPath from './components/SubjectPath';
import BadgeCollection from './components/BadgeCollection';
import QuizInterface from './components/QuizInterface';
import { Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [activeView, setActiveView] = useState<'map' | 'quiz' | 'badges'>('map');
  const [showBadges, setShowBadges] = useState(false);
  const [lessons, setLessons] = useState<Lesson[]>(LESSONS);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  // Handle lesson click
  const handleLessonSelect = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setActiveView('quiz');
  };

  // Handle quiz completion
  const handleQuizComplete = (score: number) => {
    // Simple mock logic for progression
    if (score >= 2) { // Pass threshold
      // Unlock next lesson logic would go here
      const updatedLessons = lessons.map(l => {
        if (l.id === activeLessonId) return { ...l, status: 'completed', stars: 3 };
        // Super simple: unlock next one hardcoded
        if (l.id === 'lesson-6' && activeLessonId === 'lesson-5') return { ...l, status: 'active' };
        return l;
      });
      // @ts-ignore
      setLessons(updatedLessons);
      
      // Update User
      setUser(prev => ({
        ...prev,
        xp: prev.xp + (score * 10),
        totalCrowns: prev.totalCrowns + 1
      }));
    }
    setActiveView('map');
    setActiveLessonId(null);
  };

  return (
    <div className="min-h-screen bg-[#f0fdf4] text-gray-800 font-sans selection:bg-brand-green selection:text-white">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-20 left-10 text-brand-blue animate-pulse"><Sparkles size={40} /></div>
        <div className="absolute bottom-40 right-10 text-brand-yellow animate-bounce"><Sparkles size={32} /></div>
        <div className="absolute top-1/2 left-20 text-brand-purple opacity-50"><Sparkles size={24} /></div>
      </div>

      {activeView === 'map' && (
        <>
          <AvatarProfile 
            user={user} 
            onAvatarClick={() => setShowBadges(true)} 
          />
          
          <main className="pb-20">
            <SubjectPath 
              lessons={lessons} 
              onLessonSelect={handleLessonSelect} 
            />
          </main>
          
          {/* Bottom Nav / Floating Action Button for Badges on mobile */}
          <div className="fixed bottom-6 right-6 z-40 sm:hidden">
             <button 
               onClick={() => setShowBadges(true)}
               className="bg-white p-3 rounded-2xl shadow-xl border-2 border-gray-100 text-brand-orange"
             >
               <img src="https://cdn-icons-png.flaticon.com/512/2909/2909808.png" className="w-8 h-8" alt="Badges"/>
             </button>
          </div>
        </>
      )}

      {/* Quiz Modal Overlay */}
      {activeView === 'quiz' && (
        <QuizInterface 
          quiz={MOCK_QUIZ} 
          onComplete={handleQuizComplete}
          onExit={() => setActiveView('map')}
        />
      )}

      {/* Badges Modal */}
      {showBadges && (
        <BadgeCollection 
          badges={BADGES} 
          onClose={() => setShowBadges(false)} 
        />
      )}
    </div>
  );
};

export default App;