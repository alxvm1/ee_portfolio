import { type FC } from "react";
import { type ICircularProgressProps } from "./types";

export const CircularProgress: FC<ICircularProgressProps> = ({
  value,
  size = 166,
  strokeWidth = 6,
  label,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = value >= 80 ? "#8bb220" : "#555555";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#333"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          style={{
            fontFamily: "var(--font-bounded)",
            fontSize: 20,
            color: "#ffffff",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "var(--font-gothic)",
            fontSize: 20,
            color: "#aaaaaa",
          }}
        >
          {value}%
        </span>
      </div>
    </div>
  );
};
