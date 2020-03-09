import React, {Component} from 'react'
import {Input, Row, Form, Button, Select,message } from 'antd'

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
  

  const encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
  }

class Contact extends Component {
    state = {
      name : "",
      email : "",
      subject : "",
      reason : "",
      message : ""
    }
     onFinish = values => {
        console.log(values);
      };
      handleSubmit = e => {
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({ "form-name": "contact", ...this.state })
        })
          .then(() => message.success("Sucessfully Submited"))
          .catch(error => alert(error));
  
        e.preventDefault();
      };
      handleChange = e => this.setState({ [e.target.name]: e.target.value });
      render() {
    
        return (
            <Row  type="flex" justify="center" align="middle">
            <Form {...layout} name="contact" onSubmit={this.handleSubmit} onFinish={this.onFinish} validateMessages={validateMessages}>
            <Form.Item name="name" label="Name"  onChange={this.handleChange} rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email"  onChange={this.handleChange} label="Email" rules={[{ type: 'email',required : true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="subject" onChange={this.handleChange} label="Subject" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="reason" onChange={this.handleChange} label="Reason" rules={[{ required: true }]}>
            <Select defaultValue="hi">
                <Option value="hi">Say Hi!</Option>
                <Option value="business">Business</Option>
                <Option value="dev">Software Development</Option>
                <Option value="creative">Photography/Filmmaking</Option>
                <Option value="other">Other</Option>
            </Select>
            </Form.Item>
            <Form.Item name='message' onChange={this.handleChange} label="Message" rules={{required : true}}>
              <TextArea />
            </Form.Item>
            <div data-netlify-recaptcha="true"></div>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          </Row>
        );
      }
}
export default Contact