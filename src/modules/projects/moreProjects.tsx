import React, { Component, Fragment } from "react";
import data from "./moreData.json";
import { Tabs, Card, Row, Col } from "antd";

const { TabPane } = Tabs;

const tabListNoTitle = [
  {
    key: "article",
    tab: "article"
  },
  {
    key: "app",
    tab: "app"
  },
  {
    key: "project",
    tab: "project"
  }
];

const contentListNoTitle = {
  article: <p>article content</p>,
  app: <p>app content</p>,
  project: <p>project content</p>
};

class MoreProjects extends Component {
  state = {
    key: "tab1",
    n: 3,
    noTitleKey: [
      "app"
    ]
  };
  componentDidMount() {

    for (let i = 0; i < this.state.n; i++) {
      this.onLoad()
    }
    console.log(this.state)
  }
  onLoad = () => {
    this.setState({
      noTitleKey: this.state.noTitleKey.push("app")
    });
  }
  onTabChange = (key, type, index) => {
    console.log(this.state)
    console.log(key, type);
    let curTabs = this.state.noTitleKey;
    console.log(this.state, index);
    curTabs[index] = key;
    this.setState({ [type]: curTabs });
  };
  render() {
    return (
      <Fragment>
        <Row type="flex" justify="space-between" align="middle">
          {[...Array(this.state.n).keys()].map(i => (
            <Col span={6}>
              <Card
                style={{ width: "100%" }}
                tabList={tabListNoTitle}
                activeTabKey={this.state.noTitleKey[i]}
                tabBarExtraContent={<a href="#">More</a>}
                onTabChange={key => {
                  this.onTabChange(key, "noTitleKey", i);
                }}
              >
                {contentListNoTitle[this.state.noTitleKey[i]]}
              </Card>
            </Col>
          ))}
        </Row>
      </Fragment>
    );
  }
}

export default MoreProjects;
