$(document).ready(function () {
    if (localStorage.hasOwnProperty("nextbid_bid_obj")) {
        let bidObj = JSON.parse(localStorage.getItem("nextbid_bid_obj"));

        const bidDetailBase = $('#bidDetailBase');
        bidDetailBase.append(_createBidDetailBase(bidObj));

        loadBidsUsersList();
    }
});

function _createBidDetailBase(bidObj) {
    const format = "YYYY-MM-DD";
    console.log(bidObj);

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
                        
                    </div>
               </form>
            </div>
            
            <div class="row">
                <h3 class="text-primary-dark">Bids users</h3>
                
                <div class="list-group" id="bidsUsersListId">
                <div>
                
        </div>
    `;
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
        complete: function () {
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


(function worker() {
    let bidObj = JSON.parse(localStorage.getItem("nextbid_bid_obj"));
    $('#bidsUsersListId').empty();
    let obj = {
        ItemId: bidObj.Item.ItemId,
    };

    $.ajax({
        type: 'POST',
        url: "https://localhost:44395/api/User/GetUserBidsByItemId",
        data: obj,
        async: true,
        complete: function () {
            // Schedule the next request when the current one's complete
            setTimeout(worker, 5000);
        },
        success: function (response) {
            response.forEach(function (userBid) {
                $('#bidsUsersListId').append(
                    `
                <button type="button" class="list-group-item list-group-item-action">${userBid.user.FirstName} ${userBid.user.LastName} - Rs. ${userBid.userBiddingDetails.BidValue} /-</button>
                `
                );
            });

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

