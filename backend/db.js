const sqlite3 = require("sqlite3").verbose();

// Create SQLite database connection
const db = new sqlite3.Database(":memory:"); // Store in memory for simplicity

// Create the table for appointment slots
db.serialize(() => {
  db.run(
    "CREATE TABLE slots (id INTEGER PRIMARY KEY, time TEXT, isBooked BOOLEAN, name TEXT, phone TEXT, date TEXT)"
  );

  // Insert available slots between 10:00 AM to 5:00 PM, excluding the break
  const times = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ];

  times.forEach((time) => {
    db.run("INSERT INTO slots (time, isBooked, date) VALUES (?, ?, ?)", [
      time,
      false, // Slot is not booked
      null, // Use the fixed date for now
    ]);
  });
});

module.exports = db;
