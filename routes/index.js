const express = require("express");

const router = express.Router();

const {
  BookRankingManager,
  DepartmentRankingManager,
  LogManager,
} = require("../manager");

router.get("/trending/book/daily", async (req, res) => {
  try {
    const result = BookRankingManager.fetchDailyTrending();
    return res.status(200).json(result);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});

router.get("/trending/books/weekly", async (req, res) => {
  try {
    const result = BookRankingManager.fetchWeeklyTrending();
    return res.status(200).json(result);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});

router.get("/trending/books/monthly", async (req, res) => {
  try {
    const result = BookRankingManager.fetchMonthlyTrending();
    return res.status(200).json(result);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});

router.get("/trending/department", async (req, res) => {
  try {
    const result = DepartmentRankingManager.fetchTopFiveDepartmentRankings();
    return res.status(200).json(result);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});

router.get("/trending/department/week", async (req, res) => {
  try {
    const result = DepartmentRankingManager.fetchTopFiveDepartmentRankings();
    return res.status(200).json(result);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});

router.post("/download", async (req, res) => {
  try {
    const { data } = req.body;
    const result = LogManager.createDownloadLog(data);
    return res.status(200).json(result);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});

router.post("/cron/book", async (req, res) => {
  try {
    const result = BookRankingManager.updateBookRankings();
    return res.sendStatus(204);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});

router.post("/cron/department", async (req, res) => {
  try {
    const result = DepartmentRankingManager.updateDepartmentRankings();
    return res.sendStatus(204);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});

module.exports = { router };