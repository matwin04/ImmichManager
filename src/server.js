const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("express.json");
const fetchImmichData = require("./api");
const app = express();
const PORT = 3030;

// Enable CORS
app.use(cors());

// Serve static files from 'public'
app.use(express.static(path.join(__dirname, "public")));

// Proxy routes
app.get("/api/stats", (req, res) => fetchImmichData("assets/statistics", res));
app.get("/api/albums", (req, res) => fetchImmichData("albums", res));
app.post("/api/createAlbum", (req, res) => fetchImmichData("albums", res, "POST", req.body));

// Serve index.html
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));