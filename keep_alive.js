const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write("Bot is alive!");
  res.end();
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Keep-alive server running");
});
