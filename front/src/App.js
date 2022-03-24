import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Layout,
  Row,
  Space,
} from 'antd';
import 'antd/dist/antd.css';
import { useEffect, useState } from 'react';

const App = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  const [data, setData] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = values => {
    const _values = { ...values, Amount: Number(values.Amount) };

    fetch('http://localhost:5000/', {
      method: 'POST',
      body: JSON.stringify(_values),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.status >= 200 && res.status < 300) return res.json();
        throw new Error();
      })
      .then(data => setData(data))
      .catch(e => setError('Ошибка'));
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
                name='CardNumber'
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
                  name='ExpDate'
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
                  name='Cvv'
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
                name='Amount'
                rules={[
                  { required: true, message: 'Поле не должно быть пустым!' },
                ]}
              >
                <Input type='number' />
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
            {error && <p>{error}</p>}
            {data && (
              <p>{`RequestId:${data.RequestId}, Amount:${data.Amount}`}</p>
            )}
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default App;
