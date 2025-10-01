import React from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import { 
  Home, 
  CreditCard, 
  ShoppingCart, 
  Bell, 
  CheckSquare,
  Heart
} from 'lucide-react';
import './BottomNavigation.css';

const BottomNavigation = () => {
  const { currentView, navigateTo } = useNavigation();

  const navItems = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'expenses', icon: ShoppingCart, label: 'Gastos' },
    { id: 'cards', icon: CreditCard, label: 'Cartões' },
    { id: 'health', icon: Heart, label: 'Saúde' },
    { id: 'todos', icon: CheckSquare, label: 'Anotações' }
  ];

  return (
    <div className="bottom-navigation">
      {navItems.map(item => {
        const IconComponent = item.icon;
        const isActive = currentView === item.id;
        
        return (
          <button
            key={item.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => navigateTo(item.id)}
          >
            <IconComponent size={20} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNavigation;