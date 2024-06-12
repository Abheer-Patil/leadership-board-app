const bookRankingQueries = require("../../Dao/BookRanking");
const db = require("../../config/Db");

class BookRankingService {
  /**
   * Creates or updates a book ranking.
   * Inserts or updates the book ranking in the database using the provided details.
   * Logs errors and returns null if the operation fails.
   *
   * @param {object} bookRankingData - The data for the book ranking.
   * @param {string} bookRankingData.bookid - The ID of the book.
   * @param {string} bookRankingData.bookname - The name of the book.
   * @param {number} bookRankingData.dailydownloads - The number of daily downloads.
   * @param {number} bookRankingData.weeklydownloads - The number of weekly downloads.
   * @param {number} bookRankingData.monthlydownloads - The number of monthly downloads.
   * @returns {Promise<object|null>} The result rows if successful, otherwise null.
   */
  static async createOrUpdateBookRanking({
    bookid,
    bookname,
    dailydownloads,
    weeklydownloads,
    monthlydownloads,
  }) {
    try {
      const result = await db.query(bookRankingQueries.INSERT_OR_UPDATE, [
        bookid,
        bookname,
        dailydownloads,
        weeklydownloads,
        monthlydownloads,
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

  /**
   * Fetches daily trending book rankings.
   * Retrieves the daily trending book rankings from the database.
   * Logs errors and returns an empty array if fetching fails.
   *
   * @returns {Promise<Array>} An array of daily trending book rankings.
   */
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

  /**
   * Fetches weekly trending book rankings.
   * Retrieves the weekly trending book rankings from the database.
   * Logs errors and returns an empty array if fetching fails.
   *
   * @returns {Promise<Array>} An array of weekly trending book rankings.
   */
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

  /**
   * Fetches monthly trending book rankings.
   * Retrieves the monthly trending book rankings from the database.
   * Logs errors and returns an empty array if fetching fails.
   *
   * @returns {Promise<Array>} An array of monthly trending book rankings.
   */
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
