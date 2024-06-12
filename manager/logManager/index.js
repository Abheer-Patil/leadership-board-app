const { LogDaoService } = require("../../Services/logService");
const {
  createResponse,
  createErrorResponse,
} = require("../../modules/response");

class LogManager {
  /**
   * Creates a download log.
   * Validates the input parameters and creates a log entry using LogDaoService.
   * Logs errors and throws a formatted error response if creation fails.
   *
   * @param {object} logData - The data required to create a download log.
   * @param {string} logData.bookId - The ID of the book.
   * @param {string} logData.bookName - The name of the book.
   * @param {string} logData.department - The department associated with the download.
   * @param {string} logData.downloadedBy - The identifier of the person who downloaded the book.
   * @returns {Promise<object>} Response object with the created log data.
   * @throws {object} Formatted error response on failure.
   */
  static async createDownloadLog({
    bookId,
    bookName,
    department,
    downloadedBy,
  }) {
    try {
      if (!bookId || !bookName || !department || !downloadedBy) {
        throw createErrorResponse({
          code: 400,
          message: "INVALID PAYLOAD",
          data: {},
        });
      }

      const requestPayload = {
        bookId: bookId,
        bookName: bookName,
        department: department,
        downloadedBy: downloadedBy,
      };

      const result = await LogDaoService.createLog(requestPayload);

      if (!result) {
        throw createErrorResponse({
          code: 500,
          message: "COULD NOT SAVE",
          data: {},
        });
      }

      return createResponse({
        code: 200,
        message: "OK",
        data: result,
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
  LogManager,
};
