export const formatTime = (totalSeconds) => {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const formatDurationFriendly = (totalSeconds) => {
  if (!totalSeconds) return '0 min';
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  if (hrs > 0) {
    return `${hrs}h ${mins}m`;
  }
  return `${mins} min`;
};

export const calculateStreak = (sessions) => {
  if (!sessions || sessions.length === 0) return 0;
  
  // Extract unique dates of sessions in local date string format
  const dates = sessions
    .map(s => {
      const d = new Date(s.timestamp);
      return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    })
    .filter((value, index, self) => self.findIndex(d => d.getTime() === value.getTime()) === index);
    
  // Sort dates descending
  dates.sort((a, b) => b.getTime() - a.getTime());
  
  const today = new Date();
  const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  const yesterday = new Date(todayDateOnly);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const mostRecentSessionDate = dates[0];
  if (!mostRecentSessionDate) return 0;
  
  if (mostRecentSessionDate.getTime() !== todayDateOnly.getTime() && mostRecentSessionDate.getTime() !== yesterday.getTime()) {
    return 0; // Streak broken
  }
  
  let streak = 1;
  let currentDate = mostRecentSessionDate;
  
  for (let i = 1; i < dates.length; i++) {
    const expectedPrevDate = new Date(currentDate);
    expectedPrevDate.setDate(expectedPrevDate.getDate() - 1);
    
    const checkDate = dates[i];
    
    if (checkDate.getTime() === expectedPrevDate.getTime()) {
      streak++;
      currentDate = checkDate;
    } else {
      break;
    }
  }
  
  return streak;
};

export default {
  formatTime,
  formatDurationFriendly,
  calculateStreak,
};
