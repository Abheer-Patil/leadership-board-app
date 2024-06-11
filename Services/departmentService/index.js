const departmentRankingQueries = require("../../Dao/DepartmentRanking");
const db = require("../../config/Db");

class DepartmentRankingService {
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
