"use client";

import React from "react";
import { Skill } from "./types";

interface MissionCreatorProps {
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
  setShowMissionCreator: (value: boolean) => void;
  skills: Skill[];
  customSkills: Skill[];
}

const MissionCreator: React.FC<MissionCreatorProps> = ({
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
}) => {
  const allSkills = [...skills, ...customSkills];

  return (
    <div className="bg-gray-700 rounded-lg p-4 mb-6">
      <h4 className="font-bold mb-3">Criar Nova Missão</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
        <div>
          <label className="block text-sm mb-1">Título*</label>
          <input
            type="text"
            placeholder="Título da missão"
            value={newMissionTitle}
            onChange={(e) => setNewMissionTitle(e.target.value)}
            className="w-full bg-gray-600 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Categoria</label>
          <input
            type="text"
            placeholder="Categoria"
            value={newMissionCategory}
            onChange={(e) => setNewMissionCategory(e.target.value)}
            className="w-full bg-gray-600 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Descrição</label>
          <textarea
            placeholder="Descrição da missão"
            value={newMissionDescription}
            onChange={(e) => setNewMissionDescription(e.target.value)}
            className="w-full bg-gray-600 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Dificuldade</label>
          <select
            value={newMissionDifficulty}
            onChange={(e) => setNewMissionDifficulty(e.target.value as any)}
            className="w-full bg-gray-600 rounded px-3 py-2"
          >
            <option value="Easy">Fácil</option>
            <option value="Medium">Médio</option>
            <option value="Hard">Difícil</option>
            <option value="Epic">Épico</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Recompensa de XP</label>
          <input
            type="number"
            min="1"
            value={newMissionXpReward}
            onChange={(e) => setNewMissionXpReward(Number(e.target.value))}
            className="w-full bg-gray-600 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Prioridade</label>
          <select
            value={newMissionPriority}
            onChange={(e) => setNewMissionPriority(e.target.value as any)}
            className="w-full bg-gray-600 rounded px-3 py-2"
          >
            <option value="Low">Baixa</option>
            <option value="Medium">Média</option>
            <option value="High">Alta</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Prazo (opcional)</label>
          <input
            type="date"
            value={newMissionDeadline}
            onChange={(e) => setNewMissionDeadline(e.target.value)}
            className="w-full bg-gray-600 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">
            Bônus de Habilidade (opcional)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={selectedSkillBonus}
              onChange={(e) => setSelectedSkillBonus(e.target.value)}
              className="bg-gray-600 rounded px-3 py-2"
            >
              <option value="">Selecione uma habilidade</option>
              {allSkills.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              min="0"
              placeholder="XP extra"
              value={skillBonusXp}
              onChange={(e) => setSkillBonusXp(Number(e.target.value))}
              className="bg-gray-600 rounded px-3 py-2"
              disabled={!selectedSkillBonus}
            />
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={createNewMission}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          disabled={!newMissionTitle.trim()}
        >
          Criar Missão
        </button>
        <button
          onClick={() => setShowMissionCreator(false)}
          className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default MissionCreator;
