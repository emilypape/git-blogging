const logoutEl = document.querySelector('#logout-el');
const loginEl = document.querySelector('#login-el');
const dashboardEl = document.querySelector('#dashboard-el');
const homeEl = document.querySelector('#homepage-el');

async function logout() {
  const response = await fetch('/api/users/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    console.log('logged out');
    window.location.replace('/login');
  } else {
    alert(response.statusText);
  }
}

function loginRedirect() {
  window.location.replace('/login');
}

function dashboardRedirect() {
  window.location.replace('/dashboard');
}

function homepageRedirect() {
  window.location.replace('/homepage');
}

logoutEl.addEventListener('click', logout);
loginEl.addEventListener('click', loginRedirect);
dashboardEl.addEventListener('click', dashboardRedirect);
homeEl.addEventListener('click', homepageRedirect);
