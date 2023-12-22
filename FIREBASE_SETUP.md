# Firebase Setup Steps for User Management Project

This document outlines the basic steps performed in the Firebase console for setting up various features in the user management project.

## Firebase Project Creation

1. **Navigate to Firebase Console**:
   - Go to [Firebase Console](https://console.firebase.google.com/).
2. **Create New Project**:
   - Click on "Add project".
   - Enter your project name.

## Firebase Authentication Setup

1. **Go to Authentication Section**:
   - In the Firebase Console, navigate to the "Authentication" section.
2. **Enable Email/Password Provider**:
   - Click on "Get started".
   - Enable the "Email/Password" sign-in provider.

## Firestore Database Setup

1. **Create Firestore Database**:
   - Navigate to "Firestore Database" in the Firebase Console.
   - Click "Create database".
   - Start in test mode (allow read/write operations for all users).

## Firebase Storage Setup

1. **Go to Storage Section**:
   - In the Firebase Console, navigate to the "Storage" section.
2. **Create a Storage Bucket**:
   - Follow the prompts to create a new storage bucket.
   - Set up rules for file access (public read access for profile images).

## Firebase Cloud Functions Setup

1. **Initialize Firebase Functions**:
   - Use Firebase CLI to initialize Functions in your project (`npx firebase init functions`).
2. **Deploy Functions**:
   - After writing your function, deploy it using Firebase CLI in `functions` folder (`npm run deploy`).
