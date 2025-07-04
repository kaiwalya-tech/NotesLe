# NotesLe (Task & Notes Manager)

A full‑stack Task/Notes application built as part of Stuvio’s assignment.

## 🚀 Features

- **Secure Auth**: Sign up and log in with JWT & bcrypt  
- **Profile**: View your name and email  
- **CRUD**: Create, read, update, delete your notes/tasks  
- **Responsive UI**: Modern design with CSS variables and animations  

## 📦 Tech Stack

- **Backend:** Node.js, Express, MongoDB (Mongoose)  
- **Auth:** JWT, bcrypt  
- **Frontend:** HTML, CSS, JavaScript  

## 🔧 Setup Instructions

1. **Clone the repo**  
   ```bash
   git clone https://github.com/kaiwalya-tech/NotesLe.git
   cd NotesLe
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**

   ```bash
   # Windows:
   copy .env.example .env

   # macOS / Linux:
   cp .env.example .env
   ```

   Then open `.env` and fill in your `PORT`, `MONGO_URI` and `JWT_SECRET`.

4. **Run the server**

   ```bash
   node src/index.js
   ```

   The API will run at `http://localhost:$PORT`.

5. **Open the frontend**

   * Simply open `public/index.html` in your browser.

## 📖 API Documentation

Import the `Auth-CRUD-API.postman_collection.json` file (to be added) into Postman to see all endpoints and example requests.

## 📁 Repository Structure

.
├─ src/                  Backend code
│  ├─ config/           # Database connection
│  ├─ controllers/      # Route logic
│  ├─ middleware/       # Auth & error handlers
│  ├─ models/           # Mongoose schemas
│  ├─ routes/           # Express routers
│  └─ index.js          # App entry point
├─ public/              # Frontend
│  ├─ css/              # Styles
│  ├─ js/               # Client scripts
│  └─ *.html            # Pages
├─ .env.example         # Template for environment variables
├─ .gitignore           # Files & folders to ignore in Git
├─ README.md            # This file
└─ Auth-CRUD-API.postman_collection.json  # Postman export


