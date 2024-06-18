import React from "react";
import "./Forum.css";

const threads = [
  {
    id: 1,
    title: "Best Strategies for Call of Duty: Black Ops",
    author: "Gamer123",
    date: "2024-06-01",
    replies: 42,
    content:
      "Let's discuss the best strategies for winning in Call of Duty: Black Ops. What are your tips and tricks?",
  },
  {
    id: 2,
    title: "Fortnite Season 10 Discussion",
    author: "EpicPlayer",
    date: "2024-06-03",
    replies: 30,
    content:
      "Season 10 of Fortnite is here! What are your thoughts on the new updates and features?",
  },
  {
    id: 3,
    title: "League of Legends - Favorite Champions",
    author: "LoLFanatic",
    date: "2024-06-05",
    replies: 25,
    content:
      "Who's your favorite champion in League of Legends and why? Share your favorite builds and strategies.",
  },
];

function Forum() {
  return (
    <div className="forum">
      <h1>Gaming Forum</h1>
      <div className="threads-list">
        {threads.map((thread) => (
          <div key={thread.id} className="thread-card">
            <h2>{thread.title}</h2>
            <p>
              <strong>Author:</strong> {thread.author}
            </p>
            <p>
              <strong>Date:</strong> {thread.date}
            </p>
            <p>
              <strong>Replies:</strong> {thread.replies}
            </p>
            <p>{thread.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forum;
