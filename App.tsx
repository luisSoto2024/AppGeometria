
import React, { useState, useEffect } from 'react';
import { Screen, UserProgress } from './types';
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import ModuleLessons from './screens/ModuleLessons';
import LessonObserve from './screens/LessonObserve';
import LessonConceptualize from './screens/LessonConceptualize';
import LessonRelate from './screens/LessonRelate';
import LessonClassify from './screens/LessonClassify';
import LessonChallenge from './screens/LessonChallenge';
import LessonJustifyExample from './screens/LessonJustifyExample';
import LessonAnalyze from './screens/LessonAnalyze';
import LessonJustify from './screens/LessonJustify';
import LessonChallengeFinal from './screens/LessonChallengeFinal';
import LessonSummary from './screens/LessonSummary';
import Lesson2Observe from './screens/Lesson2Observe';
import Quiz from './screens/Quiz';
import Results from './screens/Results';
import Profile from './screens/Profile';
import ProgressScreen from './screens/Progress';
import ChatBot from './components/ChatBot';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Welcome);
  const [user, setUser] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('gmath_user');
    return saved ? JSON.parse(saved) : {
      xp: 450,
      gems: 250,
      streak: 5,
      level: 4,
      completedModules: []
    };
  });

  // Persist state
  useEffect(() => {
    localStorage.setItem('gmath_user', JSON.stringify(user));
  }, [user]);

  const addXP = (amount: number) => {
    setUser(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 100); 
      return { ...prev, xp: newXP, level: newLevel };
    });
  };

  const addGems = (amount: number) => {
    setUser(prev => ({ ...prev, gems: prev.gems + amount }));
  };

  const completeLesson = (lessonId: string) => {
    setUser(prev => ({
      ...prev,
      completedModules: prev.completedModules.includes(lessonId) 
        ? prev.completedModules 
        : [...prev.completedModules, lessonId]
    }));
  };

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.Welcome: 
        return <Welcome onStart={() => navigate(Screen.Login)} onLogin={() => navigate(Screen.Login)} />;
      case Screen.Login: 
        return <Login onBack={() => navigate(Screen.Welcome)} onLogin={() => navigate(Screen.Dashboard)} />;
      case Screen.Dashboard: 
        return <Dashboard user={user} navigate={navigate} />;
      case Screen.ModuleLessons:
        return (
          <ModuleLessons 
            user={user} 
            onBack={() => navigate(Screen.Dashboard)} 
            onStartLesson={() => navigate(Screen.LessonObserve)} 
            onStartLesson2={() => navigate(Screen.Lesson2Observe)}
            navigate={navigate} 
          />
        );
      case Screen.LessonObserve: 
        return <LessonObserve user={user} onBack={() => navigate(Screen.ModuleLessons)} onNext={() => { addXP(10); navigate(Screen.LessonConceptualize); }} />;
      case Screen.LessonConceptualize:
        return <LessonConceptualize onBack={() => navigate(Screen.LessonObserve)} onNext={() => { addXP(10); navigate(Screen.LessonRelate); }} />;
      case Screen.LessonRelate:
        return <LessonRelate user={user} onBack={() => navigate(Screen.LessonConceptualize)} onNext={() => { addXP(30); navigate(Screen.LessonClassify); }} />;
      case Screen.LessonClassify:
        return <LessonClassify user={user} addXP={addXP} onBack={() => navigate(Screen.LessonRelate)} onNext={() => navigate(Screen.LessonChallenge)} />;
      case Screen.LessonChallenge:
        return <LessonChallenge user={user} addXP={addXP} onBack={() => navigate(Screen.LessonClassify)} onNext={() => navigate(Screen.LessonAnalyze)} />;
      case Screen.LessonAnalyze: 
        return <LessonAnalyze user={user} addXP={addXP} onBack={() => navigate(Screen.LessonChallenge)} onNext={() => { addXP(20); navigate(Screen.LessonJustifyExample); }} />;
      case Screen.LessonJustifyExample:
        return <LessonJustifyExample user={user} addXP={addXP} onBack={() => navigate(Screen.LessonAnalyze)} onNext={() => navigate(Screen.LessonJustify)} />;
      case Screen.LessonJustify: 
        return <LessonJustify user={user} addXP={addXP} onBack={() => navigate(Screen.LessonJustifyExample)} onNext={() => navigate(Screen.LessonChallengeFinal)} />;
      case Screen.LessonChallengeFinal:
        return <LessonChallengeFinal user={user} addXP={addXP} onBack={() => navigate(Screen.LessonJustify)} onNext={() => navigate(Screen.LessonSummary)} />;
      case Screen.LessonSummary:
        return <LessonSummary onNext={() => navigate(Screen.Results)} />;
      case Screen.Lesson2Observe:
        return <Lesson2Observe user={user} onBack={() => navigate(Screen.ModuleLessons)} onNext={() => navigate(Screen.ModuleLessons)} />;
      case Screen.Quiz: 
        return <Quiz user={user} onFinish={(score: number) => { 
          addXP(score * 20); 
          addGems(score * 5);
          navigate(Screen.Results); 
        }} />;
      case Screen.Results: 
        return <Results user={user} onContinue={() => { completeLesson('lesson1'); navigate(Screen.ModuleLessons); }} />;
      case Screen.Profile: 
        return <Profile user={user} navigate={navigate} />;
      case Screen.Progress: 
        return <ProgressScreen user={user} navigate={navigate} />;
      default: 
        return <Welcome onStart={() => navigate(Screen.Login)} onLogin={() => navigate(Screen.Login)} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        {renderScreen()}
      </div>
      {currentScreen !== Screen.Welcome && currentScreen !== Screen.Login && (
        <ChatBot />
      )}
    </div>
  );
};

export default App;
