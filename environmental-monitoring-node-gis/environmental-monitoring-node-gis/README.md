# Environmental Monitoring Web GIS (Node.js + Express + PostGIS)

A simple dynamic Web GIS application connecting a PostgreSQL/PostGIS database to a Node.js Express backend and a Leaflet frontend map.

---

## 🛠️ Setup Instructions

### Step 1: Create Database & PostGIS Extension
Run the following SQL script in pgAdmin or psql:
```sql
CREATE DATABASE webGis_lab7;
\c webGis_lab7;
CREATE EXTENSION postgis;
```
Then execute the contents of `database/schema.sql` to create tables and insert sample data.

### Step 2: Install Dependencies
Open terminal in project root and run:
```cmd
npm install
```

### Step 3: Run the Server
```cmd
npm start
```

### Step 4: Open in Browser
Navigate to: [http://localhost:3000](http://localhost:3000)
