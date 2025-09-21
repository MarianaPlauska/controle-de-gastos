import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { CheckSquare, Plus, Trash2, Square } from 'lucide-react';


const TodoList = () => {
  const { todos, addTodo, toggleTodo, removeTodo } = useUser();
  const [showForm, setShowForm] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    category: 'finance'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.title) {
      addTodo(newTodo);
      setNewTodo({ title: '', description: '', category: 'finance' });
      setShowForm(false);
    }
  };

  const getCategoryLabel = (category) => {
    const categories = {
      finance: 'Financeiro',
      personal: 'Pessoal',
      work: 'Trabalho',
      shopping: 'Compras'
    };
    return categories[category] || 'Geral';
  };

  const completedTodos = todos.filter(todo => todo.completed);
  const pendingTodos = todos.filter(todo => !todo.completed);

  return (
    <div className="todo-section">
      <div className="section-header">
        <h3>
          <CheckSquare size={20} />
          Tarefas
        </h3>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="btn-add"
        >
          <Plus size={16} />
          Adicionar
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="todo-form">
          <input
            type="text"
            placeholder="Título da tarefa"
            value={newTodo.title}
            onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
            required
          />
          <textarea
            placeholder="Descrição (opcional)"
            value={newTodo.description}
            onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
            rows="2"
          />
          <select
            value={newTodo.category}
            onChange={(e) => setNewTodo({...newTodo, category: e.target.value})}
          >
            <option value="finance">Financeiro</option>
            <option value="personal">Pessoal</option>
            <option value="work">Trabalho</option>
            <option value="shopping">Compras</option>
          </select>
          <div className="form-actions">
            <button type="submit" className="btn-save">Salvar</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-cancel">
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="todos-container">
        {pendingTodos.length > 0 && (
          <div className="todos-group">
            <h4>Pendentes ({pendingTodos.length})</h4>
            <div className="todos-list">
              {pendingTodos.map(todo => (
                <div key={todo.id} className="todo-item">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="todo-checkbox"
                  >
                    <Square size={18} />
                  </button>
                  <div className="todo-content">
                    <div className="todo-header">
                      <h5>{todo.title}</h5>
                      <span className={`todo-category ${todo.category}`}>
                        {getCategoryLabel(todo.category)}
                      </span>
                    </div>
                    {todo.description && (
                      <p className="todo-description">{todo.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeTodo(todo.id)}
                    className="btn-remove"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {completedTodos.length > 0 && (
          <div className="todos-group">
            <h4>Concluídas ({completedTodos.length})</h4>
            <div className="todos-list">
              {completedTodos.map(todo => (
                <div key={todo.id} className="todo-item completed">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="todo-checkbox checked"
                  >
                    <CheckSquare size={18} />
                  </button>
                  <div className="todo-content">
                    <div className="todo-header">
                      <h5>{todo.title}</h5>
                      <span className={`todo-category ${todo.category}`}>
                        {getCategoryLabel(todo.category)}
                      </span>
                    </div>
                    {todo.description && (
                      <p className="todo-description">{todo.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeTodo(todo.id)}
                    className="btn-remove"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {todos.length === 0 && (
          <p className="empty-state">Nenhuma tarefa cadastrada</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;