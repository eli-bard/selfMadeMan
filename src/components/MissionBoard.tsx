"use client";

// components/MissionBoard.tsx
import React, { useState } from "react";
import { Mission } from "@/types";

interface MissionBoardProps {
  missions: Mission[];
  onCompleteMission: (missionId: string) => void;
}

const MissionBoard: React.FC<MissionBoardProps> = ({
  missions,
  onCompleteMission,
}) => {
  const [filter, setFilter] = useState<
    "all" | "daily" | "weekly" | "monthly" | "special"
  >("all");

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      E: "text-gray-400 border-gray-400",
      D: "text-green-400 border-green-400",
      C: "text-blue-400 border-blue-400",
      B: "text-purple-400 border-purple-400",
      A: "text-yellow-400 border-yellow-400",
      S: "text-red-400 border-red-400",
    };
    return (
      colors[difficulty as keyof typeof colors] ||
      "text-gray-400 border-gray-400"
    );
  };

  const filteredMissions =
    filter === "all"
      ? missions.filter((m) => !m.completed)
      : missions.filter((m) => m.category === filter && !m.completed);

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Missões Disponíveis</h3>
        <select
          className="bg-gray-700 text-white rounded px-3 py-1 border border-gray-600"
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
        >
          <option value="all">Todas</option>
          <option value="daily">Diárias</option>
          <option value="weekly">Semanais</option>
          <option value="monthly">Mensais</option>
          <option value="special">Especiais</option>
        </select>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredMissions.map((mission) => (
          <div
            key={mission.id}
            className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold border ${getDifficultyColor(
                    mission.difficulty
                  )}`}
                >
                  {mission.difficulty}
                </span>
                <span className="text-white font-semibold">
                  {mission.title}
                </span>
              </div>
              <span className="text-sm text-yellow-400">
                +{mission.experience} EXP
              </span>
            </div>

            <p className="text-gray-300 text-sm mb-3">{mission.description}</p>

            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400 capitalize">
                {mission.category}
              </span>
              <button
                onClick={() => onCompleteMission(mission.id)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              >
                Completar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionBoard;
