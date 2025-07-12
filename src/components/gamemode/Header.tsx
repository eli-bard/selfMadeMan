"use client";

import React from "react";
import { User } from "lucide-react";
import StatBar from "./StatBar";

interface HeaderProps {
  level: number;
  totalExperience: number;
  streak: number;
  statPoints: number;
  skillPoints: number;
  experience: number;
  maxExperience: number;
}

const Header: React.FC<HeaderProps> = ({
  level,
  totalExperience,
  streak,
  statPoints,
  skillPoints,
  experience,
  maxExperience,
}) => (
  <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-purple-500/30">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
          <User className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Eliabe</h1>
          <p className="text-purple-300">
            Nível {level} • {totalExperience} XP Total
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-400">{streak}</div>
          <div className="text-sm text-gray-400">Dias Consecutivos</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">{statPoints}</div>
          <div className="text-sm text-gray-400">Pontos de Status</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">{skillPoints}</div>
          <div className="text-sm text-gray-400">Pontos de Habilidade</div>
        </div>
      </div>
    </div>

    <div className="mt-4">
      <StatBar
        label="Experiência"
        value={experience}
        maxValue={maxExperience}
        color="bg-gradient-to-r from-purple-500 to-blue-500"
      />
    </div>
  </div>
);

export default Header;