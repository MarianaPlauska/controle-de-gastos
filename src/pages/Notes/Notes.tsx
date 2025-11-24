import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { NotesList } from '../../components/Notes/NotesList';
import { NoteEditor } from '../../components/Notes/NoteEditor';
import { useNotesStore } from '../../store/useNotesStore';
import {
  PageContainer,
  Header,
  SplitView,
  ListArea,
  EditorArea,
  MobileBackButton
} from './Notes.styles';

export const Notes: React.FC = () => {
  const { notes } = useNotesStore();
  const [activeNoteId, setActiveNoteId] = useState<string | undefined>(notes[0]?.id);
  const [isMobileEditorOpen, setIsMobileEditorOpen] = useState(false);

  // If active note is deleted, select another one
  useEffect(() => {
    if (activeNoteId && !notes.find(n => n.id === activeNoteId)) {
      setActiveNoteId(notes[0]?.id);
      setIsMobileEditorOpen(false);
    }
  }, [notes, activeNoteId]);

  const handleSelectNote = (id: string) => {
    setActiveNoteId(id);
    setIsMobileEditorOpen(true);
  };

  return (
    <PageContainer>
      <Header>
        <h1>Anotações & Projetos</h1>
        <p>Organize suas ideias, listas e tarefas.</p>
      </Header>

      <SplitView>
        <ListArea isMobileHidden={isMobileEditorOpen}>
          <NotesList
            activeNoteId={activeNoteId}
            onSelectNote={handleSelectNote}
          />
        </ListArea>

        <EditorArea isMobileHidden={!isMobileEditorOpen}>
          <MobileBackButton onClick={() => setIsMobileEditorOpen(false)}>
            <ArrowLeft size={20} />
            Voltar para Lista
          </MobileBackButton>

          {activeNoteId ? (
            <NoteEditor noteId={activeNoteId} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#666' }}>
              Selecione ou crie uma nota para começar.
            </div>
          )}
        </EditorArea>
      </SplitView>
    </PageContainer>
  );
};
