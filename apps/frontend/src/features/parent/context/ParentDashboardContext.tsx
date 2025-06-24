// apps/frontend/src/features/parent/context/ParentDashboardContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Child } from '../components/ChildSelector';

// Mock data for children - in a real app, this would come from an API
const mockChildren: Child[] = [
  { id: 'child1', name: 'Asha Kimani', className: 'Grade 6', schoolName: 'Nairobi Primary School' },
  { id: 'child2', name: 'David Kimani', className: 'Grade 3', schoolName: 'Nairobi Primary School' },
];

interface ParentDashboardContextType {
  children: Child[];
  selectedChildId: string;
  selectedChild: Child | undefined;
  setSelectedChildId: (id: string) => void;
  isLoading: boolean;
}

const ParentDashboardContext = createContext<ParentDashboardContextType | undefined>(undefined);

interface ParentDashboardProviderProps {
  children: ReactNode;
}

export const ParentDashboardProvider: React.FC<ParentDashboardProviderProps> = ({ children }) => {
  const [childrenData, setChildrenData] = useState<Child[]>(mockChildren);
  const [selectedChildId, setSelectedChildId] = useState<string>(mockChildren[0]?.id || '');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // In a real app, this would fetch the children data from an API
  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    
    // Mock API response delay
    const timer = setTimeout(() => {
      setChildrenData(mockChildren);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
    
    // In real implementation, this would be:
    // fetchChildren().then(data => {
    //   setChildrenData(data);
    //   setIsLoading(false);
    // });
  }, []);

  // Set initial selected child once data is loaded
  useEffect(() => {
    if (childrenData.length > 0 && !selectedChildId) {
      setSelectedChildId(childrenData[0].id);
    }
  }, [childrenData, selectedChildId]);

  const selectedChild = childrenData.find(child => child.id === selectedChildId);

  const value = {
    children: childrenData,
    selectedChildId,
    selectedChild,
    setSelectedChildId,
    isLoading
  };

  return (
    <ParentDashboardContext.Provider value={value}>
      {children}
    </ParentDashboardContext.Provider>
  );
};

export const useParentDashboard = (): ParentDashboardContextType => {
  const context = useContext(ParentDashboardContext);
  if (context === undefined) {
    throw new Error('useParentDashboard must be used within a ParentDashboardProvider');
  }
  return context;
};
