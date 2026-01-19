export interface Lesson {
  id: string;
  title: string;
  type: 'star' | 'trophy' | 'book' | 'game';
  status: 'locked' | 'active' | 'completed';
  position: { x: number; y: number }; // Percentage coordinates for the path
  stars: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  dateUnlocked?: string;
}

export interface User {
  name: string;
  avatarUrl: string;
  level: number;
  xp: number;
  streak: number;
  totalCrowns: number;
}

export interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    icon?: string;
  }[];
  correctOptionId: string;
  explanation: string;
}

export interface Quiz {
  lessonId: string;
  title: string;
  questions: Question[];
}