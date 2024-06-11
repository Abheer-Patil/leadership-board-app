const { LogDaoService } = require("../../Services/logService");
const {
  createResponse,
  createErrorResponse,
} = require("../../modules/response");

class LogManager {
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
