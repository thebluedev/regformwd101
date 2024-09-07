document.addEventListener("DOMContentLoaded", function() {
    let form = document.getElementById("registrationForm");
    let userTableBody = document.getElementById("userTableBody");
  
    // Load saved data from localStorage
    loadSavedData();
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
  
      let name = document.getElementById("name").value;
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;
      let Dob = document.getElementById("Dob").value;
      let termsAccepted = document.getElementById("terms").checked;
  
      // Validate date of birth (ages between 18 and 55)
      if (!validateDob(Dob)) {
        alert("Date of Birth must be for people between ages 18 and 55.");
        return;
      }
  
      // Save user data to localStorage
      let userData = { name, email, password, Dob, termsAccepted };
      saveUserData(userData);
  
      // Add user data to the table
      addToTable(userData);
  
      // Clear form inputs
      form.reset();
    });
  
    function validateDob(Dob) {
      let birthDate = new Date(Dob);
      let today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      let monthDiff = today.getMonth() - birthDate.getMonth();
  
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
  
      return age >= 18 && age <= 55;
    }
  
    function saveUserData(userData) {
      let users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(userData);
      localStorage.setItem("users", JSON.stringify(users));
    }
  
    function loadSavedData() {
      let users = JSON.parse(localStorage.getItem("users")) || [];
      users.forEach(addToTable);
    }
  
    function addToTable(userData) {
      let row = document.createElement("tr");
      row.innerHTML = `
        <td>${userData.name}</td>
        <td>${userData.email}</td>
        <td>${userData.password}</td>
        <td>${userData.Dob}</td>
        <td>${userData.termsAccepted ? "Yes" : "No"}</td>
      `;
      userTableBody.appendChild(row);
    }
  });
  