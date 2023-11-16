export default function calculateAgeFromDate(formattedDate: any) {
  const currentDate = new Date();
  const formattedDateObj = new Date(formattedDate);
  const currentTime = currentDate.getTime();
  const formattedTime = formattedDateObj.getTime();

  // Calculate the time difference in milliseconds
  const timeDifference = currentTime - formattedTime;

  const minuteThreshold = 60 * 1000; // 1 minute
  const hourThreshold = 60 * minuteThreshold; // 1 hour

  // Calculate the difference in hours
  if (timeDifference < minuteThreshold) {
    return "a few seconds ago";
  } else if (timeDifference < hourThreshold) {
    const minutes = Math.floor(timeDifference / minuteThreshold);
    return "a few minutes ago ";
    // (${minutes} minute${minutes > 1 ? "s" : ""} ago)
    // `;
  }

  // Calculate the difference in hours
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));

  if (hours < 1) {
    return `a few minutes ago`; // This condition is for older posts within an hour
  } else if (hours < 24) {
    return "a few hours ago";
    // (${hours} hour${hours > 1 ? "s" : ""} ago)
    // `;
  }

  // For posts older than 24 hours, display the actual aging date in days
  const days = Math.floor(hours / 24);
  return ` ${days} day${days > 1 ? "s" : ""} ago`;
}
