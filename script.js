const habitInput = document.getElementById("habit-name");
const addHabitBtn = document.getElementById("add-habit-btn");
const habitList = document.getElementById("habit-list");

let habitData = [];
let habitId = 0;

addHabitBtn.addEventListener("click", () => {
  const habitName = habitInput.value.trim();

  if (habitName === "") {
    alert("Please enter a habit name.");
    return;
  }

  addHabitCard(habitName);
  updateSummary();
  habitInput.value = "";
});

function addHabitCard(name) {
  const newHabit = {
    id: habitId++,
    name: name,
    progress: [false, false, false, false, false, false, false],
  };

  habitData.push(newHabit);
  saveHabitsToStorage();
  renderHabitCard(newHabit);
}

function renderHabitCard(habit) {
  const card = document.createElement("div");
  card.className = "habit-card";
  card.dataset.id = habit.id;

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  let daysHTML = "";
  daysOfWeek.forEach((day, index) => {
    daysHTML += `
    <label>${day}<br>
      <input type="checkbox" data-day="${index}" ${
      habit.progress[index] ? "checked" : ""
    }/>
    </label>
    `;
  });

  card.innerHTML = `
    <div class="habit-header">
        <span class="habit-name">${habit.name}</span>
        <button class="delete-btn">Delete</button>
    </div>
    <div class="days">
      ${daysHTML}
    </div>
  `;

  card.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const day = parseInt(e.target.dataset.day);
      habit.progress[day] = e.target.checked;
      saveHabitsToStorage();
      updateSummary();
    });
  });

  card.querySelector(".delete-btn").addEventListener("click", () => {
    card.remove();
    habitData = habitData.filter((h) => h.id !== habit.id);
    saveHabitsToStorage();
    updateSummary();
  });

  habitList.appendChild(card);
}

function updateSummary() {
  const todayIndex = new Date().getDay();
  const normalizedToday = (todayIndex + 6) % 7;

  const allCards = document.querySelectorAll(".habit-card");
  const totalHabits = allCards.length;
  let completeToday = 0;

  allCards.forEach((card) => {
    const checkbox = card.querySelector(`input[data-day="${normalizedToday}"]`);
    if (checkbox && checkbox.checked) {
      completeToday++;
    }
  });

  document.getElementById("habit-count").textContent = totalHabits;
  document.getElementById("completed-today").textContent = completeToday;
}

function saveHabitsToStorage() {
  localStorage.setItem("habitTrackerData", JSON.stringify(habitData));
}

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("habitTrackerData");
  if (saved) {
    habitData = JSON.parse(saved);
    habitId =
      habitData.length > 0 ? Math.max(...habitData.map((h) => h.id)) + 1 : 0;
    habitData.forEach((habit) => renderHabitCard(habit));
  }
  updateSummary();
});
