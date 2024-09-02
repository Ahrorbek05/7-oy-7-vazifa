import React, { useState, useEffect } from 'react';
import useDebounce from './hooks/useDebounse';
import axios from 'axios';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [todos, setTodos] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      axios
        .get(`https://jsonplaceholder.typicode.com/todos`)
        .then((response) => {
          const filteredTodos = response.data.filter(todo =>
            todo.title.toLowerCase().startsWith(debouncedSearchTerm.toLowerCase())
          );
          setTodos(filteredTodos);
        })
        .catch((error) => {
          console.error("Error fetching todos:", error);
        });
    } else {
      setTodos([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <ul className="mt-5 space-y-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`p-4 bg-white shadow-md rounded-lg border ${
                todo.completed ? 'border-green-400' : 'border-red-400'
              }`}
            >
              <h2 className="text-lg font-semibold">{todo.title}</h2>
              <p className="text-sm text-gray-500">
                {todo.completed ? 'Completed' : 'Not Completed'}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
