"use client";

import React from "react";
import { Target, Zap, Trophy, CheckCircle } from "lucide-react";
import StatBar from "./StatBar";
import { DashboardTabProps } from "./types";

const DashboardTab: React.FC<DashboardTabProps> = ({
  missions,
  completeMission,
  skills,
  customSkills,
  achievements,
}) => {
  const allSkills = [...skills, ...customSkills];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Missões Ativas */}
      <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/30">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2" />
          Missões Ativas
        </h3>
        <div className="space-y-3">
          {missions
            .filter((m) => !m.completed)
            .slice(0, 3)
            .map((mission) => (
              <div key={mission.id} className="bg-gray-700 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm">{mission.title}</h4>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      mission.difficulty === "Easy"
                        ? "bg-green-600"
                        : mission.difficulty === "Medium"
                        ? "bg-yellow-600"
                        : mission.difficulty === "Hard"
                        ? "bg-red-600"
                        : "bg-purple-600"
                    }`}
                  >
                    {mission.difficulty}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-2">
                  {mission.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-purple-300">
                    +{mission.xpReward} XP
                  </span>
                  <button
                    onClick={() => completeMission(mission.id)}
                    className="text-xs bg-purple-600 hover:bg-purple-700 px-2 py-1 rounded"
                  >
                    Completar
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Top Skills */}
      <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/30">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Zap className="w-5 h-5 mr-2" />
          Habilidades Principais
        </h3>
        <div className="space-y-3">
          {allSkills.slice(0, 3).map((skill) => (
            <div key={skill.id} className="bg-gray-700 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {skill.icon}
                  <span className="ml-2 font-medium text-sm">{skill.name}</span>
                </div>
                <span className="text-xs text-purple-300">
                  Nv. {skill.level}
                </span>
              </div>
              <StatBar
                label=""
                value={skill.experience}
                maxValue={skill.maxExperience}
                color="bg-gradient-to-r from-blue-500 to-cyan-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Conquistas Recentes */}
      <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/30">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Trophy className="w-5 h-5 mr-2" />
          Conquistas
        </h3>
        <div className="space-y-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`bg-gray-700 rounded-lg p-3 ${
                achievement.unlocked
                  ? "border-l-4 border-yellow-500"
                  : "opacity-50"
              }`}
            >
              <div className="flex items-center">
                {achievement.icon}
                <div className="ml-2">
                  <div className="font-medium text-sm">{achievement.name}</div>
                  <div className="text-xs text-gray-400">
                    {achievement.description}
                  </div>
                </div>
                {achievement.unlocked && (
                  <CheckCircle className="w-4 h-4 text-green-400 ml-auto" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
