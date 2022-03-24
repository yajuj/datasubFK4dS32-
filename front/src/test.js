{
  <Form.Item
    label='Expiration Date'
    name='expirationDate'
    type='number'
    rules={[
      {
        required: true,
        message: 'Поле не должно быть пустым!',
      },
      {
        pattern: /^[0-9]{2}\/[0-9]{4}$/,
        message: 'Введите срок действия карты в формате MM/YYYY.',
      },
    ]}
  >
    <Input maxLength='7' />
  </Form.Item>;
}
