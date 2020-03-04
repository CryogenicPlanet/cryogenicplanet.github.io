import React, {Component} from "react"
import data from "./data"
import {Col, Row, Layout, List,Avatar,Typography} from 'antd'
//import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
const {Title} = Typography

var databody;
class Experience extends Component {
  render() {
    return (
      <section color="black">
        <Row  type="flex" justify="center" align="middle">
           <Title>Work Experiences</Title>
         </Row>
          <Row type="flex" justify="center" align="middle">
            <Col>
              <List
                itemLayout="vertical"
                size="large"
                dataSource={data}
                renderItem={item => (
                  
                <List.Item
                  key={item.title}
                  //actions={}
                  >
                  <List.Item.Meta
                    title={< a href = {item.title.href} > {item.title.name} </a>}
                    description={`${item.position} | From ${item.startDate} to ${item.endDate} in ${item.location}`}/> 
                    {item.description.map((description,index)=>{
                      return(
                          <p>{description}</p>
                      );
                    })}
                    {item.languages != null ? <p><b>{`Languages used ${item.languages}`}</b></p> : <p></p> }
                </List.Item>
              )}></List>
            </Col>
          </Row>
        </section>
    );
  }
}

export default Experience;