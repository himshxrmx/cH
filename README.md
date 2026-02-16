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
<img width="1024" height="1536" alt="image" src="https://github.com/user-attachments/assets/8d2c27b3-1022-4505-b907-8932d8b33130" />


📊 Architecture Diagram (Logical View)
<img width="1024" height="1536" alt="image" src="https://github.com/user-attachments/assets/c4971272-229d-45f5-b464-f95190430d71" />


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


Project Structure

<img width="1024" height="1536" alt="image" src="https://github.com/user-attachments/assets/fd21fbde-8b4c-4992-a429-96c26e20c62d" />


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






