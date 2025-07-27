import React, { useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { useCard } from '../contexts/CardContext';
import { useTheme } from '../contexts/ThemeContext';
import './ChartsSection.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ChartsSection = () => {
  const { expenses } = useCard();
  const { isDark } = useTheme();
  const [activeChart, setActiveChart] = useState('daily');

  const categoryColors = {
    almoco_baratinho: '#4CAF50',
    almoco: '#2196F3',
    lanche: '#FFC107',
    fast_food: '#FF5722',
    lanche_sobremesa: '#E91E63',
    aproveitar_vida: '#9C27B0'
  };

  const categoryNames = {
    almoco_baratinho: 'Almoço baratinho',
    almoco: 'Almoço',
    lanche: 'Lanche',
    fast_food: 'Fast-food',
    lanche_sobremesa: 'Lanche com sobremesa',
    aproveitar_vida: 'Aproveitar a vida'
  };

  const getDailyData = () => {
    const dailyData = {};
    
    const sortedExpenses = [...expenses].sort((a, b) => new Date(a.date) - new Date(b.date));
    const uniqueDates = [...new Set(sortedExpenses.map(expense => expense.date))];
    const last7Dates = uniqueDates.slice(-7);
    
    last7Dates.forEach(date => {
      dailyData[date] = 0;
    });
    
    sortedExpenses.forEach(expense => {
      if (last7Dates.includes(expense.date)) {
        dailyData[expense.date] += expense.amount;
      }
    });
    
    return {
      labels: Object.keys(dailyData).map(date => formatDate(date)),
      data: Object.values(dailyData)
    };
  };

  const getCategoryData = () => {
    const categoryData = {};
    
    expenses.forEach(expense => {
      if (expense.category) {
        categoryData[expense.category] = (categoryData[expense.category] || 0) + expense.amount;
      }
    });
    
    const categories = Object.keys(categoryData).filter(cat => categoryData[cat] > 0);
    
    return {
      labels: categories.map(cat => categoryNames[cat]),
      data: categories.map(cat => categoryData[cat]),
      colors: categories.map(cat => categoryColors[cat])
    };
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}`;
  };

  const dailyData = getDailyData();
  const categoryData = getCategoryData();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: isDark ? '#e0e0e0' : '#333'
        }
      }
    },
    scales: activeChart === 'daily' ? {
      y: {
        beginAtZero: true,
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: isDark ? '#e0e0e0' : '#333',
          callback: function(value) {
            return 'R$' + value;
          }
        }
      },
      x: {
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: isDark ? '#e0e0e0' : '#333'
        }
      }
    } : {}
  };

  return (
    <div className="charts-section">
      <h3>Análise de Gastos</h3>
      
      <div className="chart-tabs">
        <button
          className={`chart-tab ${activeChart === 'daily' ? 'active' : ''}`}
          onClick={() => setActiveChart('daily')}
        >
          Por Dia
        </button>
        <button
          className={`chart-tab ${activeChart === 'category' ? 'active' : ''}`}
          onClick={() => setActiveChart('category')}
        >
          Por Categoria
        </button>
      </div>

      <div className="chart-container">
        {expenses.length === 0 ? (
          <div className="empty-chart">
            <p>Nenhum dado para exibir</p>
            <span>Adicione gastos para ver os gráficos</span>
          </div>
        ) : activeChart === 'daily' ? (
          <Bar
            data={{
              labels: dailyData.labels,
              datasets: [{
                label: 'Gastos por Dia (R$)',
                data: dailyData.data,
                backgroundColor: '#3498db',
                borderColor: '#2980b9',
                borderWidth: 1
              }]
            }}
            options={chartOptions}
          />
        ) : (
          <Doughnut
            data={{
              labels: categoryData.labels,
              datasets: [{
                data: categoryData.data,
                backgroundColor: categoryData.colors,
                borderWidth: 1
              }]
            }}
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      const value = context.raw;
                      const total = context.chart.getDatasetMeta(0).total;
                      const percentage = Math.round((value / total) * 100);
                      return `R$${value.toFixed(2)} (${percentage}%)`;
                    }
                  }
                }
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ChartsSection; 