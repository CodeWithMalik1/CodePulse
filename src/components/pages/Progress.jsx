import React from 'react';
import { TrendingUp, Target, Calendar, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export function Progress() {
  const { user } = useAuth();
  const { problems, getUserSubmissions, getProblemStats } = useData();
  
  const stats = getProblemStats(user?.id);
  const submissions = getUserSubmissions(user?.id);
  
  const categoryStats = problems.reduce((acc, problem) => {
    if (!acc[problem.category]) {
      acc[problem.category] = { total: 0, solved: 0 };
    }
    acc[problem.category].total++;
    return acc;
  }, {});

  const difficultyStats = {
    Easy: { total: problems.filter(p => p.difficulty === 'Easy').length, solved: 0 },
    Medium: { total: problems.filter(p => p.difficulty === 'Medium').length, solved: 0 },
    Hard: { total: problems.filter(p => p.difficulty === 'Hard').length, solved: 0 }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Progress Tracker</h1>
        <p className="text-gray-400">Track your coding journey and achievements</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Solved</p>
              <p className="text-2xl font-bold text-white">{stats.solved}</p>
              <p className="text-xs text-gray-500">of {problems.length} problems</p>
            </div>
            <Target className="h-8 w-8 text-green-500" />
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${(stats.solved / problems.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Success Rate</p>
              <p className="text-2xl font-bold text-white">
                {stats.attempted > 0 ? Math.round((stats.solved / stats.attempted) * 100) : 0}%
              </p>
              <p className="text-xs text-gray-500">{stats.attempted} attempted</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Current Streak</p>
              <p className="text-2xl font-bold text-white">7</p>
              <p className="text-xs text-gray-500">days</p>
            </div>
            <Calendar className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Contest Rating</p>
              <p className="text-2xl font-bold text-white">1247</p>
              <p className="text-xs text-gray-500">+23 this month</p>
            </div>
            <Award className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Progress Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Progress */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Progress by Category</h2>
          <div className="space-y-4">
            {Object.entries(categoryStats).map(([category, data]) => (
              <div key={category}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">{category}</span>
                  <span className="text-gray-400">{data.solved}/{data.total}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${(data.solved / data.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Difficulty Progress */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Progress by Difficulty</h2>
          <div className="space-y-4">
            {Object.entries(difficultyStats).map(([difficulty, data]) => {
              const color = {
                Easy: 'bg-green-500',
                Medium: 'bg-yellow-500',
                Hard: 'bg-red-500'
              }[difficulty];
              
              return (
                <div key={difficulty}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">{difficulty}</span>
                    <span className="text-gray-400">{data.solved}/{data.total}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`${color} h-2 rounded-full`} 
                      style={{ width: `${(data.solved / data.total) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Recent Submissions</h2>
        
        {submissions.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No submissions yet. Start solving problems!</p>
        ) : (
          <div className="space-y-3">
            {submissions.slice(-10).reverse().map((submission) => {
              const problem = problems.find(p => p.id === submission.problemId);
              const statusColor = {
                'Accepted': 'text-green-400 bg-green-900/20',
                'Wrong Answer': 'text-red-400 bg-red-900/20',
                'Runtime Error': 'text-orange-400 bg-orange-900/20',
                'Time Limit Exceeded': 'text-yellow-400 bg-yellow-900/20'
              }[submission.status];

              return (
                <div key={submission.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-medium text-white">{problem?.title}</h3>
                      <p className="text-sm text-gray-400">
                        {submission.submittedAt.toLocaleDateString()} at {submission.submittedAt.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                      {submission.status}
                    </span>
                    <div className="text-sm text-gray-400">
                      {submission.runtime}ms
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
