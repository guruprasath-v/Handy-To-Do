# Handy To-Do App

Handy To-Do App is a simple and interactive web application that allows users to manage their tasks efficiently. It uses Firebase Firestore for real-time data storage and retrieval. Users can add, update, and remove tasks, with a user-friendly interface built using React and Chakra UI.

## Features
* Add Tasks: Easily add new tasks to your to-do list.
* Update Tasks: Mark tasks as completed or restore them if needed.
* Delete Tasks: Remove tasks from your list.
* Responsive Design: Works seamlessly across different devices.



## Instalation

Instructions on how to get a copy of the project and running on your local machine.

### Prerequisites

_A guide on how to install the tools needed for running the project._
* Node.js: Ensure you have Node.js installed on your machine.
* Firebase Account: You need a Firebase account to use Firestore. (It's free to set up)

## Setting Up the Project
Follow these steps to set up the To-Do App on your local machine:
### 1. Clone the Repository


```bash
git clone https://github.com/guruprasath-v/Handy-To-Do.git
cd ToDoApp
```

### 2. Install Dependencies
Run the following command to install all necessary packages:

```bash
npm install
```

### 3. Create a Firebase Project
- Go to the [Firebase Console](https://console.firebase.google.com/).
- Click on "Add project" and follow the prompts to create a new Firebase project.
- Once created, navigate to the "Firestore Database" section and create a new database.
- Set up the Firestore collection named `tasks` to store your to-do items.

### 4. Configure Firebase

 - In the Firebase Console, go to Project Settings and find your Firebase config object.
 - Create a .env file in the root directory of your project and add the Firebase configuration keys:
```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```
> Make sure to replace the placeholder values with your actual Firebase project details.


### 5. Start the Development Server
```bash
npm run dev
```
### 6. Open the Application
Open your browser and go to `http://localhost:5173` (or the URL specified by your development server) to see the To-Do App in action.

## Example Usage
