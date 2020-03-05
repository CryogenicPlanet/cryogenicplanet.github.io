import React, {Component, Fragment} from 'react'
import {Input, Row,Col, Form, InputNumber, Button, Select, Tooltip } from 'antd'

const {TextArea} = Input;
const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  
  const validateMessages = {
    required: 'This field is required!',
    types: {
      email: 'Not a validate email!',
      number: 'Not a validate number!',
    },
    number: {
      range: 'Must be between ${min} and ${max}',
    },
  };
  

    

class Contact extends Component {
     onFinish = values => {
        console.log(values);
      };
      render() {
    
        return (
            <Row  type="flex" justify="center" align="middle">
            <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>
            <Form.Item name={['contact', 'name']} label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['contact', 'email']} label="Email" rules={[{ type: 'email',required : true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['contact', 'subject']} label="Subject" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['contact', 'reason']} label="Reason" rules={[{ required: true }]}>
            <Select defaultValue="hi">
                <Option value="hi">Say Hi!</Option>
                <Option value="business">Business</Option>
                <Option value="dev">Software Development</Option>
                <Option value="creative">Photography/Filmmaking</Option>
                <Option value="other">Other</Option>
            </Select>
            </Form.Item>
            <Form.Item name={['contact', 'message']} label="Message" rules={{required : true}}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Tooltip title="Under Construction">
              <Button type="primary" htmlType="submit" disabled>
                Submit
              </Button>
              </Tooltip>
            </Form.Item>
          </Form>
          </Row>
        );
      }
}
export default Contact