import { executeQuery } from "../database/database.js";

const createLink = async (link, shortLink) => {
  await executeQuery(
    "INSERT INTO link (link, shortLink) VALUES ($link, $shortLink);",
    { link, shortLink },
  );
};
const getLinkByShort = async (shortLink) => {
  const res = await executeQuery(
    "SELECT * FROM link WHERE shortLink = $shortLink;",
    { shortLink },
  );
  return res.rows.length > 0 && res.rows[0].link;
};
const getLinks = async () => {
  const res = await executeQuery(
    "SELECT * FROM link;",
  );
  return res.rows;
};
export { createLink, getLinkByShort, getLinks };
