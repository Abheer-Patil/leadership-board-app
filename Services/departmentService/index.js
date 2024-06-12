const departmentRankingQueries = require("../../Dao/DepartmentRanking");
const db = require("../../config/Db");

class DepartmentRankingService {
  /**
   * Creates or updates a department ranking.
   * Inserts or updates the department ranking in the database using the provided details.
   * Logs errors and returns null if the operation fails.
   *
   * @param {object} departmentRankingData - The data for the department ranking.
   * @param {string} departmentRankingData.department - The name of the department.
   * @param {number} departmentRankingData.downloads - The number of downloads.
   * @param {number} departmentRankingData.previousweekcount - The count from the previous week.
   * @returns {Promise<object|null>} The result rows if successful, otherwise null.
   */
  static async createOrUpdateDepartmentRanking({
    department,
    downloads,
    previousweekcount,
  }) {
    try {
      const result = await db.query(departmentRankingQueries.INSERT_OR_UPDATE, [
        department,
        downloads,
        previousweekcount,
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
   * Fetches the top five department rankings.
   * Retrieves the top five department rankings from the database.
   * Logs errors and returns an empty array if fetching fails.
   *
   * @returns {Promise<Array>} An array of the top five department rankings.
   */
  static async fetchTopFiveDepartmentRankings() {
    try {
      const result = await db.query(
        departmentRankingQueries.FETCH_TOP_FIVE_DEPARTMENTS
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

  /**
   * Fetches the previous week's winning department.
   * Retrieves the previous week's winning department from the database.
   * Logs errors and returns an empty array if fetching fails.
   *
   * @returns {Promise<Array>} An array with the previous week's winning department.
   */
  static async fetchPreviousWeekWinner() {
    try {
      const result = await db.query(
        departmentRankingQueries.FETCH_PREVIOUS_WEEK_WINNER
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
}

module.exports = {
  DepartmentRankingService,
};
