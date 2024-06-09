document.addEventListener("DOMContentLoaded", runToAllEvents); // Target When page Loaded

// ===> Js Selectors <===
let selectors = {
    form: document.querySelector("form"),
    inputs: document.querySelectorAll("input"),
    submitButton: document.querySelector("button"),
    visible: document.querySelector(".fa-eye"),
    passwordContainer: document.querySelector(".input-container"),
};
// ===> Destructing values <===
const { form, inputs, submitButton, visible, passwordContainer } = selectors;
const [firstname, email, password] = inputs;

// ===> Output of all Events <===
function runToAllEvents(e) {
    if (form) {
        form.addEventListener("submit", registerUser);
        visible.addEventListener("click", switchType);
    } else {
        let msg = new Error("Error when page load...");
        errorHandler(msg);
    }
}
// ===> Custom Error Message <===
const errorHandler = (msg) => {
    console.error(msg);
    window.location.reload();
}
// ===> Register Method <===
function registerUser(e) {
    const local_key = "users"
    e.preventDefault();

    // ===> Check the input fields <===
    const fieldsFilled = Array.from(inputs).every((input, index) => {
        if (input.value.trim() === "") {
            if (index === 0) {
                alert("Fullname must be filled");
            } else if (index === 1) {
                alert("Email must be filled");
            } else if (index === 2) {
                alert("Password must be filled");
            }
            return false; // Return false to stop the iteration
        }
        return true; // Return true if the input is filled
    });

    if (!fieldsFilled) {
        return;
    };
    // ===> Make an person object <===
    let newUser = {
        name: firstname.value.trim(),
        email: email.value.trim(),
        password: password.value.trim(),
    }
    // ===> check of the user already exist <===
    let users = localStorage.getItem(local_key) ? JSON.parse(localStorage.getItem(local_key)) : [];
    let existUsers = users.find((user) => user.email === newUser.email)


    if (existUsers) {
        alert("User with same email already exist");
        return;
    } else {
        users.push(newUser);
        alert(`User: ${newUser.name.substring(0, 1).toUpperCase() + newUser.name.slice(1)} created Successful`)
        localStorage.setItem(local_key, JSON.stringify(users))
        firstname.value = ""
        email.value = ""
        password.value = ""
    }

}

// ===> Password input to text switcher <===
function switchType(e) {
    if (e.target) {
        password.type = password.type === "password" ? "text" : password.type === "text" ? "password" : "text"
    }

}
