import React, { useState } from "react";
import { MessageSquare, Send, User } from "lucide-react";

const initialThreads = [
  {
    id: 1,
    user: "Alice",
    comment: "Can someone explain a more optimal solution for Two Sum?",
    replies: [
      { id: 11, user: "Bob", comment: "You can use a hashmap for O(n)." }
    ]
  },
  {
    id: 2,
    user: "Charlie",
    comment: "Struggling with edge cases in string problems 😅",
    replies: []
  }
];

export  function Discussion() {
  const [threads, setThreads] = useState(initialThreads);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newThread = {
      id: threads.length + 1,
      user: "You",
      comment: newComment,
      replies: []
    };
    setThreads([newThread, ...threads]);
    setNewComment("");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white flex items-center">
        <MessageSquare className="h-7 w-7 mr-2 text-blue-400" />
        Discussion Forum
      </h1>

      {/* Add new comment */}
      <div className="bg-gray-800 p-4 rounded-lg flex items-center space-x-3">
        <User className="h-6 w-6 text-gray-400" />
        <input
          type="text"
          className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none"
          placeholder="Share your thoughts..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={handleAddComment}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium flex items-center"
        >
          <Send className="h-4 w-4 mr-2" /> Post
        </button>
      </div>

      {/* Threads */}
      <div className="space-y-4">
        {threads.map((thread) => (
          <div
            key={thread.id}
            className="bg-gray-800 p-4 rounded-lg border border-gray-700"
          >
            <p className="text-white font-medium">{thread.user}</p>
            <p className="text-gray-300">{thread.comment}</p>

            {/* Replies */}
            {thread.replies.length > 0 && (
              <div className="ml-6 mt-3 space-y-2">
                {thread.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="bg-gray-700 p-3 rounded-lg text-sm"
                  >
                    <p className="text-white font-medium">{reply.user}</p>
                    <p className="text-gray-300">{reply.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
