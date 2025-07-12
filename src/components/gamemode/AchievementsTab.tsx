"use client";

import React from "react";
import { Trophy } from "lucide-react";
import { Achievement } from "./types";

interface AchievementsTabProps {
  achievements: Achievement[];
}

const AchievementsTab: React.FC<AchievementsTabProps> = ({ achievements }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/30">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <Trophy className="w-5 h-5 mr-2" />
        Conquistas
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`bg-gray-700 rounded-lg p-4 ${
              achievement.unlocked
                ? "border-2 border-yellow-500 bg-gradient-to-br from-gray-700 to-yellow-900/20"
                : "opacity-50"
            }`}
          >
            <div className="flex items-center mb-2">
              {achievement.icon}
              <span className="ml-2 font-bold">{achievement.name}</span>
              {achievement.unlocked && (
                <div className="w-5 h-5 text-green-400 ml-auto">✓</div>
              )}
            </div>
            <p className="text-sm text-gray-400">{achievement.description}</p>
            {achievement.unlocked && achievement.unlockedAt && (
              <p className="text-xs text-yellow-400 mt-2">
                Desbloqueado em {achievement.unlockedAt.toLocaleDateString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsTab;
