# Mantine Form Builder Documentation

This is the documentation site for the Mantine Form Builder component. It showcases the component's features, provides examples, and includes complete API documentation.

## Features

- **Interactive Examples**: Live demos of the FormBuilder component
- **Complete API Reference**: Detailed documentation of all props and types
- **Getting Started Guide**: Step-by-step installation and usage instructions
- **Modern UI**: Built with Mantine UI components for a consistent look and feel

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your system.

### Installation

1. Navigate to the docs directory:
   ```bash
   cd docs
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3001`

## Project Structure

```
docs/
├── src/
│   ├── components/
│   │   └── FormBuilder.tsx      # FormBuilder component for demos
│   ├── pages/
│   │   ├── HomePage.tsx         # Landing page
│   │   ├── GettingStartedPage.tsx # Installation guide
│   │   ├── ExamplesPage.tsx     # Interactive examples
│   │   └── ApiPage.tsx          # API documentation
│   ├── types/
│   │   └── index.ts             # TypeScript type definitions
│   ├── App.tsx                  # Main app component
│   └── main.tsx                 # Entry point
├── package.json                 # Dependencies and scripts
├── vite.config.ts              # Vite configuration
└── tsconfig.json               # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Mantine UI** - Component library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Formik & Yup** - Form handling and validation
- **Phosphor Icons** - Icon library

## Contributing

To contribute to the documentation:

1. Make your changes in the appropriate files
2. Test the changes by running the development server
3. Ensure all TypeScript types are correct
4. Submit a pull request

## License

This documentation is part of the Mantine Form Builder project and follows the same license. 