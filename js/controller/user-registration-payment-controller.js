$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

$("#user_registration_payment_form").on("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (document.querySelector("#user_registration_payment_form").checkValidity()) {
        confirmRegistrationPayment();
    } else {
        Toast.fire({
            icon: "error",
            title: "Invalid Data! Please check again.",
        });
    }
});

function confirmRegistrationPayment() {
    if (localStorage.hasOwnProperty("nextbid_login")) {
        console.log(parseInt(localStorage.getItem("nextbid_userId")));
        $.ajax({
            type: 'POST',
            url: "https://localhost:44395/api/User/ConfirmRegistrationPayment",
            data: {
                Id: parseInt(localStorage.getItem("nextbid_userId"))
            },
            async: true,
            success: function (response) {
                Toast.fire({
                    icon: "success",
                    title: "Redirecting...!",
                });

                window.location.href = baseUrl + 'index.html';

            },
            error: function (response) {

                if (response.status === 500) {
                    Toast.fire({
                        icon: 'error',
                        title: 'Request failed! cannot preform this action!'
                    })
                }
                // handle error

            }
        });
    } else {
        checkLogins();
    }
}