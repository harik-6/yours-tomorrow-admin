import dayjs from "dayjs";

const Utils = {
  getTimeDiffInMinutes: (startTime, endTime) => {
    if ((startTime || null) === null || (endTime || null) === null) return 0;
    const diff = dayjs(endTime).diff(dayjs(startTime));
    console.log(diff / 60000);
    return (diff / 60000);
  }
};
export default Utils;
