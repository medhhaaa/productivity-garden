import { useState } from "react"; // hook to store data

function Todo() {

  // task → stores what user types in input
  // setTask → updates input value
  const [task, setTask] = useState("");

  // tasks → array storing all tasks
  // each task = { text: "...", done: false }
  const [tasks, setTasks] = useState([]);

  // function to add new task
  const addTask = () => {

    // prevent adding empty tasks
    if (task.trim() === "") return;

    // create new task object and add to array
    // ...tasks → keeps old tasks
    setTasks([...tasks, { text: task, done: false }]);

    // clear input box after adding
    setTask("");
  };

  // function to mark task as done/undone
  const toggleTask = (index) => {

    // copy current tasks array
    const newTasks = [...tasks];

    // toggle done value (true ↔ false)
    newTasks[index].done = !newTasks[index].done;

    // update state → UI will refresh automatically
    setTasks(newTasks);
  };
// function to delete a task
const deleteTask = (indexToDelete) => {
  const newTasks = tasks.filter((_, index) => index !== indexToDelete);
  setTasks(newTasks);
};
  return (
    <div className="bg-white p-4 rounded-xl shadow">

      <h2 className="text-xl font-semibold">✅ Todo</h2>

      {/* Input + Add button */}
      <div className="flex gap-2 mt-2">

        <input
          value={task} // shows current input value
          onChange={(e) => setTask(e.target.value)} 
          // updates state when user types

          className="border p-2 w-full"
          placeholder="Add task..."
        />

        <button
          onClick={addTask} // calls function when clicked
          className="bg-blue-400 text-white px-4 rounded"
        >
          Add
        </button>

      </div>

      {/* Task list */}
      <ul className="mt-3">

        {/* loop through tasks array */}
        {tasks.map((t, index) => (

          <li
  key={index}
  className="flex justify-between items-center cursor-pointer"
>
  <span
    onClick={() => toggleTask(index)}
    className={t.done ? "line-through text-gray-400" : ""}
  >
    {t.text}
  </span>

  <button
    onClick={() => deleteTask(index)}
    className="text-red-500"
  >
    ❌
  </button>
</li>

        ))}

      </ul>
    </div>
  );
}

export default Todo;