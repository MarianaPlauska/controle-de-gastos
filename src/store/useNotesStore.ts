import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Block {
    id: string;
    type: 'text' | 'todo';
    content: string;
    checked?: boolean;
}

export interface Note {
    id: string;
    title: string;
    blocks: Block[];
    updatedAt: string;
}

interface NotesState {
    notes: Note[];
    createNote: () => string; // Returns the new note ID
    updateNote: (id: string, updates: Partial<Note>) => void;
    deleteNote: (id: string) => void;
    getNote: (id: string) => Note | undefined;
}

export const useNotesStore = create<NotesState>()(
    persist(
        (set, get) => ({
            notes: [
                {
                    id: '1',
                    title: 'Anotações de Novembro',
                    updatedAt: new Date().toISOString(),
                    blocks: [
                        { id: '1', type: 'text', content: 'Planejamento mensal de gastos.' },
                        { id: '2', type: 'todo', content: 'Pagar fatura do cartão', checked: false },
                    ],
                },
            ],
            createNote: () => {
                const newNote: Note = {
                    id: Math.random().toString(36).substr(2, 9),
                    title: '',
                    blocks: [{ id: Date.now().toString(), type: 'text', content: '' }],
                    updatedAt: new Date().toISOString(),
                };
                set((state) => ({ notes: [newNote, ...state.notes] }));
                return newNote.id;
            },
            updateNote: (id, updates) =>
                set((state) => ({
                    notes: state.notes.map((n) =>
                        n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n
                    ),
                })),
            deleteNote: (id) =>
                set((state) => ({
                    notes: state.notes.filter((n) => n.id !== id),
                })),
            getNote: (id) => get().notes.find((n) => n.id === id),
        }),
        {
            name: 'notes-storage',
        }
    )
);
