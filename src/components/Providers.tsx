// components/providers.js
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }) {
  // Create a React Query client
  const [queryClient] = useState(() => new QueryClient());

  // Add client-side only rendering to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem={true}
      >
        {mounted ? (
          children
        ) : (
          <div style={{ visibility: "hidden" }}>{children}</div>
        )}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
