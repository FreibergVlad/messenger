const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

const submitBtn = document.getElementById("submitBtn");
const errorAlert = document.getElementById("errorAlert");
const successAlert = document.getElementById("successAlert");

const USERNAME_MIN_LENGTH = 6;
const PASSWORD_MIN_LENGTH = 8;

const INVALID_USERNAME_MSG = `Username must contains at least ${USERNAME_MIN_LENGTH} symbols`;
const INVALID_PASSWORD_MSG = `Password must contains at least ${PASSWORD_MIN_LENGTH} symbols`;
const PASSWORDS_DONT_MATCH_MSG = "Password doesn't match!";

window.onload = () => {
    submitBtn.addEventListener("click", handleRegistrationRequest);
    HTMLInputElement.prototype.invalidate = function (message) {
        this.parentElement.getElementsByClassName("invalid-feedback")[0].innerHTML = message;
        this.classList.add("is-invalid");
    }
};

function handleRegistrationRequest() {
    const credentials = {
        "username": usernameInput.value,
        "password": passwordInput.value,
        "confirmPassword": confirmPasswordInput.value
    };
    const errors = processClientSideValidation(credentials);
    if (Object.keys(errors).length) {
        processErrors(errors);
    } else {
        sendRegistrationRequest(credentials)
            .then(res => processRegistration(res));
    }
}

function processRegistration(res) {
    res.json()
        .then((json) => {
            if (res.status === HttpUtils.STATUS_CODES.CREATED) {
                processRegistrationSuccess();
            } else if (res.status === HttpUtils.STATUS_CODES.BAD_REQUEST) {
                processRegistrationFailed(json);
            }
        });
}

function processRegistrationSuccess() {
    successAlert.classList.remove("d-none");
    //setTimeout(() => window.location.replace(window.location.origin + LOGIN_URL), 20000000000);
}

function processRegistrationFailed(json) {
    const errors = processServerSideValidation(json);
    processErrors(errors);
}

function processClientSideValidation(credentials) {
    let errors = {};
    if (!credentials.username || credentials.username.length < USERNAME_MIN_LENGTH) {
        errors["username"] = INVALID_USERNAME_MSG;
    }
    if (!credentials.password || credentials.password.length < PASSWORD_MIN_LENGTH) {
        errors["password"] = INVALID_PASSWORD_MSG;
    }
    if (!credentials.confirmPassword || credentials.confirmPassword !== credentials.password) {
        errors["confirmPassword"] = PASSWORDS_DONT_MATCH_MSG;
    }
    return errors;
}

function processServerSideValidation(serverFeedback) {
    let errors = {};
    if (serverFeedback["username"]) {
        errors["username"] = INVALID_USERNAME_MSG;
    }
    if (serverFeedback["password"]) {
        errors["password"] = INVALID_PASSWORD_MSG;
    }
    if (serverFeedback["confirmPassword"]) {
        errors["confirmPassword"] = PASSWORDS_DONT_MATCH_MSG
    }
    return errors;
}

function processErrors(errors) {
    if (errors["username"]) {
        usernameInput.invalidate(errors["username"]);
    }
    if (errors["password"]) {
        passwordInput.invalidate(errors["password"]);
    }
    if (errors["confirmPassword"]) {
        confirmPasswordInput.invalidate(errors["confirmPassword"]);
    }
}

function sendRegistrationRequest(credentials) {
    return HttpUtils.post(REGISTRATION_URL, JSON.stringify(credentials), {
        "Content-Type": "application/json"
    });
}