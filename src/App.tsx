// This imports Clerk's UI components for auth state control
import { Show, SignInButton, UserButton } from "@clerk/react"
import { TodoPage } from "./pages/TodoPage.tsx"
import { Button } from "@/components/ui/button"

export default function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      {/* This is shown only when the user is signed out */}
      <Show when="signed-out">
        <SignInButton mode="modal">
          <Button>Sign in</Button>
        </SignInButton>
      </Show>

      {/* This is shown only when the user is signed in */}
      <Show when="signed-in">
        <div className="w-full max-w-xl px-4">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">My Todos</h1>
            {/* This shows the user's avatar and account options */}
            <UserButton />
          </div>
          <TodoPage />
        </div>
      </Show>
    </div>
  )
}
