$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

$(document).ready(function () {
    let payUserObj = JSON.parse(localStorage.getItem("nextbid_pay_user_obj"));
    let bidObj = JSON.parse(localStorage.getItem("nextbid_bid_obj"));

    console.log(bidObj);
    $('#totalFeeId').html(parseFloat(bidObj.itemBidding.HighestBid) - parseFloat(payUserObj.ReserveAmount));
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
        let payUserObj = JSON.parse(localStorage.getItem("nextbid_pay_user_obj"));
        let bidObj = JSON.parse(localStorage.getItem("nextbid_bid_obj"));
        $.ajax({
            type: 'POST',
            url: "https://localhost:44395/api/User/PayFullAmountToBid",
            data: {
                UserId: parseInt(localStorage.getItem("nextbid_userId")),
                ItemId: parseInt(bidObj.Item.ItemId),
                DepositAmount: parseFloat(bidObj.itemBidding.HighestBid)
            },
            async: true,
            success: function (response) {
                Toast.fire({
                    icon: "success",
                    title: "Redirecting...!",
                });

                window.location.href = baseUrl + 'user-bidding-history.html';

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