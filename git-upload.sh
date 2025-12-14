#!/bin/bash

# Git Upload Automation Script
# This script automatically adds, commits, and pushes code to GitHub

echo "=================================="
echo "Git Upload Automation Script"
echo "=================================="

# Check if commit message is provided
if [ -z "$1" ]; then
    echo "Error: Please provide a commit message"
    echo "Usage: ./git-upload.sh \"your commit message\""
    exit 1
fi

COMMIT_MESSAGE=$1

echo ""
echo "Step 1: Adding all changes to git..."
git add .

echo ""
echo "Step 2: Committing changes..."
git commit -m "$COMMIT_MESSAGE"

echo ""
echo "Step 3: Pushing to GitHub..."
git push

echo ""
echo "=================================="
echo "✅ Upload completed successfully!"
echo "=================================="
