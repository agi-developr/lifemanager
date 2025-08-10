import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatWindow from '../components/ChatWindow';

function ChatPage() {
  const { module } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const getModuleInfo = (moduleName) => {
    const moduleInfo = {
      passions: {
        title: 'Passion Discovery',
        description: "Let's explore what truly excites and motivates you",
        icon: '🔥',
        color: 'from-orange-500 to-red-500',
      },
      strengths: {
        title: 'Strength Identification',
        description: 'Discover your unique abilities and talents',
        icon: '💪',
        color: 'from-blue-500 to-purple-500',
      },
      upskill: {
        title: 'Skill Development',
        description: 'Learn new skills tailored to your interests',
        icon: '📚',
        color: 'from-green-500 to-teal-500',
      },
      money: {
        title: 'Financial Planning',
        description: 'Manage your money and build wealth',
        icon: '💰',
        color: 'from-yellow-500 to-orange-500',
      },
      career: {
        title: 'Career Planning',
        description: 'Plan your career path and achieve your goals',
        icon: '🚀',
        color: 'from-indigo-500 to-purple-500',
      },
      events: {
        title: 'Event Discovery',
        description: 'Find relevant events and networking opportunities',
        icon: '📅',
        color: 'from-pink-500 to-rose-500',
      },
      goals: {
        title: 'Goal Setting',
        description: 'Set and track your personal and professional goals',
        icon: '🎯',
        color: 'from-emerald-500 to-green-500',
      },
      community: {
        title: 'Community Connect',
        description: 'Connect with like-minded individuals',
        icon: '👥',
        color: 'from-cyan-500 to-blue-500',
      },
      business: {
        title: 'Business Builder',
        description: 'Ideate, validate, and launch your business',
        icon: '🏗️',
        color: 'from-amber-600 to-orange-600',
      },
      networking: {
        title: 'Networking Coach',
        description: 'Grow authentic relationships that help you thrive',
        icon: '🧩',
        color: 'from-sky-500 to-indigo-500',
      },
    };
    
    return moduleInfo[moduleName] || {
      title: 'Life Coaching',
      description: 'Your AI life coach is here to help',
      icon: '🤖',
      color: 'from-gray-500 to-gray-600',
    };
  };

  const moduleInfo = getModuleInfo(module);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className={`bg-gradient-to-r ${moduleInfo.color} text-white p-6`}>
        <div className="flex items-center space-x-4">
          <div className="text-4xl">{moduleInfo.icon}</div>
          <div>
            <h1 className="text-2xl font-bold">{moduleInfo.title}</h1>
            <p className="text-white/90">{moduleInfo.description}</p>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 overflow-hidden">
        <ChatWindow module={module} />
      </div>
    </div>
  );
}

export default ChatPage;


