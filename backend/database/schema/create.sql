DROP TABLE IF EXISTS listings CASCADE;
DROP TABLE IF EXISTS unwanted CASCADE;

CREATE TABLE listings (
  id SERIAL PRIMARY KEY NOT NULL,
  listing_id INTEGER NOT NULL,
  link TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  condition TEXT,
  make TEXT,
  model TEXT,
  size TEXT,
  price INTEGER NOT NULL,
  date TEXT NOT NULL,
  location TEXT NOT NULL
);

CREATE TABLE unwanted (
  id SERIAL PRIMARY KEY NOT NULL,
  category TEXT NOT NULL,
  value TEXT NOT NULL
);

