class Slp {
  constructor(name, axielineup, slp, date) {
    this.name = name;
    this.axielineup = axielineup;
    this.slp = slp;
    this.date = date;
  }
}

class UI {
  addSlpToList(user) {
    const list = document.getElementById("slp-list");

    // Create TR element
    const row = document.createElement("tr");
    // Insert cols
    row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.axielineup}</td>
        <td>${user.slp}</td>
        <td>${user.date}</td>
        <td><a href="#" class="btn btn-danger delete">Delete</a></td>
    `;

    list.appendChild(row);
  }

  showAlert(message, className) {
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
  }

  deleteData(target) {
    if (target.className.includes("delete")) {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("name").value = "";
    document.getElementById("axielineup").value = "";
    document.getElementById("slp").value = "";
  }
}

// Local Storage Class
class Store {
  static getData() {
    let data;

    if (localStorage.getItem("data") === null) {
      data = [];
    } else {
      data = JSON.parse(localStorage.getItem("data"));
    }

    return data;
  }

  static displayData(user) {
    const data = Store.getData();

    data.forEach((user) => {
      const ui = new UI();

      ui.addSlpToList(user);
    });
  }

  static addData(user) {
    const data = Store.getData();

    data.push(user);

    localStorage.setItem("data", JSON.stringify(data));
  }

  static removeData(date) {
    const data = Store.getData();

    data.forEach((user, index) => {
      if (user.date === date) {
        data.splice(index, 1);
      }
    });

    localStorage.setItem("data", JSON.stringify(data));
  }
}

// DOM Load Event
document.addEventListener("DOMContentLoaded", Store.displayData);

// Event listener for add SLP

document.getElementById("slp-form").addEventListener("submit", (e) => {
  const name = document.getElementById("name").value;
  const axielineup = document.getElementById("axielineup").value;
  const slp = document.getElementById("slp").value;

  const user = new Slp(name, axielineup, slp, (date = new Date()));

  const ui = new UI();

  //   Validate
  if (name === "" || axielineup === "" || slp === "") {
    // Error alert
    ui.showAlert("Please fill in all fiels", "alert-danger");
  } else {
    ui.addSlpToList(user);

    // Add to Local storage
    Store.addData(user);

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

  //   Delete from Local storage
  Store.removeData(e.target.parentElement.previousElementSibling.textContent);

  ui.showAlert("Data Removed", "alert-success");

  e.preventDefault();
});
