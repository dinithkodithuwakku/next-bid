function loginUser() {
    let userName = $('form#loginForm input[name=username]').val();
    let password = $('form#loginForm input[name=password]').val();
    let remember_me = $('form#loginForm input[name=remember_me]').is('checked');

    localStorage.setItem("nextbid_login", JSON.stringify({
        "username": userName,
        "password": password,
        "userType": "customer",
        "remember_me": remember_me,
    }));

    if (localStorage.hasOwnProperty("nextbid_login") && userName === "admin@gmail.com" && password === "admin") {
        window.location.href = baseUrl + 'admin-dashboard.html';
    } else if (localStorage.hasOwnProperty("nextbid_login") && userName !== undefined && password !== undefined) {
        window.location.href = baseUrl + 'index.html';
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
            title: 'Invalid date! Please check again.'
        })
    }
});

