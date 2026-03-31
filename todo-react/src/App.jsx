
import { useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import './App.css';

function App() {
  const [listTrigger, setListTrigger] = useState(0);

  const handleTodoAdded = () => {
    setListTrigger((prev) => prev + 1);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>ToDo List</h1>
      </header>
      <main className="app-main">
        <div className="app-container">
          <section className="form-section">
            <TodoForm onTodoAdded={handleTodoAdded} />
          </section>
          <section className="list-section">
            <TodoList trigger={listTrigger} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
