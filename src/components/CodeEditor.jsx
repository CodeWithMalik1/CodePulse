import React, { useState } from 'react';
import { Play, Send, RotateCcw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export function CodeEditor({ problemId }) {
  const { user } = useAuth();
  const { addSubmission } = useData();
  const [code, setCode] = useState(`// Write your solution here
function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}
`);
  const [language, setLanguage] = useState('javascript');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [output, setOutput] = useState('');

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' }
  ];

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running...');
    
    // Simulate code execution
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setOutput(`Sample Output:
[0, 1]

Execution time: 76ms
Memory usage: 42.1MB`);
    setIsRunning(false);
  };

  const submitCode = async () => {
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const statuses = ['Accepted', 'Wrong Answer', 'Runtime Error', 'Time Limit Exceeded'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    addSubmission({
      problemId,
      userId: user?.id, // safe check
      code,
      language,
      status: randomStatus,
      runtime: Math.floor(Math.random() * 200) + 50,
      memory: Math.floor(Math.random() * 50) + 20
    });

    setOutput(`Submission Result: ${randomStatus}
Runtime: ${Math.floor(Math.random() * 200) + 50}ms
Memory: ${Math.floor(Math.random() * 50) + 20}MB`);
    
    setIsSubmitting(false);
  };

  const resetCode = () => {
    setCode('// Write your solution here\n');
    setOutput('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {languages.map(lang => (
            <option key={lang.value} value={lang.value}>{lang.label}</option>
          ))}
        </select>
        
        <button
          onClick={resetCode}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      <div className="border border-gray-600 rounded-lg overflow-hidden">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-96 p-4 bg-gray-900 text-white font-mono text-sm resize-none focus:outline-none"
          placeholder="Write your code here..."
          spellCheck={false}
        />
      </div>

      <div className="flex space-x-3">
        <button
          onClick={runCode}
          disabled={isRunning}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
        >
          <Play className="h-4 w-4" />
          <span>{isRunning ? 'Running...' : 'Run Code'}</span>
        </button>

        <button
          onClick={submitCode}
          disabled={isSubmitting}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
        >
          <Send className="h-4 w-4" />
          <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
        </button>
      </div>

      {output && (
        <div className="bg-gray-900 border border-gray-600 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Output:</h3>
          <pre className="text-gray-300 text-sm whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
}
