 const signupBtn = document.getElementById("signupBtn");
    const errorBox = document.getElementById("errorBox");

    signupBtn.addEventListener("click", () => {
      errorBox.textContent = "";
      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const dob = document.getElementById("dob").value;
      const genderElems = document.getElementsByName("gender");
      let gender = "";
      for (const elem of genderElems) {
        if (elem.checked) {
          gender = elem.value;
          break;
        }
      }

      if (!firstName || !lastName || !email || !password || !dob || !gender) {
        errorBox.textContent = "Please fill out all fields.";
        return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || [];

      const emailExists = users.some((user) => user.email.toLowerCase() === email.toLowerCase());
      if (emailExists) {
        errorBox.textContent = "Email is already registered.";
        return;
      }

      const newUser = {
        firstName,
        lastName,
        email,
        password,
        dob,
        gender,
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("userCount", users.length);

      localStorage.setItem("loggedInUser", JSON.stringify(newUser));

      errorBox.style.color = "green";
      errorBox.textContent = "Signup successful! Redirecting...";

      setTimeout(() => {
        window.location.href = "./social.html";
      }, 1500);
    });