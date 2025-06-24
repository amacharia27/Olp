// apps/frontend/src/features/parent/pages/ParentTeacherRatingPage.tsx
import React, { useState, useEffect } from 'react';
import { Tabs, Typography, message, Modal, Alert, Spin } from 'antd';
import { StarOutlined, HistoryOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import RatingForm, { Teacher, RatingFormValues } from '@/features/shared/components/RatingForm';
import TeacherRatingList, { Rating } from '@/features/shared/components/TeacherRatingList';
import { useParentDashboard } from '../context/ParentDashboardContext';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { confirm } = Modal;

// Mock data for teachers by child ID
const mockTeachersByChild: Record<string, Teacher[]> = {
  'child1': [
    { id: 'teacher1', name: 'Mr. John Kamau', subject: 'Mathematics' },
    { id: 'teacher2', name: 'Mrs. Sarah Odhiambo', subject: 'English' },
    { id: 'teacher3', name: 'Mr. David Maina', subject: 'Science' },
  ],
  'child2': [
    { id: 'teacher4', name: 'Ms. Lucy Wanjiru', subject: 'Social Studies' },
    { id: 'teacher5', name: 'Mr. Michael Omondi', subject: 'Physical Education' },
    { id: 'teacher6', name: 'Mrs. Jane Njeri', subject: 'Kiswahili' },
  ]
};

// Mock data for ratings by child ID
const mockRatingsByChild: Record<string, Rating[]> = {
  'child1': [
    {
      id: 'rating1',
      teacherId: 'teacher1',
      rating: 4.5,
      feedback: 'Great at explaining complex concepts in simple terms.',
      category: 'teaching_quality',
      date: '2025-05-15T10:30:00Z',
    },
    {
      id: 'rating2',
      teacherId: 'teacher2',
      rating: 5,
      feedback: 'Always available to help with questions after class.',
      category: 'responsiveness',
      date: '2025-05-10T14:20:00Z',
    },
  ],
  'child2': [
    {
      id: 'rating3',
      teacherId: 'teacher4',
      rating: 4,
      feedback: 'Engages students well in class discussions.',
      category: 'engagement',
      date: '2025-05-12T09:15:00Z',
    },
  ]
};

const ParentTeacherRatingPage: React.FC = () => {
  const { selectedChild, isLoading: isLoadingChild } = useParentDashboard();
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('rate');

  // Load teachers and ratings when selected child changes
  useEffect(() => {
    if (selectedChild) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        // Get teachers and ratings for the selected child
        const childTeachers = mockTeachersByChild[selectedChild.id] || [];
        const childRatings = mockRatingsByChild[selectedChild.id] || [];
        
        setTeachers(childTeachers);
        setRatings(childRatings);
        setLoading(false);
      }, 1000);
    }
  }, [selectedChild]);

  const handleSubmit = (values: RatingFormValues) => {
    if (!selectedChild) return;

    // Show confirmation dialog before submitting
    confirm({
      title: 'Submit Rating',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to submit this rating on behalf of ${selectedChild.name}? Once submitted, it cannot be edited.`,
      onOk() {
        // Simulate API call to submit rating
        setSubmitting(true);
        
        setTimeout(() => {
          // Create new rating object
          const newRating: Rating = {
            id: `rating${Date.now()}`,
            teacherId: values.teacherId,
            rating: values.rating,
            feedback: values.feedback,
            category: values.category,
            date: new Date().toISOString(),
          };
          
          // Add to ratings list
          setRatings(prevRatings => [newRating, ...prevRatings]);
          setSubmitting(false);
          
          // Show success message
          message.success('Rating submitted successfully!');
          
          // Switch to history tab
          setActiveTab('history');
        }, 1500);
      },
    });
  };

  if (isLoadingChild) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>Loading child data...</div>
      </div>
    );
  }

  if (!selectedChild) {
    return (
      <Alert
        message="No Child Selected"
        description="Please select a child to rate their teachers."
        type="info"
        showIcon
      />
    );
  }

  return (
    <div className="parent-teacher-rating-page">
      <Title level={2}>Teacher Rating</Title>
      <Text>Rating teachers for: <strong>{selectedChild.name}</strong></Text>
      
      <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ marginTop: 24 }}>
        <TabPane 
          tab={<span><StarOutlined /> Rate a Teacher</span>} 
          key="rate"
        >
          <RatingForm 
            teachers={teachers} 
            onSubmit={handleSubmit} 
            loading={submitting}
            title={`Rate ${selectedChild.name}'s Teacher`}
          />
        </TabPane>
        
        <TabPane 
          tab={<span><HistoryOutlined /> Rating History</span>} 
          key="history"
        >
          <TeacherRatingList 
            ratings={ratings} 
            teachers={teachers} 
            loading={loading}
            title={`${selectedChild.name}'s Teacher Ratings`}
            emptyText={`No ratings submitted yet for ${selectedChild.name}`}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ParentTeacherRatingPage;
