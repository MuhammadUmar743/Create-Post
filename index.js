const loginBtn = document.getElementById("loginBtn");
    const errorBox = document.getElementById("errorBox");

    loginBtn.addEventListener("click", () => {
      errorBox.textContent = "";
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!email || !password) {
        errorBox.textContent = "Please enter email and password.";
        return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!user) {
        errorBox.textContent = "Invalid email or password.";
        return;
      }


      localStorage.setItem("loggedInUser", JSON.stringify(user));

      errorBox.style.color = "green";
      errorBox.textContent = "Login successful! Redirecting...";

      setTimeout(() => {
        window.location.href = "./social.html";
      }, 1500);
    });    
    
   