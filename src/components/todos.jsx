import React, { useState } from 'react'
import './todos.css'

function Todos() {
  const [inputvalue, setInputvalue] = useState("")
  const [todoItems, setTodoItems] = useState([])
  const [editIndex, setEditIndex] = useState(null)
  const [editValue, setEditValue] = useState("")

  function AddTodo() {
    if (inputvalue.trim() === "") return
    setTodoItems([...todoItems, { text: inputvalue, isCompleted: false }])
    setInputvalue("")
  }

  function deleteTodo(ind) {
    setTodoItems(todoItems.filter((_, i) => i !== ind))
  }

  function toggleComplete(ind) {
    const updatedTodos = todoItems.map((item, i) =>
      i === ind ? { ...item, isCompleted: !item.isCompleted } : item
    )
    setTodoItems(updatedTodos)
  }

  function editTodo(ind, text) {
    setEditIndex(ind)
    setEditValue(text)
  }

  function saveEdit(ind) {
    const updatedTodos = todoItems.map((item, i) =>
      i === ind ? { ...item, text: editValue } : item
    )
    setTodoItems(updatedTodos)
    setEditIndex(null)
    setEditValue("")
  }

  return (
    <div className='mx-auto my-5 max-w-5xl flex flex-col gap-5 justify-center items-center'>

      {/* Add Todo */}
      <div className='flex gap-3'>
        <input
          type="text"
          value={inputvalue}
          className='focus:outline-0 border-2 border-black rounded-2xl text-3xl p-3'
          placeholder='What you wanna do today?'
          onChange={(e) => setInputvalue(e.target.value)}
        />
        <button
          className='bg-black text-white rounded-2xl p-3 text-xl'
          onClick={AddTodo}
        >
          Add Todo
        </button>
      </div>

      {/* Todo List */}
      <div className='flex flex-col gap-4'>
        {todoItems.map((e, i) => (
          <div key={i} className='flex gap-5 items-center'>

            <input
              type="checkbox"
              checked={e.isCompleted}
              onChange={() => toggleComplete(i)}
              className='h-5 w-5'
            />

            {editIndex === i ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className='border-2 border-black rounded-xl p-2 text-xl'
              />
            ) : (
              <p
                className='text-2xl font-bold '
                style={{ color: e.isCompleted ? "green" : "black" }}
              >
                {e.text}
              </p>
            )}

            {editIndex === i ? (
              <button
                className='bg-green-500 text-white rounded-xl p-2 text-xl'
                onClick={() => saveEdit(i)}
              >
                Save
              </button>
            ) : (
              <button
                className='bg-blue-500 text-white rounded-xl p-2 text-xl'
                onClick={() => editTodo(i, e.text)}
              >
                Edit
              </button>
            )}

            <button
              className='bg-red-500 text-white rounded-xl p-2 text-xl'
              onClick={() => deleteTodo(i)}
            >
              Delete
            </button>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Todos
