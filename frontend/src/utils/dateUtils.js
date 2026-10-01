import {
  startOfWeek,
  endOfWeek,
  format,
  getISOWeek,
  getYear,
  isSameDay,
  parseISO,
} from 'date-fns';

/**
 * Returns Monday 00:00:00 of the ISO week for a given date
 */
export const getMondayOfWeek = (dateInput) => {
  const date = typeof dateInput === 'string' ? parseISO(dateInput) : new Date(dateInput);
  return startOfWeek(date, { weekStartsOn: 1 }); // 1 = Monday
};

/**
 * Returns Sunday 23:59:59 of the ISO week for a given date
 */
export const getSundayOfWeek = (dateInput) => {
  const date = typeof dateInput === 'string' ? parseISO(dateInput) : new Date(dateInput);
  return endOfWeek(date, { weekStartsOn: 1 }); // 1 = Monday
};

/**
 * Formats date range label (e.g. "Week 40 • Oct 05 – Oct 11, 2026")
 */
export const formatWeekRange = (monday, sunday) => {
  const weekNumber = getISOWeek(monday);
  const startStr = format(monday, 'MMM dd');
  const endStr = format(sunday, 'MMM dd, yyyy');
  return `Week ${weekNumber} • ${startStr} – ${endStr}`;
};

/**
 * Groups tasks into sorted week buckets (Monday to Sunday)
 */
export const groupTasksByWeek = (tasks = []) => {
  const weeksMap = new Map();

  tasks.forEach((task) => {
    const taskDate = task.dateTime ? new Date(task.dateTime) : new Date();
    const monday = getMondayOfWeek(taskDate);
    const sunday = getSundayOfWeek(taskDate);
    
    // Unique key per week using year and ISO week
    const year = getYear(monday);
    const weekNo = getISOWeek(monday);
    const key = `${year}-W${String(weekNo).padStart(2, '0')}`;

    if (!weeksMap.has(key)) {
      weeksMap.set(key, {
        key,
        year,
        weekNo,
        monday,
        sunday,
        label: formatWeekRange(monday, sunday),
        tasks: [],
        openCount: 0,
        completedCount: 0,
      });
    }

    const weekGroup = weeksMap.get(key);
    weekGroup.tasks.push(task);
    if (task.status === 'Completed') {
      weekGroup.completedCount += 1;
    } else {
      weekGroup.openCount += 1;
    }
  });

  // Sort tasks within each week by dateTime ascending
  weeksMap.forEach((weekGroup) => {
    weekGroup.tasks.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
  });

  // Convert map to array and sort weeks chronologically ascending
  const weekList = Array.from(weeksMap.values()).sort(
    (a, b) => a.monday.getTime() - b.monday.getTime()
  );

  return weekList;
};
