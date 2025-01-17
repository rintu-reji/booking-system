// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db"); // Import database connection

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Fetch available slots for a specific date
app.get("/api/available-slots", (req, res) => {
  const { date } = req.query;
  console.log("Requested Date:", date);
  db.all("SELECT * FROM slots WHERE isBooked = false", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Book an appointment
app.post("/api/book-appointment", (req, res) => {
  const { name, phone, date, time } = req.body;
  console.log(req.body);
  db.get(
    "SELECT * FROM slots WHERE time = ? AND date = ?",
    [time, date],
    (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (!row) {
        db.run(
          "UPDATE slots SET isBooked = true, name = ?, phone = ?, date = ? WHERE time = ?",
          [name, phone, date, time],

          function (err) {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            res.json({ message: "Appointment booked successfully!" });
          }
        );
      } else {
        res.status(400).json({ message: "Slot is already booked or invalid" });
      }
    }
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
