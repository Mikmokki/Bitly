/* Create your schema here */
DROP TABLE IF EXISTS link;
CREATE TABLE link (
  shortLink TEXT PRIMARY KEY,
  link TEXT NOT NULL
);
