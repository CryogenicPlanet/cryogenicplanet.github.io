import React,{Component} from 'react'
import data from './moreData'
import {Tabs} from 'antd'

const {TabPane} = Tabs

class MoreProjects extends Component {
    render(){
        return(
            <Tabs defaultActiveKey="1" tabPosition="left" style={{ height: 220 }}>
            {[...Array(30).keys()].map(i => (
              <TabPane tab={`Tab-${i}`} key={i}>
                Content of tab {i}
              </TabPane>
            ))}
          </Tabs>
        );
    }
}

export default MoreProjects