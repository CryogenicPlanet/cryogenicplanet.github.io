/* eslint-disable no-useless-escape */
import React, { Component, Fragment } from "react";

import Home from "./home";
import MoreProjects from "./modules/projects/moreProjects";
import FourOFour from "./modules/404.jsx";
// TODO Publications
// import Publications from './modules/publications/publications'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Input, Row, Form, Button, message, Typography } from "antd";
//import Recaptcha from "react-recaptcha";

const { Text } = Typography;

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
class App extends Component {
  state = {
    isMobile: false,
    screenWidth: window.innerWidth,
    iconSize: "2vw",
    smallIconSize: "1.5vw",
    screenType: null,
    studentName: "",
    studentNo: "",
  };

  mobilecheck = () => {
    var check = false;
    (function (a) {
      // Regex for checking if device is mobile does not need spell check
      /* cSpell:disable */
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        /* cSpell:enable */
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateWindowDimensions());
    this.setState({
      isMobile: this.mobilecheck(),
    });
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    var mobile = this.mobilecheck();
    if (mobile) {
      this.setState({
        isMobile: mobile,
        iconSize: "4vw",
        smallIconSize: "3vw",
        screenType: 2,
      });
    }

    if (window.innerWidth > 768) {
      if (this.state.screenType !== 0 && this.state.screenType !== null) {
        this.setState({ screenWidth: window.innerWidth, screenType: 0 });
        //window.location.reload(false)
      }
      this.setState({ screenWidth: window.innerWidth, screenType: 0 });
    } else if (window.innerWidth > 600) {
      if (this.state.screenType !== 1 && this.state.screenType !== null) {
        this.setState({
          screenWidth: window.innerWidth,
          iconSize: "4vw",
          smallIconSize: "3vw",
          screenType: 1,
        });
        //window.location.reload(false)
      }
      this.setState({
        screenWidth: window.innerWidth,
        iconSize: "4vw",
        smallIconSize: "3vw",
        screenType: 1,
      });
    } else {
      if (this.state.screenType !== 2 && this.state.screenType !== null) {
        this.setState({
          screenWidth: window.innerWidth,
          iconSize: "7vw",
          smallIconSize: "6vw",
          screenType: 2,
        });
        //window.location.reload(false)
      }
      this.setState({
        screenWidth: window.innerWidth,
        iconSize: "7vw",
        smallIconSize: "6vw",
        screenType: 2,
      });
    }
  }
  handleChange = (e) => {
    console.log(`${e.target.name} Input Changed`);
    const eTargent = e.target;

    this.setState({ [eTargent.name]: eTargent.value });
  };
  handleSubmit = (e) => {
    console.log("Submiting");
    //console.log(...this.state)
    // window.location.href = ` mailto:molloy@cs.toronto.edu?subject=A22%20Post%20Requirments&body=Dear%20sir%0D%0A%0D%0AI%20${this.state.studentName}%20(Student%20Number%20${this.state.studentNo})%20a%20fall%202019%20first%20year%20student%20applying%20for%20CMS%20POSt.%20I%20would%20like%20to%20make%20an%20argument%20for%20why%20you%20should%20reconsider%20dropping%20A22%20from%20POSt.%0D%0A%0D%0AFirst%2C%20Linear%20Algebra%20as%20a%20concept%20is%20quite%20vital%20to%20understanding%20of%20more%20complex%20topics%20in%20Computer%20Science%20in%20Artificial%20Intelligence%2C%20Computer%20Graphics%2C%20etc%20as%20you%20surely%20know%20and%20thus%20this%20course%20is%20till%20a%20great%20indicator%20of%20someones%20ability%20to%20perform%20in%20upper%20year%20computer%20science.%20Furthermore%2C%20Linear%20Algebra%20is%20a%20very%20different%20completely%20new%20course%20to%20most%20student%20and%20thus%20is%20extremely%20challenging%20and%20takes%20a%20lot%20of%20effort%20on%20our%20part%20as%20students%20to%20comprehend%20and%20understand%20the%20course%20material.%20Most%20student%2C%20put%20in%20extreme%20amounts%20of%20time%20and%20focus%20on%20this%20course%20as%20most%20of%20the%20material%20was%20completely%20new%20to%20students%2C%20and%20disregarding%20the%20course%20from%20POSt%20would%20make%20the%20time%20spent%20on%20Linear%20Algebra%20and%20not%20MATA37%20or%20CSCA48%20in%20vain.%0D%0A%0D%0AAdditionally%2C%20Students%20after%20making%20these%20large%20time%20commitments%20to%20the%20course%20actually%20did%20quite%20well%20in%20our%20assignments%20and%20midterm%2C%20MATA22%20had%20the%20highest%20midterm%20average%20across%20the%20three%20course%2C%20especially%20contrast%20to%20the%20average%20CSCA48%20had%20where%20almost%20half%20the%20class%20failed%20the%20midterm.%20This%20is%20to%20say%20that%20many%20if%20not%20most%20student%20are%20dependent%20on%20their%20A22%20marks%20to%20make%20POSt.%20And%20by%20changing%20the%20requirements%20so%20late%2C%20it%20is%20not%20possible%20for%20students%20to%20refocus%20their%20time%20to%20make%20up%20those%20marks%20in%20CSCA48(final%20already%20over)%20and%20MATA37.%0D%0A%0D%0AWhile%2C%20we%20as%20students%20understand%20the%20incredible%20strain%20on%20the%20professor%20and%20the%20department%20to%20ensure%20the%20course%20if%20fairly%20evaluated%20and%20to%20ensure%20the%20academic%20integrity%20of%20the%20course%2C%20these%20decisions%20should%20not%20come%20at%20the%20expense%20of%20the%20students%20best%20interest.%20Instead%20of%20suggestion%20potential%20solution%2C%20I%20am%20confident%20that%20our%20department%20is%20capable%20of%20making%20much%20smarter%20decision%2C%20than%20we%20are%20as%20the%20student%20body%2C%20and%20would%20urge%20you%20to%20reconsider%20this%20decision%20to%20focus%20on%20benefiting%20the%20student%20body.%0D%0A%0D%0AI%20would%20like%20to%20conclude%20by%20saying%20remove%20A22%20would%20be%20catastrophic%20for%20most%20students%20aspirations%20to%20make%20subject%20POSt%20and%20would%20disregard%20all%20the%20time%20and%20effort%20countless%20students%20have%20poured%20into%20this%20course.%0D%0A%0D%0AThank%20you%20for%20taking%20the%20time%20to%20indulge%20my%20request%2C%20and%20I%20hope%20you%20reconsider%20the%20impact%20this%20decision%20has%20on%20student%20and%20their%20aspirations%20in%20this%20department%20moving%20forward.`;
    window.location.href = ` mailto:molloy@cs.toronto.edu?subject=A22%20Post%20Requirments&body=Dear%20sir%0D%0A%0D%0AI%20${this.state.studentNo}%20(Student%20Number%20${this.state.studentNo})%20a%20fall%202019%20first%20year%20student%20applying%20for%20CMS%20POSt.%20I%20would%20like%20to%20make%20an%20argument%20for%20why%20you%20should%20reconsider%20dropping%20A22%20from%20POSt.%0D%0A%0D%0A%0D%0AFirst%2C%20Linear%20Algebra%20as%20a%20concept%20is%20quite%20vital%20to%20understanding%20of%20more%20complex%20topics%20in%20Computer%20Science%20in%20Artificial%20Intelligence%2C%20Computer%20Graphics%2C%20etc%20as%20you%20surely%20know%20and%20thus%20this%20course%20is%20till%20a%20great%20indicator%20of%20someones%20ability%20to%20perform%20in%20upper%20year%20computer%20science.%20Furthermore%2C%20Linear%20Algebra%20is%20a%20very%20different%20completely%20new%20course%20to%20most%20students%20and%20thus%20is%20extremely%20challenging%20and%20takes%20a%20lot%20of%20effort%20on%20our%20part%20as%20students%20to%20comprehend%20and%20understand%20the%20course%20material.%20Most%20students%20have%20put%20in%20extreme%20amounts%20of%20time%20and%20focus%20on%20this%20course%20as%20most%20of%20the%20material%20was%20completely%20new%20to%20students%2C%20and%20disregarding%20the%20course%20from%20POSt%20would%20make%20the%20time%20spent%20on%20Linear%20Algebra%20and%20not%20MATA37%20or%20CSCA48%20in%20vain.%0D%0A%0D%0AAdditionally%2C%20Students%20after%20making%20these%20large%20time%20commitments%20to%20the%20course%20actually%20did%20quite%20well%20in%20our%20assignments%20and%20midterm%2C%20MATA22%20had%20the%20highest%20midterm%20average%20across%20the%20three%20course%2C%20especially%20contrast%20to%20the%20average%20CSCA48%20had%20where%20almost%20half%20the%20class%20failed%20the%20midterm.%20This%20is%20to%20say%20that%20many%20if%20not%20most%20students%20are%20dependent%20on%20their%20A22%20marks%20to%20make%20POSt.%20And%20by%20changing%20the%20requirements%20so%20late%2C%20it%20is%20not%20possible%20for%20students%20to%20refocus%20their%20time%20to%20make%20up%20those%20marks%20in%20CSCA48(final%20already%20over)%20and%20MATA37.%0D%0A%0D%0AWhile%2C%20we%20as%20students%20understand%20the%20incredible%20strain%20on%20the%20professor%20and%20the%20department%20to%20ensure%20the%20course%20if%20fairly%20evaluated%20and%20to%20ensure%20the%20academic%20integrity%20of%20the%20course%2C%20these%20decisions%20should%20not%20come%20at%20the%20expense%20of%20the%20students%20best%20interest.%20Instead%20of%20suggestion%20potential%20solution%2C%20I%20am%20confident%20that%20our%20department%20is%20capable%20of%20making%20much%20smarter%20decision%2C%20than%20we%20are%20as%20the%20student%20body%2C%20and%20would%20urge%20you%20to%20reconsider%20this%20decision%20to%20focus%20on%20benefiting%20the%20student%20body.%0D%0A%0D%0AI%20would%20like%20to%20conclude%20by%20saying%20remove%20A22%20would%20be%20catastrophic%20for%20most%20students%20aspirations%20to%20make%20subject%20POSt%20and%20would%20disregard%20all%20the%20time%20and%20effort%20countless%20students%20have%20poured%20into%20this%20course.%0D%0A%0D%0AThank%20you%20for%20taking%20the%20time%20to%20indulge%20my%20request%2C%20and%20I%20hope%20you%20reconsider%20the%20impact%20this%20decision%20has%20on%20student%20and%20their%20aspirations%20in%20this%20department%20moving%20forward.`;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "a22", ...this.state }),
    })
      .then(() => {
        message.success("Sucessfully Added As A Signatory");
      })
      .catch((error) => message.error(error));
  };

  render() {
    return (
      <Fragment>
        <Router>
          <Switch>
            <Route path="/linAlg">
              <Row type="flex" justify="center" align="middle">
                <Form {...layout} name="a22" onSubmit={this.handleSubmit}>
                  <Form.Item label="Name" rules={[{ required: true }]}>
                    <Input
                      name="studentName"
                      value={this.state.studentName}
                      onChange={this.handleChange}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Student Number"
                    rules={[{ required: true }]}
                  >
                    <Input
                      name="studentNo"
                      value={this.state.studentNo}
                      onChange={this.handleChange}
                    />
                  </Form.Item>
                  <Form.Item label="Student Email" rules={[{ required: true }]}>
                    <Input
                      name="studentEmail"
                      value={this.state.studentEmail}
                      onChange={this.handleChange}
                    />
                  </Form.Item>
                  <Text>
                    Dear sir I {this.state.name} (Student Number
                    {this.state.stNumber}) a fall 2019 first year student
                    applying for CMS POSt. I would like to make an argument for
                    why you should reconsider dropping A22 from POSt. First,
                    Linear Algebra as a concept is quite vital to understanding
                    of more complex topics in Computer Science in Artificial
                    Intelligence, Computer Graphics, etc as you surely know and
                    thus this course is till a great indicator of someones
                    ability to perform in upper year computer science.
                    Furthermore, Linear Algebra is a very different completely
                    new course to most students and thus is extremely
                    challenging and takes a lot of effort on our part as
                    students to comprehend and understand the course material.
                    Most students have put in extreme amounts of time and focus
                    on this course as most of the material was completely new to
                    students, and disregarding the course from POSt would make
                    the time spent on Linear Algebra and not MATA37 or CSCA48 in
                    vain. Additionally, Students after making these large time
                    commitments to the course actually did quite well in our
                    assignments and midterm, MATA22 had the highest midterm
                    average across the three course, especially contrast to the
                    average CSCA48 had where almost half the class failed the
                    midterm. This is to say that many if not most students are
                    dependent on their A22 marks to make POSt. And by changing
                    the requirements so late, it is not possible for students to
                    refocus their time to make up those marks in CSCA48(final
                    already over) and MATA37. While, we as students understand
                    the incredible strain on the professor and the department to
                    ensure the course if fairly evaluated and to ensure the
                    academic integrity of the course, these decisions should not
                    come at the expense of the students best interest. Instead
                    of suggestion potential solution, I am confident that our
                    department is capable of making much smarter decision, than
                    we are as the student body, and would urge you to reconsider
                    this decision to focus on benefiting the student body. I
                    would like to conclude by saying remove A22 would be
                    catastrophic for most students aspirations to make subject
                    POSt and would disregard all the time and effort countless
                    students have poured into this course. Thank you for taking
                    the time to indulge my request, and I hope you reconsider
                    the impact this decision has on student and their
                    aspirations in this department moving forward.
                  </Text>
                  <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={this.state.submit}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Row>
            </Route>
            <Route
              path="/sitemap"
              component={() => {
                window.location.href =
                  process.env.PUBLIC_URL + "/files/sitemap.xml";
                return null;
              }}
            />
            <Route
              path="/Links"
              component={() => {
                window.location.href = "https://linktr.ee/rahul_tarak";
                return null;
              }}
            />
            <Route path="/Projects">
              <MoreProjects></MoreProjects>
            </Route>
            <Route path="/Publications">
              <p>Work in Progress</p>
            </Route>
            <Route exact path="/">
              <Home {...this.state} />
            </Route>
            <Route component={FourOFour}></Route>
          </Switch>
        </Router>
      </Fragment>
    );
  }
}
export default App;
