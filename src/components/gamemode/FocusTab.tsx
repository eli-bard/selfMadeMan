"use client";

import React from "react";
import { Clock, Calendar, Target, Plus, CheckCircle } from "lucide-react";

interface FocusTabProps {
  pomodoroActive: boolean;
  pomodoroTime: number;
  startPomodoro: () => void;
  stopPomodoro: () => void;
  habitTracker: { [key: string]: boolean[] };
  toggleHabit: (habitName: string, dayIndex: number) => void;
  weeklyGoals: string[];
  showAddGoal: boolean;
  setShowAddGoal: (value: boolean) => void;
  newGoal: string;
  setNewGoal: (value: string) => void;
  addWeeklyGoal: () => void;
  removeWeeklyGoal: (index: number) => void;
}

const FocusTab: React.FC<FocusTabProps> = ({
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
}) => {
  return (
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
          {["Exercício", "Meditação", "Leitura", "Estudo"].map((habit) => (
            <div key={habit} className="flex items-center justify-between">
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
          ))}
        </div>
        <div className="mt-4 text-sm text-gray-400">
          <p>
            Clique nos círculos para marcar os dias que você completou cada
            hábito.
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
              Nenhuma meta semanal definida. Adicione uma meta para começar!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FocusTab;
