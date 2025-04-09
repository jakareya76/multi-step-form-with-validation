# Multi-Step Form with React Hook Form and Zod

A modern, responsive multi-step form implementation using Next.js App Router, React Hook Form, Zod validation, and TailwindCSS v4.

## Features

- **Multi-step Form Navigation**: Smooth transitions between three steps
- **Form Validation**: Real-time validation using Zod schemas
- **Modern UI**: Clean, responsive design with TailwindCSS v4
- **Dark Mode Support**: Seamless toggling between light and dark themes
- **API Simulation**: React Query for handling form submission
- **Mobile Responsive**: Fully responsive on all device sizes
- **Progress Indicator**: Visual representation of current step and progress

## Technology Stack

- **Next.js 14+** (App Router)
- **React Hook Form** for form state management
- **Zod** for schema validation
- **TailwindCSS v4** for styling
- **React Query** for API simulation
- **Next-themes** for dark mode implementation
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jakareya76/multi-step-form-with-validation.git
   cd multi-step-form
   ```

2. Install dependencies:

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

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Project Structure

```
├── app/
│   ├── layout.js       # Root layout with providers
│   ├── page.js         # Main page with form component
│   └── globals.css     # Global styles
├── components/
│   ├── Providers.js    # Combined React Query and Theme providers
│   └── MultiStepForm.js  # Main form component
```

## Form Architecture

The multi-step form consists of three stages:

1. **Personal Information**

   - Full Name (required)
   - Email (required, valid format)
   - Phone Number (required, min 10 digits)

2. **Address Details**

   - Street Address (required)
   - City (required)
   - Zip Code (required, numbers only, min 5 digits)

3. **Account Setup**
   - Username (required, min 4 characters)
   - Password (required, min 6 characters)
   - Confirm Password (must match password)

## Implementation Details

### Form Validation

Each step has its own Zod schema for validation:

```javascript
const Step1Schema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});
```

### Dark Mode Implementation

The project implements dark mode using next-themes and Tailwind's dark mode class strategy:

```javascript
<ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
  {mounted ? children : <div style={{ visibility: "hidden" }}>{children}</div>}
</ThemeProvider>
```

### API Simulation

Form submission is simulated using React Query:

```javascript
const mutation = useMutation({
  mutationFn: submitFormData,
  onSuccess: (data) => {
    console.log("Form submitted successfully:", data);
    alert("Form submitted successfully!");
  },
});
```

### Form Fields

To add or modify form fields:

1. Update the Zod schema for the relevant step
2. Add or modify the form fields in the step component
3. Update the form data handling in the submit function

## Troubleshooting

### Hydration Errors

If you encounter hydration errors, ensure that:

1. The `suppressHydrationWarning` attribute is added to the html tag
2. The theme provider is properly hiding content until client-side hydration is complete
3. No server/client mismatches exist in your components

## License

MIT
