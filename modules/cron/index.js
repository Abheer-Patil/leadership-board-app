const cron = require("cron");
const {
  BookRankingManager,
  DepartmentRankingManager,
} = require("../../manager");

// Schedule hourly updates for book downloads
const hourlyUpdateJob = new cron.CronJob(
  "0 * * * *",
  BookRankingManager.updateBookRankings()
);

hourlyUpdateJob.start();

// Schedule daily updates for department rankings
const dailyUpdateJob = new cron.CronJob(
  "0 * * * *",
  DepartmentRankingManager.updateDepartmentRankings()
);

dailyUpdateJob.start();
