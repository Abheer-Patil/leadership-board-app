const { DepartmentRankingService } = require("../../Services/departmentService");
const { LogDaoService } = require("../../Services/logService");
const {createResponse,createErrorResponse} = require('../../modules/response'); 

class DepartmentRankingManager {
  static async updateDepartmentRankings() {
    try {
      const departmentRankings = await LogDaoService.fetchCumulativeDepartmentRankings();

      if (!departmentRankings || departmentRankings.length<0) {
        throw createErrorResponse({
            code:300,
            message:"NO DEPARTMENT RANKINGS FOUND",
            data : {}
        });
      }

      departmentRankings.forEach((department)=>{
        DepartmentRankingService.createOrUpdateDepartmentRanking(department);
      });

    } catch (error) {
      console.error("error while updating : ", error);
      return null;
    }
  }

  static async fetchTopFiveDepartmentRankings() {
    try {
      const departmentRankings = await DepartmentRankingService.fetchTopFiveDepartmentRankings();

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

  static async fetchPreviousWeekWinner() {
    try {
      const departmentRankings = await DepartmentRankingService.fetchPreviousWeekWinner();

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
