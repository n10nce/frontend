import { useEffect, useState } from "react"
// This gives access to getToken() to authenticate API requests
import { useAuth } from "@clerk/react"
import type { Todo } from "@/types/todo"
import { getTodos, createTodo, toggleTodo, deleteTodo } from "@/lib/api"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export function TodoPage() {
  // This retrieves the Clerk session token for authenticated API calls
  const { getToken } = useAuth()
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState("")

  // TASK 2: On mount, fetch todos from the backend and set state
  // Hint: call getToken() to get the token, then pass it to getTodos()
  // Docs: https://clerk.com/docs/references/react/use-auth
  useEffect(() => {}, [])

  // TASK 3: On submit, call createTodo and append the result to todos state
  // Hint: don't forget to clear the input after adding
  // Docs: https://www.prisma.io/docs/orm/prisma-client/queries/crud#create
  const handleAdd = async () => {}

  // TASK 4: On checkbox change, call toggleTodo and update the matching todo in state
  // Hint: use setTodos and map over todos to flip the completed field
  // Docs: https://www.prisma.io/docs/orm/prisma-client/queries/crud#update
  const handleToggle = async (todo: Todo) => {}

  // TASK 5: On delete, call deleteTodo and remove the todo from state
  // Hint: use setTodos and filter out the deleted todo by id
  // Docs: https://www.prisma.io/docs/orm/prisma-client/queries/crud#delete
  const handleDelete = async (id: string) => {}

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Add a new todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between rounded border p-3"
          >
            <div className="flex items-center gap-3">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => handleToggle(todo)}
              />
              <span
                className={
                  todo.completed ? "text-muted-foreground line-through" : ""
                }
              >
                {todo.title}
              </span>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(todo.id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
