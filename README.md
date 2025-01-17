# Code Editor with HTML Preview and Prettier Integration

This is a code editor application built with React and Monaco Editor, featuring live HTML preview and integration with Prettier for code formatting. It uses the Material-UI library for the user interface and localStorage to persist the code and title.

## Features

- **Code Editing**: Write and edit code with Monaco Editor.
- **HTML Preview**: View the live HTML output of your code in real-time.
- **Prettier Integration**: Automatically format your code using Prettier.
- **Language Support**: Currently supports plaintext and HTML, with potential for more languages.
- **Minimap**: Toggle Monaco Editor's minimap feature on or off.
- **Persistent Data**: Code and title are stored in `localStorage` so that they persist even after page refresh.

## Technologies Used

- **React**: For building the user interface.
- **Monaco Editor**: A powerful code editor that supports various languages and features like syntax highlighting and autocompletion.
- **Material-UI**: A popular React UI framework for styling and components.
- **Prettier**: A code formatter that supports multiple languages, including HTML.
- **localStorage**: To store the code and title persistently across sessions.

## Project Structure

- `src/`
  - `context/`: Contains the context provider and hooks for managing the state of the editor, language, code, and minimap.
  - `components/`: Contains the main components of the app, such as `CodeEditor`, `Navbar`, and `HtmlPreview`.
  - `App.tsx`: The main entry point of the app.
  - `index.tsx`: The entry point for the React application.

## Installation

To get started with this project, you need to clone the repository and install the required dependencies.

### 1. Clone the repository

```bash
git clone https://github.com/your-username/code-editor.git
cd code-editor
```
