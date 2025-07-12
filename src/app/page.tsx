"use client";

import React, { useState, useEffect } from "react";
import { Trophy, Brain, Star, Award, BookOpen, Dumbbell } from "lucide-react";

import Header from "@/components/gamemode/Header";
import Navigation from "@/components/gamemode/Navigation";
import DashboardTab from "@/components/gamemode/DashboardTab";
import MissionsTab from "@/components/gamemode/MissionsTab";
import SkillsTab from "@/components/gamemode/SkillsTab";
import StatsTab from "@/components/gamemode/StatsTab";
import AchievementsTab from "@/components/gamemode/AchievementsTab";
import FocusTab from "@/components/gamemode/FocusTab";
import WellnessTab from "@/components/gamemode/WellnessTab";

import {
  Skill,
  Mission,
  Stats,
  Achievement,
} from "@/components/gamemode/types";

const PersonalDevelopmentGame: React.FC = () => {
  // Estados principais
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [totalExperience, setTotalExperience] = useState(0);
  const [maxExperience, setMaxExperience] = useState(100);
  const [statPoints, setStatPoints] = useState(5);
  const [skillPoints, setSkillPoints] = useState(3);
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [streak, setStreak] = useState(0);
  const [lastActivity, setLastActivity] = useState<Date | null>(null);

  // Estados de personagem
  const [stats, setStats] = useState<Stats>({
    strength: 10,
    intelligence: 10,
    agility: 10,
    endurance: 10,
    charisma: 10,
    wisdom: 10,
  });

  const [skills, setSkills] = useState<Skill[]>([
    {
      id: "programming",
      name: "Programação",
      level: 1,
      experience: 0,
      maxExperience: 100,
      category: "Técnica",
      description: "Habilidade em desenvolvimento de software",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      id: "fitness",
      name: "Condicionamento Físico",
      level: 1,
      experience: 0,
      maxExperience: 100,
      category: "Físico",
      description: "Força física e resistência",
      icon: <Dumbbell className="w-5 h-5" />,
    },
    {
      id: "mindfulness",
      name: "Mindfulness",
      level: 1,
      experience: 0,
      maxExperience: 100,
      category: "Mental",
      description: "Consciência plena e meditação",
      icon: <Brain className="w-5 h-5" />,
    },
  ]);

  const [missions, setMissions] = useState<Mission[]>([
    {
      id: "1",
      title: "Estudar programação por 1 hora",
      description: "Dedicar 1 hora para estudar conceitos de programação",
      category: "Educação",
      difficulty: "Easy",
      xpReward: 50,
      skillBonus: { skillId: "programming", xp: 25 },
      completed: false,
      priority: "Medium",
    },
    {
      id: "2",
      title: "Exercitar-se por 30 minutos",
      description: "Realizar atividade física por pelo menos 30 minutos",
      category: "Saúde",
      difficulty: "Medium",
      xpReward: 75,
      skillBonus: { skillId: "fitness", xp: 30 },
      completed: false,
      priority: "High",
    },
    {
      id: "3",
      title: "Meditar por 15 minutos",
      description: "Praticar meditação mindfulness",
      category: "Bem-estar",
      difficulty: "Easy",
      xpReward: 40,
      skillBonus: { skillId: "mindfulness", xp: 20 },
      completed: false,
      priority: "Medium",
    },
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "first_mission",
      name: "Primeira Missão",
      description: "Complete sua primeira missão",
      icon: <Trophy className="w-5 h-5" />,
      unlocked: false,
    },
    {
      id: "level_up",
      name: "Subindo de Nível",
      description: "Alcance o nível 2",
      icon: <Star className="w-5 h-5" />,
      unlocked: false,
    },
    {
      id: "streak_7",
      name: "Sequência de 7 Dias",
      description: "Mantenha uma sequência de 7 dias",
      icon: <Award className="w-5 h-5" />,
      unlocked: false,
    },
  ]);

  const radarData = [
    { attribute: "Força", value: stats.strength, fullMark: 50 },
    { attribute: "Inteligência", value: stats.intelligence, fullMark: 50 },
    { attribute: "Agilidade", value: stats.agility, fullMark: 50 },
    { attribute: "Resistência", value: stats.endurance, fullMark: 50 },
    { attribute: "Carisma", value: stats.charisma, fullMark: 50 },
    { attribute: "Sabedoria", value: stats.wisdom, fullMark: 50 },
  ];

  const [customSkills, setCustomSkills] = useState<Skill[]>([]);
  const [showSkillCreator, setShowSkillCreator] = useState(false);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillCategory, setNewSkillCategory] = useState("");

  // Recursos de neurociência
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [habitTracker, setHabitTracker] = useState<{
    [key: string]: boolean[];
  }>({});
  const [moodScore, setMoodScore] = useState(5);
  const [energyLevel, setEnergyLevel] = useState(5);
  const [reflectionEntry, setReflectionEntry] = useState("");
  const [weeklyGoals, setWeeklyGoals] = useState<string[]>([]);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState("");

  // Estados para criação de missões
  const [showMissionCreator, setShowMissionCreator] = useState(false);
  const [newMissionTitle, setNewMissionTitle] = useState("");
  const [newMissionDescription, setNewMissionDescription] = useState("");
  const [newMissionCategory, setNewMissionCategory] = useState("Educação");
  const [newMissionDifficulty, setNewMissionDifficulty] = useState<
    "Easy" | "Medium" | "Hard" | "Epic"
  >("Easy");
  const [newMissionXpReward, setNewMissionXpReward] = useState(50);
  const [newMissionPriority, setNewMissionPriority] = useState<
    "Low" | "Medium" | "High"
  >("Medium");
  const [newMissionDeadline, setNewMissionDeadline] = useState("");
  const [selectedSkillBonus, setSelectedSkillBonus] = useState("");
  const [skillBonusXp, setSkillBonusXp] = useState(0);

  // Funções auxiliares
  const calculateXPForLevel = (level: number) => {
    return Math.floor(100 * Math.pow(1.5, level - 1));
  };

  // Pomodoro Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (pomodoroActive && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime((prev) => prev - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setPomodoroActive(false);
      setExperience((prev) => prev + 25);
      setTotalExperience((prev) => prev + 25);
      setPomodoroTime(25 * 60);
    }
    return () => clearInterval(interval);
  }, [pomodoroActive, pomodoroTime]);

  const startPomodoro = () => {
    setPomodoroActive(true);
    setPomodoroTime(25 * 60);
  };

  const stopPomodoro = () => {
    setPomodoroActive(false);
    setPomodoroTime(25 * 60);
  };

  // Habit Tracker
  const toggleHabit = (habitName: string, dayIndex: number) => {
    setHabitTracker((prev) => ({
      ...prev,
      [habitName]: prev[habitName]
        ? prev[habitName].map((checked, i) =>
            i === dayIndex ? !checked : checked
          )
        : Array(7)
            .fill(false)
            .map((_, i) => i === dayIndex),
    }));
  };

  const addWeeklyGoal = () => {
    if (newGoal.trim()) {
      setWeeklyGoals((prev) => [...prev, newGoal.trim()]);
      setNewGoal("");
      setShowAddGoal(false);
    }
  };

  const removeWeeklyGoal = (index: number) => {
    setWeeklyGoals((prev) => prev.filter((_, i) => i !== index));
  };

  // Função para completar missão
  const completeMission = (missionId: string) => {
    const mission = missions.find((m) => m.id === missionId);
    if (!mission || mission.completed) return;

    setMissions((prev) =>
      prev.map((m) => (m.id === missionId ? { ...m, completed: true } : m))
    );

    const newExp = experience + mission.xpReward;
    const newTotalExp = totalExperience + mission.xpReward;
    setExperience(newExp);
    setTotalExperience(newTotalExp);

    if (newExp >= maxExperience) {
      levelUp(newExp - maxExperience);
    }

    if (mission.skillBonus) {
      updateSkillXP(mission.skillBonus.skillId, mission.skillBonus.xp);
    }

    updateStreak();
    checkAchievements();
  };

  const levelUp = (remainingXP: number) => {
    const newLevel = level + 1;
    const newMaxXP = calculateXPForLevel(newLevel);

    setLevel(newLevel);
    setExperience(remainingXP);
    setMaxExperience(newMaxXP);
    setStatPoints((prev) => prev + 3);
    setSkillPoints((prev) => prev + 2);

    console.log(`🎉 LEVEL UP! Você alcançou o nível ${newLevel}!`);
  };

  const updateSkillXP = (skillId: string, xpGain: number) => {
    setSkills((prev) =>
      prev.map((skill) => {
        if (skill.id === skillId) {
          const newXP = skill.experience + xpGain;
          if (newXP >= skill.maxExperience) {
            return {
              ...skill,
              level: skill.level + 1,
              experience: newXP - skill.maxExperience,
              maxExperience: Math.floor(skill.maxExperience * 1.3),
            };
          }
          return { ...skill, experience: newXP };
        }
        return skill;
      })
    );
  };

  const updateStreak = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (!lastActivity) {
      setStreak(1);
    } else if (lastActivity.toDateString() === yesterday.toDateString()) {
      setStreak((prev) => prev + 1);
    } else if (lastActivity.toDateString() !== today.toDateString()) {
      setStreak(1);
    }

    setLastActivity(today);
  };

  const checkAchievements = () => {
    setAchievements((prev) =>
      prev.map((achievement) => {
        if (achievement.unlocked) return achievement;

        switch (achievement.id) {
          case "first_mission":
            if (missions.some((m) => m.completed)) {
              return { ...achievement, unlocked: true, unlockedAt: new Date() };
            }
            break;
          case "level_up":
            if (level >= 2) {
              return { ...achievement, unlocked: true, unlockedAt: new Date() };
            }
            break;
          case "streak_7":
            if (streak >= 7) {
              return { ...achievement, unlocked: true, unlockedAt: new Date() };
            }
            break;
        }
        return achievement;
      })
    );
  };

  const increaseStat = (statName: keyof Stats) => {
    if (statPoints > 0) {
      setStats((prev) => ({ ...prev, [statName]: prev[statName] + 1 }));
      setStatPoints((prev) => prev - 1);
    }
  };

  const createCustomSkill = () => {
    if (newSkillName.trim() && newSkillCategory.trim() && skillPoints >= 3) {
      const newSkill: Skill = {
        id: `custom_${Date.now()}`,
        name: newSkillName,
        level: 1,
        experience: 0,
        maxExperience: 100,
        category: newSkillCategory,
        description: `Habilidade personalizada: ${newSkillName}`,
        icon: <Star className="w-5 h-5" />,
      };

      setCustomSkills((prev) => [...prev, newSkill]);
      setSkillPoints((prev) => prev - 3);
      setNewSkillName("");
      setNewSkillCategory("");
      setShowSkillCreator(false);
    }
  };

  const createNewMission = () => {
    if (!newMissionTitle.trim()) return;

    const newMission: Mission = {
      id: `mission_${Date.now()}`,
      title: newMissionTitle,
      description: newMissionDescription,
      category: newMissionCategory,
      difficulty: newMissionDifficulty,
      xpReward: newMissionXpReward,
      priority: newMissionPriority,
      completed: false,
      deadline: newMissionDeadline ? new Date(newMissionDeadline) : undefined,
      skillBonus:
        selectedSkillBonus && skillBonusXp > 0
          ? { skillId: selectedSkillBonus, xp: skillBonusXp }
          : undefined,
    };

    setMissions((prev) => [...prev, newMission]);

    setNewMissionTitle("");
    setNewMissionDescription("");
    setNewMissionCategory("Educação");
    setNewMissionDifficulty("Easy");
    setNewMissionXpReward(50);
    setNewMissionPriority("Medium");
    setNewMissionDeadline("");
    setSelectedSkillBonus("");
    setSkillBonusXp(0);
    setShowMissionCreator(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <Header
          {...{
            level,
            totalExperience,
            streak,
            statPoints,
            skillPoints,
            experience,
            maxExperience,
          }}
        />

        <Navigation currentTab={currentTab} setCurrentTab={setCurrentTab} />

        {currentTab === "dashboard" && (
          <DashboardTab
            {...{
              missions,
              completeMission,
              skills,
              customSkills,
              achievements,
            }}
          />
        )}

        {currentTab === "missions" && (
          <MissionsTab
            {...{
              missions,
              completeMission,
              showMissionCreator,
              setShowMissionCreator,
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
              skills,
              customSkills,
            }}
          />
        )}

        {currentTab === "skills" && (
          <SkillsTab
            {...{
              skills,
              customSkills,
              showSkillCreator,
              setShowSkillCreator,
              newSkillName,
              setNewSkillName,
              newSkillCategory,
              setNewSkillCategory,
              createCustomSkill,
              skillPoints,
            }}
          />
        )}

        {currentTab === "stats" && (
          <StatsTab
            {...{
              stats,
              statPoints,
              increaseStat,
              radarData,
            }}
          />
        )}

        {currentTab === "achievements" && (
          <AchievementsTab
            {...{
              achievements,
            }}
          />
        )}

        {currentTab === "focus" && (
          <FocusTab
            {...{
              pomodoroActive,
              pomodoroTime,
              startPomodoro,
              stopPomodoro,
              habitTracker,
              toggleHabit,
              weeklyGoals,
              showAddGoal,
              setShowAddGoal,
              newGoal,
              setNewGoal,
              addWeeklyGoal,
              removeWeeklyGoal,
            }}
          />
        )}

        {currentTab === "wellness" && (
          <WellnessTab
            {...{
              moodScore,
              setMoodScore,
              energyLevel,
              setEnergyLevel,
              reflectionEntry,
              setReflectionEntry,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PersonalDevelopmentGame;
