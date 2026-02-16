Smart Attendance System
AI-Powered Classroom Engagement Detection (Cloud Hackathon Project)

🔗 Live Demo: https://ch-gajd.onrender.com/

📌 Overview

Smart Attendance is an AI-powered classroom analytics system that detects student engagement using Facial Expression Recognition (FER).

The system analyzes classroom images in real-time, detects dominant emotions using a pre-trained AI model, and calculates overall engagement percentage. Results are stored securely in the cloud for tracking and analytics.

This project was built for a Cloud Hackathon, demonstrating integration of:

Cloud deployment

AI inference APIs

Backend APIs

Database storage

Real-time UI interaction

🧩 Problem Statement
🚨 Problem

Traditional attendance systems:

Only record presence

Do not measure engagement

Cannot detect student focus levels

Lack real-time analytics

Teachers have no insight into:

How many students are attentive

Emotional classroom atmosphere

Engagement trends over time

✅ Proposed Solution

We built a cloud-based AI system that:

Accepts classroom images

Uses Facial Expression Recognition (FER)

Detects emotions like:

Happy

Neutral

Surprise

Sad

Angry

Converts emotions into engagement metrics

Stores results in a cloud database

Provides analytics dashboard access

🚀 Key Features

🎯 Real-time Facial Expression Recognition

📊 Automatic Engagement Percentage Calculation

☁️ Cloud Deployment (Render)

🗄 MongoDB Atlas Cloud Storage

🔐 Secure API with Hugging Face Token

🖼 Drag & Drop Image Upload

📈 Dashboard-ready record endpoint

🌙 Modern UI with theme toggle

⚡ REST API based architecture

🏗 Technical Architecture
🔁 System Flow
User Uploads Image
        ↓
Frontend (HTML/CSS/JS)
        ↓
Node.js Backend (Express)
        ↓
Hugging Face AI Model API
        ↓
Emotion Prediction
        ↓
Engagement Calculation
        ↓
MongoDB Atlas Storage
        ↓
JSON Response to UI

📊 Architecture Diagram (Logical View)
┌─────────────────────┐
│     Frontend        │
│  (HTML/CSS/JS)      │
└──────────┬──────────┘
           │ HTTP Request
           ▼
┌─────────────────────┐
│  Node.js Backend    │
│  Express + Multer   │
└──────────┬──────────┘
           │ API Call
           ▼
┌─────────────────────┐
│  Hugging Face AI    │
│  ViT Emotion Model  │
└──────────┬──────────┘
           │ Emotion Result
           ▼
┌─────────────────────┐
│ MongoDB Atlas Cloud │
│ Engagement Records  │
└─────────────────────┘

☁ Cloud Hosting Details
Component	Cloud Provider
Backend Hosting	Render
Database	MongoDB Atlas
AI Inference	Hugging Face Cloud API
Frontend	Static (served via Render)
🧠 What Hugging Face Does

We use the pre-trained model:

trpakov/vit-face-expression


It:

Accepts image input

Detects facial expression

Returns emotion predictions

Does NOT store any data

Your backend:

Converts emotion → engagement

Saves data to MongoDB

🛠 Detailed Tech Stack
🔹 Frontend

HTML5

CSS3 (Modern UI)

JavaScript (Vanilla)

Fetch API

Drag & Drop API

🔹 Backend

Node.js

Express.js

Multer (Image Upload Handling)

Axios (API calls)

dotenv (Environment variables)

🔹 Database

MongoDB Atlas

Mongoose ODM

🔹 AI Layer

Hugging Face Inference API

Vision Transformer (ViT) Model

🔹 Cloud Infrastructure

Render Web Service

Environment Variables

Secure Token-based authentication

📁 Project Structure
Smart-Attendance/
│
├── backend/
│   ├── models/
│   │   └── Record.js
│   ├── routes/
│   │   └── analyze.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── index.html
│   ├── dashboard.html
│   ├── style.css
│   └── script.js
│
├── .env
└── README.md

⚙️ Environment Variables

Create a .env file:

MONGO_URI=your_mongodb_connection_string
HF_TOKEN=your_huggingface_token
PORT=3000

▶️ Usage
1️⃣ Clone Repository
git clone https://github.com/yourusername/smart-attendance.git
cd smart-attendance

2️⃣ Install Backend Dependencies
cd backend
npm install

3️⃣ Run Locally
node server.js


Server will run on:

http://localhost:3000

4️⃣ Upload Image

Drag & Drop classroom image

Click Analyze

View engagement results

Data stored in MongoDB

📊 API Endpoints
POST /analyze

Uploads image and returns engagement data

GET /records

Fetch all stored engagement records

🎯 Engagement Logic
Happy / Neutral / Surprise → Engaged
Sad / Angry / Fear → Not Engaged


Engagement % = (Engaged / Total Students) × 100

(Current version processes one face per image)

🔒 Security Measures

HF Token stored in environment variables

MongoDB credentials secured

No sensitive data exposed in frontend

CORS configured

📈 Future Improvements

Multi-face detection per image

Real-time webcam support

Engagement trend analytics graph

Role-based login system

Teacher dashboard

Classroom-wise data filtering

AWS/GCP deployment

🏆 Hackathon Highlights

Cloud-native deployment

AI inference integration

Database integration

REST API architecture

Scalable modular design

👨‍💻 Author

Built for Cloud Hackathon 2026
Smart Attendance – AI Powered Engagement Detection

