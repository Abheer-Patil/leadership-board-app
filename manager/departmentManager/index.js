const {
  DepartmentRankingService,
} = require("../../Services/departmentService");
const { LogDaoService } = require("../../Services/logService");
const {
  createResponse,
  createErrorResponse,
} = require("../../modules/response");

class DepartmentRankingManager {
  /**
   * Updates the cumulative department rankings.
   * Fetches cumulative department rankings and updates them using DepartmentRankingService.
   * Logs the rankings and handles errors.
   *
   * @returns {Promise<null>} Returns null on success or failure.
   */
  static async updateDepartmentRankings() {
    try {
      const departmentRankings =
        await LogDaoService.fetchCumulativeDepartmentRankings();
      console.log(departmentRankings);
      if (!departmentRankings || departmentRankings.length < 0) {
        throw createErrorResponse({
          code: 300,
          message: "NO DEPARTMENT RANKINGS FOUND",
          data: {},
        });
      }
      console.log(
        "department ranking to be updated size : ",
        departmentRankings.length
      );
      departmentRankings.forEach((department) => {
        DepartmentRankingService.createOrUpdateDepartmentRanking(department);
      });
    } catch (error) {
      console.error("error while updating : ", error);
      return null;
    }
  }

  /**
   * Fetches the top five department rankings.
   * Retrieves the top five department rankings using DepartmentRankingService.
   * Logs errors and throws a formatted error response if fetching fails.
   *
   * @returns {Promise<object>} Response object with the top five department rankings data.
   * @throws {object} Formatted error response on failure.
   */
  static async fetchTopFiveDepartmentRankings() {
    try {
      const departmentRankings =
        await DepartmentRankingService.fetchTopFiveDepartmentRankings();

      if (!departmentRankings || departmentRankings.length < 0) {
        throw createErrorResponse({
          code: 300,
          message: "NO DEPT RANKINGS FOUND",
          data: {},
        });
      }

      return createResponse({
        code: 200,
        message: "OK",
        data: departmentRankings,
      });
    } catch (error) {
      console.error("error while fetching log : ", error);
      throw createErrorResponse({
        code: 500,
        message: "SOMETHING WENT WRONG",
        data: {},
      });
    }
  }

  /**
   * Fetches the previous week's winner.
   * Retrieves the previous week's winning department using DepartmentRankingService.
   * Logs errors and throws a formatted error response if fetching fails.
   *
   * @returns {Promise<object>} Response object with the previous week's winning department data.
   * @throws {object} Formatted error response on failure.
   */
  static async fetchPreviousWeekWinner() {
    try {
      const departmentRankings =
        await DepartmentRankingService.fetchPreviousWeekWinner();

      if (!departmentRankings || departmentRankings.length < 0) {
        throw createErrorResponse({
          code: 300,
          message: "NO DEPT RANKINGS FOUND",
          data: {},
        });
      }

      return createResponse({
        code: 200,
        message: "OK",
        data: departmentRankings,
      });
    } catch (error) {
      console.error("error while fetching log : ", error);
      throw createErrorResponse({
        code: 500,
        message: "SOMETHING WENT WRONG",
        data: {},
      });
    }
  }
}

module.exports = {
  DepartmentRankingManager,
};
