CREATE TABLE department_ranking (
    id SERIAL PRIMARY KEY,
    department VARCHAR(255) NOT NULL,
    downloads BIGINT NOT NULL,
    previous_week_count BIGINT NOT NULL
);

ALTER TABLE department_ranking
ADD CONSTRAINT unique_book_id UNIQUE (department);

CREATE TABLE book_ranking (
    id SERIAL PRIMARY KEY,
    book_id VARCHAR(255) NOT NULL,
    book_name VARCHAR(255) NOT NULL,
    daily_downloads BIGINT NOT NULL,
    weekly_downloads BIGINT NOT NULL,
    monthly_downloads BIGINT NOT NULL,
);

ALTER TABLE book_ranking
ADD CONSTRAINT unique_book_id UNIQUE (book_id);



CREATE TABLE book_downloads_log (
    id SERIAL PRIMARY KEY,
    book_id VARCHAR(255) NOT NULL,
    book_name VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    created TIMESTAMP NOT NULL,
    downloaded_by VARCHAR(255) NOT NULL
);
