"use client";

import React from "react";

interface NavigationProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  setCurrentTab,
}) => {
  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "missions", label: "Missões" },
    { id: "skills", label: "Habilidades" },
    { id: "stats", label: "Status" },
    { id: "achievements", label: "Conquistas" },
    { id: "focus", label: "Foco" },
    { id: "wellness", label: "Bem-estar" },
  ];

  return (
    <div className="flex space-x-4 mb-8 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setCurrentTab(tab.id)}
          className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
            currentTab === tab.id
              ? "bg-purple-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Navigation;
