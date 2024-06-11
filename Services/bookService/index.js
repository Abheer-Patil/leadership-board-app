const bookRankingQueries = require("../../Dao/BookRanking");
const db = require("../../config/Db");

class BookRankingService {
  static async createOrUpdateBookRanking({
    bookId,
    bookName,
    dailyDownloads,
    weeklyDownloads,
    monthlyDownloads,
  }) {
    try {
      const result = await db.query(bookRankingQueries.INSERT_OR_UPDATE, [
        bookId,
        bookName,
        dailyDownloads,
        weeklyDownloads,
        monthlyDownloads,
      ]);

      if (result && result.rows) {
        return result?.rows;
      }

      return null;
    } catch (error) {
      console.error("error while saving log : ", error);
      return null;
    }
  }

  static async fetchDailyTrending() {
    try {
      const result = await db.query(bookRankingQueries.FETCH_TRENDING_DAILY);

      if (!result || !result?.rows) {
        return [];
      }

      return result?.rows;
    } catch (error) {
      console.error("error while fetching log : ", error);
      return [];
    }
  }

  static async fetchWeeklyTrending() {
    try {
      const result = await db.query(bookRankingQueries.FETCH_TRENDING_WEEKLY);

      if (!result || !result?.rows) {
        return [];
      }

      return result?.rows;
    } catch (error) {
      console.error("error while fetching log : ", error);
      return [];
    }
  }

  static async fetchMonthlyTrending() {
    try {
      const result = await db.query(bookRankingQueries.FETCH_TRENDING_MONTHLY);

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
  BookRankingService,
};
