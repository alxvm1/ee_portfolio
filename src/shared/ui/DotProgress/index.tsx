import { type FC } from "react";
import { cn } from "@shared/lib/utils";
import { type IDotProgressProps } from "./types";

export const DotProgress: FC<IDotProgressProps> = ({ value, max = 5 }) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={cn(
            "size-2 rounded-full",
            i < value ? "bg-foreground" : "bg-foreground/20",
          )}
        />
      ))}
    </div>
  );
};
