// @ts-ignore
import React, { useState, useEffect } from "react";
import { Row, Typography, Tooltip, Button, Card } from "antd";
import { Parallax, } from "react-parallax";
import data from "./data.json";
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

// import Image from "material-ui-image";

const { Title } = Typography;

type ProjectProps = {

  screenWidth: number
  isMobile: boolean
}

const Projects = ({ isMobile, screenWidth }: ProjectProps) => {


  const [extraProject, setExtraProject] = useState(false)
  const [isIpad, setIsIpad] = useState(false)

  const moreProjects = () => {
    setExtraProject(true)
  };
  useEffect(() => {
    if (screenWidth <= 1024 && !isMobile) {
      setIsIpad(true)
    }
  }, [])


  return (
    <>
      <section color="black">
        <Row type="flex" justify="center" align="middle">
          <Title>Projects</Title>
        </Row>

        {data.map((project) => {
          if (project.parallax) {
            return (
              <>
                <Parallax
                  bgImage={
                    process.env.PUBLIC_URL +
                    `/images/projects/${project.parallax}`
                  }
                  style={{ height: "25vw", paddingBottom: "5%" }}
                  blur={{ min: -15, max: 15 }}
                  bgImageStyle={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    overflow: "hidden",
                  }}
                  strength={isMobile ? 50 : 150}
                >
                  {!isMobile ? (
                    <Card
                      bordered={false}
                      style={{
                        width: "20vw",
                        backgroundColor: " rgba(96, 125, 139,0.55)",
                      }}
                    >
                      <Title
                        ellipsis
                        level={3}
                        style={{ opacity: 1, color: "white" }}
                      >
                        {project.title.name}
                      </Title>
                      <p style={{ color: "white" }}>{project.slogan}</p>
                      <Button type="primary" href={`/Projects/${project.id}`}>
                        Learn More!
                        </Button>
                    </Card>
                  ) : null}
                </Parallax>
                {isMobile ? (
                  <Card
                    bordered={false}
                    style={{
                      width: "40w",
                      backgroundColor: " rgba(96, 125, 139,0.55)",
                      paddingBottom: "10%",
                    }}
                  >
                    <Title
                      ellipsis
                      level={3}
                      style={{ opacity: 1, color: "white" }}
                    >
                      {project.title.name}
                    </Title>
                    <p style={{ color: "white" }}>{project.slogan}</p>
                    <Button type="primary" href={`/Projects/${project.id}`}>
                      Learn More!
                      </Button>
                  </Card>
                ) : null}
              </>
            );
          } else {
            // Video File
            return (
              <>
                {!isMobile ? (
                  <Card
                    bordered={false}
                    style={{
                      width: "20vw",
                      zIndex: 10,
                      position: "absolute",
                      backgroundColor: " rgba(96, 125, 139,0.55)",
                    }}
                  >
                    <Title
                      ellipsis
                      level={3}
                      style={{ opacity: 1, color: "white" }}
                    >
                      {project.title.name}
                    </Title>
                    <p style={{ color: "white" }}>{project.slogan}</p>
                    <Button type="primary" href={`/Projects/${project.id}`}>
                      Learn More!
                      </Button>
                  </Card>
                ) : null}
                <video
                  style={{
                    maxHeight: "25vw",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    overflow: "hidden",
                  }}
                  playsInline
                  autoPlay
                  loop
                  muted
                >
                  <source
                    src={
                      process.env.PUBLIC_URL +
                      `/images/projects/${project.video}.webm`
                    }
                    type="video/webm"
                  ></source>
                  <source
                    src={
                      process.env.PUBLIC_URL +
                      `/images/projects/${project.video}.mp4`
                    }
                    type="video/mp4"
                  ></source>
                </video>
                {isMobile ? (
                  <Card
                    bordered={false}
                    style={{
                      width: "60vw",
                      backgroundColor: " rgba(96, 125, 139,0.55)",
                      paddingBottom: "10%",
                    }}
                  >
                    <Title
                      ellipsis
                      level={3}
                      style={{ opacity: 1, color: "white" }}
                    >
                      {project.title.name}
                    </Title>
                    <p style={{ color: "white" }}>{project.slogan}</p>
                    <Button type="primary" href={`/Projects/${project.id}`}>
                      Learn More!
                      </Button>
                  </Card>
                ) : null}
              </>
            );
          }
        })}

        <Row type="flex" justify="center" align="middle">
          <Tooltip title="Under Construction">
            <Button type="dashed" block disabled onClick={moreProjects}>
              More Projects
              </Button>
          </Tooltip>
        </Row>
      </section>
    </>
  );

}

export default Projects;
