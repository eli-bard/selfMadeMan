"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Trophy,
  Target,
  Brain,
  Zap,
  Star,
  Plus,
  CheckCircle,
  Clock,
  Award,
  Shield,
  Sword,
  Heart,
  BookOpen,
  Dumbbell,
  Calendar,
} from "lucide-react";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Skill {
  id: string;
  name: string;
  level: number;
  experience: number;
  maxExperience: number;
  category: string;
  description: string;
  icon: React.ReactNode;
}

interface Mission {
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

interface Stats {
  strength: number;
  intelligence: number;
  agility: number;
  endurance: number;
  charisma: number;
  wisdom: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  unlockedAt?: Date;
}

const PersonalDevelopmentGame: React.FC = () => {
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [totalExperience, setTotalExperience] = useState(0);
  const [maxExperience, setMaxExperience] = useState(100);
  const [statPoints, setStatPoints] = useState(5);
  const [skillPoints, setSkillPoints] = useState(3);
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [streak, setStreak] = useState(0);
  const [lastActivity, setLastActivity] = useState<Date | null>(null);

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

  // Novos recursos neurociência
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutos em segundos
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

  // Função para calcular XP necessário para próximo nível
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
      // Recompensa por completar pomodoro
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

    // Atualizar missão como completa
    setMissions((prev) =>
      prev.map((m) => (m.id === missionId ? { ...m, completed: true } : m))
    );

    // Adicionar XP
    const newExp = experience + mission.xpReward;
    const newTotalExp = totalExperience + mission.xpReward;
    setExperience(newExp);
    setTotalExperience(newTotalExp);

    // Verificar level up
    if (newExp >= maxExperience) {
      levelUp(newExp - maxExperience);
    }

    // Adicionar XP à habilidade se houver bônus
    if (mission.skillBonus) {
      updateSkillXP(mission.skillBonus.skillId, mission.skillBonus.xp);
    }

    // Atualizar streak
    updateStreak();

    // Verificar conquistas
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

    // Efeito visual de level up (pode ser expandido)
    console.log(`🎉 LEVEL UP! Você alcançou o nível ${newLevel}!`);
  };

