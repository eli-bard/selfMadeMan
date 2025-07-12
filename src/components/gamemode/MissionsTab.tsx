"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import MissionCreator from "./MissionCreator";
import { Mission, Skill } from "./types";

interface MissionsTabProps {
  missions: Mission[];
  completeMission: (id: string) => void;
  showMissionCreator: boolean;
  setShowMissionCreator: (value: boolean) => void;
  newMissionTitle: string;
  setNewMissionTitle: (value: string) => void;
  newMissionDescription: string;
  setNewMissionDescription: (value: string) => void;
  newMissionCategory: string;
  setNewMissionCategory: (value: string) => void;
  newMissionDifficulty: "Easy" | "Medium" | "Hard" | "Epic";
  setNewMissionDifficulty: (value: "Easy" | "Medium" | "Hard" | "Epic") => void;
  newMissionXpReward: number;
  setNewMissionXpReward: (value: number) => void;
  newMissionPriority: "Low" | "Medium" | "High";
  setNewMissionPriority: (value: "Low" | "Medium" | "High") => void;
  newMissionDeadline: string;
  setNewMissionDeadline: (value: string) => void;
  selectedSkillBonus: string;
  setSelectedSkillBonus: (value: string) => void;
  skillBonusXp: number;
  setSkillBonusXp: (value: number) => void;
  createNewMission: () => void;
  skills: Skill[];
  customSkills: Skill[];
}

const MissionsTab: React.FC<MissionsTabProps> = ({
  missions,
  completeMission,
  showMissionCreator,
  setShowMissionCreator,
  newMissionTitle,
  setNewMissionTitle,
  newMissionDescription,
  setNewMissionDescription,
  newMissionCategory,
  setNewMissionCategory,
  newMissionDifficulty,
  setNewMissionDifficulty,
  newMissionXpReward,
  setNewMissionXpReward,
  newMissionPriority,
  setNewMissionPriority,
  newMissionDeadline,
  setNewMissionDeadline,
  selectedSkillBonus,
  setSelectedSkillBonus,
  skillBonusXp,
  setSkillBonusXp,
  createNewMission,
  skills,
  customSkills,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/30">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Todas as Missões</h3>
        <button
          onClick={() => setShowMissionCreator(true)}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded flex items-center"
        >
          Criar Nova Missão
        </button>
      </div>

      {showMissionCreator && (
        <MissionCreator
          {...{
            newMissionTitle,
            setNewMissionTitle,
            newMissionDescription,
            setNewMissionDescription,
            newMissionCategory,
            setNewMissionCategory,
            newMissionDifficulty,
            setNewMissionDifficulty,
            newMissionXpReward,
            setNewMissionXpReward,
            newMissionPriority,
            setNewMissionPriority,
            newMissionDeadline,
            setNewMissionDeadline,
            selectedSkillBonus,
            setSelectedSkillBonus,
            skillBonusXp,
            setSkillBonusXp,
            createNewMission,
            setShowMissionCreator,
            skills,
            customSkills,
          }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className={`bg-gray-700 rounded-lg p-4 ${
              mission.completed ? "opacity-50" : ""
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold">{mission.title}</h4>
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
            <p className="text-sm text-gray-400 mb-3">{mission.description}</p>
            <div className="flex justify-between items-center">
              <div className="text-sm">
                <span className="text-purple-300">+{mission.xpReward} XP</span>
                {mission.skillBonus && (
                  <span className="text-blue-300 ml-2">
                    +{mission.skillBonus.xp} Skill XP
                  </span>
                )}
              </div>
              {!mission.completed && (
                <button
                  onClick={() => completeMission(mission.id)}
                  className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-sm"
                >
                  Completar
                </button>
              )}
              {mission.completed && (
                <CheckCircle className="w-5 h-5 text-green-400" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionsTab;
