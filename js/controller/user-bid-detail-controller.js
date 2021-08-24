$(document).ready(function () {
    if (localStorage.hasOwnProperty("nextbid_bid_obj")) {
        let bidObj = JSON.parse(localStorage.getItem("nextbid_bid_obj"));

        checkUserBids(bidObj);

    }
});

function checkUserBids(bidObj) {
    let obj = {
        ItemId: bidObj.Item.ItemId,
        UserId: parseInt(localStorage.getItem("nextbid_userId")),
    };

    $.ajax({
        type: 'POST',
        url: "https://localhost:44395/api/User/GetUserBidsByItem",
        data: obj,
        async: true,
        success: function (response) {
            const bidDetailBase = $('#bidDetailBase');
            bidDetailBase.append(_createBidDetailBase(bidObj, response));


            let cancelDeadline = moment(response.BidDate).add(1, 'hours');
            if (moment().isAfter(cancelDeadline)) {
                $("#cancelOfferButton").prop("disabled", true);
            }
        },
        error: function (response) {
            // handle error
            if (response.status === 500) {
                Toast.fire({
                    icon: 'error',
                    title: 'Request failed! cannot preform this action!'
                })
            }
        }
    });
}

function _createBidDetailBase(bidObj, userBidResponse) {
    const format = "YYYY-MM-DD";
    let cancelDeadline = moment(userBidResponse.BidDate).add(1, 'hours');

    return `
        <div class="col-md-6 col-lg-6">
            <div class="w-100 mb-3">
                <video controls class="form-control border-0 bg-light" id="bidVideoPreview" src=${bidObj.Item.Video}
                       style="margin-top: 10px">
                    Your browser does not support HTML video.
                </video>
            </div>
        </div>

        <div class="col-md-6 col-lg-6">
            <div class="row">
                <h1 class="text-primary-dark">${bidObj.Item.ItemName}</h1>

                <p id="trailerDescription">${bidObj.Item.ItemDiscription}</p>

                <div class="d-flex flex-column">
                    <p class="mb-0">Ends On</p>
                    <h3 class="mb-0 fw-bold">${moment(new Date(bidObj.itemBidding.BidEndDate)).format(format)}</h3>
                </div>

                <div class="d-flex flex-row justify-content-between mt-2">
                    <div>
                        <p class="mb-0">Starting Bid</p>
                        <h3 class="mb-0 fw-bold text-primary">${bidObj.itemBidding.StartingBid}</h3></div>
                    <div>
                        <p class="mb-0">highest Bid</p>
                        <h3 class="mb-0 fw-bold text-primary" id="highestBidTextId">${bidObj.itemBidding.HighestBid}</h3>
                    </div>
                </div>
            </div>

            <div class="card border-0 bg-light" style="margin-top: 10px">
                 <form class="row needs-validation" id="placeBidForm" novalidate>
                    <div class="card-body">
                        <!--<div class="row m-0 p-0 justify-content-center">-->
                           <!--<label class="form-label" for="bidInspectionStartsDateTime">-->
                                <!--Inspection date-->
                            <!--</label>-->
                            <!--<input class="form-control border-0 bg-white" id="bidInspectionStartsDateTime" required-->
                                   <!--name="bidInspectionStartsDate"-->
                                   <!--type="date">-->
                            <!--<div class="invalid-feedback">-->
                                <!--Please enter valid inspection in date!-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="row m-0 p-3 justify-content-center" style="margin-top: 10px">-->
                                <!--<input class="form-control border-1 bg-white" type="number" required name="bidValue" value=${parseFloat(bidObj.itemBidding.HighestBid) + 5}>-->
                        <!--</div>-->
                        ${userBidResponse && userBidResponse.Id ?
        "<div class=\"row m-0 p-3 justify-content-center\" style=\"margin-top: 10px\"><h4 class='fw-bolder'>You already make an offer to this product</h4><h5>Your offer Rs. <span class='fw-bolder'>" + userBidResponse.BidValue + "</span>/-</h5></div><div class=\"row m-0 p-3 justify-content-center\" style=\"margin-top: 10px\"><h4 class='fw-normal'>Cancel before: " + cancelDeadline.format('hh:mm A') + "</h4></div><div class=\"p-3 justify-content-end w-100 align-content-end\" style=\"display: flex\"><button class=\"btn btn-danger border-0\" style=\"width: fit-content\" type=\"submit\" onclick=\"onClickCancelOffer(event)\" id=\"cancelOfferButton\">Cancel Offer</button></div>"
        :
        "<div class=\"row m-0 p-3 justify-content-center\" style=\"margin-top: 10px\"><input class=\"form-control border-1 bg-white\" type=\"number\" required name=\"bidValue\" value=" + parseFloat(bidObj.itemBidding.HighestBid + 5) + "> </div><div class=\"p-3 justify-content-end w-100 align-content-end\" style=\"display: flex\"><button class=\"btn btn-primary border-0\" style=\"width: fit-content\" type=\"submit\" onclick=\"onClickPlaceBid(event)\" id=\"placeBid\">Place Offer</button><div class=\"invalid-feedback\">Please enter bid value!</div></div>"
        }
                    </div>
               </form>
            </div>
        </div>
    `;
}

