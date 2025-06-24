import React from 'react';
import { List, Tag, Card, Typography } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface EventItem {
  id: string;
  title: string;
  date: string;
  type: 'meeting' | 'event' | 'deadline';
  location?: string;
}

const eventTypeColors = {
  meeting: 'blue',
  event: 'green',
  deadline: 'red'
};

const eventTypeLabels = {
  meeting: 'Meeting',
  event: 'Event',
  deadline: 'Deadline'
};

const mockEvents: EventItem[] = [
  {
    id: '1',
    title: 'Staff Meeting',
    date: '2023-07-15T09:00:00',
    type: 'meeting',
    location: 'Staff Room'
  },
  {
    id: '2',
    title: 'Parents Evening',
    date: '2023-07-18T16:00:00',
    type: 'event',
    location: 'School Hall'
  },
  {
    id: '3',
    title: 'Report Cards Due',
    date: '2023-07-20T23:59:00',
    type: 'deadline'
  },
  {
    id: '4',
    title: 'Department Heads Meeting',
    date: '2023-07-22T10:00:00',
    type: 'meeting',
    location: 'Conference Room'
  }
];

const UpcomingEvents: React.FC = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <Card 
      title={
        <span>
          <CalendarOutlined style={{ marginRight: 8 }} />
          Upcoming Events
        </span>
      }
      className="upcoming-events"
    >
      <List
        itemLayout="horizontal"
        dataSource={mockEvents}
        renderItem={(event) => (
          <List.Item>
            <List.Item.Meta
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text strong>{event.title}</Text>
                  <Tag color={eventTypeColors[event.type]}>
                    {eventTypeLabels[event.type]}
                  </Tag>
                </div>
              }
              description={
                <div>
                  <div>{formatDate(event.date)}</div>
                  {event.location && <Text type="secondary">{event.location}</Text>}
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default UpcomingEvents;
