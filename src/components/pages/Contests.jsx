import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, Trophy, Play } from 'lucide-react';
import { useData } from '../context/DataContext';

export function Contests() {
  const { contests = [] } = useData(); // default empty array to prevent undefined
  const [filter, setFilter] = useState('all');

  const filteredContests = contests.filter(contest => {
    if (filter === 'all') return true;
    return contest.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'text-blue-400 bg-blue-900/20';
      case 'ongoing': return 'text-green-400 bg-green-900/20';
      case 'finished': return 'text-gray-400 bg-gray-700/20';
      default: return 'text-gray-400 bg-gray-700/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Contests</h1>
          <p className="mt-1 text-gray-400">Participate in coding competitions</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All Contests' },
            { key: 'upcoming', label: 'Upcoming' },
            { key: 'ongoing', label: 'Ongoing' },
            { key: 'finished', label: 'Finished' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === tab.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredContests.map((contest) => (
          <div key={contest.id} className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-blue-500 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{contest.title}</h3>
                <p className="text-gray-400 text-sm">{contest.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(contest.status)}`}>
                {contest.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-2 text-gray-300">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{contest.startTime ? new Date(contest.startTime).toLocaleDateString() : 'TBD'}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{contest.duration || 0} min</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Users className="h-4 w-4" />
                <span className="text-sm">{contest.participants?.length || 0} participants</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Trophy className="h-4 w-4" />
                <span className="text-sm">{contest.problems?.length || 0} problems</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">
                {contest.status === 'upcoming' && `Starts ${contest.startTime ? new Date(contest.startTime).toLocaleTimeString() : 'TBD'}`}
                {contest.status === 'ongoing' && 'Contest is live!'}
                {contest.status === 'finished' && `Ended ${contest.endTime ? new Date(contest.endTime).toLocaleTimeString() : 'TBD'}`}
              </div>
              
              <Link
                to={`/contests/${contest.id}`}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  contest.status === 'ongoing'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : contest.status === 'upcoming'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                }`}
              >
                {contest.status === 'ongoing' && <Play className="h-4 w-4" />}
                <span>
                  {contest.status === 'ongoing' ? 'Join Contest' : 
                   contest.status === 'upcoming' ? 'Register' : 'View Results'}
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredContests.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400">No contests found for the selected filter.</p>
        </div>
      )}
    </div>
  );
}
