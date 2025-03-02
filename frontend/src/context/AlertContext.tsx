import React, { createContext, useContext, useState } from 'react';
import {Alert} from '../components/Alert';
interface AlertContextType {
  showAlert: (message: string, color: string) => void;
  hideAlert: () => void;
  isVisible: boolean;
  message: string;
  color: string;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('');

  const showAlert = (message: string, color: string) => {
    setMessage(message);
    setColor(color);
    setIsVisible(true);
    
    
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };

  const hideAlert = () => {
    setIsVisible(false);
  };

  const value = { showAlert, hideAlert, isVisible, message, color };

  return (
    <AlertContext.Provider value={value}>
      {children}
      {isVisible && (
        <Alert
          alertColor={color}
          alertMessage={message}
          show={isVisible}
        />
      )}
    </AlertContext.Provider>
  );
}

export const useAlert = ():AlertContextType => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};