const dayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function sortRepeatDays(days: string[]) {
  const uniqueDays = Array.from(new Set(days));
  return uniqueDays.sort((a, b) => {
    const firstIndex = dayOrder.indexOf(a);
    const secondIndex = dayOrder.indexOf(b);
    return (firstIndex === -1 ? 99 : firstIndex) - (secondIndex === -1 ? 99 : secondIndex);
  });
}

export function formatRepeatDays(days: string[]) {
  const sortedDays = sortRepeatDays(days);
  if (sortedDays.length === 0) return 'Once';
  if (sortedDays.length === 7) return 'Every day';
  if (sortedDays.length === 5 && !sortedDays.includes('Sat') && !sortedDays.includes('Sun')) return 'Weekdays';
  if (sortedDays.length === 2 && sortedDays.includes('Sat') && sortedDays.includes('Sun')) return 'Weekends';
  return sortedDays.join(', ');
}
