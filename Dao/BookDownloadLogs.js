module.exports = {
  GET_ALL_LOGS_WITH_COUNT: `
      SELECT book_id, book_name, COUNT(*) AS downloads
      FROM book_downloads_log
      GROUP BY book_id, book_name
    `,
  INSERT_INTO_LOGS: `
      INSERT INTO book_downloads_log (book_id, book_name, department, created, downloaded_by)
      VALUES ($1, $2, $3, NOW(), $4)
      RETURNING *
    `,
  FETCH_DAILY_WEEKLY_AND_MONTHLY_RANKINGS: `
      WITH daily AS (
        SELECT book_id, COUNT(*) AS downloads
        FROM book_downloads_log
        WHERE date >= NOW() - INTERVAL '1 day'
        GROUP BY book_id
      ),
      weekly AS (
        SELECT book_id, COUNT(*) AS downloads
        FROM book_downloads_log
        WHERE date >= NOW() - INTERVAL '1 week'
        GROUP BY book_id
      ),
      monthly AS (
        SELECT book_id, COUNT(*) AS downloads
        FROM book_downloads_log
        WHERE date >= NOW() - INTERVAL '1 month'
        GROUP BY book_id
      )
      SELECT 
        b.book_id AS bookId,
        b.book_name AS bookName,
        COALESCE(d.downloads, 0) AS dailyDownloads,
        COALESCE(w.downloads, 0) AS weeklyDownloads,
        COALESCE(m.downloads, 0) AS monthlyDownloads
      FROM (
        SELECT DISTINCT book_id, book_name
        FROM book_downloads_log
      ) b
      LEFT JOIN daily d ON b.book_id = d.book_id
      LEFT JOIN weekly w ON b.book_id = w.book_id
      LEFT JOIN monthly m ON b.book_id = m.book_id;
    `,
  FETCH_DEPARTMENT_RANKINGS: `
      WITH currentDownloads AS (
        SELECT department, SUM(downloads) AS totalDownloads
        FROM book_downloads_log
        WHERE date >= NOW() - INTERVAL '1 day'
        GROUP BY department
      ),
      previousWeekDownloads AS (
        SELECT department, SUM(downloads) AS previousWeekDownloads
        FROM book_downloads_log
        WHERE date >= NOW() - INTERVAL '2 weeks' AND date < NOW() - INTERVAL '1 week'
        GROUP BY department
      ),
      combined AS (
        SELECT 
          COALESCE(c.department, p.department) AS department,
          COALESCE(c.totalDownloads, 0) AS downloads,
          COALESCE(p.previousWeekDownloads, 0) AS previousWeekCount
        FROM currentDownloads c
        FULL OUTER JOIN previousWeekDownloads p
        ON c.department = p.department
      )
      SELECT department, downloads, previousWeekCount
      FROM combined;
    `,
};
