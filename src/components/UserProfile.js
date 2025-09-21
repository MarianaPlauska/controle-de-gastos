import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { User, Edit3, Save, X } from 'lucide-react';


const UserProfile = () => {
  const { user, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(!user.name);
  const [tempName, setTempName] = useState(user.name);

  const handleSave = () => {
    if (tempName.trim()) {
      updateUser({ name: tempName.trim() });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTempName(user.name);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="user-profile editing">
        <div className="profile-avatar">
          <User size={24} />
        </div>
        <div className="profile-edit">
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            placeholder="Digite seu nome"
            className="profile-input"
            autoFocus
          />
          <div className="profile-actions">
            <button onClick={handleSave} className="btn-save">
              <Save size={16} />
            </button>
            <button onClick={handleCancel} className="btn-cancel">
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <div className="profile-avatar">
        <User size={24} />
      </div>
      <div className="profile-info">
        <h2>Olá, {user.name || 'Usuário'}!</h2>
        <button onClick={() => setIsEditing(true)} className="btn-edit">
          <Edit3 size={16} />
          Editar
        </button>
      </div>
    </div>
  );
};

export default UserProfile;