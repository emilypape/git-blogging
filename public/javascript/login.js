const loginBtn = document.querySelector('#login-btn');
const usernameInput = document.querySelector('#username-login');
const passwordInput = document.querySelector('#password-login');
const signupRedirect = document.querySelector('#signup-redirect');

async function loginFormHandler(event) {
  event.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log('logged in');
    } else {
      alert(response.statusText);
    }
  }
}

function goToSignup() {
  window.location.replace('/signup');
}

loginBtn.addEventListener('click', loginFormHandler);
signupRedirect.addEventListener('click', goToSignup);
