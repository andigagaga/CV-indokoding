export const calculateTimeDifference = (postedAt) => {
  const currentTime = new Date().getTime();
  const postedTime = new Date(postedAt).getTime();
  const differenceInMilliseconds = currentTime - postedTime;

  const minutes = Math.floor(differenceInMilliseconds / (1000 * 60));
  const hours = Math.floor(minutes / 60);

  if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours === 1) {
    return `${hours} hour ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else {
    return new Date(postedAt).toLocaleString();
  }
};
