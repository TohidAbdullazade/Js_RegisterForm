document.addEventListener("DOMContentLoaded", runToAllEvents); // Target When page Loaded

// ===> Js Selectors <===
let selectors = {
    form: document.querySelector("form"),
    inputs: document.querySelectorAll("input"),
    visible: document.querySelector(".fa-eye"),
    passwordInput: document.querySelector(".password-input"),
};
// ===> Destructing values <===
const { form, inputs, submitButton, visible, passwordInput } = selectors;
const [email, password] = inputs;

// ===> Output of all Events <===
function runToAllEvents() {
    if (form) {
        form.addEventListener("submit", loginUser);
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

// ===> Login Method <===
function loginUser(e) {
    let LOCALE_KEY = "users";
    e.preventDefault();
    let existUsers = JSON.parse(localStorage.getItem(LOCALE_KEY));

    // ===> check all fields of they are empty <===
    let fields = Array.from(inputs).every((item, i) => {
        if (item.value.trim() === "") {
            if (i === 0) {
                alert("Email field must be filled");
                return;
            }
            else if (i === 1) {
                alert("Password field must be filled");
                return;
            }
            return false; // Return false to stop the iteration
        }
        return true; // Return true if the input is filled
    });
    if (!fields) {
        return;
    };
    
// ===> Make an person object <===
    let person = {
        email: email.value.trim(),
        password: password.value.trim(),
    }
    // ===> verifiew of the user is has a account <===
    let verify = existUsers?.find((user) => user.email == person.email && user.password == person.password)
    if (verify) {
        alert(`Welcome User: ${verify.name.substring(0, 1).toUpperCase() + verify.name.slice(1)}`)
        email.value = ""
        password.value = ""
        console.log(verify)
    } else {
        alert("Incorrect email or password")
    }
}
// ===> Password input to text switcher <===
function switchType(e) {
    if (e.target) {
        password.type = password.type === "password" ? "text" : password.type === "text" ? "password" : "text"
    }

}