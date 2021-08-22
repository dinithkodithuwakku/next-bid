function registerUser() {
    let UserOBJ = {
        FirstName: $('input[name=first_name]').val(),
        LastName: $('input[name=last_name]').val(),
        Address: $('textarea[name=address]').val(),
        ContactNumber: $('input[name=telephone]').val(),
        City: $('input[name=city]').val(),
        DOB: $('input[name=dob]').val(),
        Email: $('input[name=email]').val(),
        Password: $('input[name=password]').val(),
    };

    $.ajax({
        type: "POST",
        url: "https://localhost:44395/api/User/SaveUser",
        data: UserOBJ,
        async: true,
        beforeSend: function () {
            // show loading
        },
        complete: function () {
            // hide loading
        },
        success: function (response) {
            Toast.fire({
                icon: "success",
                title: "User successfully registered!",
            });
            window.location.href = baseUrl + 'index.html';
        },
        error: function (response) {
            if (response.status === 401) {
                Toast.fire({
                    icon: "error",
                    title: "Email already registerd!",
                });
            }

            if (response.status === 500) {
                Toast.fire({
                    icon: 'error',
                    title: 'Request failed! cannot preform this action!'
                })
            }
        },
    });
}

$("#user_registration_form").on("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (document.querySelector("#user_registration_form").checkValidity()) {
        registerUser();
    } else {
        Toast.fire({
            icon: "error",
            title: "Invalid Data! Please check again.",
        });
    }
});

$("#user_registration_form").on("reset", (e) => {
    e.preventDefault();
    e.stopPropagation();
    document.querySelector("#user_registration_form").reset();
});

function ConfirmPassword(inputName) {
    let passwordInput = document.querySelector(`input#passwordInput`);
    let reEnterPasswordInput = document.querySelector(`input#passwordInput`);
    let input = document.querySelector(`input#${inputName}`);
    if (
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/.test(
            passwordInput.value
        )
    ) {
        if (passwordInput.value === reEnterPasswordInput.value) {
            input.setCustomValidity("");
        } else {
            input.setCustomValidity("Passwords do not match.");
        }
    } else {
        input.setCustomValidity("Passwords do not match.");
    }
}

function validPassword(input) {
    let passwordInput = document.querySelector(`input#passwordInput`);
    let reEnterPasswordInput = document.querySelector(`input#passwordInput`);
    if (
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/.test(
            passwordInput.value
        )
    ) {
        input.setCustomValidity("");
    } else {
        input.setCustomValidity("Passwords do not match.");
    }
}