function confirmPassword(inputName) {
    let passwordInput = document.querySelector(`input#passwordInput`);
    let reEnterPasswordInput = document.querySelector(`input#reEnterPassword`);
    let input = document.querySelector(`input#${inputName}`);
    input.setCustomValidity("");
    if (passwordInput.value !== reEnterPasswordInput.value) {
        input.setCustomValidity("Passwords do not match.");
    }
}

$('form#editCredentialsForm').on('submit', e => {
    e.preventDefault();
    e.stopPropagation();
    if (document.querySelector('#editCredentialsForm').checkValidity()) {

        // update credentials form

    } else {
        Toast.fire({
            icon: 'error',
            title: 'Invalid user credentials! Please check again.'
        })
    }
});

$('form#editProfileForm').on('submit', e => {
    e.preventDefault();
    e.stopPropagation();
    if (document.querySelector('#editProfileForm').checkValidity()) {

        // update credentials form

    } else {
        Toast.fire({
            icon: 'error',
            title: 'Invalid form inputs! Please check again.'
        })
    }
});