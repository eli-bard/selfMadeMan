"use client";

// components/PlayerCard.tsx
import React from "react";
import { Player } from "@/types";

interface PlayerCardProps {
  player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const experiencePercentage =
    (player.experience / player.experienceToNext) * 100;

  const getRankColor = (rank: string) => {
    const colors = {
      E: "text-gray-400",
      D: "text-green-400",
      C: "text-blue-400",
      B: "text-purple-400",
      A: "text-yellow-400",
      S: "text-red-400",
    };
    return colors[rank as keyof typeof colors] || "text-gray-400";
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700 shadow-2xl">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-white">
            {player.name[0]}
          </span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{player.name}</h2>
          <p className={`text-lg font-semibold ${getRankColor(player.rank)}`}>
            Rank {player.rank} - Level {player.level}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-300 mb-1">
          <span>EXP</span>
          <span>
            {player.experience}/{player.experienceToNext}
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${experiencePercentage}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="text-center">
          <p className="text-gray-400">Total EXP</p>
          <p className="text-white font-semibold">{player.totalExperience}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400">Missões</p>
          <p className="text-white font-semibold">{player.completedMissions}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
