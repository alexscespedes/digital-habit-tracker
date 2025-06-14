const habitInput = document.getElementById("habit-name");
const addHabitBtn = document.getElementById("add-habit-btn");
const habitList = document.getElementById("habit-list");

let habitId = 0;

addHabitBtn.addEventListener("click", () => {
  const habitName = habitInput.value.trim();

  if (habitName === "") {
    alert("Please enter a habit name.");
    return;
  }

  addHabitCard(habitName);
  habitInput.value = "";
});

function addHabitCard(name) {
  const card = document.createElement("div");
  card.className = "habit-card";
  card.dataset.id = habitId++;

  card.innerHTML = `
    <div class="habit-header">
        <span class="habit-name">${name}</span>
        <button class="delete-btn">Delete</button>
    </div>
    <div class="days">
        <label>Mon<br><input type="checkbox" /></label>
        <label>Tue<br><input type="checkbox" /></label>
        <label>Wed<br><input type="checkbox" /></label>
        <label>Thu<br><input type="checkbox" /></label>
        <label>Fri<br><input type="checkbox" /></label>
        <label>Sat<br><input type="checkbox" /></label>
        <label>Sun<br><input type="checkbox" /></label>
    </div>
  `;

  habitList.appendChild(card);
}
