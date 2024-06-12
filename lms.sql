CREATE TABLE IF NOT EXISTS public.book_table (
    book_id uuid NOT NULL,
    isbn character varying(255) COLLATE pg_catalog."default",
    active boolean DEFAULT true,
    author character varying(255) COLLATE pg_catalog."default",
    availability boolean DEFAULT true,
    created timestamp(6) without time zone,
    department character varying(255) COLLATE pg_catalog."default",
    genre character varying(255) COLLATE pg_catalog."default",
    publication_year character varying(255) COLLATE pg_catalog."default",
    title character varying(255) COLLATE pg_catalog."default",
    updated timestamp(6) without time zone,
    available boolean DEFAULT true,
    CONSTRAINT book_table_pkey PRIMARY KEY (book_id),
    CONSTRAINT ukoc2n48o9cff0kqkpyc05d6rtn UNIQUE (isbn)
)

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
