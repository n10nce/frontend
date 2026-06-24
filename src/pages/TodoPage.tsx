import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

const API_URL = import.meta.env.VITE_API_URL

interface Todo {
  id: string
  title: string
  completed: boolean
}

export function TodoPage() {
  const { getToken } = useAuth()
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')
  const [token, setToken] = useState<string | null>(null)

  // TASK 2: Fetch the Clerk token using getToken() and store it in setToken()
  //         Then fetch GET /todos with Authorization: Bearer <token>
  //         and call setTodos() with the response
  useEffect(() => {}, [getToken])

  // TASK 3: POST /todos with { title: input.trim() } and Authorization header
  //         Append the returned todo to todos state and clear input
  const handleAdd = async () => {}

  // TASK 4: PATCH /todos/:id with { completed: !todo.completed } and Authorization header
  //         Update the matching todo in todos state with the returned updated todo
  const handleToggle = async (todo: Todo) => {}

  // TASK 5: DELETE /todos/:id with Authorization header
  //         Remove the todo from todos state by filtering out the deleted id
  const handleDelete = async (id: string) => {}

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Add a new todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between border rounded p-3">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => handleToggle(todo)}
              />
              <span className={todo.completed ? 'line-through text-muted-foreground' : ''}>
                {todo.title}
              </span>
            </div>
            <Button variant="destructive" size="sm" onClick={() => handleDelete(todo.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}