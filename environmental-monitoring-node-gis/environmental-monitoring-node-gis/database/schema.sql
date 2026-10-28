-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- Drop table if it exists
DROP TABLE IF EXISTS monitoring_stations;

-- Create monitoring stations table with PostGIS geometry
CREATE TABLE monitoring_stations (
    id SERIAL PRIMARY KEY,
    station_name VARCHAR(100) NOT NULL,
    rainfall_mm NUMERIC(5,2),
    risk_level VARCHAR(20),
    observation_date DATE,
    geom GEOMETRY(Point, 4326)
);

-- Insert sample monitoring stations across Pakistan
INSERT INTO monitoring_stations (station_name, rainfall_mm, risk_level, observation_date, geom) VALUES
('Islamabad Met Observatory', 12.5, 'Low', '2026-03-30', ST_SetSRID(ST_MakePoint(73.0479, 33.6844), 4326)),
('Lahore Monitoring Post', 45.0, 'Moderate', '2026-03-30', ST_SetSRID(ST_MakePoint(74.3587, 31.5204), 4326)),
('Peshawar Rain Station', 88.2, 'High', '2026-03-30', ST_SetSRID(ST_MakePoint(71.5249, 34.0151), 4326)),
('Karachi Coastal Post', 2.0, 'Low', '2026-03-30', ST_SetSRID(ST_MakePoint(67.0011, 24.8607), 4326)),
('Quetta Highland Station', 15.4, 'Low', '2026-03-30', ST_SetSRID(ST_MakePoint(66.9750, 30.1798), 4326));
