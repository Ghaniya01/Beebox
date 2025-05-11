const fs = require("fs-extra");

// Copy index.html to 404.html
fs.copySync("build/index.html", "build/404.html");

// Create .nojekyll file
fs.writeFileSync("build/.nojekyll", "");
