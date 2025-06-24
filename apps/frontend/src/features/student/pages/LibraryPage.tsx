// apps/frontend/src/features/student/pages/LibraryPage.tsx
import { Table, Input, Typography, Tag, Card, Button,Modal,message } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Title, Paragraph } = Typography;
const { Search } = Input;

// --- MOCK DATA ---
const libraryCatalog = [
  { key: '1', title: 'The River and the Source', author: 'Margaret A. Ogola', subject: 'English', available: 5 },
  { key: '2', title: 'Primary Mathematics Pupil\'s Book 6', author: 'KIE', subject: 'Mathematics', available: 0 },
  { key: '3', title: 'Chemchemi za Kiswahili Kitabu cha 6', author: 'Wallah bin Wallah', subject: 'Kiswahili', available: 12 },
  { key: '4', title: 'Exploring Science Grade 6', author: 'Publisher X', subject: 'Science', available: 8 },
];

const borrowingHistory = [
  { key: '1', title: 'Blossoms of the Savannah', issueDate: '2023-09-01', dueDate: '2023-09-15', returnDate: '2023-09-14', status: 'Returned' },
  { key: '2', title: 'A Doll\'s House', issueDate: '2023-10-10', dueDate: '2023-10-24', returnDate: null, status: 'Borrowed' },
  { key: '3', title: 'Primary Social Studies Grade 6', issueDate: '2023-09-20', dueDate: '2023-10-04', returnDate: null, status: 'Overdue' },
];

// --- TABLE COLUMNS ---
const historyColumns: ColumnsType<any> = [
  { title: 'Title', dataIndex: 'title', key: 'title' },
  { title: 'Date Issued', dataIndex: 'issueDate', key: 'issueDate' },
  { title: 'Due Date', dataIndex: 'dueDate', key: 'dueDate' },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => {
    let color = 'blue';
    if (status === 'Returned') color = 'green';
    if (status === 'Overdue') color = 'volcano';
    return <Tag color={color}>{status.toUpperCase()}</Tag>;
  }},
];

const LibraryPage = () => {
    const showRequestConfirm = (book: any) => {
        Modal.confirm({
          title: 'Confirm Book Request',
          content: `Are you sure you want to request the book "${book.title}"?`,
          okText: 'Yes, Request',
          cancelText: 'Cancel',
          onOk() {
            message.success(`Request for "${book.title}" sent to the librarian!`);
            // TODO: API call to request the book
          },
        });
    };

    // --- TABLE COLUMNS ---
    const catalogColumns: ColumnsType<any> = [
      { title: 'Title', dataIndex: 'title', key: 'title', render: (text) => <strong>{text}</strong> },
      { title: 'Author', dataIndex: 'author', key: 'author' },
      { title: 'Subject', dataIndex: 'subject', key: 'subject' },
      { title: 'Copies Available', dataIndex: 'available', key: 'available', render: (count) => (
        <Tag color={count > 0 ? 'green' : 'red'}>{count > 0 ? 'Available' : 'Checked Out'}</Tag>
      )},
      { title: 'Action', key: 'action', render: (_, record) => (
        <Button type="primary" disabled={record.available === 0} onClick={() => showRequestConfirm(record)}>Request Book</Button>
      )},
    ];

    // TODO: Add API calls and state for search functionality

  return (
    <div>
      <Title level={2}>School Library</Title>
      
      <Card title="Search Library Catalog" style={{ marginBottom: 24 }}>
        <Paragraph>Find books available in the school library.</Paragraph>
        <Search placeholder="Search for a book by title or author..." enterButton style={{ marginBottom: 20 }} />
        <Table columns={catalogColumns} dataSource={libraryCatalog} />
      </Card>

      <Card title="My Borrowing History">
        <Paragraph>A record of all the books you have borrowed.</Paragraph>
        <Table columns={historyColumns} dataSource={borrowingHistory} />
      </Card>
    </div>
  );
};

export default LibraryPage;