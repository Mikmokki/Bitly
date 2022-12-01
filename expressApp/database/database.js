import pg from "pg";
const CONCURRENT_CONNECTIONS = 2;
const connectionPool =  new pg.Pool({max:CONCURRENT_CONNECTIONS});

const executeQuery = async (query, params) => {
  const response = {};
  let client;

  try {
    client = await connectionPool.connect();
    const result = await client.query(query, params);
    if (result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    console.log(e);
    response.error = e;
  } finally {
    try {
      await client.release();
    } catch (e) {
      console.log(e);
    }
  }

  return response;
};

export { executeQuery };