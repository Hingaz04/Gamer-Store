import React from "react";
import "./Tournaments.css";

const tournaments = [
  {
    id: 1,
    name: "Summer Showdown",
    date: "2024-07-15",
    game: "Call of Duty: Black Ops",
    prize: "$10,000",
    location: "Online",
    description:
      "Join the ultimate summer showdown and compete against the best in Call of Duty: Black Ops!",
  },
  {
    id: 2,
    name: "Winter Clash",
    date: "2024-12-05",
    game: "Fortnite",
    prize: "$20,000",
    location: "New York, NY",
    description:
      "Get ready for the Winter Clash in New York and battle it out in Fortnite for a massive prize pool.",
  },
  {
    id: 3,
    name: "Spring Invitational",
    date: "2024-04-20",
    game: "League of Legends",
    prize: "$15,000",
    location: "Los Angeles, CA",
    description:
      "The Spring Invitational is here! Show your skills in League of Legends and take home the trophy.",
  },
];

function Tournaments() {
  return (
    <div className="tournaments">
      <h1>Upcoming Gaming Tournaments</h1>
      <div className="tournaments-list">
        {tournaments.map((tournament) => (
          <div key={tournament.id} className="tournament-card">
            <h2>{tournament.name}</h2>
            <p>
              <strong>Date:</strong> {tournament.date}
            </p>
            <p>
              <strong>Game:</strong> {tournament.game}
            </p>
            <p>
              <strong>Prize:</strong> {tournament.prize}
            </p>
            <p>
              <strong>Location:</strong> {tournament.location}
            </p>
            <p>{tournament.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tournaments;
