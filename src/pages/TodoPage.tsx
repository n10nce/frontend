import { useEffect, useState } from "react"
import { useAuth } from "@clerk/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

const API_URL = import.meta.env.VITE_API_URL

interface Todo {
  id: string
  title: string
  completed: boolean
}

export function TodoPage() {
  const { getToken } = useAuth()
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState("")
  const [token, setToken] = useState<string | null>(null)

  // This fetches the Clerk token once and loads all todos on mount
  useEffect(() => {
    const init = async () => {
      const t = await getToken()
      setToken(t)

      const res = await fetch(`${API_URL}/todos`, {
        headers: { Authorization: `Bearer ${t}` },
      })
      const data = await res.json()
      setTodos(data)
    }
    init()
  }, [getToken])

  // This creates a new todo and adds it to the list
  const handleAdd = async () => {
    if (!input.trim() || !token) return
    const res = await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: input.trim() }),
    })
    const todo = await res.json()
    setTodos((prev) => [...prev, todo])
    setInput("")
  }

  // This toggles the completed status of a todo
  const handleToggle = async (todo: Todo) => {
    if (!token) return
    const res = await fetch(`${API_URL}/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completed: !todo.completed }),
    })
    const updated = await res.json()
    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
  }

  // This deletes a todo and removes it from the list
  const handleDelete = async (id: string) => {
    if (!token) return
    await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

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
