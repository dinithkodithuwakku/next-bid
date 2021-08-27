const tableBody = $('#productReadyToDispatchTable tbody');

function loadReadyToDispatchProducts() {
    $.ajax({
        type: 'GET',
        url: "https://localhost:44395/api/Item/GetReadyToDispatchList",
        async: true,
        beforeSend: function () {
            // show loading
        },
        complete: function () {
            // hide loading
        },
        success: function (response) {
            console.log(response);
            tableBody.empty();
            for (let product of response) {
                console.log("product : ", product);
                tableBody.append(_createProductTableRow(product));

                let dispatchButton = document.createElement('button');
                dispatchButton.className = "btn btn-sm btn-primary border-0";
                dispatchButton.innerHTML = "Dispatch";

                dispatchButton.setAttribute("data-bs-toggle", "modal");
                dispatchButton.setAttribute("data-bs-target", "#courierCharagesModal");

                dispatchButton.addEventListener('click', function () {
                    localStorage.setItem("nextbid_dispatch_obj", JSON.stringify(product));
                });

                document.getElementById(product.Item.ItemId).appendChild(dispatchButton);

            }

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

function _createProductTableRow(product) {
    return `
        <tr>
            <th class="fw-normal" scope="row">${product.Item.ItemId}</th>
            <td class="fw-bold">${product.Item.ItemName}</td>
            <td>${product.Item.ItemDiscription}</td>
            <td><a class="badge bg-dark text-decoration-none">${product.ItemBidding.HighestBid}</a></td>
            <td><a class="badge bg-dark text-decoration-none">${product.User.FirstName} ${product.User.LastName}</a></td>
            <td><a class="badge bg-dark text-decoration-none">${product.User.ContactNumber}</a></td>
            <td><a class="badge bg-dark text-decoration-none">${product.User.Address} ${product.User.City}</a></td>
            
            <td>
                <!--<a class="btn btn-sm btn-dark border-0 me-1" href="admin-customer-view.html"-->
                   <!--title="View Details">-->
                    <!--View-->
                <!--</a>-->
                
                 <span id=${product.Item.ItemId}></span>
            </td>
        </tr>
    `;
}

$(document).ready(function () {
    loadReadyToDispatchProducts();
});

function saveDispatchOrder(event) {
    event.preventDefault();
    let dispatchObj = JSON.parse(localStorage.getItem("nextbid_dispatch_obj"));

    let obj = {
        ItemId: dispatchObj.Item.ItemId,
        Address: dispatchObj.User.Address + " " + dispatchObj.User.City,
        DeliveryCost: parseFloat($('input[name=courierChargesInput]').val())
    };

    $.ajax({
        type: 'POST',
        url: "https://localhost:44395/api/OrderDetail/SaveDispatch",
        data: obj,
        async: true,
        success: function (response) {
            // handle success

            Toast.fire({
                icon: 'success',
                title: 'Order Dispatched!'
            });

            window.location.href = baseUrl + 'admin-product-ready-to-dispatch.html';
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