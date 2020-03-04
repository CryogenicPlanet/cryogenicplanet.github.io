import React, {Component,Fragment} from 'react'
import {Row,Progress,Col,Typography} from 'antd'
import data from './data'
import { T } from 'antd/lib/upload/utils'
const {Title, Paragraph} = Typography
class Skills extends Component {
    render(){
        return(
            <Fragment>
            <Row  type="flex" justify="center" align="middle">
                <Title level={3}>Languages</Title>
            </Row>
            <Row  type="flex" justify="space-between" align="middle">{
                data.languages.map((item,index)=>{
                    return(
                    <Fragment>
                    <Col span={6} offset={3}>
                    <Progress
                        type="dashboard"
                        size = "small"
                        percent={item.percent}
                        format={percent => `${item.name}`}
                        /> 
                    </Col>    
                    </Fragment>    
                    );
                })}
                </Row>
                <Row  type="flex" justify="center" align="middle">
                    <Title level={3}>Frameworks</Title>
                </Row>
                <Row  type="flex" justify="space-between" align="middle">{
                data.frameworks.map((item,index)=>{
                    return(
                    <Fragment>
                    <Col span={8}>
                    <Paragraph>{item.name}</Paragraph>
                    <Progress
                        type="line"
                        percent={item.percent}
                        format={percent => ``}
                        /> 
                    </Col>
                    </Fragment>    
                    );
                    
                })}
                </Row>
                <Row  type="flex" justify="center" align="middle" style={{paddingTop : "2%"}}>
                    <Title level={3}>Other</Title>
                </Row>
                 <Row  type="flex" justify="space-between" align="middle">{
                data.other.map((item,index)=>{
                    return(
                    <Fragment>
                    <Col span={3}>
                    <Paragraph>{item.name}</Paragraph>
                    <Progress
                        size = "small"
                        percent={item.percent}
                        format={percent => ``}
                        /> 
                    </Col>
                    </Fragment>    
                    );
                    
                })}
                </Row> 
                </Fragment>
            )
            }
        

}
export default Skills