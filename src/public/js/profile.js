// File: public/js/profile.js

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const nameSpan = document.getElementById('name');
    const emailSpan = document.getElementById('email');
  
    // Redirect to login if no token found
    if (!token) {
      alert('Please log in first.');
      window.location.href = 'login.html';
      return;
    }
  
    try {
      const res = await fetch('http://localhost:5000/api/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.message || 'Failed to load profile.');
        window.location.href = 'login.html';
        return;
      }
  
      nameSpan.textContent = data.name;
      emailSpan.textContent = data.email;
    } catch (err) {
      console.error(err);
      alert('Error fetching profile');
      window.location.href = 'login.html';
    }
  
    // Logout logic
    document.getElementById('logout-btn').addEventListener('click', () => {
      localStorage.removeItem('token');
      window.location.href = 'index.html';
    });
  });
  