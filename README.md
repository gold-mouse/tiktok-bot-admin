# React Project Setup Guide

## Prerequisites
Ensure you have the following installed on your system:

### Install Node.js and npm
Download and install Node.js (which includes npm) from [Node.js official website](https://nodejs.org/):
- Windows: Download the installer and follow the setup instructions.

After installation, verify it with:
```sh
node -v
npm -v
```

### Install Git
Download and install Git from [Git official website](https://git-scm.com/).
Verify installation with:
```sh
git --version
```

### Install yarn
```sh
npm install yarn -g
```

## Getting Started

### 1. Clone the Repository
If the project is hosted on a Git repository, clone it using:
```sh
git clone https://github.com/gold-mouse/tiktok-bot-admin.git
cd tiktok-bot-admin
```

### 2. Install Dependencies
Run the following command inside the project directory to install required dependencies:
```sh
npm install
```

### 3. Start the Development Server
To start the project in development mode, run:
```sh
npm start
```
This will launch the app in your default web browser at `http://localhost:3000/`.

## Environment Variables
Create a `.env` file in the root directory and define them:
```sh
REACT_APP_API_URL="http://192.168.133.173:5000/api"
```

