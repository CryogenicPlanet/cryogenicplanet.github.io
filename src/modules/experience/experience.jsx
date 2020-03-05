import React, {Component, Fragment} from "react"
import data from "./data"
import {Col, Row, Layout, List,Avatar,Typography, Icon, Tooltip} from 'antd'
//import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
const {Title,Paragraph} = Typography

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
                  key={item.title.name}
                  actions={[
                    <Row  type="flex" justify="space-between" align="middle">
                      <Fragment>
                      <Col span={4}>
                      <Tooltip title="Learn More">
                      <a href={`#${item.title.name}`} disabled><Icon type="more" style={{fontSize : "1.5vw",}} rotate="90"/></a>
                      </Tooltip>
                      </Col>
                      {item.links.map((link,index)=>{
                      return(
                      <Col span={4}>
                      <Tooltip title={link.prompt}>
                      <a href={link.href} target="_blank"><Icon type={link.type} style={{fontSize : "1.5vw",}}/></a>
                      </Tooltip>
                      </Col>);
                    })}
                    </Fragment>
                    </Row>
                    
                  ]}
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