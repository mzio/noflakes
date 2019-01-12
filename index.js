require("babel-register")({
  ignore: /\/(build|node_modules)\//,
  presets: ["env", "react-app"]
});
delete process.env.BROWSER;

const server = require("./backend");
const PORT = process.env.PORT;

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
