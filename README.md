# Mailbox

This is a Mailbox Demo application built with React and Firebase.

## Features

- User authentication with Firebase
- Send and receive emails
- Real-time updates
- Responsive design

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/rky2023/mailbox.git
   cd mailbox
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. Register or log in with your email and password.
2. Compose and send emails to other registered users.
3. View received emails in your inbox.

## Change logs
- Auth.js: Revamped the UI of the login form using Tailwind CSS.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
