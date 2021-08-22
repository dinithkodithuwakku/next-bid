function redirectToNextPage() {
    console.log('asdasd')
    let userName = $('form#loginForm input[name=username]').val();
    let password = $('form#loginForm input[name=password]').val();
    let remember_me = $('form#loginForm input[name=remember_me]').is('checked');

    localStorage.setItem("nextbid_login", JSON.stringify({
        "username": userName,
        "password": password,
        "userType": "customer",
        "remember_me": remember_me,
    }));

    if (localStorage.hasOwnProperty("nextbid_login") && userName !== undefined && password !== undefined) {
        window.location.href = baseUrl + 'index.html';
    }
}

function loginUser() {
    let userName = $('form#loginForm input[name=username]').val();
    let password = $('form#loginForm input[name=password]').val();
    if (userName === "admin@gmail.com" && password === "admin") {
        localStorage.setItem("nextbid_login", JSON.stringify({
            "username": userName,
            "password": password,
            "userType": "admin",
        }));
        window.location.href = baseUrl + 'admin-dashboard.html';
    } else {
        $.ajax({
            type: 'POST',
            url: "https://localhost:44395/api/User/Login",
            data: {
                Email: userName,
                Password: password
            },
            async: true,
            beforeSend: function () {
                // show loading

            },
            complete: function () {
                // hide loading

            },
            success: function (response) {
                // console.log(response);
                Toast.fire({
                    icon: "success",
                    title: "Redirecting...!",
                });
                localStorage.setItem("nextbid_userId", response);
                redirectToNextPage();

            },
            error: function (response) {

                if (response.status === 401) {
                    Toast.fire({
                        icon: "error",
                        title: "Email - Password is wrong!",
                    });
                }

                if (response.status === 403) {
                    Toast.fire({
                        icon: "error",
                        title: "Blacklisted!",
                    });
                }


                if (response.status === 500) {
                    Toast.fire({
                        icon: 'error',
                        title: 'Request failed! cannot preform this action!'
                    })
                }
                // handle error

            }
        });
    }
}

$('#loginForm').on('submit', e => {
    e.preventDefault();
    e.stopPropagation();
    if (document.querySelector('#loginForm').checkValidity()) {
        loginUser();
    } else {
        Toast.fire({
            icon: 'error',
            title: 'Invalid Data! Please check again.'
        })
    }
});

