const tableBody = $('#customerAllPendingBuyersTable tbody');

function _createCustomerTableRow(customer) {
    return `
        <tr>
            <th class="fw-normal" scope="row">${customer.Id}</th>
            <td class="fw-bold">${customer.FirstName} ${customer.LastName} </td>
            <td>${customer.Address}</td>
            <td><a class="badge bg-dark text-decoration-none">${customer.Email}</a></td>
            <td><a class="badge bg-dark text-decoration-none">${customer.ContactNumber}</a></td>
            <td><a class="badge bg-dark text-decoration-none">${customer.UserType === 2 ? "Seller" : "Buyer"}</a></td>
            <td>
                <!--<a class="btn btn-sm btn-dark border-0 me-1" href="admin-customer-view.html"-->
                   <!--title="View Details">-->
                    <!--View-->
                <!--</a>-->
                 <span id=${customer.Id}></span>
            </td>
        </tr>
    `;
}

function onClickApproveBuyer(customer) {
    let userObj = {
        Id: customer.Id
    };

    $.ajax({
        type: "POST",
        url: "https://localhost:44395/api/User/Approve",
        data: userObj,
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
                title: "Buyer approved!",
            });
            window.location.href = baseUrl + 'admin-customer-all-pending-buyers.html';
        },
        error: function (response) {
            console.log(response);
            // handle error
            Toast.fire({
                icon: "error",
                title: "Request failed! cannot preform this action!",
            });
        },
    });
}

function onClickRejectBuyer(customer) {
    let userObj = {
        Id: customer.Id
    };

    $.ajax({
        type: "POST",
        url: "https://localhost:44395/api/User/Reject",
        data: userObj,
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
                title: "Buyer Rejected!",
            });
            window.location.href = baseUrl + 'admin-customer-all-pending-buyers.html';
        },
        error: function (response) {
            console.log(response);
            // handle error
            Toast.fire({
                icon: "error",
                title: "Request failed! cannot preform this action!",
            });
        },
    });
}

function _loadAllCustomers() {
    $.ajax({
        type: 'GET',
        url: "https://localhost:44395/api/User/GetUsersList/Buyers/Pending",
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
            for (let customer of response) {
                console.log("customer : ", customer);
                tableBody.append(_createCustomerTableRow(customer));

                let approveBuyer = document.createElement('button');
                approveBuyer.className = "btn btn-sm btn-primary border-0";
                approveBuyer.innerHTML = "<span class=\"fa fa-check\"></span>";
                approveBuyer.addEventListener('click', function () {
                    onClickApproveBuyer(customer)
                });

                document.getElementById(customer.Id).appendChild(approveBuyer);

                let rejectBuyer = document.createElement('button');
                rejectBuyer.className = "btn btn-sm btn-danger border-0";
                rejectBuyer.style.marginLeft = "10px";
                rejectBuyer.innerHTML = "<span class=\"fa fa-ban\"></span>";
                rejectBuyer.addEventListener('click', function () {
                    onClickRejectBuyer(customer)
                });

                document.getElementById(customer.Id).appendChild(rejectBuyer);
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

$(document).ready(function () {
    _loadAllCustomers();
});