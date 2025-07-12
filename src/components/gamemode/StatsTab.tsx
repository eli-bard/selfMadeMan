"use client";

import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Sword, Brain, Zap, Shield, Heart, BookOpen, Plus } from "lucide-react";
import { Stats } from "./types";

interface StatsTabProps {
  stats: Stats;
  statPoints: number;
  increaseStat: (statName: keyof Stats) => void;
  radarData: { attribute: string; value: number; fullMark: number }[];
}

const StatsTab: React.FC<StatsTabProps> = ({
  stats,
  statPoints,
  increaseStat,
  radarData,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/30">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Status do Personagem</h3>
        <div className="text-purple-300">Pontos disponíveis: {statPoints}</div>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-bold mb-4 text-center">
          Gráfico de Status
        </h4>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius="70%" data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.3)" />
              <PolarAngleAxis
                dataKey="attribute"
                tick={{ fill: "white", fontSize: 12 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 50]}
                stroke="rgba(255,255,255,0.5)"
              />
              <Radar
                name="Status"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Legend wrapperStyle={{ color: "white", fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(stats).map(([statName, statValue]) => (
          <div key={statName} className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                {statName === "strength" && <Sword className="w-5 h-5 mr-2" />}
                {statName === "intelligence" && (
                  <Brain className="w-5 h-5 mr-2" />
                )}
                {statName === "agility" && <Zap className="w-5 h-5 mr-2" />}
                {statName === "endurance" && (
                  <Shield className="w-5 h-5 mr-2" />
                )}
                {statName === "charisma" && <Heart className="w-5 h-5 mr-2" />}
                {statName === "wisdom" && <BookOpen className="w-5 h-5 mr-2" />}
                <span className="font-bold capitalize">
                  {statName === "strength"
                    ? "Força"
                    : statName === "intelligence"
                    ? "Inteligência"
                    : statName === "agility"
                    ? "Agilidade"
                    : statName === "endurance"
                    ? "Resistência"
                    : statName === "charisma"
                    ? "Carisma"
                    : "Sabedoria"}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">{statValue}</span>
                <button
                  onClick={() => increaseStat(statName as keyof Stats)}
                  disabled={statPoints === 0}
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 w-8 h-8 rounded-full flex items-center justify-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                style={{ width: `${(statValue / 50) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsTab;
