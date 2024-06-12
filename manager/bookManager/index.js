const { BookRankingService } = require("../../Services/bookService");
const { LogDaoService } = require("../../Services/logService");
const {
  createResponse,
  createErrorResponse,
} = require("../../modules/response");

class BookRankingManager {
  /**
   * Updates the cumulative book rankings.
   * Fetches cumulative book rankings and updates them using BookRankingService.
   * Logs the size of the rankings and handles errors.
   *
   * @returns {Promise<object|null>} Response object on success, or null on failure.
   */
  static async updateBookRankings() {
    try {
      const bookRankings = await LogDaoService.fetchCumulativeBookRankings();

      if (!bookRankings || bookRankings.length < 0) {
        throw createErrorResponse({
          code: 300,
          message: "NO BOOK RANKINGS FOUND",
          data: {},
        });
      }
      console.log("book ranking to be updated size : ", bookRankings.length);
      bookRankings.forEach((book) => {
        BookRankingService.createOrUpdateBookRanking(book);
      });

      return null;
    } catch (error) {
      console.error("error while saving log : ", error);
      return null;
    }
  }

  /**
   * Fetches daily trending book rankings.
   * Uses the fetchTrending method with the daily fetch function.
   *
   * @returns {Promise<object>} Response object with the daily trending book rankings data.
   * @throws {object} Formatted error response on failure.
   */
  static async fetchDailyTrending() {
    try {
      const bookRankings = await BookRankingService.fetchDailyTrending();

      if (!bookRankings || bookRankings.length < 0) {
        throw createErrorResponse({
          code: 300,
          message: "NO BOOK RANKINGS FOUND",
          data: {},
        });
      }

      return createResponse({
        code: 200,
        message: "OK",
        data: bookRankings,
      });
    } catch (error) {
      console.error("error while saving log : ", error);
      throw createErrorResponse({
        code: 500,
        message: "SOMETHING WENT WRONG",
        data: {},
      });
    }
  }

  /**
   * Fetches weekly trending book rankings.
   * Uses the fetchTrending method with the weekly fetch function.
   *
   * @returns {Promise<object>} Response object with the weekly trending book rankings data.
   * @throws {object} Formatted error response on failure.
   */
  static async fetchWeeklyTrending() {
    try {
      const bookRankings = await BookRankingService.fetchWeeklyTrending();

      if (!bookRankings || bookRankings.length < 0) {
        throw createErrorResponse({
          code: 300,
          message: "NO BOOK RANKINGS FOUND",
          data: {},
        });
      }

      return createResponse({
        code: 200,
        message: "OK",
        data: bookRankings,
      });
    } catch (error) {
      console.error("error while saving log : ", error);
      throw createErrorResponse({
        code: 500,
        message: "SOMETHING WENT WRONG",
        data: {},
      });
    }
  }

  /**
   * Fetches monthly trending book rankings.
   * Uses the fetchTrending method with the monthly fetch function.
   *
   * @returns {Promise<object>} Response object with the monthly trending book rankings data.
   * @throws {object} Formatted error response on failure.
   */
  static async fetchMonthlyTrending() {
    try {
      const bookRankings = await BookRankingService.fetchMonthlyTrending();

      if (!bookRankings || bookRankings.length < 0) {
        throw createErrorResponse({
          code: 300,
          message: "NO BOOK RANKINGS FOUND",
          data: {},
        });
      }

      return createResponse({
        code: 200,
        message: "OK",
        data: bookRankings,
      });
    } catch (error) {
      console.error("error while saving log : ", error);
      throw createErrorResponse({
        code: 500,
        message: "SOMETHING WENT WRONG",
        data: {},
      });
    }
  }
}

module.exports = {
  BookRankingManager,
};
