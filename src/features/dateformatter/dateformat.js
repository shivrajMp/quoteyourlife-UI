export const formatDateDifference = (timestamp) => {
  const utcDate = new Date(timestamp+'z'); // Parse the UTC timestamp
  const localDate = new Date(utcDate.toLocaleString()); // Convert to local time

  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - localDate.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000) > 0 ? Math.floor(timeDifference / 1000) : 1;

  if (secondsDifference < 60) {
    return `${secondsDifference} seconds ago`;
  }

  const minutesDifference = Math.floor(secondsDifference / 60);
  if (minutesDifference < 60) {
    return `${minutesDifference} minutes ago`;
  }

  const hoursDifference = Math.floor(minutesDifference / 60);
  if (hoursDifference < 24) {
    return `${hoursDifference} hours ago`;
  }

  const daysDifference = Math.floor(hoursDifference / 24);
  if (daysDifference < 365) {
    return `${daysDifference} days ago`;
  }

  const yearsDifference = Math.floor(daysDifference / 365);
  return `${yearsDifference} years ago`;
};
