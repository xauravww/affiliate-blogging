import { createRequire } from "module";
import { healthCheckJob, sitemapJob } from './cron.js';
import mainRoute from "./routes/main.js";

const require = createRequire(import.meta.url);

const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const port = process.env.PORT || 8000;

require('dotenv').config();

const app = express();
app.use(cors());
app.use(jsonParser);



healthCheckJob.start();
sitemapJob.start();

app.use("/",mainRoute)

app.get("/", (req, res) => {
    res.send("Server is working");
});

app.listen(port, () => {
    console.log(`server listening on port ${port}!`);
});
