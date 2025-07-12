"use client";

// components/MissionCreator.tsx
import React, { useState } from "react";
import { Mission } from "@/types";

interface MissionCreatorProps {
  onCreateMission: (mission: Omit<Mission, "id" | "completed">) => void;
}

const MissionCreator: React.FC<MissionCreatorProps> = ({ onCreateMission }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mission, setMission] = useState({
    title: "",
    description: "",
    difficulty: "E" as Mission["difficulty"],
    experience: 10,
    category: "daily" as Mission["category"],
    rewards: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mission.title && mission.description) {
      onCreateMission(mission);
      setMission({
        title: "",
        description: "",
        difficulty: "E",
        experience: 10,
        category: "daily",
        rewards: [],
      });
      setIsOpen(false);
    }
  };

  const experienceByDifficulty = {
    E: 10,
    D: 25,
    C: 50,
    B: 100,
    A: 200,
    S: 500,
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Criar Nova Missão</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded hover:from-green-600 hover:to-blue-600 transition-all duration-200"
        >
          {isOpen ? "Fechar" : "Nova Missão"}
        </button>
      </div>

      {isOpen && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-2">Título</label>
            <input
              type="text"
              value={mission.title}
              onChange={(e) =>
                setMission({ ...mission, title: e.target.value })
              }
              className="w-full bg-gray-700 text-white rounded px-3 py-2 border border-gray-600"
              placeholder="Ex: Exercitar-se por 30 minutos"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Descrição</label>
            <textarea
              value={mission.description}
              onChange={(e) =>
                setMission({ ...mission, description: e.target.value })
              }
              className="w-full bg-gray-700 text-white rounded px-3 py-2 border border-gray-600"
              rows={3}
              placeholder="Descreva a missão..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">Categoria</label>
              <select
                value={mission.category}
                onChange={(e) =>
                  setMission({
                    ...mission,
                    category: e.target.value as Mission["category"],
                  })
                }
                className="w-full bg-gray-700 text-white rounded px-3 py-2 border border-gray-600"
              >
                <option value="daily">Diária</option>
                <option value="weekly">Semanal</option>
                <option value="monthly">Mensal</option>
                <option value="special">Especial</option>
              </select>
            </div>

            <div>
              <label className="block text-white mb-2">Dificuldade</label>
              <select
                value={mission.difficulty}
                onChange={(e) => {
                  const difficulty = e.target.value as Mission["difficulty"];
                  setMission({
                    ...mission,
                    difficulty,
                    experience: experienceByDifficulty[difficulty],
                  });
                }}
                className="w-full bg-gray-700 text-white rounded px-3 py-2 border border-gray-600"
              >
                <option value="E">E (Fácil)</option>
                <option value="D">D (Simples)</option>
                <option value="C">C (Médio)</option>
                <option value="B">B (Difícil)</option>
                <option value="A">A (Muito Difícil)</option>
                <option value="S">S (Extremo)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-white mb-2">
              Experiência: {mission.experience}
            </label>
            <input
              type="range"
              min="5"
              max="1000"
              value={mission.experience}
              onChange={(e) =>
                setMission({ ...mission, experience: parseInt(e.target.value) })
              }
              className="w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
          >
            Criar Missão
          </button>
        </form>
      )}
    </div>
  );
};

export default MissionCreator;
