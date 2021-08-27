const bidRow = $('#bidWinWrapper');


function _createBidCard(bidObj) {
    const format = "YYYY-MM-DD";

    return `
        <div class="col-md-12 col-lg-6 col-sm-12 mb-3">
            <div class="card" style="border-radius: 10px">
                <div class="card-body p-3 d-flex flex-row">
                    <img alt="bid-image" src=${bidObj.Item.Image1}
                         style="width: 50%;height: 300px;border-radius: 10px;object-fit: cover;object-position: center;">

                    <div class="d-flex flex-column m-3">
                        <h5 class="me-3 fw-bold"
                            style="display: block;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden">
                            ${bidObj.Item.ItemName}</h5>

                        <p class="mb-0">Bid Ended</p>
                        <p class="fw-bold">${parseInt(moment().diff(moment(bidObj.itemBidding.BidEndDate), 'hours', true))} hrs ago</p>

                        <p class="mb-0">Highest Bid <span class="badge bg-dark">Yours</span></p>
                        <p class="fw-bold">${bidObj.itemBidding.HighestBid}</p>

                        <p>Status : <span class="badge bg-success">Can Purchase</span></p>

                        
                        <div id=${bidObj.Item.ItemId}></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

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
        complete: function () {
            // setTimeout(checkCancelButtonDeadline(), 60000);
        },
        success: function (response) {

            if (parseFloat(bidObj.itemBidding.HighestBid) === parseFloat(response.BidValue)) {
                let placeBidButton = document.createElement('button');
                placeBidButton.className = "btn btn-primary fw-bold w-100 py-3 border-0";
                placeBidButton.style.borderRadius = "10px";

                if (parseFloat(bidObj.itemBidding.HighestBid) === parseFloat(response.ReserveAmount)) {
                    placeBidButton.innerHTML = "Paid";
                    placeBidButton.setAttribute('disabled', true);
                } else {
                    placeBidButton.innerHTML = "Pay now";
                }
                placeBidButton.addEventListener('click', function () {
                    onClickPayNow()
                });

                document.getElementById(bidObj.Item.ItemId).appendChild(placeBidButton);

                localStorage.setItem("nextbid_bid_obj", JSON.stringify(bidObj));
                localStorage.setItem("nextbid_pay_user_obj", JSON.stringify(response));
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

function onClickPayNow() {
    window.location.href = baseUrl + 'buyer-bid-pay-full-value.html';
}

function createAndAppendBidsList(obj) {

    bidRow.append(_createBidCard(obj));
    checkUserBids(obj);
}

function _loadTrendingBids() {
    $.ajax({
        type: 'POST',
        url: "https://localhost:44395/api/Item/GetItemListByUserBidded",
        async: true,
        data: {
            UserId: parseInt(localStorage.getItem("nextbid_userId")),
        },
        beforeSend: function () {
            // show loading

        },
        complete: function () {
            // hide loading

        },
        success: function (response) {
            // handle success
            bidRow.empty();
            for (let i = 0; i < response.Item.length; i++) {
                if (moment().isAfter(moment(response.itemBidding[i].BidEndDate))) {
                    let item = response.Item[i];
                    let itemBidding = response.itemBidding[i];
                    let bidObj = {
                        Item: item,
                        itemBidding: itemBidding
                    };
                    createAndAppendBidsList(bidObj);
                }
            }
        },
        error: function (response) {

        }
    });
}

$(document).ready(function () {
    _loadTrendingBids();
});