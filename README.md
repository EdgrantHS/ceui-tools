# Jadwal Picker

This is a NEXT.js project for picking a schedule for Semester 6 Tekkom UI.

## Features

- Display the schedule for Semester 6 Tekkom UI.
- Hovering over a class will display the partner class (if any).
- Clicking on a class will select it and disable the partner class.
- The selected class is displayed in the table.
- Available schedule is customizable using JSON data.

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm (version 6 or later)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/EdgrantHS/ceui-tools
   cd ceui-tools
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

### Running the Development Server

To start the development server, run:

```sh
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

### Building for Production

To build the application for production, run:

```sh
npm run build
```

To run the production build, run:

```sh
npm start
```

## Project Structure

- `app/`: Contains the Next.js pages and layout components.
- `components/`: Contains the UI components.
- `data/`: Contains the JSON data for schedules.
- `lib/`: Contains utility functions.

## UI Components

UI components using shadcn UI library and tailwindcss.
