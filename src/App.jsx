import { useState } from "react"
import Navbar from "./components/Navbar"
function App() {
const [todo, setTodo] = useState("")
const [todos, setTodos] = useState([])
const handleEdit = () => {
  
}
const handleAdd = () => {
  setTodos([...todos , {todo , isCompleted:false}])
  setTodo("")
}
const handleDelete = () => {
  
}
const handleChange = (e) => {
  setTodo(e.target.value)
}

  return (
    <>
<Navbar></Navbar>
      <div className='container mx-auto my-5 p-5 rounded-xl bg-violet-100 min-h-[80vh]'>
        <div className="addTodo my-5">
          <h2 className="text-lg font-bold">Add a todo</h2>
          <input onChange={handleChange} value={todo} type="text" className="w-1/2 m-2" />
          <button onClick={handleAdd} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6">Add</button>
        </div>
        <h2 className="text-lg font-bold">Your todos</h2>
        <div className="todos">
        {todos.map(item => {
          return <div key = {todo} className="todo flex w-1/2 my-3 justify-between">
            <div className={item.isCompleted?" ":"line-through"}>{item.todo}</div>
            <div className="buttons">
            <button onClick={handleEdit} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1">Edit</button>
            <button onClick={handleDelete} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1">Delete</button>
            </div>
          </div>
        })}
        </div>
      </div>

    </>
  )
}

export default App
