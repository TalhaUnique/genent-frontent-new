# Next.js ChatGPT MUI App

This project is a chat application built using Next.js 15 and Material-UI (MUI). It features a ChatGPT-style chat interface with client-side rendering and MUI-based theming support.

## Features

- Chat interface with message input and display
- Light and dark theme support
- Responsive design using MUI components

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd nextjs-chatgpt-mui-app
   ```

2. **Install dependencies:**

   Make sure you have Node.js installed. Then run:

   ```bash
   npm install
   ```

3. **Run the development server:**

   Start the Next.js development server:

   ```bash
   npm run dev
   ```

   Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Project Structure

- `app/`: Contains the main application files.
  - `layout.tsx`: Main layout with MUI ThemeProvider.
  - `page.tsx`: Entry point rendering the ChatScreen component.
  - `chat/ChatScreen.tsx`: Chat interface component managing messages.
  
- `components/`: Contains reusable components.
  - `ChatInput.tsx`: Input field for sending messages.
  - `ChatMessage.tsx`: Displays individual chat messages.
  - `ThemeToggle.tsx`: Component for switching themes.

- `theme/`: Contains MUI theme configuration.
  - `muiTheme.ts`: Custom MUI theme settings.

- `public/`: Directory for static assets.

- `package.json`: Project dependencies and scripts.

- `tsconfig.json`: TypeScript configuration.

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements for the project.

## License

This project is licensed under the MIT License.