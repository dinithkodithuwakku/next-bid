function onChangePaymentAmount(event) {
    if (event.value == 0) {
        $('#paymentGatewayTotalValueId').html(0);
    } else {
        $('#paymentGatewayTotalValueId').html(event.value);
    }
}

function loadWalletBalance() {
    if (localStorage.hasOwnProperty("nextbid_login")) {
        $.ajax({
            type: 'POST',
            url: "https://localhost:44395/api/User/GetUser",
            async: true,
            data: {
                Id: parseInt(localStorage.getItem("nextbid_userId"))
            },
            beforeSend: function () {
                // show loading

            },
            complete: function () {
                // hide loading

            },
            success: function (response) {
                $('#walletBalanceId').text(response.DepositAmount);
            },
            error: function (response) {
                // handle error
                Toast.fire({
                    icon: 'error',
                    title: 'Request failed! cannot preform this action!'
                })
            }
        });
    }
}

$(document).ready(function () {
    loadWalletBalance();
});

$("#user_topup_payment_form").on("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (document.querySelector("#user_topup_payment_form").checkValidity()) {
        confirmTopUpWallet();
    } else {
        Toast.fire({
            icon: "error",
            title: "Invalid Data! Please check again.",
        });
    }
});

function confirmTopUpWallet() {
    if (localStorage.hasOwnProperty("nextbid_login")) {
        $.ajax({
            type: 'POST',
            url: "https://localhost:44395/api/User/Wallet/TopUp",
            data: {
                UserId: parseInt(localStorage.getItem("nextbid_userId")),
                DepositAmount: parseFloat($('input[name=depositAmountInput]').val())
            },
            async: true,
            success: function (response) {
                Toast.fire({
                    icon: "success",
                    title: "User wallet balance updated!",
                });
                $("input[type=text], textarea, input[type=number]").val("");
                $('#paymentGatewayTotalValueId').html(0);


                window.location.href = baseUrl + 'user-wallet.html';
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