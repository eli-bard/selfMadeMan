"use client";

import React from "react";
import { Heart, BookOpen, Brain } from "lucide-react";

interface WellnessTabProps {
  moodScore: number;
  setMoodScore: (value: number) => void;
  energyLevel: number;
  setEnergyLevel: (value: number) => void;
  reflectionEntry: string;
  setReflectionEntry: (value: string) => void;
}

const WellnessTab: React.FC<WellnessTabProps> = ({
  moodScore,
  setMoodScore,
  energyLevel,
  setEnergyLevel,
  reflectionEntry,
  setReflectionEntry,
}) => {
  return (
    <div className="space-y-6">
      {/* Mood & Energy Tracker */}
      <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/30">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Heart className="w-5 h-5 mr-2" />
          Monitoramento do Bem-estar
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Humor (1-10)
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">😢</span>
              <input
                type="range"
                min="1"
                max="10"
                value={moodScore}
                onChange={(e) => setMoodScore(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-2xl">😊</span>
              <span className="text-lg font-bold text-purple-400">
                {moodScore}
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Energia (1-10)
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🔋</span>
              <input
                type="range"
                min="1"
                max="10"
                value={energyLevel}
                onChange={(e) => setEnergyLevel(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-2xl">⚡</span>
              <span className="text-lg font-bold text-purple-400">
                {energyLevel}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-gray-700 rounded">
          <p className="text-sm">
            <strong>Dica:</strong> Monitorar humor e energia ajuda a identificar
            padrões e otimizar seu desempenho ao longo do tempo.
          </p>
        </div>
      </div>

      {/* Daily Reflection */}
      <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/30">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <BookOpen className="w-5 h-5 mr-2" />
          Reflexão Diária
        </h3>
        <textarea
          value={reflectionEntry}
          onChange={(e) => setReflectionEntry(e.target.value)}
          placeholder="O que você aprendeu hoje? Quais foram seus principais desafios e conquistas?"
          className="w-full bg-gray-700 rounded-lg p-4 h-32 resize-none"
        />
        <div className="mt-3 flex justify-between items-center">
          <p className="text-sm text-gray-400">
            A reflexão diária melhora a metacognição e acelera o aprendizado.
          </p>
          <button
            onClick={() => {
              if (reflectionEntry.trim()) {
                // Lógica de salvamento será na página principal
                setReflectionEntry("");
              }
            }}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
          >
            Salvar (+20 XP)
          </button>
        </div>
      </div>

      {/* Wellness Tips */}
      <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/30">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Brain className="w-5 h-5 mr-2" />
          Dicas de Neurociência
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="font-bold text-green-400 mb-2">
              🧠 Neuroplasticidade
            </h4>
            <p className="text-sm text-gray-300">
              Pratique habilidades por 15-20 minutos diariamente. A repetição
              espaçada fortalece conexões neurais.
            </p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="font-bold text-blue-400 mb-2">💤 Sono e Memória</h4>
            <p className="text-sm text-gray-300">
              7-9 horas de sono consolidam memórias. Revise material antes de
              dormir para melhor retenção.
            </p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="font-bold text-purple-400 mb-2">
              🎯 Foco e Atenção
            </h4>
            <p className="text-sm text-gray-300">
              Use a técnica Pomodoro. Períodos focados de 25 minutos maximizam a
              concentração e produtividade.
            </p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="font-bold text-red-400 mb-2">🏃 Exercício Físico</h4>
            <p className="text-sm text-gray-300">
              20 minutos de exercício aumentam BDNF (fator neurotrófico),
              melhorando aprendizado e memória.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessTab;
