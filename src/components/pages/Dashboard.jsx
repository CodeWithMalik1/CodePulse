import React from 'react';
import { 
  FileText, 
  Trophy, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Users,
  Calendar
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export function Dashboard() {
  const { user } = useAuth();
  const { problems, contests, getProblemStats } = useData();

  const stats = user ? getProblemStats(user.id) : { solved: 0, attempted: 0 };
  const recentProblems = problems.slice(0, 3);
  const upcomingContests = contests.filter(c => c.status === 'upcoming').slice(0, 2);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user?.name || "Coder"}! 👋
        </h1>
        <p className="text-gray-400">
          {user?.role === 'instructor' 
            ? 'Manage your platform and help students learn'
            : 'Continue your coding journey and solve new challenges'
          }
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Problems Solved</p>
              <p className="text-2xl font-bold text-white">{stats.solved}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Problems Attempted</p>
              <p className="text-2xl font-bold text-white">{stats.attempted}</p>
            </div>
            <FileText className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-yellow-500 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Contest Rating</p>
              <p className="text-2xl font-bold text-white">1247</p>
            </div>
            <Trophy className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-red-500 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Success Rate</p>
              <p className="text-2xl font-bold text-white">
                {stats.attempted > 0 ? Math.round((stats.solved / stats.attempted) * 100) : 0}%
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Problems */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Problems</h2>
            <FileText className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentProblems.map((problem) => {
              const difficultyColor = {
                Easy: 'text-green-400 bg-green-900/20',
                Medium: 'text-yellow-400 bg-yellow-900/20',
                Hard: 'text-red-400 bg-red-900/20'
              }[problem.difficulty] || 'text-gray-400 bg-gray-700';

              return (
                <div 
                  key={problem.id}
                  className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <div>
                    <h3 className="font-medium text-white">{problem.title}</h3>
                    <p className="text-sm text-gray-400">{problem.category}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColor}`}>
                    {problem.difficulty}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Contests */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Upcoming Contests</h2>
            <Trophy className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingContests.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No upcoming contests</p>
            ) : (
              upcomingContests.map((contest) => (
                <div 
                  key={contest.id}
                  className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <h3 className="font-medium text-white mb-2">{contest.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(contest.startTime).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{contest.duration}m</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-400">{contest.participants} registered</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {user?.role === 'instructor' && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors">
              Add New Problem
            </button>
            <button className="p-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors">
              Create Contest
            </button>
            <button className="p-4 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition-colors">
              View Analytics
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
