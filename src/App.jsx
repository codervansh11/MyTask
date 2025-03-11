import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let storedTodos = JSON.parse(localStorage.getItem("todos"));
      setTodos(storedTodos);
    }
  }, []);
  const saveToLs = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };
  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.find((item) => item.id === id);
    setTodo(t.todo);
    let updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
    saveToLs(updatedTodos);
  };
  const handleAdd = () => {
    if (!todo.trim()) return; // Prevent adding empty todos
    const updatedTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(updatedTodos);
    saveToLs(updatedTodos);
    setTodo("");
  };
  const handleDelete = (e, id) => {
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
    saveToLs(updatedTodos);
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckbox = (e) => {
    const id = e.target.name;
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
    saveToLs(updatedTodos);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="mx-3 md:container md:mx-auto my-5 p-5 rounded-xl bg-violet-100 min-h-[80vh] md:w-1/2">
        <h1 className="font-bold text-center text-xl">
          iTask Manage your all todos at one place
        </h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full rounded-full px-4 py-1"
          />
          <button
            onClick={handleAdd}
            className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md"
          >
            Save
          </button>
        </div>
        <div className="flex gap-3">
          <input
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
          />
          <div> Show Finished todos</div>
        </div>
        <h2 className="text-lg font-bold my-4">Your todos</h2>
        <div className="todos">
          {todos.length == 0 && <div className="m-5"> No tasks to display</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div key={item.id} className="todo flex   my-3 justify-between">
                  <div className="flex gap-5 w-3/5">
                    <input
                      type="checkbox"
                      onChange={handleCheckbox}
                      checked={item.isCompleted}
                      name={item.id}
                    />
                    <div
                      className={`break-words w-2/3 px-2 ${
                        item.isCompleted ? "line-through" : ""
                      }`}
                    >
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
