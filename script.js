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
  updateSummary();
  habitInput.value = "";
});

function addHabitCard(name) {
  const card = document.createElement("div");
  card.className = "habit-card";
  card.dataset.id = habitId++;

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  let daysHTML = "";
  daysOfWeek.forEach((day, index) => {
    daysHTML += `
    <label>${day}<br>
      <input type="checkbox" data-day="${index}" />
    </label>
    `;
  });

  card.innerHTML = `
    <div class="habit-header">
        <span class="habit-name">${name}</span>
        <button class="delete-btn">Delete</button>
    </div>
    <div class="days">
      ${daysHTML}
    </div>
  `;

  const checkboxes = card.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      console.log(
        `Habit: "${name}", Day: ${checkbox.dataset.day}, Checked: ${checkbox.checked}`
      );
      updateSummary();
    });
  });

  const deleteBtn = card.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    card.remove();
    console.log(`Deleted habit: "${name}"`);
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
