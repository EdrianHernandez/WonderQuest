import { Badge, Lesson, Quiz, User } from './types';
import { Star, Trophy, BookOpen, Gamepad2, Zap, Brain, Rocket, Crown } from 'lucide-react';

export const INITIAL_USER: User = {
  name: "Alex",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4",
  level: 5,
  xp: 1250,
  streak: 12,
  totalCrowns: 45
};

// Generate a winding path of lessons
// We simulate a sine wave pattern for positions
export const LESSONS: Lesson[] = Array.from({ length: 12 }, (_, i) => {
  const isEven = i % 2 === 0;
  // This layout logic will be handled visually in the component, 
  // but we set initial statuses here.
  let status: Lesson['status'] = 'locked';
  if (i < 4) status = 'completed';
  if (i === 4) status = 'active';

  return {
    id: `lesson-${i + 1}`,
    title: `Level ${i + 1}`,
    type: (i + 1) % 5 === 0 ? 'trophy' : (i % 3 === 0 ? 'book' : 'star'),
    status,
    position: { x: 0, y: 0 }, // Will be calculated dynamically
    stars: status === 'completed' ? 3 : 0
  };
});

export const BADGES: Badge[] = [
  {
    id: 'b1',
    name: 'Early Bird',
    description: 'Completed 5 lessons before 8 AM',
    icon: 'Sun',
    unlocked: true,
    dateUnlocked: '2023-10-01'
  },
  {
    id: 'b2',
    name: 'Scholar',
    description: 'Scored 100% on 3 quizzes in a row',
    icon: 'Book',
    unlocked: true,
    dateUnlocked: '2023-10-05'
  },
  {
    id: 'b3',
    name: 'Speedster',
    description: 'Finished a quiz in under 30 seconds',
    icon: 'Zap',
    unlocked: false
  },
  {
    id: 'b4',
    name: 'Week Streak',
    description: 'Learned for 7 days in a row',
    icon: 'Calendar',
    unlocked: true,
    dateUnlocked: '2023-10-12'
  },
  {
    id: 'b5',
    name: 'Legend',
    description: 'Reach Level 10',
    icon: 'Crown',
    unlocked: false
  },
    {
    id: 'b6',
    name: 'Polyglot',
    description: 'Learn 50 new words',
    icon: 'Globe',
    unlocked: false
  }
];

export const MOCK_QUIZ: Quiz = {
  lessonId: 'lesson-5',
  title: 'Space Explorers',
  questions: [
    {
      id: 'q1',
      text: "Which planet is known as the 'Red Planet'?",
      options: [
        { id: 'opt1', text: 'Venus', icon: '🌑' },
        { id: 'opt2', text: 'Mars', icon: '🪐' },
        { id: 'opt3', text: 'Jupiter', icon: '🌕' },
        { id: 'opt4', text: 'Saturn', icon: '🌍' }
      ],
      correctOptionId: 'opt2',
      explanation: "Mars is called the Red Planet because of iron oxide (rust) on its surface."
    },
    {
      id: 'q2',
      text: "What do astronauts wear in space?",
      options: [
        { id: 'opt1', text: 'Swimsuit', icon: '🩳' },
        { id: 'opt2', text: 'Pajamas', icon: '🛌' },
        { id: 'opt3', text: 'Space Suit', icon: '🧑‍🚀' },
        { id: 'opt4', text: 'Tuxedo', icon: '🤵' }
      ],
      correctOptionId: 'opt3',
      explanation: "Space suits protect astronauts from the harsh environment of space!"
    },
    {
      id: 'q3',
      text: "Which is the closest star to Earth?",
      options: [
        { id: 'opt1', text: 'The Sun', icon: '☀️' },
        { id: 'opt2', text: 'Proxima Centauri', icon: '🌟' },
        { id: 'opt3', text: 'Sirius', icon: '⭐' },
        { id: 'opt4', text: 'Polaris', icon: '✨' }
      ],
      correctOptionId: 'opt1',
      explanation: "The Sun is the star at the center of our Solar System!"
    }
  ]
};