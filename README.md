# WorkTable

**WorkTable** is a full-stack task management and organization application inspired by Kanban boards. It consists of a **frontend** (client-side web app) and a **backend** (Spring Boot REST API). The frontend allows users to create customizable boxes (columns), add tasks with descriptions and due dates, organize boxes into folders, and take free-form notes.

The interface is in **Portuguese (Brazil)**.

---

## Repository Branches

This repository uses two branches to separate frontend and backend code:

| Branch | Description |
|---|---|
| **`frontend`** | Client-side web application (HTML, CSS, Vanilla JavaScript) |
| **`backend`** | Server-side Spring Boot application (Java, Maven, Docker) |

To switch between branches:

```bash
# For frontend development:
git checkout frontend

# For backend development:
git checkout backend
```

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [User Guide](#user-guide)
- [Code Architecture](#code-architecture)
- [Browser Support](#browser-support)
- [License](#license)

---

## Features

### Task Management
- **Create tasks** inside any box with a title
- **Edit task titles** by double-clicking on them
- **Mark tasks as complete** with a toggle button (✔️)
- **Delete tasks** individually (❌)
- **Add descriptions/notes** to each task
- **Set start and end dates** using a date picker (Flatpickr)

### Box Management
- **Create new boxes** with customizable titles
- **Drag and reposition** boxes freely on the canvas
- **Resize boxes** by dragging their edges and corners
- **Delete boxes** with the remove button
- **Random pastel background colors** for visual distinction

### Folder Organization
- **Create transparent folder areas** to group boxes together
- **Drag boxes into folders** to store them
- **Expand/collapse folders** to view stored boxes
- **Thumbnail previews** for each stored box inside a folder
- **Remove stored boxes** from folders

### Notes
- **Free-form note blocks** — double-click the top edge of a box to create a notes area
- **Persistent note content** tied to each box's ID

### Authentication UI
- **Login dialog** with email and password fields
- **Google Sign-In button** (UI only — backend integration required)
- **Forgot password link** (UI placeholder)

---

## Project Structure

```
WorkTable_Pagina/
├── HTML_Pagina/
│   ├── index.html                    # Main application page
│   ├── Scripts/
│   │   ├── task-manager.js           # Task creation and task actions
│   │   ├── box-interactions.js       # Box drag, resize, and panel controls
│   │   ├── box-factory.js            # Box creation and initialization
│   │   ├── folder-manager.js         # Folder storage, notes, and expanded box management
│   │   ├── auth-dialog.js            # Login dialog open/close logic
│   │   └── welcome-animation.js      # Welcome text typing animation
│   └── StyleLoginPage/
│       ├── main-layout.css           # Main page layout styles
│       ├── box-styles.css            # New box creation styles
│       ├── auth-dialog.css           # Login dialog styles
│       └── task-list.css             # Table and task list styles
├── index.js                        # Node.js entry point (placeholder)
└── package.json                    # Project configuration
```

---

## Technologies

### Frontend

| Technology | Purpose |
|---|---|
| **HTML5** | Structure and semantic markup (`<template>`, `<dialog>`) |
| **CSS3** | Styling, layout, transitions, and animations |
| **Vanilla JavaScript (ES6+)** | All application logic — no frameworks |
| **Flatpickr** | Date picker library (loaded via CDN) |
| **Google Fonts** | Space Grotesk typeface (loaded via CDN) |
| **Pointer Events API** | Drag-and-drop and resize interactions |
| **ResizeObserver** | Dynamic box size tracking |

### Backend

| Technology | Purpose |
|---|---|
| **Java** | Backend programming language |
| **Spring Boot** | REST API framework |
| **Maven** | Build and dependency management |
| **Docker** | Containerization for deployment |

---

## Getting Started

### Frontend

#### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, or Safari)
- No build tools or server required — the app runs directly from static files

#### Running the Frontend

1. **Checkout the frontend branch**:
   ```bash
   git checkout frontend
   ```

2. **Open the HTML file directly** in your browser:
   ```
   HTML_Pagina/index.html
   ```

3. **Or use a local server** (recommended for best compatibility):
   ```bash
   # Using Python
   cd HTML_Pagina
   python -m http.server 8000

   # Using Node.js
   npx serve HTML_Pagina
   ```
   Then navigate to `http://localhost:8000`

### Backend

#### Prerequisites
- **Java JDK 17+** installed
- **Maven** for build and dependency management
- **Docker** (optional, for containerized deployment)

#### Running the Backend

1. **Checkout the backend branch**:
   ```bash
   git checkout backend
   ```

2. **Build the project**:
   ```bash
   # Using Maven wrapper
   ./mvnw clean install

   # Or using Maven directly
   mvn clean install
   ```

3. **Run the application**:
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend API will be available at `http://localhost:8080`

4. **Or run with Docker**:
   ```bash
   docker build -t worktable-backend .
   docker run -p 8080:8080 worktable-backend
   ```

---

## User Guide

### Creating a Box
1. Click the **+** button in the side menu to create a new box
2. Click the box title to rename it
3. Type a task name and press Enter or click the add button to create a task

### Managing Tasks
- **Add a task**: Type in the task input field and press Enter
- **Edit a task name**: Double-click the task title
- **Add a description**: Click the "Descrição" button on a task
- **Set dates**: Click the 📅 button to set start and end dates
- **Complete a task**: Click the ✔️ button to toggle completion
- **Delete a task**: Click the ❌ button

### Organizing with Folders
1. Click the folder icon in the side menu to create a folder area
2. Drag a box onto the folder to store it
3. Click the folder to toggle it open/closed
4. Click a thumbnail inside the folder to expand that box

### Taking Notes
- Double-click near the top edge of any box to activate a guide line
- Drag the guide down to define a notes area
- Click the note icon button to create a free-form text block

---

## Code Architecture

### `task-manager.js` — Task Engine
Core task creation and manipulation. Each task is cloned from an HTML template and configured with:
- Title display and inline editing
- Removal handler
- Completion toggle with `aria-pressed` state
- Notes/description panel with live summary
- Date fields powered by Flatpickr

### `box-interactions.js` — Drag & Resize Engine
Handles all pointer-based interactions for boxes:
- **Drag**: Move boxes by clicking and dragging (excluding inputs and buttons)
- **Resize**: Drag edges and corners to resize (minimum 250×200px)
- **Boundary clamping**: Boxes stay within the canvas (`ladoDir`)
- **Panel transitions**: Left panel can be hidden/shown with smooth animation; boxes are repositioned during transitions to stay within bounds

### `box-factory.js` — Box Factory
Creates new boxes from a template, assigns random pastel colors, and wires up all event handlers. On page load, one default white box is created.

### `folder-manager.js` — Folder & Notes System
Manages the folder storage system:
- Detects when a box is dropped onto a folder
- Creates thumbnail buttons for stored boxes
- Handles expanding stored boxes within folders
- Provides drag-and-resize for expanded boxes inside folders
- Manages free-form note blocks with double-click gesture on box top edge

### `auth-dialog.js` — Login Dialog
Simple dialog control — opens the login modal on button click and closes it when clicking outside.

### `welcome-animation.js` — Welcome Animation
Typing animation for the welcome text on the left panel.

---

## Browser Support

The application uses modern web APIs and requires a browser that supports:

- **Pointer Events API** — Chrome 56+, Firefox 59+, Edge 79+, Safari 10+
- **ResizeObserver** — Chrome 64+, Firefox 75+, Edge 79+, Safari 13.1+
- **`<template>` element** — All modern browsers
- **`<dialog>` element** — Chrome 37+, Firefox 111+, Edge 79+, Safari 15.4+
- **ES6+ JavaScript** — All modern browsers

---

## Future Improvements

- [ ] Backend integration for user authentication
- [ ] Persistent data storage (localStorage or database)
- [ ] Task drag-and-drop between boxes
- [ ] Participant assignment system (UI exists, logic pending)
- [ ] Google Sign-In backend integration
- [ ] Password recovery functionality
- [ ] Export/import board data
- [ ] Responsive mobile layout

---

## License

This project is private and not licensed for public use.
