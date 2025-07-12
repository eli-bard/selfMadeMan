"use client";

import React from "react";
import { Plus } from "lucide-react";
import StatBar from "./StatBar";
import SkillCreator from "./SkillCreator";
import { Skill } from "./types";

interface SkillsTabProps {
  skills: Skill[];
  customSkills: Skill[];
  showSkillCreator: boolean;
  setShowSkillCreator: (value: boolean) => void;
  newSkillName: string;
  setNewSkillName: (value: string) => void;
  newSkillCategory: string;
  setNewSkillCategory: (value: string) => void;
  createCustomSkill: () => void;
  skillPoints: number;
}

const SkillsTab: React.FC<SkillsTabProps> = ({
  skills,
  customSkills,
  showSkillCreator,
  setShowSkillCreator,
  newSkillName,
  setNewSkillName,
  newSkillCategory,
  setNewSkillCategory,
  createCustomSkill,
  skillPoints,
}) => {
  const allSkills = [...skills, ...customSkills];

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/30">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Habilidades</h3>
          <button
            onClick={() => setShowSkillCreator(true)}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded flex items-center"
            disabled={skillPoints < 3}
          >
            <Plus className="w-4 h-4 mr-2" />
            Criar Habilidade (3 pontos)
          </button>
        </div>

        {showSkillCreator && (
          <SkillCreator
            {...{
              newSkillName,
              setNewSkillName,
              newSkillCategory,
              setNewSkillCategory,
              createCustomSkill,
              setShowSkillCreator,
              skillPoints,
            }}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allSkills.map((skill) => (
            <div key={skill.id} className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {skill.icon}
                  <span className="ml-2 font-bold">{skill.name}</span>
                </div>
                <span className="text-purple-300">Nv. {skill.level}</span>
              </div>
              <p className="text-sm text-gray-400 mb-2">{skill.description}</p>
              <div className="text-xs text-blue-300 mb-2">
                Categoria: {skill.category}
              </div>
              <StatBar
                label="Progresso"
                value={skill.experience}
                maxValue={skill.maxExperience}
                color="bg-gradient-to-r from-blue-500 to-cyan-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsTab;
