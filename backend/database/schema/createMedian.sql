DROP TABLE IF EXISTS median CASCADE;

CREATE TABLE median (
  id SERIAL PRIMARY KEY NOT NULL,
  model TEXT NOT NULL,
  median_value INTEGER NOT NULL
);