DO
$$
    BEGIN
        IF NOT EXISTS(SELECT 1 FROM pg_type WHERE typname = 'status') THEN
            CREATE TYPE status as enum
                ('to_read', 'reading', 'read');
        END IF;
    END
$$;

CREATE TABLE IF NOT EXISTS authors
(
    id        INTEGER PRIMARY KEY,
    name      VARCHAR(255) NOT NULL,
    surname   VARCHAR(255) NOT NULL,
    birthdate DATE
);

CREATE TABLE IF NOT EXISTS books
(
    isbn        VARCHAR(13) PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    id_author   INTEGER      NOT NULL,
    read_count  INTEGER DEFAULT 0,
    total_pages INTEGER      NOT NULL,
    FOREIGN KEY (id_author) REFERENCES authors (id)
);

CREATE TABLE IF NOT EXISTS users
(
    id       INTEGER PRIMARY KEY,
    email    VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS reading_list
(
    id      INTEGER PRIMARY KEY,
    user_id INTEGER     NOT NULL,
    book_id VARCHAR(13) NOT NULL,
    status  status      NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (book_id) REFERENCES books (isbn)
);
