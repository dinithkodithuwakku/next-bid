function saveCategory() {
    let CategoryObj = {
        CategoryName: $('input[name=category_name]').val(),
    };

    $.ajax({
        type: "POST",
        url: "https://localhost:44395/api/Category/SaveCategory",
        data: CategoryObj,
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
                title: "Category successfully created!",
            });
            window.location.href = baseUrl + 'admin-category-all.html';
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

$("#category_create_form").on("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (document.querySelector("#category_create_form").checkValidity()) {
        saveCategory();
    } else {
        Toast.fire({
            icon: "error",
            title: "Invalid Data! Please check again.",
        });
    }
});

$("#category_create_form").on("reset", (e) => {
    e.preventDefault();
    e.stopPropagation();
    document.querySelector("#category_create_form").reset();
});

// ui elements
const tableBody = $('#categoryListTable tbody');

function _createTableRow(category) {
    return `
        <tr>
            <th class="fw-normal" scope="row">${category.CategoryId}</th>
            <td class="fw-bold">${category.CategoryName}</td>
        </tr>
    `;
}

function updateCategory(id) {
    // sometimes parameter type is not working
    let categoryID = "" + id;

    // handle update action
}

function removeCategoryById(id) {
    // sometimes parameter type is not working
    let categoryID = "" + id;

    Toast.fire({
        icon: 'success',
        title: 'Category removed successfully!'
    })
}

function _loadAllCategories() {
    $.ajax({
        type: 'GET',
        url: "https://localhost:44395/api/Category/GetCategoryList",
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
            for (let category of response) {
                console.log("category : ", category);
                tableBody.append(_createTableRow(category));
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
    _loadAllCategories();
});