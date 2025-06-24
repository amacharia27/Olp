import React, { useState } from 'react';
import { Form, Input, Select, Button, Radio, Space, Divider, Alert } from 'antd';
import { CreditCardOutlined, BankOutlined, MobileOutlined, LockOutlined } from '@ant-design/icons';

const { Option } = Select;

export interface PaymentMethodFormProps {
  onSubmit: (values: any) => void;
  onCancel?: () => void;
  initialValues?: any;
  loading?: boolean;
}

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
  onSubmit,
  onCancel,
  initialValues,
  loading = false
}) => {
  const [form] = Form.useForm();
  const [paymentType, setPaymentType] = useState(initialValues?.paymentType || 'mpesa');

  const handlePaymentTypeChange = (e: any) => {
    setPaymentType(e.target.value);
    // Reset form fields that are specific to payment types
    form.resetFields(['cardNumber', 'expiryDate', 'cvv', 'accountNumber', 'bankCode', 'phoneNumber']);
  };

  const handleSubmit = (values: any) => {
    onSubmit({ ...values, paymentType });
  };

  const renderPaymentFields = () => {
    switch (paymentType) {
      case 'creditCard':
        return (
          <>
            <Form.Item
              name="cardholderName"
              label="Cardholder Name"
              rules={[{ required: true, message: 'Please enter cardholder name' }]}
            >
              <Input placeholder="Name as it appears on card" />
            </Form.Item>
            <Form.Item
              name="cardNumber"
              label="Card Number"
              rules={[
                { required: true, message: 'Please enter card number' },
                { pattern: /^\d{16}$/, message: 'Card number must be 16 digits' }
              ]}
            >
              <Input 
                prefix={<CreditCardOutlined />} 
                placeholder="XXXX XXXX XXXX XXXX" 
                maxLength={16}
              />
            </Form.Item>
            <Space style={{ display: 'flex', width: '100%' }}>
              <Form.Item
                name="expiryDate"
                label="Expiry Date"
                rules={[
                  { required: true, message: 'Required' },
                  { pattern: /^(0[1-9]|1[0-2])\/\d{2}$/, message: 'Format: MM/YY' }
                ]}
                style={{ width: '50%' }}
              >
                <Input placeholder="MM/YY" maxLength={5} />
              </Form.Item>
              <Form.Item
                name="cvv"
                label="CVV"
                rules={[
                  { required: true, message: 'Required' },
                  { pattern: /^\d{3,4}$/, message: 'Invalid CVV' }
                ]}
                style={{ width: '50%' }}
              >
                <Input 
                  prefix={<LockOutlined />} 
                  placeholder="XXX" 
                  maxLength={4} 
                  type="password"
                />
              </Form.Item>
            </Space>
          </>
        );
      case 'bankTransfer':
        return (
          <>
            <Form.Item
              name="accountName"
              label="Account Holder Name"
              rules={[{ required: true, message: 'Please enter account holder name' }]}
            >
              <Input prefix={<BankOutlined />} placeholder="Account holder name" />
            </Form.Item>
            <Form.Item
              name="accountNumber"
              label="Account Number"
              rules={[{ required: true, message: 'Please enter account number' }]}
            >
              <Input placeholder="Account number" />
            </Form.Item>
            <Form.Item
              name="bankCode"
              label="Bank"
              rules={[{ required: true, message: 'Please select a bank' }]}
            >
              <Select placeholder="Select bank">
                <Option value="equity">Equity Bank</Option>
                <Option value="kcb">Kenya Commercial Bank</Option>
                <Option value="coop">Cooperative Bank</Option>
                <Option value="stanbic">Stanbic Bank</Option>
                <Option value="absa">ABSA Bank</Option>
                <Option value="dtb">Diamond Trust Bank</Option>
                <Option value="ncba">NCBA Bank</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="branchCode"
              label="Branch Code"
            >
              <Input placeholder="Branch code (if applicable)" />
            </Form.Item>
          </>
        );
      case 'mpesa':
        return (
          <>
            <Alert
              message="M-Pesa Integration"
              description="This payment method will enable automatic M-Pesa STK push for subscription payments and renewals."
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />
            <Form.Item
              name="phoneNumber"
              label="M-Pesa Phone Number"
              rules={[
                { required: true, message: 'Please enter M-Pesa phone number' },
                { pattern: /^(?:\+254|0)[17]\d{8}$/, message: 'Please enter a valid Kenyan phone number' }
              ]}
            >
              <Input 
                prefix={<MobileOutlined />} 
                placeholder="+254 7XX XXX XXX" 
              />
            </Form.Item>
            <Form.Item
              name="accountName"
              label="Account Holder Name"
              rules={[{ required: true, message: 'Please enter account holder name' }]}
            >
              <Input placeholder="Name registered with M-Pesa" />
            </Form.Item>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="paymentType"
        label="Payment Method"
        rules={[{ required: true, message: 'Please select a payment method' }]}
      >
        <Radio.Group onChange={handlePaymentTypeChange} value={paymentType}>
          <Radio.Button value="mpesa">
            <MobileOutlined /> M-Pesa
          </Radio.Button>
          <Radio.Button value="bankTransfer">
            <BankOutlined /> Bank Transfer
          </Radio.Button>
          <Radio.Button value="creditCard">
            <CreditCardOutlined /> Credit Card
          </Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Divider />

      {renderPaymentFields()}

      <Form.Item
        name="isDefault"
        valuePropName="checked"
      >
        <Radio>Set as default payment method</Radio>
      </Form.Item>

      <Form.Item>
        <Space>
          {onCancel && (
            <Button onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="primary" htmlType="submit" loading={loading}>
            Save Payment Method
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default PaymentMethodForm;
