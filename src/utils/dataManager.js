// Sistema de gerenciamento de dados local com backup

export const DataManager = {
  // Exportar todos os dados
  exportData: () => {
    const data = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      userData: {
        profile: JSON.parse(localStorage.getItem('userProfile') || '{}'),
        reminders: JSON.parse(localStorage.getItem('userReminders') || '[]'),
        todos: JSON.parse(localStorage.getItem('userTodos') || '[]'),
        notes: JSON.parse(localStorage.getItem('userNotes') || '[]')
      },
      cardData: {
        cards: JSON.parse(localStorage.getItem('allCards') || '[]'),
        activeCardId: localStorage.getItem('activeCardId'),
        expenses: JSON.parse(localStorage.getItem('creditCardExpenses') || '[]')
      },
      healthData: {
        waterIntake: JSON.parse(localStorage.getItem('waterIntake') || '{}'),
        exercises: JSON.parse(localStorage.getItem('exercises') || '[]'),
        meals: JSON.parse(localStorage.getItem('meals') || '[]'),
        weightHistory: JSON.parse(localStorage.getItem('weightHistory') || '[]')
      }
    };
    
    return data;
  },

  // Importar dados
  importData: (data) => {
    try {
      if (!data.version || !data.userData || !data.cardData || !data.healthData) {
        throw new Error('Formato de dados inválido');
      }

      // Backup dos dados atuais
      const currentData = DataManager.exportData();
      localStorage.setItem('dataBackup', JSON.stringify(currentData));

      // Importar novos dados
      const { userData, cardData, healthData } = data;

      // Dados do usuário
      localStorage.setItem('userProfile', JSON.stringify(userData.profile));
      localStorage.setItem('userReminders', JSON.stringify(userData.reminders));
      localStorage.setItem('userTodos', JSON.stringify(userData.todos));
      localStorage.setItem('userNotes', JSON.stringify(userData.notes));

      // Dados dos cartões
      localStorage.setItem('allCards', JSON.stringify(cardData.cards));
      localStorage.setItem('activeCardId', cardData.activeCardId);
      localStorage.setItem('creditCardExpenses', JSON.stringify(cardData.expenses));

      // Dados de saúde
      localStorage.setItem('waterIntake', JSON.stringify(healthData.waterIntake));
      localStorage.setItem('exercises', JSON.stringify(healthData.exercises));
      localStorage.setItem('meals', JSON.stringify(healthData.meals));
      localStorage.setItem('weightHistory', JSON.stringify(healthData.weightHistory));

      return { success: true, message: 'Dados importados com sucesso!' };
    } catch (error) {
      return { success: false, message: `Erro ao importar dados: ${error.message}` };
    }
  },

  // Baixar backup como arquivo
  downloadBackup: () => {
    const data = DataManager.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `meu-controle-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // Restaurar backup
  restoreBackup: () => {
    const backup = localStorage.getItem('dataBackup');
    if (backup) {
      const result = DataManager.importData(JSON.parse(backup));
      if (result.success) {
        localStorage.removeItem('dataBackup');
      }
      return result;
    }
    return { success: false, message: 'Nenhum backup encontrado' };
  },

  // Limpar todos os dados
  clearAllData: () => {
    const keys = [
      'userProfile', 'userReminders', 'userTodos', 'userNotes',
      'allCards', 'activeCardId', 'creditCardExpenses',
      'waterIntake', 'exercises', 'meals', 'weightHistory'
    ];
    
    keys.forEach(key => localStorage.removeItem(key));
    return { success: true, message: 'Todos os dados foram limpos' };
  },

  // Estatísticas de uso
  getDataStats: () => {
    const data = DataManager.exportData();
    return {
      profile: !!data.userData.profile.name,
      reminders: data.userData.reminders.length,
      todos: data.userData.todos.length,
      notes: data.userData.notes.length,
      cards: data.cardData.cards.length,
      expenses: data.cardData.expenses.length,
      waterLogs: data.healthData.waterIntake.daily?.length || 0,
      exercises: data.healthData.exercises.length,
      meals: data.healthData.meals.length,
      weightEntries: data.healthData.weightHistory.length,
      totalSize: new Blob([JSON.stringify(data)]).size
    };
  }
};

// Hook para usar o DataManager
export const useDataManager = () => {
  return DataManager;
};