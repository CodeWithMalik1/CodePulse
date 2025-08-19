import React, { useState } from 'react';
import { Plus, Users, FileText, Trophy, BarChart3 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export function AdminPanel() {
  const { problems, contests } = useData();
  const [activeTab, setActiveTab] = useState('overview'); // ✅ no TypeScript

  const tabs = [
    { key: 'overview', label: 'Overview', icon: BarChart3 },
    { key: 'problems', label: 'Problems', icon: FileText },
    { key: 'contests', label: 'Contests', icon: Trophy },
    { key: 'users', label: 'Users', icon: Users }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
          <p className="mt-1 text-gray-400">Manage your platform and monitor student progress</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <div className="flex flex-wrap gap-2">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Problems</p>
                <p className="text-2xl font-bold text-white">{problems.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Contests</p>
                <p className="text-2xl font-bold text-white">
                  {contests.filter(c => c.status === 'ongoing').length}
                </p>
              </div>
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Students</p>
                <p className="text-2xl font-bold text-white">142</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Submissions</p>
                <p className="text-2xl font-bold text-white">2,847</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'problems' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Manage Problems</h2>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              <Plus className="h-4 w-4" />
              <span>Add Problem</span>
            </button>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Difficulty</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Submissions</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {problems.map((problem) => (
                  <tr key={problem.id} className="hover:bg-gray-700/50">
                    <td className="px-6 py-4 font-medium text-white">{problem.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{problem.category}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          problem.difficulty === 'Easy'
                            ? 'text-green-400 bg-green-900/20'
                            : problem.difficulty === 'Medium'
                            ? 'text-yellow-400 bg-yellow-900/20'
                            : 'text-red-400 bg-red-900/20'
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{problem.totalSubmissions}</td>
                    <td className="px-6 py-4">
                      <button className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'contests' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Manage Contests</h2>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              <Plus className="h-4 w-4" />
              <span>Create Contest</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {contests.map((contest) => (
              <div key={contest.id} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{contest.title}</h3>
                    <p className="text-gray-400 mt-1">{contest.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                      <span>{contest.participants} participants</span>
                      <span>•</span>
                      <span>{contest.problems.length} problems</span>
                      <span>•</span>
                      <span className="capitalize">{contest.status}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded">
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white">Student Management</h2>

          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <p className="text-gray-400 text-center py-8">
              User management features coming soon...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
