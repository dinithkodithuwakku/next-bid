const completedBidsList = $('#bidCompletedListsId');


function _loadTrendingBids() {

    let itemObj = {
        UserId: parseInt(localStorage.getItem("nextbid_userId")),
    };
    $.ajax({
        type: 'POST',
        url: "https://localhost:44395/api/Item/GetItemListByUserId",
        data: itemObj,
        async: true,
        beforeSend: function () {
            // show loading

        },
        complete: function () {
            // hide loading

        },
        success: function (response) {
            // handle success
            completedBidsList.empty();
            for (let i = 0; i < response.Item.length; i++) {
                console.log(moment(response.itemBidding[i].BidEndDate));
                console.log(moment().isAfter(moment(response.itemBidding[i].BidEndDate)))
                if (moment().isAfter(moment(response.itemBidding[i].BidEndDate))) {
                    console.log("asdasd");
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

function createAndAppendBidsList(obj) {

    completedBidsList.append(_createBidCard(obj));

    let placeBidButton = document.createElement('button');
    placeBidButton.className = "btn btn-primary fw-bold w-100 py-3 border-0";
    placeBidButton.style.borderRadius = "10px";
    placeBidButton.innerHTML = "View users";
    placeBidButton.addEventListener('click', function () {
        onClickViewUsers(obj)
    });

    document.getElementById(obj.Item.ItemId).appendChild(placeBidButton);
}

function onClickViewUsers(bidObj) {
    event.preventDefault();

    localStorage.setItem("nextbid_bid_obj", JSON.stringify(bidObj));
    console.log(bidObj);

    window.location.href = baseUrl + 'seller-bid-history-view.html';
}

function _createBidCard(bidObj) {
    console.log(bidObj);
    const format = "YYYY-MM-DD";

    return `
        <div class="col-md-6 col-lg-4 col-sm-12 mb-3">
            <div class="card" style="border-radius: 10px">
                <div class="card-body p-3">
                    <div class="d-flex flex-row justify-content-between mb-3">
                        <div>
                            <p class="mb-0">Ended</p>
                            <p class="mb-0 fw-bold">${parseInt(moment().diff(moment(bidObj.itemBidding.BidEndDate),'hours', true))} hrs ago</p>
                        </div>
                        <div class="text-end">
                            <p class="mb-0">Highest Bid</p>
                            <p class="mb-0 fw-bold">${bidObj.itemBidding.HighestBid}</p>
                        </div>
                    </div>

                    <img alt="bid-image" src=${bidObj.Item.Image1}
                        style="width: 100%;height: 300px;border-radius: 10px;object-fit: cover;object-position: center;">

                    <h5 class="text-center my-3 fw-bold">${bidObj.Item.ItemName}</h5>
                    <h6 class="text-center my-3 fw-bold">${bidObj.Item.ItemDiscription}</h6>

                    <span id=${bidObj.Item.ItemId}></span>
                </div>
            </div>
        </div>
    `;
}