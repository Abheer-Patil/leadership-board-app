const logQueries = require("../../Dao/BookDownloadLogs");
const db = require("../../config/Db");

class LogDaoService {
  static async createLog({ bookId, bookName, department, downloadedBy }) {
    try {
      const result = await db.query(logQueries.INSERT_INTO_LOGS, [
        bookId,
        bookName,
        department,
        downloadedBy,
      ]);

      if (!result || !result.rows) {
        return null;
      }
      return result.rows;
    } catch (error) {
      console.error("error while saving log : ", error);
      return null;
    }
  }

  static async fetchCumulativeBookRankings() {
    try {
      const result = await db.query(
        logQueries.FETCH_DAILY_WEEKLY_AND_MONTHLY_RANKINGS
      );

      if (!result || !result?.rows) {
        return [];
      }

      return result?.rows;
    } catch (error) {
      console.error("error while fetching log : ", error);
      return [];
    }
  }

  static async fetchCumulativeDepartmentRankings() {
    try {
      const result = await db.query(logQueries.FETCH_DEPARTMENT_RANKINGS);

      if (!result || !result?.rows) {
        return [];
      }

      return result?.rows;
    } catch (error) {
      console.error("error while fetching log : ", error);
      return [];
    }
  }
}

module.exports = {
  LogDaoService,
};
