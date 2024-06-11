const { BookRankingService } = require("../../Services/bookService");
const { LogDaoService } = require("../../Services/logService");
const {
  createResponse,
  createErrorResponse,
} = require("../../modules/response");

class BookRankingManager {
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
