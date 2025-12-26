function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Demo credentials
    const validEmail = "test@hackerrank.com";
    const validPassword = "12345";

    if (email === validEmail && password === validPassword) {
        // Save login state in local storage
        localStorage.setItem("loggedIn", "true");

        // Redirect to the coding test page
        window.location.href = "index.html";
    } else {
        document.getElementById("error").innerText =
            "Invalid email or password";
    }
}
