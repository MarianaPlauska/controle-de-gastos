import React, { useRef, useEffect } from 'react';
import { CheckSquare, Type, X, Trash2 } from 'lucide-react';
import { useNotesStore } from '../../store/useNotesStore';
import {
  EditorContainer,
  TitleInput,
  BlockList,
  BlockWrapper,
  DeleteButton,
  TextBlock,
  CheckboxBlock,
  AddBlockMenu,
  MenuButton
} from './NoteEditor.styles';

interface NoteEditorProps {
  noteId: string;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ noteId }) => {
  const { getNote, updateNote, deleteNote } = useNotesStore();
  const note = getNote(noteId);

  const blockRefs = useRef<{ [key: string]: HTMLTextAreaElement | HTMLInputElement | null }>({});

  if (!note) return <div>Nota não encontrada</div>;

  const blocks = note.blocks;

  const addBlock = (type: 'text' | 'todo', afterId?: string) => {
    const newBlock = {
      id: Date.now().toString(),
      type,
      content: '',
      checked: false,
    };

    let newBlocks = [...blocks];
    if (afterId) {
      const index = blocks.findIndex(b => b.id === afterId);
      newBlocks.splice(index + 1, 0, newBlock);
    } else {
      newBlocks.push(newBlock);
    }

    updateNote(noteId, { blocks: newBlocks });

    setTimeout(() => {
      const el = blockRefs.current[newBlock.id];
      if (el) el.focus();
    }, 0);
  };

  const updateBlockContent = (id: string, content: string) => {
    const newBlocks = blocks.map(b => b.id === id ? { ...b, content } : b);
    updateNote(noteId, { blocks: newBlocks });
  };

  const toggleTodo = (id: string) => {
    const newBlocks = blocks.map(b => b.id === id ? { ...b, checked: !b.checked } : b);
    updateNote(noteId, { blocks: newBlocks });
  };

  const deleteBlock = (id: string) => {
    const index = blocks.findIndex(b => b.id === id);
    const newBlocks = blocks.filter(b => b.id !== id);
    updateNote(noteId, { blocks: newBlocks });

    if (index > 0) {
      const prevBlock = blocks[index - 1];
      setTimeout(() => {
        const el = blockRefs.current[prevBlock.id];
        if (el) {
          el.focus();
          const len = prevBlock.content.length;
          el.setSelectionRange(len, len);
        }
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string, type: 'text' | 'todo') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addBlock(type, id);
    } else if (e.key === 'Backspace' && (e.target as any).value === '') {
      e.preventDefault();
      deleteBlock(id);
    }
  };

  return (
    <EditorContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TitleInput
          placeholder="Sem Título"
          value={note.title}
          onChange={(e) => updateNote(noteId, { title: e.target.value })}
        />
        <button
          onClick={() => deleteNote(noteId)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc3545' }}
          title="Excluir Nota"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <BlockList>
        {blocks.map(block => (
          <BlockWrapper key={block.id}>
            <DeleteButton className="delete-btn" onClick={() => deleteBlock(block.id)}>
              <X size={16} />
            </DeleteButton>

            {block.type === 'text' ? (
              <TextBlock
                ref={(el) => blockRefs.current[block.id] = el}
                value={block.content}
                onChange={(e) => updateBlockContent(block.id, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, block.id, 'text')}
                placeholder="Digite algo..."
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = target.scrollHeight + 'px';
                }}
              />
            ) : (
              <CheckboxBlock>
                <input
                  type="checkbox"
                  checked={block.checked}
                  onChange={() => toggleTodo(block.id)}
                />
                <input
                  ref={(el) => blockRefs.current[block.id] = el}
                  type="text"
                  value={block.content}
                  className={block.checked ? 'checked' : ''}
                  onChange={(e) => updateBlockContent(block.id, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, block.id, 'todo')}
                  placeholder="Tarefa a fazer"
                />
              </CheckboxBlock>
            )}
          </BlockWrapper>
        ))}
      </BlockList>

      <AddBlockMenu>
        <MenuButton onClick={() => addBlock('text')}>
          <Type size={16} />
          Texto
        </MenuButton>
        <MenuButton onClick={() => addBlock('todo')}>
          <CheckSquare size={16} />
          To-Do
        </MenuButton>
      </AddBlockMenu>
    </EditorContainer>
  );
};