function onClickPlaceBid(event) {
    event.preventDefault();
    event.stopPropagation();
    if (document.querySelector('#placeBidForm').checkValidity()) {
        let bidObj = JSON.parse(localStorage.getItem("nextbid_bid_obj"));
        if (parseFloat($('input[name=bidValue]').val()) > bidObj.itemBidding.HighestBid) {

            let obj = {
                ItemId: bidObj.Item.ItemId,
                UserId: parseInt(localStorage.getItem("nextbid_userId")),
                InspectionDate: $('input[name=bidInspectionStartsDate]').val(),
                BidValue: parseFloat($('input[name=bidValue]').val())
            };

            $.ajax({
                type: 'POST',
                url: "https://localhost:44395/api/User/SaveUserBid",
                data: obj,
                async: true,
                beforeSend: function () {
                    // show loading
                    $(`#placeBid`).prop("disabled", true);
                },
                complete: function () {
                    // hide loading
                    $(`#placeBid`).prop("disabled", false);
                },
                success: function (response) {
                    // handle success

                    Toast.fire({
                        icon: 'success',
                        title: 'Bid successfully placed!'
                    });

                    window.location.href = baseUrl + 'user-bid-detail.html';
                },
                error: function (response) {
                    // handle error
                    if (response.status === 500) {
                        Toast.fire({
                            icon: 'error',
                            title: 'Request failed! cannot preform this action!'
                        })
                    }

                    if (response.status === 402) {
                        Toast.fire({
                            icon: 'error',
                            title: 'Insufficient balance! Please top up your wallet!'
                        })
                    }
                }
            });
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Bid value should grater than highest bid!'
            })
        }
    } else {
        Toast.fire({
            icon: 'error',
            title: 'InspectionDate and bid value required.'
        })
    }

}

function onClickCancelOffer(event) {
    event.preventDefault();
    event.stopPropagation();

    let bidObj = JSON.parse(localStorage.getItem("nextbid_bid_obj"));
    let obj = {
        ItemId: bidObj.Item.ItemId,
        UserId: parseInt(localStorage.getItem("nextbid_userId")),
    };

    $.ajax({
        type: 'POST',
        url: "https://localhost:44395/api/User/CancelUserBid",
        data: obj,
        async: true,
        beforeSend: function () {
            // show loading
            $(`#cancelOfferButton`).prop("disabled", true);
        },
        complete: function () {
            // hide loading
            $(`#cancelOfferButton`).prop("disabled", false);
        },
        success: function (response) {
            // handle success

            Toast.fire({
                icon: 'success',
                title: 'Offer Canceled!'
            });

            window.location.href = baseUrl + 'user-bid-detail.html';
        },
        error: function (response) {
            // handle error
            if (response.status === 500) {
                Toast.fire({
                    icon: 'error',
                    title: 'Request failed! cannot preform this action!'
                })
            }
        }
    });
}


(function worker() {
    let bidObj = JSON.parse(localStorage.getItem("nextbid_bid_obj"));

    let obj = {
        ItemId: bidObj.Item.ItemId,
    };

    $.ajax({
        type: 'POST',
        url: "https://localhost:44395/api/Item/GetHighestBid",
        data: obj,
        async: true,
        complete: function() {
            // Schedule the next request when the current one's complete
            setTimeout(worker, 5000);
        },
        success: function (response) {
            $('#highestBidTextId').text(response);
        },
        error: function (response) {
            // handle error
            if (response.status === 500) {
                Toast.fire({
                    icon: 'error',
                    title: 'Request failed! cannot preform this action!'
                })
            }
        }
    });
})();

