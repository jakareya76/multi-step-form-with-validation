"use client";

import { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Check, Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

// Validation schemas
const Step1Schema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

const Step2Schema = z.object({
  street: z.string().min(1, "Street Address is required"),
  city: z.string().min(1, "City is required"),
  zip: z
    .string()
    .regex(
      /^\d{5,}$/,
      "Zip Code must be at least 5 digits and contain only numbers"
    ),
});

const Step3Schema = z
  .object({
    username: z.string().min(4, "Username must be at least 4 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Combined schema
const FormSchema = z.object({
  ...Step1Schema.shape,
  ...Step2Schema.shape,
  ...Step3Schema.shape,
});

// Form steps
const steps = [
  {
    id: "personal",
    name: "Personal Info",
    schema: Step1Schema,
    fields: ["fullName", "email", "phone"],
  },
  {
    id: "address",
    name: "Address Details",
    schema: Step2Schema,
    fields: ["street", "city", "zip"],
  },
  {
    id: "account",
    name: "Account Setup",
    schema: Step3Schema,
    fields: ["username", "password", "confirmPassword"],
  },
];

// Mock API submission function
const submitFormData = async (data) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data });
    }, 1500);
  });
};

// Input Component
const FormInput = ({ name, label, type = "text", placeholder }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
          text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
      />
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

// Step progress bar component
const StepProgress = ({ currentStep }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 
              ${
                idx < currentStep
                  ? "bg-blue-600 border-blue-600 text-white"
                  : idx === currentStep
                  ? "border-blue-600 text-blue-600"
                  : "border-gray-300 text-gray-500 dark:border-gray-600 dark:text-gray-400"
              }`}
            >
              {idx < currentStep ? <Check className="w-5 h-5" /> : idx + 1}
            </div>
            <span
              className={`mt-2 text-xs sm:text-sm ${
                idx === currentStep
                  ? "text-blue-600 font-medium"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {step.name}
            </span>
          </div>
        ))}

        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 -z-10">
          <div
            className="absolute left-0 top-0 h-full bg-blue-600 transition-all"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
          <div className="absolute left-0 top-0 h-full w-full bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
};

// Theme switcher component
const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-gray-700" />
      )}
    </button>
  );
};

export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  // Form setup with the current step's schema
  const methods = useForm({
    resolver: zodResolver(steps[step].schema),
    defaultValues: formData,
    mode: "onChange",
  });

  // Mutation hook for form submission
  const mutation = useMutation({
    mutationFn: submitFormData,
    onSuccess: (data) => {
      console.log("Form submitted successfully:", data);
      alert("Form submitted successfully!");
    },
  });

  // Handle next step
  const handleNext = async (data) => {
    const currentStepData = {};
    steps[step].fields.forEach((field) => {
      currentStepData[field] = data[field];
    });

    setFormData((prev) => ({
      ...prev,
      ...currentStepData,
    }));

    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    const finalData = {
      ...formData,
      ...data,
    };

    // Submit data using mutation
    mutation.mutate(finalData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8 transition-colors duration-200">
      <ThemeSwitcher />

      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 transition-colors duration-200">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Multi-Step Registration
        </h1>

        <StepProgress currentStep={step} />

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(
              step === steps.length - 1 ? onSubmit : handleNext
            )}
          >
            {/* Step 1: Personal Information */}
            {step === 0 && (
              <div>
                <FormInput
                  name="fullName"
                  label="Full Name"
                  placeholder="Enter your full name"
                />
                <FormInput
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                />
                <FormInput
                  name="phone"
                  label="Phone Number"
                  type="tel"
                  placeholder="Enter your phone number"
                />
              </div>
            )}

            {/* Step 2: Address Details */}
            {step === 1 && (
              <div>
                <FormInput
                  name="street"
                  label="Street Address"
                  placeholder="Enter your street address"
                />
                <FormInput
                  name="city"
                  label="City"
                  placeholder="Enter your city"
                />
                <FormInput
                  name="zip"
                  label="Zip Code"
                  placeholder="Enter your zip code"
                />
              </div>
            )}

            {/* Step 3: Account Setup */}
            {step === 2 && (
              <div>
                <FormInput
                  name="username"
                  label="Username"
                  placeholder="Choose a username"
                />
                <FormInput
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                />
                <FormInput
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                />

                {/* Summary */}
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
                    Summary
                  </h3>
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                    <p>
                      <span className="font-medium">Name:</span>{" "}
                      {formData.fullName}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      {formData.email}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span>{" "}
                      {formData.phone}
                    </p>
                    <p>
                      <span className="font-medium">Address:</span>{" "}
                      {formData.street}, {formData.city}, {formData.zip}
                    </p>
                    <p>
                      <span className="font-medium">Username:</span>{" "}
                      {methods.watch("username")}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="mt-8 flex justify-between">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Previous
                </button>
              ) : (
                <div></div>
              )}

              <button
                type="submit"
                disabled={mutation.isPending}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
              >
                {mutation.isPending ? (
                  <div className="flex items-center">
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Submitting...
                  </div>
                ) : step === steps.length - 1 ? (
                  "Submit"
                ) : (
                  "Next"
                )}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
