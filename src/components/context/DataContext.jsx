import React, { createContext, useContext, useState } from "react";

// Create Context
const DataContext = createContext();

// Custom hook to use context
export const useData = () => useContext(DataContext);

// Dummy problems data
const dummyProblems = [
  {
    id: "1",
    title: "Two Sum",
    description: "Find two numbers in an array that add up to a target.",
    difficulty: "Easy",
    category: "Array",
    tags: ["Array", "HashMap"],
    totalSubmissions: 100,
    acceptedSubmissions: 60,
  },
  {
    id: "2",
    title: "Longest Substring Without Repeating Characters",
    description: "Find the length of the longest substring without repeating characters.",
    difficulty: "Medium",
    category: "String",
    tags: ["String", "Sliding Window"],
    totalSubmissions: 80,
    acceptedSubmissions: 30,
  },
  {
    id: "3",
    title: "Median of Two Sorted Arrays",
    description: "Find the median of two sorted arrays.",
    difficulty: "Hard",
    category: "Array",
    tags: ["Array", "Binary Search"],
    totalSubmissions: 50,
    acceptedSubmissions: 10,
  },
];

// Dummy contests
const dummyContests = [
  {
    id: "1",
    title: "Weekly Coding Contest 1",
    startTime: new Date().toISOString(),
    duration: 120,
    participants: 50,
    status: "upcoming",
  },
  {
    id: "2",
    title: "Monthly Coding Challenge",
    startTime: new Date().toISOString(),
    duration: 180,
    participants: 100,
    status: "upcoming",
  },
];

// Dummy submissions
const dummySubmissions = [
  {
    id: "s1",
    problemId: "1",
    status: "Accepted",
    runtime: 25,
    submittedAt: new Date(),
  },
  {
    id: "s2",
    problemId: "2",
    status: "Wrong Answer",
    runtime: 30,
    submittedAt: new Date(),
  },
];

export const DataProvider = ({ children }) => {
  const [problems, setProblems] = useState(dummyProblems);
  const [contests, setContests] = useState(dummyContests);
  const [submissions, setSubmissions] = useState(dummySubmissions);
  const [solvedProblems, setSolvedProblems] = useState(["1"]); // Example: user solved problem 1

  // Get stats for a user
  const getProblemStats = (userId) => {
    const solved = solvedProblems.length;
    const attempted = submissions.length;
    return { solved, attempted };
  };

  // Get submissions for a user
  const getUserSubmissions = (userId) => {
    return submissions;
  };

  return (
    <DataContext.Provider
      value={{
        problems,
        contests,
        submissions,
        solvedProblems,
        setProblems,
        setContests,
        setSubmissions,
        getProblemStats,
        getUserSubmissions,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
