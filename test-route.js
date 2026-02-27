const http = require("http");

http
  .get("http://localhost:3000/api/calendar/1", (res) => {
    let data = "";
    res.on("data", (chunk) => (data += chunk));
    res.on("end", () =>
      console.log("STATUS:", res.statusCode, "\nBODY:", data),
    );
  })
  .on("error", (err) => console.log("ERROR:", err.message));
