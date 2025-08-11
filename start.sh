#!/bin/bash

# Exit on any error
set -e

# Start the backend
echo "Starting backend..."
cd backend
pip install -r requirements.txt
uvicorn app.main:app --port 8000 &  # Run backend in background
cd ..

# Start the frontend
echo "Starting frontend..."
cd frontend
npm install
npm run dev
