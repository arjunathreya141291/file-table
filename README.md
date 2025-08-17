# File Table

**Live Demo**: [https://file-table.vercel.app/](https://file-table.vercel.app/)

## Tech Stack

- **Frontend**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: CSS with font awesome for Download icon
- **Code Quality**: ESLint + Prettier
- **Package Manager**: Yarn
- **Testing**: Jest + React Testing Library

````

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd file-table
````

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Start development server**

   ```bash
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## Usage

### Development Commands

```bash
# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Lint code
yarn lint

# Fix linting issues
yarn lint:fix

# Format code with Prettier
yarn format

# Check code formatting
yarn format:check

# Run tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage report
yarn test:coverage

```

### About the app

The application displays files with the following information:

- **Name**
- **Device**
- **Path**
- **Status**

Users can:

- Select individual files using checkboxes
- Select all available files at once
- Download selected files (shows alert with file details)

## Testing

The project includes test coverage using **Jest** and **React Testing Library**:

## Configuration

### Prettier Settings

The project includes Prettier configuration for consistent code formatting:

### ESLint Configuration

Modern flat config ESLint
