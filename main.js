// SLP Constructor
function Slp(name, axielineup, slp, date) {
  this.name = name;
  this.axielineup = axielineup;
  this.slp = slp;
  this.date = date;
}

// UI Constructor
function UI() {}

UI.prototype.addSlpToList = function (user) {
  const list = document.getElementById("slp-list");

  // Create TR element
  const row = document.createElement("tr");
  // Insert cols
  row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.axielineup}</td>
        <td>${user.slp}</td>
        <td>${new Date()}</td>
        <td><a href="#" class="btn btn-danger delete">Delete</a></td>
    `;

  list.appendChild(row);
};

// Show alert
UI.prototype.showAlert = function (message, className) {
  // Create div
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));

  // Get parent element
  const container = document.querySelector(".container");

  const form = document.querySelector("#slp-form");

  container.insertBefore(div, form);

  //   Timeout after 3 sec
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
};

// Delete SLP Data
UI.prototype.deleteData = function (target) {
  if (target.className.includes("delete")) {
    target.parentElement.parentElement.remove();
  }
};
//
UI.prototype.clearFields = function () {
  document.getElementById("name").value = "";
  document.getElementById("axielineup").value = "";
  document.getElementById("slp").value = "";
};

// Event listener for add SLP

document.getElementById("slp-form").addEventListener("submit", function (e) {
  const name = document.getElementById("name").value;
  const axielineup = document.getElementById("axielineup").value;
  const slp = document.getElementById("slp").value;

  const user = new Slp(name, axielineup, slp, new Date());

  const ui = new UI();

  //   Validate
  if (name === "" || axielineup === "" || slp === "") {
    // Error alert
    ui.showAlert("Please fill in all fiels", "alert-danger");
  } else {
    ui.addSlpToList(user);

    // Show success
    ui.showAlert("Data Added", "alert-success");

    //   Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event listener for delete

document.getElementById("slp-list").addEventListener("click", (e) => {
  const ui = new UI();

  ui.deleteData(e.target);

  ui.showAlert("Data Removed", "alert-success");

  e.preventDefault();
});
