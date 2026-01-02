
export enum Screen {
  Welcome = 'WELCOME',
  Login = 'LOGIN',
  Dashboard = 'DASHBOARD',
  ModuleLessons = 'MODULE_LESSONS',
  LessonObserve = 'LESSON_OBSERVE',
  LessonConceptualize = 'LESSON_CONCEPTUALIZE',
  LessonAnalyze = 'LESSON_ANALYZE',
  LessonRelate = 'LESSON_RELATE',
  LessonClassify = 'LESSON_CLASSIFY',
  LessonChallenge = 'LESSON_CHALLENGE',
  LessonJustifyExample = 'LESSON_JUSTIFY_EXAMPLE',
  LessonJustify = 'LESSON_JUSTIFY',
  LessonChallengeFinal = 'LESSON_CHALLENGE_FINAL',
  LessonSummary = 'LESSON_SUMMARY',
  Lesson2Observe = 'LESSON2_OBSERVE',
  Quiz = 'QUIZ',
  Results = 'RESULTS',
  Profile = 'PROFILE',
  Progress = 'PROGRESS'
}

export interface UserProgress {
  xp: number;
  gems: number;
  streak: number;
  level: number;
  completedModules: string[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  progress: number;
  locked: boolean;
  image: string;
  levelRequired?: number;
}
