import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Trophy } from 'lucide-react';
import { useData } from '../context/DataContext';

export function ContestDetail() {
  const { id } = useParams();
  const { contests, problems } = useData();
  
  const contest = contests.find(c => c.id === id);

  if (!contest) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Contest not found</p>
      </div>
    );
  }

  const contestProblems = problems.filter(p => contest.problems.includes(p.id));

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <Link 
          to="/contests"
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Contests</span>
        </Link>
      </div>

      {/* Contest Info */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">{contest.title}</h1>
          <p className="text-gray-400 text-lg mb-6">{contest.description}</p>
          
          <div className="flex justify-center space-x-8">
            <div className="flex items-center space-x-2 text-gray-300">
              <Clock className="h-5 w-5" />
              <span>{contest.duration} minutes</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Users className="h-5 w-5" />
              <span>{contest.participants} participants</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Trophy className="h-5 w-5" />
              <span>{contest.problems.length} problems</span>
            </div>
          </div>
        </div>

        {/* Contest Status */}
        {contest.status === 'ongoing' && (
          <div className="bg-green-900/20 border border-green-500 text-green-200 p-4 rounded-lg mb-6 text-center">
            <p className="font-medium">Contest is live! You can submit solutions now.</p>
            <p className="text-sm mt-1">Time remaining: 1h 23m</p>
          </div>
        )}

        {contest.status === 'upcoming' && (
          <div className="bg-blue-900/20 border border-blue-500 text-blue-200 p-4 rounded-lg mb-6 text-center">
            <p className="font-medium">
              Contest starts on {contest.startDate} at {contest.startTime}
            </p>
          </div>
        )}
      </div>

      {/* Problems List */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Problems</h2>
        
        <div className="space-y-4">
          {contestProblems.map((problem, index) => {
            const difficultyColor = {
              Easy: 'text-green-400 bg-green-900/20',
              Medium: 'text-yellow-400 bg-yellow-900/20',
              Hard: 'text-red-400 bg-red-900/20'
            }[problem.difficulty];

            return (
              <div 
                key={problem.id} 
                className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400 font-mono text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <div>
                    <Link 
                      to={`/problems/${problem.id}`}
                      className="font-medium text-white hover:text-blue-400 transition-colors"
                    >
                      {problem.title}
                    </Link>
                    <p className="text-sm text-gray-400">{problem.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColor}`}>
                    {problem.difficulty}
                  </span>
                  <div className="text-sm text-gray-400">
                    {Math.round((problem.acceptedSubmissions / problem.totalSubmissions) * 100)}% solved
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leaderboard */}
      {contest.status === 'finished' && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Leaderboard</h2>
          
          <div className="space-y-3">
            {Array.from({ length: 10 }, (_, i) => (
              <div 
                key={i} 
                className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <span className={`text-sm font-bold ${
                    i === 0 ? 'text-yellow-400' :
                    i === 1 ? 'text-gray-300' :
                    i === 2 ? 'text-orange-400' : 'text-gray-400'
                  }`}>
                    #{i + 1}
                  </span>
                  <span className="text-white">User{i + 1}</span>
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-400">
                  <span>{Math.max(0, 3 - Math.floor(i / 3))} solved</span>
                  <span>{Math.floor(Math.random() * 100) + 100} points</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
