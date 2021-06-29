module.exports = {
  remainingDays(job) {
    const remainingDaysInitial = (job["total-hours"] / job["daily-hours"]).toFixed();

    const createdDate = new Date(job.createdAt);
    const dueDay = createdDate.getDate() + Number(remainingDaysInitial);
    const dueDateInMs = createdDate.setDate(dueDay);

    const timeDifferenceInMS = dueDateInMs - Date.now();

    const dayInMs = 1000 * 60 * 60 * 24;

    const dayDifference = Math.floor(timeDifferenceInMS / dayInMs);

    //restam x dias
    return dayDifference;
  },

  calculateBudget: (job, valueHour) => valueHour * job["total-hours"],
};
