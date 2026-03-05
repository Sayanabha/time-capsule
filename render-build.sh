#!/bin/bash
set -e

echo "Installing frontend dependencies..."
cd frontend && npm install

echo "Building frontend..."
npm run build

echo "Verifying dist folder..."
ls -la dist/

echo "Installing backend dependencies..."
cd ../backend && npm install

echo "Done."