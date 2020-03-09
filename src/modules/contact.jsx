import React, {Component} from 'react'
import {Input, Row, Form, Button, Select,message } from 'antd'
import Recaptcha from 'react-recaptcha'

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
      reason : "hi",
      message : "",
      submit : false
    }
    capthca = () => {
      this.setState({
        submit : false
      })
    }
     onFinish = values => {
        console.log(values);
      };
      handleSubmit = e => {
        console.log(this.state)
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({ "form-name": "contact", ...this.state })
        })
          .then(() => message.success("Sucessfully Submited"))
          .catch(error => alert(error));
  
        e.preventDefault();
      };
      handleChange = e => {console.log(`${e.target.name} Input Changed`);this.setState({ [e.target.name]: e.target.value });}
      render() {
        const {name,email,subject,reason,message} = this.state
        return (
            
            <Row  type="flex" justify="center" align="middle">
            <Form {...layout} name="contact" onSubmit={this.handleSubmit} onFinish={this.onFinish} validateMessages={validateMessages}>
            <Form.Item label="Name" rules={[{ required: true }]}>
              <Input name="name" value={name} onChange={this.handleChange}/>
            </Form.Item>
            <Form.Item  label="Email" rules={[{ type: 'email',required : true }]}>
              <Input name="email" value={email} onChange={this.handleChange}/>
            </Form.Item>
            <Form.Item  label="Subject" rules={[{ required: true }]}>
              <Input name="subject" value={subject} onChange={this.handleChange}/>
            </Form.Item>
            <Form.Item  label="Reason" rules={[{ required: true }]}>
            <Select defaultValue="hi" name="reason" value={reason} onChange={this.handleChange}>
                <Option value="hi">Say Hi!</Option>
                <Option value="business">Business</Option>
                <Option value="dev">Software Development</Option>
                <Option value="creative">Photography/Filmmaking</Option>
                <Option value="other">Other</Option>
            </Select>
            </Form.Item>
            <Form.Item label="Message" rules={{required : true}}>
              <TextArea  name="message" value={message} onChange={this.handleChange}/>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit" disabled={this.state.submit}>
                Submit
              </Button>
            </Form.Item>
          </Form>
          </Row>
        );
      }
}
export default Contact