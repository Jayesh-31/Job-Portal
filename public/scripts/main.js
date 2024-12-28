$(document).ready(function () {
  handleApplicants();
  handleRegister();
  handleLogin();
  handleAddJob();
  $('.select2-container').select2({
    placeholder: "Select your skills",
    closeOnSelect: false
  });
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

          $('#errorContainer').empty().append(ulElement).removeClass('hide');
        } else {
          // Hide error container, reset the form, and redirect
          $('#errorContainer').addClass('hide');
          window.location.href = '/login';
          $('#registerForm')[0].reset();
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
}

function handleAddJob(){
  $('#addJobForm').on('submit', function (event) {
    event.preventDefault();

    const formElem = this;
    const fields = ['companyName', 'role', 'location', 'salary', 'skills', 'applyByDate'];
    const formData = {};

    fields.forEach(field => {
      let value = $(formElem).find(`[name="${field}"]`).val();
      formData[field] = value;
    })
    console.log(formData);
    const url = $(this).attr('action');

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the Content-Type header
      },
      body: JSON.stringify(formData), // Convert the data to a JSON string
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

          $('#errorContainer').empty().append(ulElement).removeClass('hide');
        } else {
          // Hide error container, reset the form, and redirect
          $('#errorContainer').addClass('hide');
          $('#addJobForm')[0].reset();
          window.location.href = '/jobs';
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

          $('#errorContainer').empty().append(ulElement).removeClass('hide');
        } else {
          // Hide error container, reset the form, and redirect
          $('#errorContainer').addClass('hide');
          $('#loginForm')[0].reset();
          window.location.href = '/home';
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
}
