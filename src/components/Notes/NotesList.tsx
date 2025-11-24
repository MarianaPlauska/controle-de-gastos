import React from 'react';
import { Plus } from 'lucide-react';
import { useNotesStore } from '../../store/useNotesStore';
import { ListContainer, CreateButton, NoteItem } from './NotesList.styles';

interface NotesListProps {
    activeNoteId?: string;
    onSelectNote: (id: string) => void;
}

export const NotesList: React.FC<NotesListProps> = ({ activeNoteId, onSelectNote }) => {
    const { notes, createNote } = useNotesStore();

    const handleCreate = () => {
        const newId = createNote();
        onSelectNote(newId);
    };

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(dateString));
    };

    return (
        <ListContainer>
            <CreateButton onClick={handleCreate}>
                <Plus size={20} />
                Nova Nota
            </CreateButton>

            {notes.map((note) => (
                <NoteItem
                    key={note.id}
                    isActive={note.id === activeNoteId}
                    onClick={() => onSelectNote(note.id)}
                >
                    <h3>{note.title || 'Sem Título'}</h3>
                    <span>{formatDate(note.updatedAt)}</span>
                </NoteItem>
            ))}
        </ListContainer>
    );
};
