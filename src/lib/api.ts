const API_URL = import.meta.env.VITE_API_URL

// This is a helper function that attaches the Clerk token to every request
async function apiFetch(path: string, token: string, options?: RequestInit) {
    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            // This sends the Clerk session token to authenticate with the backend
            Authorization: `Bearer ${token}`,
            ...options?.headers,
        },
    })
    if (!res.ok) throw new Error(await res.text())
    return res.json()
}

// This fetches all todos for the authenticated user
export const getTodos = (token: string) =>
    apiFetch('/todos', token)

// This creates a new todo with the given title
export const createTodo = (token: string, title: string) =>
    apiFetch('/todos', token, { method: 'POST', body: JSON.stringify({ title }) })

// This toggles the completed status of a todo
export const toggleTodo = (token: string, id: string, completed: boolean) =>
    apiFetch(`/todos/${id}`, token, { method: 'PATCH', body: JSON.stringify({ completed }) })

// This deletes a todo by its id
export const deleteTodo = (token: string, id: string) =>
    apiFetch(`/todos/${id}`, token, { method: 'DELETE' })
