document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("registrationForm");
    const userTableBody = document.getElementById("userTableBody");
  
    // Load saved data from localStorage
    loadSavedData();
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const dob = document.getElementById("dob").value;
      const termsAccepted = document.getElementById("terms").checked;
  
      // Validate date of birth (ages between 18 and 55)
      if (!validateDob(dob)) {
        alert("Date of Birth must be for people between ages 18 and 55.");
        return;
      }
  
      // Save user data to localStorage
      const userData = { name, email, password, dob, termsAccepted };
      saveUserData(userData);
  
      // Add user data to the table
      addToTable(userData);
  
      // Clear form inputs
      form.reset();
    });
  
    function validateDob(dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
  
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
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${userData.name}</td>
        <td>${userData.email}</td>
        <td>${userData.password}</td>
        <td>${userData.dob}</td>
        <td>${userData.termsAccepted ? "Yes" : "No"}</td>
      `;
      userTableBody.appendChild(row);
    }
  });
  