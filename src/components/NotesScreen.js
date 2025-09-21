import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { FileText, Plus, Search, Edit3, Trash2, Save, X } from 'lucide-react';
import './NotesScreen.css';

const NotesScreen = () => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('userNotes');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: 'geral'
  });

  const categories = {
    geral: 'Geral',
    financeiro: 'Financeiro',
    pessoal: 'Pessoal',
    trabalho: 'Trabalho',
    ideias: 'Ideias'
  };

  const saveNotes = (updatedNotes) => {
    setNotes(updatedNotes);
    localStorage.setItem('userNotes', JSON.stringify(updatedNotes));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newNote.title && newNote.content) {
      const note = {
        id: Date.now(),
        ...newNote,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      saveNotes([note, ...notes]);
      setNewNote({ title: '', content: '', category: 'geral' });
      setShowForm(false);
    }
  };

  const handleEdit = (note) => {
    setEditingNote({ ...note });
  };

  const handleSaveEdit = () => {
    const updatedNotes = notes.map(note => 
      note.id === editingNote.id 
        ? { ...editingNote, updatedAt: new Date().toISOString() }
        : note
    );
    saveNotes(updatedNotes);
    setEditingNote(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta anotação?')) {
      saveNotes(notes.filter(note => note.id !== id));
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="notes-screen">
      <div className="screen-header">
        <h1>Minhas Anotações</h1>
        <p>Organize suas ideias e lembretes</p>
      </div>

      <div className="notes-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Buscar anotações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          className="btn-add-note"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={20} />
          Nova Anotação
        </button>
      </div>

      {showForm && (
        <div className="note-form-container">
          <form onSubmit={handleSubmit} className="note-form">
            <div className="form-header">
              <h3>Nova Anotação</h3>
              <button type="button" onClick={() => setShowForm(false)} className="btn-close">
                <X size={20} />
              </button>
            </div>
            
            <input
              type="text"
              placeholder="Título da anotação"
              value={newNote.title}
              onChange={(e) => setNewNote({...newNote, title: e.target.value})}
              required
            />
            
            <select
              value={newNote.category}
              onChange={(e) => setNewNote({...newNote, category: e.target.value})}
            >
              {Object.entries(categories).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
            
            <textarea
              placeholder="Escreva sua anotação aqui..."
              value={newNote.content}
              onChange={(e) => setNewNote({...newNote, content: e.target.value})}
              rows="6"
              required
            />
            
            <div className="form-actions">
              <button type="submit" className="btn-save">
                <Save size={16} />
                Salvar
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-cancel">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="notes-grid">
        {filteredNotes.length === 0 ? (
          <div className="empty-notes">
            <FileText size={48} />
            <h3>Nenhuma anotação encontrada</h3>
            <p>Crie sua primeira anotação para começar</p>
          </div>
        ) : (
          filteredNotes.map(note => (
            <div key={note.id} className="note-card">
              {editingNote && editingNote.id === note.id ? (
                <div className="note-edit">
                  <input
                    type="text"
                    value={editingNote.title}
                    onChange={(e) => setEditingNote({...editingNote, title: e.target.value})}
                  />
                  <select
                    value={editingNote.category}
                    onChange={(e) => setEditingNote({...editingNote, category: e.target.value})}
                  >
                    {Object.entries(categories).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                  <textarea
                    value={editingNote.content}
                    onChange={(e) => setEditingNote({...editingNote, content: e.target.value})}
                    rows="4"
                  />
                  <div className="edit-actions">
                    <button onClick={handleSaveEdit} className="btn-save-edit">
                      <Save size={16} />
                    </button>
                    <button onClick={() => setEditingNote(null)} className="btn-cancel-edit">
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="note-header">
                    <div className="note-title">
                      <h3>{note.title}</h3>
                      <span className={`note-category ${note.category}`}>
                        {categories[note.category]}
                      </span>
                    </div>
                    <div className="note-actions">
                      <button onClick={() => handleEdit(note)} className="btn-edit">
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => handleDelete(note.id)} className="btn-delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="note-content">
                    <p>{note.content}</p>
                  </div>
                  
                  <div className="note-footer">
                    <span className="note-date">
                      {note.updatedAt !== note.createdAt ? 'Editado em ' : 'Criado em '}
                      {formatDate(note.updatedAt || note.createdAt)}
                    </span>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesScreen;