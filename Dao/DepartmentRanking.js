module.exports = {
  INSERT_OR_UPDATE: `
        INSERT INTO department_ranking (department, downloads, previous_week_count)
        VALUES ($1, $2, $3)
        ON CONFLICT (department) DO UPDATE
        SET 
        downloads = EXCLUDED.downloads,
        previous_week_count = EXCLUDED.previous_week_count;
    `,
  FETCH_TOP_FIVE_DEPARTMENTS: `
        SELECT department, downloads
        FROM department_ranking
        ORDER BY downloads DESC
        LIMIT 5;
    `,
  FETCH_PREVIOUS_WEEK_WINNER: `
        SELECT department, previous_week_count as previousWeekCount
        FROM department_ranking
        ORDER BY previous_week_count DESC
        LIMIT 1;
    `,
};