  const updateSkillXP = (skillId: string, xpGain: number) => {
    setSkills((prev) =>
      prev.map((skill) => {
        if (skill.id === skillId) {
          const newXP = skill.experience + xpGain;
          if (newXP >= skill.maxExperience) {
            // Skill level up
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

    // Resetar campos
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

  const StatBar = ({
    label,
    value,
    maxValue,
    color,
  }: {
    label: string;
    value: number;
    maxValue: number;
    color: string;
  }) => (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-300">{label}</span>
        <span className="text-white font-semibold">
          {value}/{maxValue}
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${(value / maxValue) * 100}%` }}
        />
      </div>
    </div>
  );

  const allSkills = [...skills, ...customSkills];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
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
                <div className="text-2xl font-bold text-orange-400">
                  {streak}
                </div>
                <div className="text-sm text-gray-400">Dias Consecutivos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {statPoints}
                </div>
                <div className="text-sm text-gray-400">Pontos de Status</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {skillPoints}
                </div>
                <div className="text-sm text-gray-400">
                  Pontos de Habilidade
                </div>
              </div>
            </div>
          </div>

          {/* XP Bar */}
          <div className="mt-4">
            <StatBar
              label="Experiência"
              value={experience}
              maxValue={maxExperience}
              color="bg-gradient-to-r from-purple-500 to-blue-500"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex space-x-4 mb-8 overflow-x-auto">
          {[
            "dashboard",
            "missions",
            "skills",
            "stats",
            "achievements",
            "focus",
            "wellness",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                currentTab === tab
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {tab === "dashboard" && "Dashboard"}
              {tab === "missions" && "Missões"}
              {tab === "skills" && "Habilidades"}
              {tab === "stats" && "Status"}
              {tab === "achievements" && "Conquistas"}
              {tab === "focus" && "Foco"}
              {tab === "wellness" && "Bem-estar"}
            </button>
          ))}
        </div>

        {/* Content */}
        {currentTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Missões Ativas */}
            <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Missões Ativas
              </h3>
              <div className="space-y-3">
                {missions
                  .filter((m) => !m.completed)
                  .slice(0, 3)
                  .map((mission) => (
                    <div
                      key={mission.id}
                      className="bg-gray-700 rounded-lg p-3"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{mission.title}</h4>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            mission.difficulty === "Easy"
                              ? "bg-green-600"
                              : mission.difficulty === "Medium"
                              ? "bg-yellow-600"
                              : mission.difficulty === "Hard"
                              ? "bg-red-600"
                              : "bg-purple-600"
                          }`}
                        >
                          {mission.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mb-2">
                        {mission.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-purple-300">
                          +{mission.xpReward} XP
                        </span>
                        <button
                          onClick={() => completeMission(mission.id)}
                          className="text-xs bg-purple-600 hover:bg-purple-700 px-2 py-1 rounded"
                        >
                          Completar
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Top Skills */}
            <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Habilidades Principais
              </h3>
              <div className="space-y-3">
                {allSkills.slice(0, 3).map((skill) => (
                  <div key={skill.id} className="bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {skill.icon}
                        <span className="ml-2 font-medium text-sm">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-xs text-purple-300">
                        Nv. {skill.level}
                      </span>
                    </div>
                    <StatBar
                      label=""
                      value={skill.experience}
                      maxValue={skill.maxExperience}
                      color="bg-gradient-to-r from-blue-500 to-cyan-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Conquistas Recentes */}
            <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                Conquistas
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`bg-gray-700 rounded-lg p-3 ${
                      achievement.unlocked
                        ? "border-l-4 border-yellow-500"
                        : "opacity-50"
                    }`}
                  >
                    <div className="flex items-center">
                      {achievement.icon}
                      <div className="ml-2">
                        <div className="font-medium text-sm">
                          {achievement.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {achievement.description}
                        </div>
                      </div>
                      {achievement.unlocked && (
                        <CheckCircle className="w-4 h-4 text-green-400 ml-auto" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentTab === "missions" && (
          <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/30">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Todas as Missões</h3>
              <button
                onClick={() => setShowMissionCreator(true)}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Criar Nova Missão
              </button>
            </div>

            {showMissionCreator && (
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
                      onChange={(e) =>
                        setNewMissionDifficulty(e.target.value as any)
                      }
                      className="w-full bg-gray-600 rounded px-3 py-2"
                    >
                      <option value="Easy">Fácil</option>
                      <option value="Medium">Médio</option>
                      <option value="Hard">Difícil</option>
                      <option value="Epic">Épico</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">
                      Recompensa de XP
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={newMissionXpReward}
                      onChange={(e) =>
                        setNewMissionXpReward(Number(e.target.value))
                      }
                      className="w-full bg-gray-600 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Prioridade</label>
                    <select
                      value={newMissionPriority}
                      onChange={(e) =>
                        setNewMissionPriority(e.target.value as any)
                      }
                      className="w-full bg-gray-600 rounded px-3 py-2"
                    >
                      <option value="Low">Baixa</option>
                      <option value="Medium">Média</option>
                      <option value="High">Alta</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">
                      Prazo (opcional)
                    </label>
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
                        onChange={(e) =>
                          setSkillBonusXp(Number(e.target.value))
                        }
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
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {missions.map((mission) => (
                <div
                  key={mission.id}
                  className={`bg-gray-700 rounded-lg p-4 ${
                    mission.completed ? "opacity-50" : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold">{mission.title}</h4>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        mission.difficulty === "Easy"
                          ? "bg-green-600"
                          : mission.difficulty === "Medium"
                          ? "bg-yellow-600"
                          : mission.difficulty === "Hard"
                          ? "bg-red-600"
                          : "bg-purple-600"
                      }`}
                    >
                      {mission.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    {mission.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span className="text-purple-300">
                        +{mission.xpReward} XP
                      </span>
                      {mission.skillBonus && (
                        <span className="text-blue-300 ml-2">
                          +{mission.skillBonus.xp} Skill XP
                        </span>
                      )}
                    </div>
                    {!mission.completed && (
                      <button
                        onClick={() => completeMission(mission.id)}
                        className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-sm"
                      >
                        Completar
                      </button>
                    )}
                    {mission.completed && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentTab === "skills" && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/30">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Habilidades</h3>
                <button
                  onClick={() => setShowSkillCreator(true)}
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded flex items-center"
                  disabled={skillPoints < 3}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Habilidade (3 pontos)
                </button>
              </div>

              {showSkillCreator && (
                <div className="bg-gray-700 rounded-lg p-4 mb-4">
                  <h4 className="font-bold mb-3">Criar Nova Habilidade</h4>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <input
                      type="text"
                      placeholder="Nome da habilidade"
                      value={newSkillName}
                      onChange={(e) => setNewSkillName(e.target.value)}
                      className="bg-gray-600 rounded px-3 py-2"
                    />
                    <input
                      type="text"
                      placeholder="Categoria"
                      value={newSkillCategory}
                      onChange={(e) => setNewSkillCategory(e.target.value)}
                      className="bg-gray-600 rounded px-3 py-2"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={createCustomSkill}
                      className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
                    >
                      Criar
                    </button>
                    <button
                      onClick={() => setShowSkillCreator(false)}
                      className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-sm"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allSkills.map((skill) => (
                  <div key={skill.id} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {skill.icon}
                        <span className="ml-2 font-bold">{skill.name}</span>
                      </div>
                      <span className="text-purple-300">Nv. {skill.level}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">
                      {skill.description}
                    </p>
                    <div className="text-xs text-blue-300 mb-2">
                      Categoria: {skill.category}
                    </div>
                    <StatBar
                      label="Progresso"
                      value={skill.experience}
                      maxValue={skill.maxExperience}
                      color="bg-gradient-to-r from-blue-500 to-cyan-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentTab === "stats" && (
          <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/30">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Status do Personagem</h3>
              <div className="text-purple-300">
                Pontos disponíveis: {statPoints}
              </div>
            </div>

            {/* Adicionei o gráfico de aranha aqui */}
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
                      {statName === "strength" && (
                        <Sword className="w-5 h-5 mr-2" />
                      )}
                      {statName === "intelligence" && (
                        <Brain className="w-5 h-5 mr-2" />
                      )}
                      {statName === "agility" && (
                        <Zap className="w-5 h-5 mr-2" />
                      )}
                      {statName === "endurance" && (
                        <Shield className="w-5 h-5 mr-2" />
                      )}
                      {statName === "charisma" && (
                        <Heart className="w-5 h-5 mr-2" />
                      )}
                      {statName === "wisdom" && (
                        <BookOpen className="w-5 h-5 mr-2" />
                      )}
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
                      <span className="text-2xl font-bold mr-2">
                        {statValue}
                      </span>
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
        )}

        {currentTab === "achievements" && (
          <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/30">
            <h3 className="text-xl font-bold mb-4">Conquistas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`bg-gray-700 rounded-lg p-4 ${
                    achievement.unlocked
                      ? "border-2 border-yellow-500 bg-gradient-to-br from-gray-700 to-yellow-900/20"
                      : "opacity-50"
                  }`}
                >
                  <div className="flex items-center mb-2">
                    {achievement.icon}
                    <span className="ml-2 font-bold">{achievement.name}</span>
                    {achievement.unlocked && (
                      <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
                    )}
                  </div>
                  <p className="text-sm text-gray-400">
                    {achievement.description}
                  </p>
                  {achievement.unlocked && achievement.unlockedAt && (
                    <p className="text-xs text-yellow-400 mt-2">
                      Desbloqueado em{" "}
                      {achievement.unlockedAt.toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {currentTab === "focus" && (
          <div className="space-y-6">
            {/* Pomodoro Timer */}
            <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Técnica Pomodoro
              </h3>
              <div className="text-center">
                <div className="text-6xl font-bold text-purple-400 mb-4">
                  {Math.floor(pomodoroTime / 60)
                    .toString()
                    .padStart(2, "0")}
                  :{(pomodoroTime % 60).toString().padStart(2, "0")}
                </div>
                <div className="space-x-4">
                  <button
                    onClick={startPomodoro}
                    disabled={pomodoroActive}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-6 py-2 rounded-lg"
                  >
                    Iniciar Foco
                  </button>
                  <button
                    onClick={stopPomodoro}
                    className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg"
                  >
                    Parar
                  </button>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Complete um pomodoro e ganhe +25 XP
                </p>
              </div>
            </div>

            {/* Habit Tracker */}
            <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Rastreador de Hábitos (Última Semana)
              </h3>
              <div className="space-y-4">
                {["Exercício", "Meditação", "Leitura", "Estudo"].map(
                  (habit) => (
                    <div
                      key={habit}
                      className="flex items-center justify-between"
                    >
                      <span className="font-medium">{habit}</span>
                      <div className="flex space-x-2">
                        {Array(7)
                          .fill(0)
                          .map((_, dayIndex) => (
                            <button
                              key={dayIndex}
                              onClick={() => toggleHabit(habit, dayIndex)}
                              className={`w-8 h-8 rounded-full border-2 ${
                                habitTracker[habit]?.[dayIndex]
                                  ? "bg-green-500 border-green-500"
                                  : "border-gray-500 hover:border-gray-400"
                              }`}
                            >
                              {habitTracker[habit]?.[dayIndex] && (
                                <CheckCircle className="w-4 h-4 text-white mx-auto" />
                              )}
                            </button>
                          ))}
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="mt-4 text-sm text-gray-400">
                <p>
                  Clique nos círculos para marcar os dias que você completou
                  cada hábito.
                </p>
              </div>
            </div>

            {/* Weekly Goals */}
            <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/30">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Metas Semanais
                </h3>
                <button
                  onClick={() => setShowAddGoal(true)}
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Meta
                </button>
              </div>

              {showAddGoal && (
                <div className="bg-gray-700 rounded-lg p-4 mb-4">
                  <input
                    type="text"
                    placeholder="Digite sua meta semanal..."
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    className="w-full bg-gray-600 rounded px-3 py-2 mb-3"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={addWeeklyGoal}
                      className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
                    >
                      Adicionar
                    </button>
                    <button
                      onClick={() => setShowAddGoal(false)}
                      className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-sm"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {weeklyGoals.map((goal, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-700 rounded-lg p-3"
                  >
                    <span>{goal}</span>
                    <button
                      onClick={() => removeWeeklyGoal(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {weeklyGoals.length === 0 && (
                  <p className="text-gray-400 text-center py-4">
                    Nenhuma meta semanal definida. Adicione uma meta para
                    começar!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {currentTab === "wellness" && (
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
                  <strong>Dica:</strong> Monitorar humor e energia ajuda a
                  identificar padrões e otimizar seu desempenho ao longo do
                  tempo.
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
                  A reflexão diária melhora a metacognição e acelera o
                  aprendizado.
                </p>
                <button
                  onClick={() => {
                    if (reflectionEntry.trim()) {
                      setExperience((prev) => prev + 20);
                      setTotalExperience((prev) => prev + 20);
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
                    Pratique habilidades por 15-20 minutos diariamente. A
                    repetição espaçada fortalece conexões neurais.
                  </p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="font-bold text-blue-400 mb-2">
                    💤 Sono e Memória
                  </h4>
                  <p className="text-sm text-gray-300">
                    7-9 horas de sono consolidam memórias. Revise material antes
                    de dormir para melhor retenção.
                  </p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="font-bold text-purple-400 mb-2">
                    🎯 Foco e Atenção
                  </h4>
                  <p className="text-sm text-gray-300">
                    Use a técnica Pomodoro. Períodos focados de 25 minutos
                    maximizam a concentração e produtividade.
                  </p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="font-bold text-red-400 mb-2">
                    🏃 Exercício Físico
                  </h4>
                  <p className="text-sm text-gray-300">
                    20 minutos de exercício aumentam BDNF (fator neurotrófico),
                    melhorando aprendizado e memória.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalDevelopmentGame;
