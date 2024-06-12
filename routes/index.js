const express = require("express");

const router = express.Router();

const {
  BookRankingManager,
  DepartmentRankingManager,
  LogManager,
} = require("../manager");

/**
 * @route GET /trending/books/daily
 * @description Fetches daily trending book rankings.
 * @returns {object} 200 - An array of daily trending book rankings.
 * @returns {object} 500 - An error message.
 */
router.get("/trending/books/daily", async (req, res) => {
  try {
    const result = await BookRankingManager.fetchDailyTrending();
    return res.status(200).json(result);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});

/**
 * @route GET /trending/books/weekly
 * @description Fetches weekly trending book rankings.
 * @returns {object} 200 - An array of weekly trending book rankings.
 * @returns {object} 500 - An error message.
 */
router.get("/trending/books/weekly", async (req, res) => {
  try {
    const result = await BookRankingManager.fetchWeeklyTrending();
    return res.status(200).json(result);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});

/**
 * @route GET /trending/books/monthly
 * @description Fetches monthly trending book rankings.
 * @returns {object} 200 - An array of monthly trending book rankings.
 * @returns {object} 500 - An error message.
 */
router.get("/trending/books/monthly", async (req, res) => {
  try {
    const result = await BookRankingManager.fetchMonthlyTrending();
    return res.status(200).json(result);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});

/**
 * @route GET /trending/department
 * @description Fetches the top five department rankings.
 * @returns {object} 200 - An array of top five department rankings.
 * @returns {object} 500 - An error message.
 */
router.get("/trending/department", async (req, res) => {
  try {
    const result =
      await DepartmentRankingManager.fetchTopFiveDepartmentRankings();
    return res.status(200).json(result);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});

/**
 * @route GET /trending/department/week
 * @description Fetches the previous week's winning department.
 * @returns {object} 200 - The previous week's winning department.
 * @returns {object} 500 - An error message.
 */
router.get("/trending/department/week", async (req, res) => {
  try {
    const result = await DepartmentRankingManager.fetchPreviousWeekWinner();
    return res.status(200).json(result);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});

/**
 * @route POST /download
 * @description Creates a download log.
 * @param {object} req.body.data - The download log data.
 * @returns {object} 200 - The created download log data.
 * @returns {object} 500 - An error message.
 */
router.post("/download", async (req, res) => {
  try {
    const { data } = req.body;
    const result = await LogManager.createDownloadLog(data);
    return res.status(200).json(result);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});

/**
 * @route POST /cron/book
 * @description Updates book rankings as part of a scheduled task(Manual trigger instead of cron).
 * @returns {object} 204 - No content, indicating successful update.
 * @returns {object} 500 - An error message.
 */
router.post("/cron/book", async (req, res) => {
  try {
    const result = await BookRankingManager.updateBookRankings();
    return res.sendStatus(204);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});

/**
 * @route POST /cron/department
 * @description Updates department rankings as part of a scheduled task(Manual trigger instead of cron).
 * @returns {object} 204 - No content, indicating successful update.
 * @returns {object} 500 - An error message.
 */
router.post("/cron/department", async (req, res) => {
  try {
    const result = await DepartmentRankingManager.updateDepartmentRankings();
    return res.sendStatus(204);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});

module.exports = { router };
