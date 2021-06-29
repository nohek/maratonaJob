const Database = require("./config");

const initDb = {
  async init() {
    const db = await Database(); //ABRINDO

    await db.exec(`CREATE TABLE profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        avatar TEXT,
        monthly_budget INT,
        days_per_week INT,
        hours_per_day INT,
        vacation_per_year INT,
        value_hour INT) 
        `);

    await db.exec(`CREATE TABLE jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        daily_hours INT, 
        total_hours INT,
        created_at DATETIME

    )`);

    await db.run(`INSERT INTO profile(
        name, 
        avatar, 
        monthly_budget, 
        days_per_week, 
        hours_per_day, 
        vacation_per_year,
        value_hour
    ) VALUES (
        "Francyelle",
        "https://i.pinimg.com/564x/25/36/64/25366446f10f502d7e410738ebdabd57.jpg",
        3500,
        5,
        8,
        4,
        75
    )`);

    await db.run(`INSERT INTO jobs(
        name, 
        daily_hours,
        total_hours,
        created_at
    ) VALUES (
        "Estudar Node",
        5,
        15,
        1617514376018
    )`);

    await db.run(`INSERT INTO jobs(
        name, 
        daily_hours,
        total_hours,
        created_at
    ) VALUES (
        "OneTwo Project",
        2,
        40,
        1617514376018
    )`);

    await db.close(); //FECHANDO
  },
};

initDb.init();
