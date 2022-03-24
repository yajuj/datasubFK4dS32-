import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Button,
  Card,
  Space,
  Row,
  Col,
  Divider,
  Layout,
} from 'antd';
import { useState, useEffect } from 'react';

const App = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = values => {
    console.log('Finish:', values);
  };

  return (
    <Layout
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Row>
        <Col>
          <Card style={{ width: '100%' }}>
            <Form
              form={form}
              name='cardPaymentForm'
              onFinish={onFinish}
              autoComplete='off'
            >
              <Form.Item
                label='Card Number'
                name='cardNumber'
                rules={[
                  { required: true, message: 'Поле не должно быть пустым' },
                  {
                    pattern: /^[0-9]{16}$/,
                    message: 'Должно содержать 16 цифр',
                  },
                ]}
              >
                <Input maxLength='16' type='text' />
              </Form.Item>

              <Space>
                <Form.Item
                  label='Expiration Date'
                  name='expirationDate'
                  type='number'
                  rules={[
                    { required: true, message: 'Поле не должно быть пустым!' },
                    {
                      pattern: /(0[1-9]|10|11|12)\/202[0-9]$/,
                      message: 'Введите срок действия карты в формате MM/YYYY.',
                    },
                  ]}
                >
                  <Input maxLength='7' />
                </Form.Item>

                <Form.Item
                  label='CVV'
                  name='cvv'
                  rules={[
                    { required: true, message: 'Поле не должно быть пустым!' },
                    {
                      pattern: /[0-9]{3}/,
                      message: 'Введите CVV код из трех цифр.',
                    },
                  ]}
                >
                  <Input maxLength='3' />
                </Form.Item>
              </Space>
              <Divider />
              <Form.Item
                label='Amount'
                name='amount'
                rules={[
                  { required: true, message: 'Поле не должно быть пустым!' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item shouldUpdate>
                {() => (
                  <Button
                    type='primary'
                    htmlType='submit'
                    disabled={
                      !form.isFieldsTouched(true) ||
                      !!form
                        .getFieldsError()
                        .filter(({ errors }) => errors.length).length
                    }
                  >
                    Оплатить
                  </Button>
                )}
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default App;
