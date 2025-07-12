"use client";

import React from "react";
import { StatBarProps } from "./types";

const StatBar: React.FC<StatBarProps> = ({ label, value, maxValue, color }) => (
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

export default StatBar;
