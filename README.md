# AI Chat App 🤖

## Overview
This is a full-stack AI chatbot application using React, Node.js, and MongoDB.

## Tech Stack
Frontend: React (Vite)  
Backend: Node.js, Express  
Database: MongoDB Atlas  
AI: Groq API (llama-3.1-8b-instant)

## Features
- Single question → single response
- Stores data in MongoDB
- Simple chat UI

## Run Project

### Backend
cd backend
npm install
node server.js

### Frontend
cd frontend
npm install
npm run dev

## API
POST /ask

Request:
{
  "question": "Hello"
}

Response:
{
  "answer": "Hi"
}