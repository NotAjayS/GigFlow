# GigFlow CRM 🚀

GigFlow CRM is a full-stack Customer Relationship Management (CRM) application built using the MERN stack.

It allows users to:
- Manage leads
- Create, edit, and delete customer entries
- Track lead status
- View analytics dashboard
- Search and filter leads

---

## 🌐 Live Demo

Frontend (Vercel):
https://gig-flow-alpha-silk.vercel.app

Backend (Render):
https://gigflow-backend-b3gk.onrender.com
User Email: sathish@gmail.com
Password: 12345

---

## 🛠 Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Axios
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## ✨ Features

- User Authentication
- Lead Management
- Dashboard Analytics
- Search & Filter
- REST API Integration
- Responsive UI
- Cloud Deployment

---

## 📁 Project Structure

```bash
GigFlow/
│
├── gigflow-client/
│   ├── src/
│   └── package.json
│
├── Server/
│   ├── src/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/NotAjayS/GigFlow.git
```

### Frontend Setup

```bash
cd gigflow-client
npm install
npm run dev
```

### Backend Setup

```bash
cd Server
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside `Server/`

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Create a `.env` file inside `gigflow-client/`

```env
VITE_API_URL=https://gigflow-backend-b3gk.onrender.com
```

---

## 📸 Screenshots

(Add screenshots here later)

---

## 👨‍💻 Author

Ajay S

---

## 📌 Future Improvements

- Role-Based Access
- Protected Routes
- Export Leads
- Advanced Analytics
- Team Collaboration
