import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, CheckCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

export function Problems() {
  // ✅ Provide default empty array for solvedProblems
  const { problems, solvedProblems = [] } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [...new Set(problems.map(p => p.category))];
  const difficulties = ['Easy', 'Medium', 'Hard'];

  const filteredProblems = problems.filter(problem => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDifficulty = !selectedDifficulty || problem.difficulty === selectedDifficulty;
    const matchesCategory = !selectedCategory || problem.category === selectedCategory;

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Problems</h1>
          <p className="mt-1 text-gray-400">Solve coding challenges and improve your skills</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search problems..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Difficulty Filter */}
          <select
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="">All Difficulties</option>
            {difficulties.map(diff => (
              <option key={diff} value={diff}>{diff}</option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Problems Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Problem</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Category</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Difficulty</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Acceptance</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredProblems.map((problem, index) => {
                const acceptanceRate = Math.round(
                  (problem.acceptedSubmissions / problem.totalSubmissions) * 100
                );

                // ✅ Difficulty Badge Colors
                const difficultyColor = {
                  Easy: 'text-green-400 bg-green-900/20',
                  Medium: 'text-yellow-400 bg-yellow-900/20',
                  Hard: 'text-red-400 bg-red-900/20',
                }[problem.difficulty];

                // ✅ Safe check for solvedProblems
                const isSolved = Array.isArray(solvedProblems) && solvedProblems.includes(problem.id);

                return (
                  <tr key={problem.id} className="hover:bg-gray-700/50 transition-colors">
                    {/* Problem Title + Tags */}
                    <td className="px-6 py-4">
                      <Link
                        to={`/problems/${problem.id}`}
                        className="flex items-center space-x-3 group"
                      >
                        <span className="text-gray-400 text-sm">{index + 1}.</span>
                        <div>
                          <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                            {problem.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            {problem.tags.map(tag => (
                              <span
                                key={tag}
                                className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Link>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 text-sm text-gray-300">{problem.category}</td>

                    {/* Difficulty */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColor}`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>

                    {/* Acceptance */}
                    <td className="px-6 py-4 text-sm text-gray-300">{acceptanceRate}%</td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {isSolved ? (
                        <CheckCircle className="h-5 w-5 text-green-500" /> // ✅ Solved
                      ) : (
                        <CheckCircle className="h-5 w-5 text-gray-500" /> // ❌ Not Solved
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* No Problems */}
        {filteredProblems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No problems found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
