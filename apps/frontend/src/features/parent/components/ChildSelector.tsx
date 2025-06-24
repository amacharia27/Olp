// apps/frontend/src/features/parent/components/ChildSelector.tsx
import { Select, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

// This would come from a global context or store in a real app
export interface Child {
  id: string;
  name: string;
  className: string;
  schoolName: string;
}

interface ChildSelectorProps {
  childrenData: Child[];
  selectedChildId: string;
  onChange: (childId: string) => void;
}

const ChildSelector = ({ childrenData, selectedChildId, onChange }: ChildSelectorProps) => {
  return (
    <div style={{ marginBottom: 24 }}>
      <Text strong>Viewing Dashboard For:</Text><br/>
      <Select
        value={selectedChildId}
        onChange={onChange}
        style={{ width: 300, marginTop: 8 }}
        options={childrenData.map(child => ({
          value: child.id,
          label: (
            <div>
              <Text strong>{child.name}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: '12px' }}>{child.className} - {child.schoolName}</Text>
            </div>
          )
        }))}
      />
    </div>
  );
};

export default ChildSelector;