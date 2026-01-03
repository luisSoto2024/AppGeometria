
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
import Lesson2Conceptualize from './screens/Lesson2Conceptualize';
import Quiz from './screens/Quiz';
import Results from './screens/Results';
import Profile from './screens/Profile';
import ProgressScreen from './screens/Progress';
import RankingScreen from './screens/Ranking';
import ChatBot from './components/ChatBot';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Welcome);
  const [user, setUser] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('gmath_user');
    return saved ? JSON.parse(saved) : {
      name: 'Invitado',
      email: '',
      xp: 0,
      gems: 0,
      streak: 1,
      level: 1,
      completedModules: []
    };
  });

  useEffect(() => {
    localStorage.setItem('gmath_user', JSON.stringify(user));
  }, [user]);

  const addXP = (amount: number) => {
    setUser(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.max(prev.level, Math.floor(newXP / 100) + 1); 
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

  const handleLogin = (name: string, email: string) => {
    setUser(prev => ({ ...prev, name, email }));
    navigate(Screen.Dashboard);
  };

  const updateUserName = (newName: string) => {
    setUser(prev => ({ ...prev, name: newName }));
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
        return <Login onBack={() => navigate(Screen.Welcome)} onLogin={handleLogin} />;
      case Screen.Dashboard: 
        return <Dashboard user={user} navigate={navigate} />;
      case Screen.Ranking:
        return <RankingScreen user={user} navigate={navigate} />;
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
      
      // Module 2 Screens
      case Screen.Lesson2Observe:
        return <Lesson2Observe user={user} onBack={() => navigate(Screen.ModuleLessons)} onNext={() => navigate(Screen.Lesson2Conceptualize)} />;
      case Screen.Lesson2Conceptualize:
        return <Lesson2Conceptualize onBack={() => navigate(Screen.Lesson2Observe)} onNext={() => { addXP(50); navigate(Screen.ModuleLessons); }} />;
      
      case Screen.Quiz: 
        return <Quiz user={user} onFinish={(score: number) => { 
          addXP(score * 20); 
          addGems(score * 5);
          navigate(Screen.Results); 
        }} />;
      case Screen.Results: 
        return <Results user={user} onContinue={() => { completeLesson('lesson1'); navigate(Screen.ModuleLessons); }} />;
      case Screen.Profile: 
        return <Profile 
          user={user} 
          navigate={navigate} 
          onUpdateName={updateUserName}
          onLogout={() => {
            localStorage.removeItem('gmath_user');
            setUser({ name: 'Invitado', email: '', xp: 0, gems: 0, streak: 1, level: 1, completedModules: [] });
            navigate(Screen.Welcome);
          }} 
        />;
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
      {currentScreen !== Screen.Welcome && currentScreen !== Screen.Login && currentScreen !== Screen.Ranking && (
        <ChatBot />
      )}
    </div>
  );
};

export default App;
