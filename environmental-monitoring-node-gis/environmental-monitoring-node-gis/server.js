require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");
const path = require("path");

const app = express();
const port = Number(process.env.PORT) || 3000;

// Connect to PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

// Serve frontend files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// API: Get monitoring stations as GeoJSON
app.get("/api/stations", async (req, res) => {
    try {
        const sql = `
            SELECT
                id,
                station_name,
                rainfall_mm,
                risk_level,
                observation_date,
                ST_AsGeoJSON(geom)::json AS geometry
            FROM monitoring_stations
            ORDER BY id;
        `;

        const result = await pool.query(sql);

        const features = result.rows.map((row) => ({
            type: "Feature",
            geometry: row.geometry,
            properties: {
                id: row.id,
                station_name: row.station_name,
                rainfall_mm: Number(row.rainfall_mm),
                risk_level: row.risk_level,
                observation_date: row.observation_date
            }
        }));

        res.json({
            type: "FeatureCollection",
            features: features
        });
    } catch (error) {
        console.error("Database query failed:", error.message);

        res.status(500).json({
            error: "Unable to retrieve monitoring stations."
        });
    }
});

// API: Check PostgreSQL database connection
app.get("/api/health", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT current_database() AS database_name"
        );

        res.json({
            status: "connected",
            database: result.rows[0].database_name
        });
    } catch (error) {
        console.error("Health check failed:", error.message);

        res.status(500).json({
            status: "database connection failed"
        });
    }
});

// Handle unexpected PostgreSQL pool errors
pool.on("error", (error) => {
    console.error("Unexpected PostgreSQL error:", error.message);
});

// Start the server
app.listen(port, () => {
    console.log(`Web GIS running at http://localhost:${port}`);
});
