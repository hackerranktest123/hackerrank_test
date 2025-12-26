function login() {
    // Save login state (optional, keeps test page protected)
    localStorage.setItem("loggedIn", "true");

    // Redirect to test page immediately
    window.location.href = "index.html";
}
