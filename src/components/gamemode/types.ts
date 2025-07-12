import { ReactNode } from "react";

export interface Skill {
  id: string;
  name: string;
  level: number;
  experience: number;
  maxExperience: number;
  category: string;
  description: string;
  icon: ReactNode;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Epic";
  xpReward: number;
  skillBonus?: { skillId: string; xp: number };
  completed: boolean;
  deadline?: Date;
  priority: "Low" | "Medium" | "High";
}

export interface Stats {
  strength: number;
  intelligence: number;
  agility: number;
  endurance: number;
  charisma: number;
  wisdom: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface StatBarProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
}

export interface DashboardTabProps {
  missions: Mission[];
  completeMission: (id: string) => void;
  skills: Skill[];
  customSkills: Skill[];
  achievements: Achievement[];
}
