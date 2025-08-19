import React from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, FileText, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

// Dummy problems data (replace with API / context later)
const problems = [
  {
    id: "1",
    title: "Two Sum",
    description: "Find two numbers in an array that add up to a given target.",
    difficulty: "Easy",
    category: "Array",
    constraints: [
      "1 <= nums.length <= 10^4",
      "−10^9 <= nums[i] <= 10^9",
      "−10^9 <= target <= 10^9"
    ],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9"
      }
    ]
  },
  {
    id: "2",
    title: "Longest Substring Without Repeating Characters",
    description:
      "Given a string, find the length of the longest substring without repeating characters.",
    difficulty: "Medium",
    category: "String",
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with length 3.'
      }
    ]
  }
];

export default function ProblemDetail() {
  const { id } = useParams();
  const problem = problems.find((p) => p.id === id);

  if (!problem) {
    return (
      <div className="p-6 text-white">
        <p>Problem not found.</p>
        <Link
          to="/"
          className="text-blue-400 hover:underline flex items-center mt-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">{problem.title}</h1>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            problem.difficulty === "Easy"
              ? "bg-green-900/20 text-green-400"
              : problem.difficulty === "Medium"
              ? "bg-yellow-900/20 text-yellow-400"
              : "bg-red-900/20 text-red-400"
          }`}
        >
          {problem.difficulty}
        </span>
      </div>
      <p className="text-gray-300">{problem.description}</p>

      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Constraints</h2>
        <ul className="list-disc list-inside text-gray-400">
          {problem.constraints.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Examples</h2>
        {problem.examples.map((ex, i) => (
          <div
            key={i}
            className="p-4 bg-gray-700/50 rounded-lg text-gray-300 mb-2"
          >
            <p>
              <strong>Input:</strong> {ex.input}
            </p>
            <p>
              <strong>Output:</strong> {ex.output}
            </p>
            <p>
              <strong>Explanation:</strong> {ex.explanation}
            </p>
          </div>
        ))}
      </div>

      <div className="flex space-x-4">
        <button className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Solve Problem
        </button>
        <Link
          to="/discussion"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium flex items-center"
        >
          <FileText className="h-5 w-5 mr-2" />
          View Discussion
        </Link>
      </div>
    </div>
  );
}
