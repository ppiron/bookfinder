const fetch = require("node-fetch");
// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

exports.handler = async function (event, context) {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${event.queryStringParameters.q}&key=${process.env.SNOWPACK_PUBLIC_GOOGLE_BOOKS_API_KEY}&maxResults=20&startIndex=${event.queryStringParameters.index}`
  );
  const json = await res.json();
  // console.log(json.totalItems);
  if (json.error) {
    return {
      statusCode: json.error.code,
      body: JSON.stringify(json.error.message),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(json),
  };
};
