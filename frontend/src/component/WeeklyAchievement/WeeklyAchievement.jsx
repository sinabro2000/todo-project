import React from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import "./WeeklyAchievement.css";

dayjs.extend(isoWeek);

const WeeklyAchievement = ({ todos, value }) => {
  const getWeeklyAchievements = () => {
    const startOfMonth = dayjs(value).startOf("month");
    const endOfMonth = dayjs(value).endOf("month");

    const weeks = [];
    let weekStart = startOfMonth.startOf("isoWeek");
    let weekEnd = weekStart.endOf("isoWeek");
    let weekIndex = 1;

    while (weekStart.isBefore(endOfMonth)) {
      const weeklyTodos = todos.filter(todo => {
        const todoDate = dayjs(todo.date);
        return todoDate.isAfter(weekStart.subtract(1, "day")) &&
               todoDate.isBefore(weekEnd.add(1, "day"));
      });

      const completedCount = weeklyTodos.filter(t => t.done).length;
      const achievement = weeklyTodos.length > 0
        ? Math.round((completedCount / weeklyTodos.length) * 100)
        : 0;

      weeks.push({ week: weekIndex, achievement });
      weekStart = weekStart.add(1, "week");
      weekEnd = weekStart.endOf("isoWeek");
      weekIndex++;
    }

    return weeks;
  };

  const weeklyData = getWeeklyAchievements();

  return (
    <div id="weekly-achievement-graph">
      <span id="weekly-label">주간 성취도</span>
      {weeklyData.map(week => (
        <div key={week.week} className="week-bar">
          <div className="bar" style={{ width: `${week.achievement}%` }}>
            <span className="label">{week.achievement}%</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyAchievement;