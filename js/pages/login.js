import displayMessage from "../components/common/displayMessage.js";
import { saveToken, saveUser } from "../utils/storage.js";
import { baseUrl } from "../settings/api.js";

// declare containers & elements
const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

if (localStorage.token && localStorage.user) {
  location.href = "/admin/index.html";
}

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (usernameValue && passwordValue) {
    doLogin(usernameValue, passwordValue);
  } else {
    return displayMessage(
      "warning",
      "You shall not pass, your credentials are missing!",
      ".message-container"
    );
  }
}

async function doLogin(username, password) {
  const url = baseUrl + "/auth/local";

  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.user) {
      saveToken(json.jwt);
      saveUser(json.user);

      location.href = "/admin/index.html";
    }

    if (json.error) {
      displayMessage(
        "warning",
        "You shall not pass, your credentials are incorrect!",
        ".message-container"
      );
    }
  } catch (error) {
    console.log(error);
  }
}
