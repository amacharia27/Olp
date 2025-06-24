// apps/frontend/src/features/student/pages/TeacherRatingPage.tsx
import React, { useState, useEffect } from 'react';
import { Tabs, Typography, message, Modal } from 'antd';
import { StarOutlined, HistoryOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import RatingForm, { Teacher, RatingFormValues } from '@/features/shared/components/RatingForm';
import TeacherRatingList, { Rating } from '@/features/shared/components/TeacherRatingList';

const { Title } = Typography;
const { TabPane } = Tabs;
const { confirm } = Modal;

// Mock data for teachers
const mockTeachers: Teacher[] = [
  { id: 'teacher1', name: 'Mr. John Kamau', subject: 'Mathematics' },
  { id: 'teacher2', name: 'Mrs. Sarah Odhiambo', subject: 'English' },
  { id: 'teacher3', name: 'Mr. David Maina', subject: 'Science' },
  { id: 'teacher4', name: 'Ms. Lucy Wanjiru', subject: 'Social Studies' },
  { id: 'teacher5', name: 'Mr. Michael Omondi', subject: 'Physical Education' },
];

// Mock data for ratings
const mockRatings: Rating[] = [
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
];

const TeacherRatingPage: React.FC = () => {
  const [ratings, setRatings] = useState<Rating[]>(mockRatings);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('rate');

  // In a real app, this would fetch data from an API
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    const timer = setTimeout(() => {
      setRatings(mockRatings);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (values: RatingFormValues) => {
    // Show confirmation dialog before submitting
    confirm({
      title: 'Submit Rating',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to submit this rating? Once submitted, it cannot be edited.',
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

  return (
    <div className="teacher-rating-page">
      <Title level={2}>Teacher Rating</Title>
      
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane 
          tab={<span><StarOutlined /> Rate a Teacher</span>} 
          key="rate"
        >
          <RatingForm 
            teachers={mockTeachers} 
            onSubmit={handleSubmit} 
            loading={submitting}
          />
        </TabPane>
        
        <TabPane 
          tab={<span><HistoryOutlined /> Rating History</span>} 
          key="history"
        >
          <TeacherRatingList 
            ratings={ratings} 
            teachers={mockTeachers} 
            loading={loading}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TeacherRatingPage;
