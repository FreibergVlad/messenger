const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");
const errorContainer = document.getElementById("errorContainer");

window.onload = () => {
    submitBtn.addEventListener("click", handleLoginRequest);
};

function handleLoginRequest() {
    const credentials = {
        "username": usernameInput.value,
        "password": passwordInput.value
    };
    const errors = validateFormData(credentials);
    if (Object.keys(errors).length) {
        showErrors(errors);
    } else {
        sendLoginRequest(credentials)
            .then((res) => processAuthorizationResult(res))
            .catch();
    }
}

function showErrors(errors) {

}

function validateFormData(credentials) {
    let errors = {};
    if (!credentials.username) {
        errors["username"] = "Please enter the username";
    }
    if (!credentials.password) {
        errors["password"] = "Please enter the password"
    }
    return errors;
}

function sendLoginRequest(credentials) {
    return HttpUtils.post(LOGIN_URL, HttpUtils.encodeFormData(credentials), {
        "Content-Type": "application/x-www-form-urlencoded"
    });
}

function processAuthorizationResult(res) {
    if (res.url.includes(`${LOGIN_URL}?error`)) {
        errorContainer.classList.remove("d-none");
    } else {
        window.location.replace(res.url);
    }
}