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
    });
  });

  habitList.appendChild(card);
}
