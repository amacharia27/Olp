// apps/frontend/src/features/parent/pages/BookMeetingPage.tsx
import { useState } from 'react';
import { Card, Typography, Button, Space, Select, List, message, Tag, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

// --- MOCK DATA ---
const childrenData = [
    { studentId: 'ST-00123', name: 'Asha Kimani (Grade 6)', teacherId: 'tr_otieno', teacherName: 'Mr. Otieno' },
    { studentId: 'ST-00250', name: 'David Kimani (Grade 3)', teacherId: 'tr_njeri', teacherName: 'Ms. Njeri' },
];

const availabilitySlots: Record<string, any[]> = {
    'tr_otieno': [
        { id: 's1', time: '10:00 AM', date: '2023-11-20', status: 'Available' },
        { id: 's2', time: '10:15 AM', date: '2023-11-20', status: 'Booked' },
        { id: 's3', time: '10:30 AM', date: '2023-11-20', status: 'Available' },
        { id: 's4', time: '10:45 AM', date: '2023-11-20', status: 'Available' },
    ],
    'tr_njeri': [
        { id: 's5', time: '09:00 AM', date: '2023-11-22', status: 'Available' },
        { id: 's6', time: '09:20 AM', date: '2023-11-22', status: 'Available' },
    ]
};

const BookMeetingPage = () => {
    const [selectedChild, setSelectedChild] = useState<any>(childrenData[0]);

    const handleBookSlot = (slot: any) => {
        Modal.confirm({
            title: 'Confirm Booking',
            content: `Are you sure you want to book a meeting with ${selectedChild.teacherName} on ${slot.date} at ${slot.time}?`,
            onOk() {
                message.success('Meeting booked successfully! A confirmation has been sent to you and the teacher.');
                // TODO: API call to book the slot
            }
        });
    };

    return (
        <div>
            <Title level={2}>Book Parent-Teacher Meeting</Title>
            <Card>
                <Space direction="vertical" size="large" style={{width: '100%'}}>
                    <div>
                        <Text strong>Step 1: Select Your Child</Text><br/>
                        <Select
                            defaultValue={selectedChild.studentId}
                            style={{ width: 300, marginTop: 8 }}
                            onChange={(val) => setSelectedChild(childrenData.find(c => c.studentId === val))}
                            options={childrenData.map(c => ({ value: c.studentId, label: c.name }))}
                        />
                    </div>
                    {selectedChild && (
                        <div>
                            <Text strong>Step 2: Choose an Available Time Slot with {selectedChild.teacherName}</Text>
                            <List
                                style={{marginTop: 8}}
                                bordered
                                dataSource={availabilitySlots[selectedChild.teacherId] || []}
                                renderItem={item => (
                                    <List.Item
                                        actions={[
                                            <Button
                                                type="primary"
                                                disabled={item.status !== 'Available'}
                                                onClick={() => handleBookSlot(item)}
                                            >
                                                {item.status === 'Available' ? 'Book Now' : 'Booked'}
                                            </Button>
                                        ]}
                                    >
                                        <Text>Date: {item.date}  |  Time: <strong>{item.time}</strong></Text>
                                        <Tag color={item.status === 'Available' ? 'green' : 'red'}>{item.status}</Tag>
                                    </List.Item>
                                )}
                            />
                        </div>
                    )}
                </Space>
            </Card>
        </div>
    );
};

export default BookMeetingPage;