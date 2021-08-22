function confirmPassword(inputName) {
  let passwordInput = document.querySelector(`input#passwordInput`);
  let reEnterPasswordInput = document.querySelector(`input#reEnterPassword`);
  let input = document.querySelector(`input#${inputName}`);
  input.setCustomValidity("");
  if (passwordInput.value !== reEnterPasswordInput.value) {
    input.setCustomValidity("Passwords do not match.");
  }
}

function updateCredentials() {
  $.ajax({
    enctype: "multipart/form-data",
    type: "POST",
    url: "http://localhost:44395/api/v1/User/login",
    processData: false,
    contentType: false,
    dataType: "JSON",
    data: new FormData($("#user_registration_form")[0]),
    async: true,
    beforeSend: function () {
      // show loading
    },
    complete: function () {
      // hide loading
    },
    success: function (response) {
      // handle success
      if (response.status === 200) {
        Toast.fire({
          icon: "success",
          title: "Credentials updated successfully!",
        });
      }
    },
    error: function (response) {
      // handle error
      Toast.fire({
        icon: "error",
        title: "Request failed! cannot preform this action!",
      });
    },
  });
}

$("form#editCredentialsForm").on("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (document.querySelector("#editCredentialsForm").checkValidity()) {
    // update credentials form
    updateCredentials();
  } else {
    Toast.fire({
      icon: "error",
      title: "Invalid user credentials! Please check again.",
    });
  }
});

function editProfile() {
  $.ajax({
    enctype: "multipart/form-data",
    type: "POST",
    url: baseUrl + "/api/v1/",
    processData: false,
    contentType: false,
    dataType: "JSON",
    data: new FormData($("#editProfileForm")[0]),
    async: true,
    beforeSend: function () {
      // show loading
    },
    complete: function () {
      // hide loading
    },
    success: function (response) {
      // handle success
      if (response.status === 200) {
        Toast.fire({
          icon: "success",
          title: "User data edit successfully!",
        });
      }
    },
    error: function (response) {
      // handle error
      Toast.fire({
        icon: "error",
        title: "Request failed! cannot preform this action!",
      });
    },
  });
}

$("form#editProfileForm").on("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (document.querySelector("#editProfileForm").checkValidity()) {
    // update credentials form
    editProfile();
  } else {
    Toast.fire({
      icon: "error",
      title: "Invalid form inputs! Please check again.",
    });
  }
});
