# 🌐 Dynamic Portfolio Web Application  

A full-stack web application that allows users to create and manage their personal **portfolio** — including work experience, projects, certificates, and social links — all in one place.  

Built using **Angular** for the frontend and **Node.js (Express + Sequelize + MySQL)** for the backend.  

---
## 🌍 Live Demo

🔗 [View Portfolio App](https://surajraj.netlify.app/) The given link has Static UI just to give the demo of App

🧪 Test Credentials (if you want to show a demo)

## 🚀 Features  

### 👤 User Profile
- Register & securely log in  
- Add personal details such as name, contact info, role, and bio  
- Upload resume and profile picture  

### 💼 Work Experience
- Add multiple company experiences dynamically  
- Include roles, durations, and key contributions  

### 🧑‍💻 Projects
- Showcase your projects with title, description, year, and live site link  

### 📜 Certificates
- Upload and store certificates (PDF / DOC / DOCX supported)  

### 🔗 Social Links
- Link your GitHub, LinkedIn, and Twitter profiles  
- Resume and profile images stored directly in the database  

---

## 🛠️ Tech Stack  

| Layer | Technology |
|-------|-------------|
| **Frontend** | Angular 17+, TypeScript, HTML, SCSS |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL (via Sequelize ORM) |
| **File Storage** | Stored as BLOBs inside MySQL |
| **Other Tools** | RxJS, Bootstrap, FormData API |

---

## ⚙️ Project Structure  

portfolio/
├── portfoliofrontend/ # Angular Frontend
│ ├── src/
│ ├── angular.json
│ └── ...
│
├── portfoliobackend/ # Express + Sequelize Backend
│ ├── src/
│ │ ├── models/
│ │ ├── controllers/
│ │ ├── routes/
│ │ └── Db/
│ ├── package.json
│ └── server.js
│
└── README.md

## 💻 Setup Instructions  

### 🧩 1. Clone the repository

git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>

⚙️  Backend Setup
cd portfoliobackend
npm install
npm run dev

🖥️  Frontend Setup
cd ../portfoliofrontend
npm install
ng serve

## 🔐 Security Highlights
- Passwords are hashed using SHA-256 + salted before saving
- Sensitive config values are stored in `.env` files
- Sequelize ORM prevents SQL Injection by parameterized queries
- Input validation on both frontend & backend
## 🧰 Contributing

Contributions are welcome!  
If you'd like to improve the project:

1. Fork this repository  
2. Create a new branch (`git checkout -b feature-branch`)  
3. Commit your changes (`git commit -m "Add new feature"`)  
4. Push to your branch (`git push origin feature-branch`)  
5. Open a Pull Request 🚀


![Angular](https://img.shields.io/badge/Frontend-Angular-red?logo=angular)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![Express](https://img.shields.io/badge/Framework-Express-lightgrey?logo=express)
![MySQL](https://img.shields.io/badge/Database-MySQL-blue?logo=mysql)
![Sequelize](https://img.shields.io/badge/ORM-Sequelize-purple?logo=sequelize)
![License](https://img.shields.io/badge/License-MIT-yellow)


## 👨‍💻 Developer

**Suraj Raj**  
💼 Software Developer | Angular & Node.js Enthusiast  
📧 Email: [rajsuraj663@gmail.com](mailto:rajsuraj663@gmail.com)  
🔗 [LinkedIn](https://linkedin.com/in/suraj663)
• [GitHub](https://github.com/suraj-9430)





