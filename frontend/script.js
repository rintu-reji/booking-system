document.addEventListener("DOMContentLoaded", function () {
  const dateInput = document.getElementById("date");
  const timeSelect = document.getElementById("time");
  const bookingForm = document.getElementById("booking-form");

  // Fetch available slots when a date is selected
  dateInput.addEventListener("change", function () {
    const selectedDate = dateInput.value;
    console.log(selectedDate);
    if (!selectedDate) return;
    fetch(`http://localhost:3000/api/available-slots?date=${selectedDate}`)
      .then((response) => response.json())
      .then((slots) => {
        // Clear previous time slots
        timeSelect.innerHTML = "<option value=''>Select a time</option>";

        console.log(slots);

        slots.forEach((slot) => {
          const option = document.createElement("option");
          option.value = slot.time;
          option.textContent = slot.time;
          timeSelect.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Error fetching available slots:", error);
      });
  });

  // Handle form submission
  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const selectedDate = dateInput.value;
    const selectedTime = timeSelect.value;
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    fetch("http://localhost:3000/api/book-appointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        phone: phone,
        date: selectedDate,
        time: selectedTime,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => console.error("Error:", error));
  });
});
