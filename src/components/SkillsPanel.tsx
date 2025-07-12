// components/SkillsPanel.tsx
import React from "react";
import { Skill } from "@/types";

interface SkillsPanelProps {
  skills: Skill[];
}

const SkillsPanel: React.FC<SkillsPanelProps> = ({ skills }) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      physical: "from-red-500 to-red-600",
      mental: "from-blue-500 to-blue-600",
      social: "from-green-500 to-green-600",
      technical: "from-purple-500 to-purple-600",
    };
    return (
      colors[category as keyof typeof colors] || "from-gray-500 to-gray-600"
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4">Habilidades</h3>
      <div className="space-y-3">
        {skills.map((skill) => (
          <div key={skill.id} className="bg-gray-700 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{skill.icon}</span>
                <span className="text-white font-semibold">{skill.name}</span>
              </div>
              <span className="text-sm text-gray-300">Lv.{skill.level}</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div
                className={`h-2 rounded-full bg-gradient-to-r ${getCategoryColor(
                  skill.category
                )}`}
                style={{
                  width: `${(skill.experience / (skill.level * 100)) * 100}%`,
                }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsPanel;
