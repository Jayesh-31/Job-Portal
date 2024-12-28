$(document).ready(function () {
  handleApplicants();
  handleRegister();
  handleLogin();
});

function handleApplicants() {
  // Handle modal toggle
  $('[data-bs-target="#exampleModal"]').on('click', (e) => {
    $('#modalErrorContainer').addClass('hide');
  });

  // Handle job application form submission
  $('#job-apply').on('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const url = $(this).attr('action');

    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          // Display error messages
          const messages = data.response.map((value) => value.msg);
          var ulElement = $('<ul>');

          messages.forEach((item) => {
            var liElement = $('<li>').text(item);
            ulElement.append(liElement);
          });

          $('#modalErrorContainer').empty().append(ulElement).removeClass('hide');
        } else {
          // Reset the form and reload the page on success
          $('#job-apply')[0].reset();
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
}

function handleRegister(){
  // Handle login form submission
  $('#registerForm').on('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const url = $(this).attr('action');

    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          // Display error message
          // Display error messages
          const messages = data.response.map((value) => value.msg);
          var ulElement = $('<ul>');

          messages.forEach((item) => {
            var liElement = $('<li>').text(item);
            ulElement.append(liElement);
          });

          $('#registerErrorContainer').empty().append(ulElement).removeClass('hide');
        } else {
          // Hide error container, reset the form, and redirect
          $('#registerErrorContainer').addClass('hide');
          window.location.href = '/login';
          $('#registerForm')[0].reset();
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
}

function handleLogin() {
  // Handle login form submission
  $('#loginForm').on('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const url = $(this).attr('action');

    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          // Display error message
          // Display error messages
          const messages = data.response.map((value) => value.msg);
          var ulElement = $('<ul>');

          messages.forEach((item) => {
            var liElement = $('<li>').text(item);
            ulElement.append(liElement);
          });

          $('#loginErrorContainer').empty().append(ulElement).removeClass('hide');
        } else {
          // Hide error container, reset the form, and redirect
          $('#loginErrorContainer').addClass('hide');
          $('#loginForm')[0].reset();
          window.location.href = '/home';
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
}
