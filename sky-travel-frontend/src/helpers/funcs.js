export const calcTimeDiff = (start, end) => {
  const date1 = new Date(start); // Replace with your first date
  const date2 = new Date(end); // Replace with your second date

  const diffInMilliseconds = Math.abs(date2 - date1);
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(
    (diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );

  return `${diffInHours}h ${diffInMinutes > 0 ? ` ${diffInMinutes}m` : ""}`;
};
