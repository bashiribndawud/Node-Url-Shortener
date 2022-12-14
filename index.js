const express = require("express");
const app = express();
const path = require("path");
const shortUrl = require('./router/url');
const homeRoutes = require('./router/home')

const PORT = 1337;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "/public")));

app.use('/urlapi', shortUrl)
app.use('/', homeRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
