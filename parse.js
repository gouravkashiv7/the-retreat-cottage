const fs = require("fs");
try {
  const body = fs.readFileSync("out.html", "utf8");
  let match = body.match(/<title>(.*?)<\/title>/);
  console.log("TITLE:", match ? match[1] : "No title");

  match = body.match(/"message":"([^"]*)"/);
  console.log("MSG:", match ? match[1] : "No message");

  match = body.match(/"description":"([^"]*)"/);
  console.log("DESC:", match ? match[1] : "No description");
} catch (e) {
  console.error(e);
}
