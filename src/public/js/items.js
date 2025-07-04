// File: public/js/items.js

document.addEventListener('DOMContentLoaded', () => {
  const token     = localStorage.getItem('token');
  const itemForm  = document.getElementById('item-form');
  const itemList  = document.getElementById('item-list');
  const logoutBtn = document.getElementById('logout-btn');

  if (!token) {
    alert('Please login first.');
    window.location.href = 'login.html';
    return;
  }

  // Render items from API
  const fetchItems = async () => {
    try {
      const res   = await fetch('http://localhost:5000/api/items', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const items = await res.json();

      itemList.innerHTML = '';
      if (items.length === 0) {
        itemList.innerHTML = '<li>No items yet.</li>';
        return;
      }

      items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
          <div class="item-card">
            <h3 
              class="item-title" 
              data-id="${item._id}" 
              contenteditable="false"
            >${item.title}</h3>
            <p 
              class="item-desc" 
              data-id="${item._id}" 
              contenteditable="false"
            >${item.description || ''}</p>
            <div class="item-actions">
              <button data-id="${item._id}" class="edit-btn btn-small">Edit</button>
              <button data-id="${item._id}" class="delete-btn btn-small">Delete</button>
            </div>
          </div>
        `;
        itemList.appendChild(li);
      });
    } catch (err) {
      console.error(err);
      alert('Failed to fetch items');
    }
  };

  // Create new item
  itemForm.addEventListener('submit', async e => {
    e.preventDefault();
    const title       = itemForm.title.value.trim();
    const description = itemForm.description.value.trim();
    if (!title) return;

    try {
      const res = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, description })
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Add failed');
      itemForm.reset();
      fetchItems();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  });

  // Handle Edit/Save & Delete
  itemList.addEventListener('click', async e => {
    const id = e.target.dataset.id;
    if (!id) return;

    // DELETE
    if (e.target.classList.contains('delete-btn')) {
      try {
        await fetch(`http://localhost:5000/api/items/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchItems();
      } catch {
        alert('Error deleting item');
      }
    }

    // EDIT / SAVE
    if (e.target.classList.contains('edit-btn')) {
      const isEditing = e.target.textContent === 'Save';
      const titleEl   = document.querySelector(`.item-title[data-id="${id}"]`);
      const descEl    = document.querySelector(`.item-desc[data-id="${id}"]`);

      if (!isEditing) {
        // Enter edit mode
        titleEl.contentEditable = 'true';
        descEl.contentEditable  = 'true';
        titleEl.focus();
        e.target.textContent = 'Save';
        e.target.classList.add('btn-primary'); // optional styling
      } else {
        // Save changes
        const newTitle = titleEl.textContent.trim();
        const newDesc  = descEl.textContent.trim() || '';
        if (!newTitle) {
          alert('Title cannot be empty');
          return;
        }
        try {
          const res = await fetch(`http://localhost:5000/api/items/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ title: newTitle, description: newDesc })
          });
          if (!res.ok) throw new Error((await res.json()).message || 'Update failed');
          // Exit edit mode
          titleEl.contentEditable = 'false';
          descEl.contentEditable  = 'false';
          e.target.textContent = 'Edit';
          e.target.classList.remove('btn-primary');
          fetchItems();
        } catch (err) {
          console.error(err);
          alert(err.message);
        }
      }
    }
  });

  // Logout
  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });

  // Initial load
  fetchItems();
});
