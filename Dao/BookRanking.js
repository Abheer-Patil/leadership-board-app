module.exports = {
  GET_BY_BOOK_ID: `
        SELECT id, book_id as bookId, book_name as bookName, monthly_downloads as monthlyDownloads,
        weekly_downloads as weeklyDownloads, daily_downloads as dailyDownloads
        FROM book_ranking 
        WHERE bookId = $1
    `,

  INSERT: `
        INSERT INTO book_ranking (id, book_id, book_name, monthly_downloads, weekly_downloads, daily_downloads )
        VALUES ($1, $2, $3,  0, 0, 0)
    `,
  UPDATE_BOOK_RANKINGS: `
        UPDATE book_ranking
        SET 
        daily_downloads = $2,
        weekly_downloads = $3,
        monthly_downloads = $4
        WHERE book_id = $1;
    `,
  INSERT_OR_UPDATE: `
        INSERT INTO book_ranking (book_id, book_name, daily_downloads, weekly_downloads, monthly_downloads)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (book_id) DO UPDATE
        SET 
        book_name = EXCLUDED.book_name,
        daily_downloads = EXCLUDED.daily_downloads,
        weekly_downloads = EXCLUDED.weekly_downloads,
        monthly_downloads = EXCLUDED.monthly_downloads;
    `,
  FETCH_TRENDING_DAILY: `
        SELECT book_id as bookId, book_name as bookName, daily_downloads as dailyDownloads
        FROM book_ranking
        ORDER BY daily_downloads DESC
        LIMIT 10;
    `,
  FETCH_TRENDING_WEEKLY: `
        SELECT book_id as bookId, book_name as bookName, weekly_downloads as weeklyDownloads
        FROM book_ranking
        ORDER BY weekly_downloads DESC
        LIMIT 10;
    `,

  FETCH_TRENDING_MONTHLY: `
        SELECT book_id as bookId, book_name as bookName, monthly_downloads as monthlyDownloads
        FROM book_ranking
        ORDER BY monthly_downloads DESC
        LIMIT 10;
    `,
};
