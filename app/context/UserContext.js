import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@example.com',
    password: '',
    phone: '+1 (555) 123‑4567',
    bio: 'Passionate DIYer and pet lover. Always up to help out!'
  });

  const updateUser = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const updateUserData = (newData) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  return (
    <UserContext.Provider value={{ userData, updateUser, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};