import { useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HeatmapDay {
  date: string;
  count: number;
}

interface Props {
  data?: HeatmapDay[];
}

const generateMockData = (): HeatmapDay[] => {
  const days = 365;
  const today = new Date();
  const result: HeatmapDay[] = [];

  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);

    result.push({
      date: d.toISOString().split("T")[0],
      count: Math.floor(Math.random() * 5),
    });
  }

  return result.reverse();
};

export default function StreakCalendar({ data }: Props) {
  const heatmapData = data || generateMockData();

  // Convert into weeks
  const { weeks, monthLabels } = useMemo(() => {
    const weeks: HeatmapDay[][] = [];
    const monthLabels: { index: number; label: string }[] = [];

    let currentWeek: HeatmapDay[] = [];

    heatmapData.forEach((day, i) => {
      const date = new Date(day.date);

      // Add month label at start of new month
      if (date.getDate() === 1) {
        monthLabels.push({
          index: weeks.length,
          label: date.toLocaleString("default", { month: "short" }),
        });
      }

      currentWeek.push(day);

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length) weeks.push(currentWeek);

    return { weeks, monthLabels };
  }, [heatmapData]);

  const getColor = (count: number) => {
    if (count === 0) return "bg-slate-700/40";
    if (count === 1) return "bg-green-900";
    if (count === 2) return "bg-green-700";
    if (count === 3) return "bg-green-500";
    return "bg-green-400";
  };

  return (
    <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-lg font-semibold">
          269 submissions in the past one year
        </h2>

        <div className="text-sm text-gray-400 flex gap-4">
          <span>Total active days: 77</span>
          <span>Max streak: 13</span>
        </div>
      </div>

      <TooltipProvider>
        <div className="overflow-x-auto">

          {/* Month Labels */}
          <div className="flex gap-[3px] mb-2 min-w-max text-xs text-gray-400">
            {weeks.map((_, i) => {
              const month = monthLabels.find((m) => m.index === i);
              return (
                <div key={i} className="w-3 text-center">
                  {month ? month.label : ""}
                </div>
              );
            })}
          </div>

          {/* Heatmap */}
          <div className="flex gap-[3px] min-w-max">
            {weeks.map((week, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {week.map((day, j) => (
                  <Tooltip key={j}>
                    <TooltipTrigger asChild>
                      <div
                        className={`w-3 h-3 rounded-[2px] ${getColor(
                          day.count
                        )} hover:scale-125 transition`}
                      />
                    </TooltipTrigger>

                    <TooltipContent>
                      <p className="text-xs">
                        {day.count} submissions on {day.date}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            ))}
          </div>
        </div>
      </TooltipProvider>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-400">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-slate-700/40 rounded-sm" />
          <div className="w-3 h-3 bg-green-900 rounded-sm" />
          <div className="w-3 h-3 bg-green-700 rounded-sm" />
          <div className="w-3 h-3 bg-green-500 rounded-sm" />
          <div className="w-3 h-3 bg-green-400 rounded-sm" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}