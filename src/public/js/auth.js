// File: public/js/auth.js

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const nav = document.getElementById('site-nav');

  // Build dynamic navigation links
  if (nav) {
    if (token) {
      nav.innerHTML = `
        <a href="index.html" class="nav-link">Home</a>
        <a href="profile.html" class="nav-link btn">Profile</a>
        <a href="items.html" class="nav-link btn">My Items</a>
        <button id="logout-btn" class="nav-link btn">Logout</button>
      `;
      document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = 'index.html';
      });
    } else {
      nav.innerHTML = `
        <a href="index.html" class="nav-link">Home</a>
        <a href="login.html" class="nav-link btn">Login</a>
        <a href="signup.html" class="nav-link btn">Sign Up</a>
      `;
    }
  }

  // Signup form handling
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = signupForm.name.value.trim();
      const email = signupForm.email.value.trim();
      const password = signupForm.password.value;

      try {
        const res = await fetch('http://localhost:5000/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (!res.ok) { alert(data.message || 'Signup failed'); return; }
        localStorage.setItem('token', data.token);
        window.location.href = 'items.html';
      } catch (err) {
        console.error('Signup error:', err);
        alert('Something went wrong!');
      }
    });
  }

  // Login form handling
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = loginForm.email.value.trim();
      const password = loginForm.password.value;

      try {
        const res = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) { alert(data.message || 'Login failed'); return; }
        localStorage.setItem('token', data.token);
        window.location.href = 'items.html';
      } catch (err) {
        console.error('Login error:', err);
        alert('Something went wrong!');
      }
    });
  }
});
