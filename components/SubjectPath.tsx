import React, { useRef, useEffect, useState } from 'react';
import { Lesson } from '../types';
import { Star, Trophy, BookOpen, Gamepad2, Lock, Check } from 'lucide-react';

interface SubjectPathProps {
  lessons: Lesson[];
  onLessonSelect: (lessonId: string) => void;
}

const SubjectPath: React.FC<SubjectPathProps> = ({ lessons, onLessonSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (containerRef.current) setWidth(containerRef.current.offsetWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Constants for geometry
  const NODE_HEIGHT = 120; // Vertical space between nodes
  const AMPLITUDE = 80; // How wide the sine wave goes (left/right wiggles)
  const START_OFFSET_Y = 60; 
  
  // Generate SVG Path data
  const generatePathData = () => {
    if (lessons.length === 0) return '';
    
    let d = `M ${width/2} ${START_OFFSET_Y}`; // Start top center
    
    lessons.forEach((_, i) => {
      if (i === lessons.length - 1) return;
      
      const currentY = START_OFFSET_Y + (i * NODE_HEIGHT);
      const nextY = START_OFFSET_Y + ((i + 1) * NODE_HEIGHT);
      
      const currentX = (width / 2) + Math.sin(i) * AMPLITUDE;
      const nextX = (width / 2) + Math.sin(i + 1) * AMPLITUDE;

      // Bezier curve control points
      const cp1x = currentX;
      const cp1y = currentY + (NODE_HEIGHT / 2);
      const cp2x = nextX;
      const cp2y = nextY - (NODE_HEIGHT / 2);

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${nextX} ${nextY}`;
    });

    return d;
  };

  const getIcon = (type: Lesson['type']) => {
    switch (type) {
      case 'trophy': return Trophy;
      case 'book': return BookOpen;
      case 'game': return Gamepad2;
      default: return Star;
    }
  };

  const getColor = (status: Lesson['status'], type: Lesson['type']) => {
    if (status === 'locked') return 'bg-gray-200 border-gray-300 text-gray-400 shadow-[0_4px_0_#d1d5db]';
    if (status === 'completed') return 'bg-brand-yellow border-yellow-500 text-white shadow-[0_4px_0_#eab308]';
    
    // Active Colors
    switch (type) {
      case 'trophy': return 'bg-brand-purple border-purple-600 text-white shadow-[0_4px_0_#9333ea]';
      case 'book': return 'bg-brand-blue border-blue-600 text-white shadow-[0_4px_0_#2563eb]';
      case 'game': return 'bg-brand-red border-red-600 text-white shadow-[0_4px_0_#dc2626]';
      default: return 'bg-brand-green border-green-600 text-white shadow-[0_4px_0_#16a34a]';
    }
  };

  return (
    <div className="flex justify-center w-full min-h-screen py-10 bg-[#f0fdf4]">
      <div 
        ref={containerRef} 
        className="relative w-full max-w-[400px] px-4"
        style={{ height: `${lessons.length * NODE_HEIGHT + 200}px` }}
      >
        {/* The Connection Line */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
          <path 
            d={generatePathData()} 
            fill="none" 
            stroke="#e5e7eb" 
            strokeWidth="12" 
            strokeLinecap="round" 
            className="drop-shadow-sm"
          />
          {/* Dashed overlay for style */}
          <path 
            d={generatePathData()} 
            fill="none" 
            stroke="#d1d5db" 
            strokeWidth="4" 
            strokeDasharray="10 10" 
            strokeLinecap="round" 
            className="opacity-50"
          />
        </svg>

        {/* The Nodes */}
        {lessons.map((lesson, i) => {
          const top = START_OFFSET_Y + (i * NODE_HEIGHT);
          const left = (width / 2) + Math.sin(i) * AMPLITUDE;
          const Icon = getIcon(lesson.type);
          const buttonClass = getColor(lesson.status, lesson.type);
          const isLocked = lesson.status === 'locked';
          const isActive = lesson.status === 'active';

          // Center the button on the calculated point
          const style = {
            top: `${top}px`,
            left: `${left}px`,
            transform: 'translate(-50%, -50%)'
          };

          return (
            <div 
              key={lesson.id} 
              className={`absolute lesson-node z-10 flex flex-col items-center group ${isActive ? 'animate-float' : ''}`}
              style={style}
            >
              {/* Floating Star Ratings for completed lessons */}
              {lesson.status === 'completed' && (
                <div className="absolute -top-8 flex gap-1 transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-110">
                  {[1, 2, 3].map(s => (
                    <Star key={s} size={14} className="fill-brand-yellow text-brand-yellow drop-shadow-sm" />
                  ))}
                </div>
              )}

              {/* Start text for active lesson */}
              {isActive && (
                <div className="absolute -top-14 bg-white text-brand-green font-bold px-3 py-1 rounded-xl shadow-card border-2 border-brand-green animate-bounce text-sm whitespace-nowrap z-20">
                  START
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-brand-green"></div>
                </div>
              )}

              <button
                onClick={() => !isLocked && onLessonSelect(lesson.id)}
                disabled={isLocked}
                className={`
                  w-20 h-20 rounded-[2rem] border-b-4 flex items-center justify-center 
                  transition-all duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)
                  ${buttonClass}
                  ${isLocked 
                    ? 'cursor-not-allowed opacity-80' 
                    : 'cursor-pointer hover:-translate-y-2 hover:scale-110 hover:brightness-110 active:scale-90 active:translate-y-1 active:shadow-none'
                  }
                `}
              >
                {isLocked ? (
                  <Lock size={28} className="opacity-40" />
                ) : lesson.status === 'completed' ? (
                  <Check size={36} strokeWidth={4} className="animate-pulse" />
                ) : (
                  <Icon size={32} strokeWidth={2.5} className={isActive ? 'animate-wiggle' : ''} />
                )}
                
                {/* Shine effect overlay for unlocked nodes */}
                {!isLocked && (
                  <div className="absolute inset-0 rounded-[2rem] bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                )}
              </button>
            </div>
          );
        })}
        
        {/* End of Path Decoration */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 z-0"
          style={{ top: `${(lessons.length) * NODE_HEIGHT + 40}px` }}
        >
          <img 
            src="https://cdn-icons-png.flaticon.com/512/616/616490.png" 
            alt="Castle" 
            className="w-32 h-32 opacity-80 grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110 cursor-pointer hover:rotate-3" 
          />
        </div>
      </div>
    </div>
  );
};

export default SubjectPath;