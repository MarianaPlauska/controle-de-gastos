import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useDataManager } from '../utils/dataManager';
import { 
  Settings, 
  User, 
  Download, 
  Upload, 
  Trash2, 
  RotateCcw,
  Database,
  Shield,
  Info,
  Smartphone,
  Palette
} from 'lucide-react';
import './SettingsScreen.css';

const SettingsScreen = () => {
  const { user, updateUser } = useUser();
  const dataManager = useDataManager();
  const [activeTab, setActiveTab] = useState('profile');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'data', label: 'Dados', icon: Database },
    { id: 'app', label: 'App', icon: Smartphone },
    { id: 'about', label: 'Sobre', icon: Info }
  ];

  const showMessage = (text, type = 'info') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(''), 3000);
  };

  const handleExport = () => {
    try {
      dataManager.downloadBackup();
      showMessage('Backup baixado com sucesso!', 'success');
    } catch (error) {
      showMessage('Erro ao fazer backup', 'error');
    }
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        const result = dataManager.importData(data);
        showMessage(result.message, result.success ? 'success' : 'error');
        if (result.success) {
          setTimeout(() => window.location.reload(), 1500);
        }
      } catch (error) {
        showMessage('Arquivo inválido', 'error');
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsText(file);
  };

  const handleClearData = () => {
    if (window.confirm('Tem certeza que deseja apagar todos os dados? Esta ação não pode ser desfeita.')) {
      const result = dataManager.clearAllData();
      showMessage(result.message, result.success ? 'success' : 'error');
      if (result.success) {
        setTimeout(() => window.location.reload(), 1500);
      }
    }
  };

  const stats = dataManager.getDataStats();

  const renderProfile = () => (
    <div className="settings-section">
      <h3>Informações Pessoais</h3>
      <div className="profile-form">
        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            value={user.name || ''}
            onChange={(e) => updateUser({ name: e.target.value })}
            placeholder="Digite seu nome"
          />
        </div>
        
        <div className="profile-stats">
          <h4>Suas Estatísticas</h4>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{stats.expenses}</span>
              <span className="stat-label">Gastos registrados</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.cards}</span>
              <span className="stat-label">Cartões</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.exercises}</span>
              <span className="stat-label">Exercícios</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.meals}</span>
              <span className="stat-label">Refeições</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderData = () => (
    <div className="settings-section">
      <h3>Gerenciamento de Dados</h3>
      
      <div className="data-info">
        <div className="data-size">
          <Database size={24} />
          <div>
            <span className="size-value">{(stats.totalSize / 1024).toFixed(1)} KB</span>
            <span className="size-label">Dados armazenados</span>
          </div>
        </div>
      </div>

      <div className="data-actions">
        <button className="action-btn export" onClick={handleExport}>
          <Download size={20} />
          <div>
            <span>Fazer Backup</span>
            <small>Baixar todos os seus dados</small>
          </div>
        </button>

        <label className="action-btn import">
          <Upload size={20} />
          <div>
            <span>Restaurar Backup</span>
            <small>Importar dados de um arquivo</small>
          </div>
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            style={{ display: 'none' }}
          />
        </label>

        <button className="action-btn restore" onClick={() => {
          const result = dataManager.restoreBackup();
          showMessage(result.message, result.success ? 'success' : 'error');
        }}>
          <RotateCcw size={20} />
          <div>
            <span>Desfazer Última Importação</span>
            <small>Restaurar dados anteriores</small>
          </div>
        </button>

        <button className="action-btn danger" onClick={handleClearData}>
          <Trash2 size={20} />
          <div>
            <span>Limpar Todos os Dados</span>
            <small>Apagar tudo permanentemente</small>
          </div>
        </button>
      </div>

      <div className="data-details">
        <h4>Detalhes dos Dados</h4>
        <div className="details-list">
          <div className="detail-item">
            <span>Lembretes</span>
            <span>{stats.reminders}</span>
          </div>
          <div className="detail-item">
            <span>Tarefas</span>
            <span>{stats.todos}</span>
          </div>
          <div className="detail-item">
            <span>Anotações</span>
            <span>{stats.notes}</span>
          </div>
          <div className="detail-item">
            <span>Registros de água</span>
            <span>{stats.waterLogs}</span>
          </div>
          <div className="detail-item">
            <span>Registros de peso</span>
            <span>{stats.weightEntries}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApp = () => (
    <div className="settings-section">
      <h3>Configurações do App</h3>
      
      <div className="app-info">
        <div className="info-card">
          <Smartphone size={24} />
          <div>
            <h4>PWA Instalado</h4>
            <p>Este app pode ser instalado no seu celular como um aplicativo nativo</p>
          </div>
        </div>
        
        <div className="info-card">
          <Shield size={24} />
          <div>
            <h4>Dados Seguros</h4>
            <p>Todos os seus dados ficam salvos apenas no seu dispositivo</p>
          </div>
        </div>
      </div>

      <div className="install-instructions">
        <h4>Como Instalar no Android</h4>
        <ol>
          <li>Abra este app no Chrome do seu celular</li>
          <li>Toque no ícone de "Instalar" na barra de endereços</li>
          <li>Confirme a instalação</li>
          <li>O app aparecerá na sua tela inicial!</li>
        </ol>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="settings-section">
      <h3>Sobre o App</h3>
      
      <div className="about-content">
        <div className="app-logo">
          <Palette size={48} />
          <h2>Meu Controle</h2>
          <p>Versão 1.0</p>
        </div>

        <div className="features-list">
          <h4>Funcionalidades</h4>
          <ul>
            <li>💳 Controle de múltiplos cartões de crédito</li>
            <li>💰 Gastos organizados por categorias</li>
            <li>💧 Controle de consumo de água</li>
            <li>🏃‍♂️ Registro de exercícios</li>
            <li>🍽️ Controle de alimentação e peso</li>
            <li>🔔 Lembretes personalizados</li>
            <li>✅ Lista de tarefas</li>
            <li>📝 Anotações organizadas</li>
            <li>📊 Gráficos e relatórios</li>
            <li>💾 Backup e restauração de dados</li>
          </ul>
        </div>

        <div className="tech-info">
          <h4>Tecnologia</h4>
          <p>
            Desenvolvido como PWA (Progressive Web App) usando React.js. 
            Funciona offline e pode ser instalado como app nativo.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="settings-screen">
      <div className="screen-header">
        <h1>
          <Settings size={24} />
          Configurações
        </h1>
        <p>Personalize seu app e gerencie seus dados</p>
      </div>

      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      {isLoading && (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Processando...</p>
        </div>
      )}

      <div className="settings-tabs">
        {tabs.map(tab => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <IconComponent size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="settings-content">
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'data' && renderData()}
        {activeTab === 'app' && renderApp()}
        {activeTab === 'about' && renderAbout()}
      </div>
    </div>
  );
};

export default SettingsScreen;