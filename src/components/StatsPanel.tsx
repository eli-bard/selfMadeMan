// components/StatsPanel.tsx
import React from "react";
import { Stats } from "@/types";

interface StatsPanelProps {
  stats: Stats;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  const statIcons = {
    strength: "💪",
    intelligence: "🧠",
    agility: "⚡",
    vitality: "❤️",
    luck: "🍀",
  };

  const statColors = {
    strength: "from-red-500 to-red-600",
    intelligence: "from-blue-500 to-blue-600",
    agility: "from-green-500 to-green-600",
    vitality: "from-pink-500 to-pink-600",
    luck: "from-yellow-500 to-yellow-600",
  };

  const statNames = {
    strength: "Força",
    intelligence: "Inteligência",
    agility: "Agilidade",
    vitality: "Vitalidade",
    luck: "Sorte",
  };

  // Calcular total de pontos para o gráfico radar
  const totalPoints = Object.values(stats).reduce(
    (sum, value) => sum + value,
    0
  );
  const maxStat = Math.max(...Object.values(stats));
  const radarRadius = 80;
  const centerX = 100;
  const centerY = 100;

  // Função para calcular posição no radar
  const getRadarPoint = (value: number, angle: number) => {
    const normalizedValue = (value / Math.max(maxStat, 10)) * radarRadius;
    const radian = (angle * Math.PI) / 180;
    const x = centerX + normalizedValue * Math.cos(radian - Math.PI / 2);
    const y = centerY + normalizedValue * Math.sin(radian - Math.PI / 2);
    return { x, y };
  };

  // Pontos para o gráfico radar
  const radarPoints = Object.values(stats).map((value, index) => {
    const angle = (index * 360) / Object.keys(stats).length;
    return getRadarPoint(value, angle);
  });

  // Pontos para as linhas de grade
  const gridLevels = [2, 4, 6, 8, 10];
  const gridPoints = gridLevels.map((level) =>
    Object.keys(stats).map((_, index) => {
      const angle = (index * 360) / Object.keys(stats).length;
      return getRadarPoint(level, angle);
    })
  );

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4">Status</h3>

      {/* Gráfico Radar */}
      <div className="mb-6 flex justify-center">
        <div className="relative">
          <svg width="200" height="200" className="overflow-visible">
            {/* Linhas de grade */}
            {gridPoints.map((points, levelIndex) => (
              <polygon
                key={levelIndex}
                points={points.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="none"
                stroke="rgba(156, 163, 175, 0.3)"
                strokeWidth="1"
              />
            ))}

            {/* Linhas dos eixos */}
            {Object.keys(stats).map((_, index) => {
              const angle = (index * 360) / Object.keys(stats).length;
              const endPoint = getRadarPoint(10, angle);
              return (
                <line
                  key={index}
                  x1={centerX}
                  y1={centerY}
                  x2={endPoint.x}
                  y2={endPoint.y}
                  stroke="rgba(156, 163, 175, 0.3)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Área preenchida dos stats */}
            <polygon
              points={radarPoints.map((p) => `${p.x},${p.y}`).join(" ")}
              fill="rgba(59, 130, 246, 0.3)"
              stroke="rgba(59, 130, 246, 0.8)"
              strokeWidth="2"
            />

            {/* Pontos dos stats */}
            {radarPoints.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="4"
                fill="rgba(59, 130, 246, 1)"
                stroke="white"
                strokeWidth="2"
              />
            ))}

            {/* Labels dos stats */}
            {Object.entries(stats).map(([stat, value], index) => {
              const angle = (index * 360) / Object.keys(stats).length;
              const labelPoint = getRadarPoint(12, angle);
              return (
                <g key={stat}>
                  <text
                    x={labelPoint.x}
                    y={labelPoint.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-white text-xs font-semibold"
                  >
                    {statIcons[stat as keyof typeof statIcons]}
                  </text>
                  <text
                    x={labelPoint.x}
                    y={labelPoint.y + 15}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-gray-300 text-xs"
                  >
                    {value}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Lista detalhada dos stats */}
      <div className="space-y-3">
        {Object.entries(stats).map(([stat, value]) => (
          <div key={stat} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl">
                {statIcons[stat as keyof typeof statIcons]}
              </span>
              <span className="text-white font-medium">
                {statNames[stat as keyof typeof statNames]}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-20 h-2 bg-gray-700 rounded-full">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${
                    statColors[stat as keyof typeof statColors]
                  } transition-all duration-500`}
                  style={{ width: `${Math.min(value * 10, 100)}%` }}
                />
              </div>
              <span className="text-white font-semibold w-8 text-right">
                {value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Estatísticas gerais */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Total de Pontos:</span>
          <span className="text-white font-semibold">{totalPoints}</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-gray-400">Stat Mais Alto:</span>
          <span className="text-white font-semibold">{maxStat}</span>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
