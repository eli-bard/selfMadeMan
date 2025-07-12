"use client";

import React from "react";
import { CheckCircle } from "lucide-react";

interface SkillCreatorProps {
  newSkillName: string;
  setNewSkillName: (value: string) => void;
  newSkillCategory: string;
  setNewSkillCategory: (value: string) => void;
  createCustomSkill: () => void;
  setShowSkillCreator: (value: boolean) => void;
  skillPoints: number;
}

const SkillCreator: React.FC<SkillCreatorProps> = ({
  newSkillName,
  setNewSkillName,
  newSkillCategory,
  setNewSkillCategory,
  createCustomSkill,
  setShowSkillCreator,
  skillPoints,
}) => {
  return (
    <div className="bg-gray-700 rounded-lg p-4 mb-4">
      <h4 className="font-bold mb-3">Criar Nova Habilidade</h4>
      <div className="grid grid-cols-2 gap-4 mb-3">
        <input
          type="text"
          placeholder="Nome da habilidade"
          value={newSkillName}
          onChange={(e) => setNewSkillName(e.target.value)}
          className="bg-gray-600 rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Categoria"
          value={newSkillCategory}
          onChange={(e) => setNewSkillCategory(e.target.value)}
          className="bg-gray-600 rounded px-3 py-2"
        />
      </div>
      <div className="flex space-x-2">
        <button
          onClick={createCustomSkill}
          className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm flex items-center"
          disabled={skillPoints < 3}
        >
          <CheckCircle className="w-4 h-4 mr-1" /> Criar (3 pontos)
        </button>
        <button
          onClick={() => setShowSkillCreator(false)}
          className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-sm"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default SkillCreator;
