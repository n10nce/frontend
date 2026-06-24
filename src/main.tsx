// This loads the React app into the DOM
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
// This wraps the app with Clerk's auth provider
import { ClerkProvider } from "@clerk/react"
import App from "./App"
import "./index.css"

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!publishableKey) throw new Error("Add VITE_CLERK_PUBLISHABLE_KEY to .env")

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* This provides Clerk's auth context to the entire app */}
    <ClerkProvider publishableKey={publishableKey} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </StrictMode>
)
