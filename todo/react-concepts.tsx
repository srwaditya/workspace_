import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Child Component demonstrating props and prop types
const TodoItem = ({ text, completed, onToggle, onDelete }) => {
  // Demonstrating inline styles and conditional rendering
  return (
    <div className="flex items-center justify-between p-2 border-b">
      <span className={completed ? "line-through text-gray-500" : ""}>
        {text}
      </span>
      <div className="space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onToggle}
        >
          {completed ? "Undo" : "Complete"}
        </Button>
        <Button 
          variant="destructive" 
          size="sm"
          onClick={onDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

// Main component demonstrating various React concepts
const TodoApp = () => {
  // State Management using useState Hook
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState("all");

  // Side Effects using useEffect Hook
  useEffect(() => {
    // Load todos from localStorage on component mount
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    // Save todos to localStorage whenever they change
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]); // Dependency array with todos means this runs when todos change

  // Event Handlers
  const handleAddTodo = () => {
    if (inputText.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputText,
          completed: false
        }
      ]);
      setInputText("");
    }
  };

  // useCallback Hook for memoized event handlers
  const handleToggleTodo = useCallback((id) => {
    setTodos(todos => 
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []); // Empty dependency array since we're using functional updates

  const handleDeleteTodo = useCallback((id) => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  }, []);

  // useMemo Hook for computed values
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter(todo => !todo.completed);
      case "completed":
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const stats = useMemo(() => ({
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    active: todos.filter(todo => !todo.completed).length
  }), [todos]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Todo List</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Form handling */}
        <div className="flex gap-2 mb-4">
          <Input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Add new todo"
            onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
          />
          <Button onClick={handleAddTodo}>Add</Button>
        </div>

        {/* Filter buttons */}
        <div className="flex gap-2 mb-4">
          <Button 
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button 
            variant={filter === "active" ? "default" : "outline"}
            onClick={() => setFilter("active")}
          >
            Active
          </Button>
          <Button 
            variant={filter === "completed" ? "default" : "outline"}
            onClick={() => setFilter("completed")}
          >
            Completed
          </Button>
        </div>

        {/* Stats display */}
        <div className="flex gap-2 mb-4">
          <Badge variant="secondary">Total: {stats.total}</Badge>
          <Badge variant="secondary">Active: {stats.active}</Badge>
          <Badge variant="secondary">Completed: {stats.completed}</Badge>
        </div>

        {/* Todo list with conditional rendering */}
        <div className="space-y-2">
          {filteredTodos.length === 0 ? (
            <p className="text-center text-gray-500">No todos found</p>
          ) : (
            filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                text={todo.text}
                completed={todo.completed}
                onToggle={() => handleToggleTodo(todo.id)}
                onDelete={() => handleDeleteTodo(todo.id)}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoApp;
