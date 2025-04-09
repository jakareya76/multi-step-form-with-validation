# Multi-Step Form with React Hook Form and Zod

A modern multi-step form implementation using Next.js (App Router), React Hook Form, Zod validation, and TailwindCSS.

## Features

- **Multi-step Form**: Smooth navigation between three form steps
- **Form Validation**: Real-time validation with Zod
- **Modern UI**: Clean design with TailwindCSS
- **Dark Mode**: Full dark mode support
- **API Simulation**: Using React Query to simulate form submission
- **Responsive Design**: Optimized for mobile and desktop views

## Technology Stack

- Next.js 14+ (App Router)
- React Hook Form for form management
- Zod for schema validation
- TailwindCSS for styling
- React Query for API calls
- Lucide React for icons
- Next-themes for dark mode support

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/multi-step-form.git
   cd multi-step-form
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
/app
  /layout.js         # Root layout with ThemeProvider
  /page.js           # Main page with MultiStepForm component
/components
  /theme-provider.js # Dark mode provider
  /multi-step-form.js # Main form component
/lib
  /schema.js         # Zod validation schemas
  /api.js            # Mock API functions
```

## How to Use

1. Fill in the first step with your personal information
2. Navigate to the second step and provide your address details
3. Complete the third step with your account information
4. Review the summary of your information
5. Submit the form

The form data will be logged to the console and a success message will be displayed.

## License

MIT
