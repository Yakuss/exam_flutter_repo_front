import React, { createContext, useState, useContext } from 'react';

// Create a context for the userId
export const UserIdContext = createContext();

// Create a provider component
export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};

// Create a custom hook to use the userId context
export const useUserId = () => {
  const context = useContext(UserIdContext);
  if (context === undefined) {
    throw new Error('useUserId must be used within a UserIdProvider');
  }
  return context;
};
