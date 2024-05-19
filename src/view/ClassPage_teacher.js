import React, { useEffect, useState } from "react"
import Navbar from "../component/Navbar"
import { Button, Layout, message, Col, Row, Tabs, Descriptions, List, Table, Typography, Space, Card, Collapse } from "antd"
import img from "../assets/logo.gif"
import { Link } from "react-router-dom"
const { Title, Paragraph, Text } = Typography
const { Panel } = Collapse

const { Header, Content, Footer, Sider } = Layout

const ClassTeacherPage = (props) => {

  const students = [
    {
      id: 1,
      name: "Lyican",
      process: "33/48"
    },
    {
      id: 2,
      name: "Lyican",
      process: "48/48"
    },
    {
      id: 3,
      name: "Lyican",
      process: "10/48"
    }
  ]

  const courseDetails = {
    section1: ['小节1-1', '小节1-2', '小节1-3'],
    section2: ['小节2-1', '小节2-2'],
    section3: ['小节3-1']
  }

  const courseReviews = [
    {
      title: '评价1',
      content: '这是第一个评价的内容。'
    },
    {
      title: '评价2',
      content: '这是第二个评价的内容。'
    }
  ]
  const { TabPane } = Tabs

  const columns = [
    {
      title: <p style={{ fontSize: "17px", fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>学生编号</p>,
      dataIndex: 'id',
      key: 'id',
      render: (text) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
    },
    {
      title: <p style={{ fontSize: "17px", fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>学生昵称</p>,
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <Link to={{
        pathname: "/study",
      }}>
        <Button type="link" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</Button>
      </Link>
    },
    {
      title: <p style={{ fontSize: "17px", fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>学习进度</p>,
      dataIndex: 'process',
      key: 'process',
      render: (text) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
    }
  ]
  return (<Layout style={{ minHeight: "100vh" }}>
    <Header className="header">
      <img src={img} className="img"></img>
      <div className="logo" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>CodeArena</div>
      <Navbar />
    </Header>
    <Row>
      <Col span={16} style={{ marginTop: "16px" }}>
        <Row gutter={16} style={{ marginBottom: '16px' }}>
          <Content style={{
            marginLeft: "36px",
            boxShadow: " 0 2px 8px rgba(0, 0, 0, 0.15)",
            border: " 1px solid rgba(0, 0, 0, 0.1)",
            padding: "16px",
            borderRadius: "8px"
          }}>
            <Title level={2}>高等数学</Title>
            <Paragraph>
              高等数学是大学理工科专业的核心基础课程，旨在培养学生的数学思维和解决实际问题的能力。
            </Paragraph>
            <Title level={3}>课程内容</Title>
            <Paragraph>
              课程内容包括但不限于：极限、导数、积分、级数、多元函数微分学、线性代数等。
            </Paragraph>
            <Title level={3}>课程大纲</Title>
            <List
              itemLayout="horizontal"
              dataSource={['极限与连续', '一元函数微分学', '一元函数积分学', '多元函数微分学', '多元函数积分学', '级数']}
              renderItem={(item, index) => (
                <List.Item>
                  <Text>{item}</Text>
                </List.Item>
              )}
            />
            <Title level={3}>开课时间</Title>
            <Paragraph>每周一、三、五，上午8:00 - 10:00</Paragraph>
            <Title level={3}>学时安排</Title>
            <Paragraph>每周3学时，共一学期，48学时</Paragraph>
          </Content>
        </Row>
        <Row gutter={16} style={{ marginBottom: '16px' }}>
          <Content style={{
            marginLeft: "36px",
            boxShadow: " 0 2px 8px rgba(0, 0, 0, 0.15)",
            border: " 1px solid rgba(0, 0, 0, 0.1)",
            padding: "16px",
            borderRadius: "8px"
          }}>
            <Tabs>
              <TabPane tab="课程详情" key="1">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Title level={3}>课程概述</Title>
                  <Paragraph>通过该课程的学习，不但使学生具备学习后续其他课程和专业课程所需要的基本数学知识，而且还使学生在数学的抽象性、逻辑性与严密性方面受到必要的训练和熏陶，使他们具有理解和运用逻辑关系、研究和领会抽象事物、认识和利用数形规律的初步能力。高等数学不仅关系到学生在整个大学期间甚至研究生期间的学习质量，而且还关系到学生的思维品质、思辨能力、创造潜能等科学和文化素养。“高等数学二慕课”将配合教师课堂教学，为学生提供可靠有效的预习与复习指导，为学生有效利用课余的碎片时间学习数学知识提供有效可行的途径。采用课前通过慕课熟悉基础知识，课上教师利用多种教学手段及教学设计引导学生思考知识本质，有效提升学生分析问题、解决问题的能力。本课程将通过很多生动实际的例题，讲述微积分的基本概念及在各领域中的应用。</Paragraph>
                  <Title level={3}>课程目标</Title>
                  <Paragraph>高等数学是高等学校理工科专业重要的基础理论课，是全校性的公共基础课，对于以信

                    息和电子学科为主的各理工科专业，高等数学在大学本科教育阶段显得尤为重要，有着举足

                    轻重的作用。该课程不但是学习复变函数、概率统计、大学物理等课程的必修课，而且为学

                    习专业课程和进一步扩大数学知识奠定必要的数学基础。

                    通过该课程的教学，一是为学生的后继课程教学提供必需的基础数学知识；二是传授数

                    学思想，培养学生的创新意识，逐步提高学生的数学素养、数学思维能力和应用数学知识解

                    决复杂问题的能力。

                  </Paragraph>
                  <Title level={3}>课程详情</Title>
                  <Collapse>
                    {Object.keys(courseDetails).map((section, index) => (
                      <Panel header={section} key={index}>
                        <List
                          itemLayout="horizontal"
                          dataSource={courseDetails[section]}
                          renderItem={(item) => (
                            <List.Item>
                              <Text>{item}</Text>
                            </List.Item>
                          )}
                        />
                      </Panel>
                    ))}
                  </Collapse>
                  <Title level={3}>预备知识</Title>
                  <Paragraph>无</Paragraph>
                </Space>
              </TabPane>
              <TabPane tab="课程评价" key="2">
                <Space direction="vertical" style={{ width: '100%', padding: '0 16px' }}>
                  {courseReviews.map((review, index) => (
                    <Card key={index} bordered={false} style={{ marginBottom: '16px' }}>
                      <Title level={4}>{review.title}</Title>
                      <Paragraph>{review.content}</Paragraph>
                    </Card>
                  ))}
                </Space>
              </TabPane>
            </Tabs>
          </Content>
        </Row>
      </Col>
      <Col span={7} style={{ marginTop: "16px" }}>
        <Row>
          <Content style={{
            marginLeft: "36px",
            boxShadow: " 0 2px 8px rgba(0, 0, 0, 0.15)",
            border: " 1px solid rgba(0, 0, 0, 0.1)",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "16px"
          }}>
            <Title level={4}>课程数据</Title>
            <Paragraph>总学习时长：100小时</Paragraph>
            <Paragraph>选课人数：10</Paragraph>
            <Paragraph>完课情况：3/10</Paragraph>
            <Paragraph>平均分：60</Paragraph>
            <Paragraph>课程教师：武忠祥，张宇</Paragraph>
            <Paragraph>优秀率：0%</Paragraph>
          </Content>
        </Row>
        <Row>
          <Content style={{
            marginLeft: "36px",
            boxShadow: " 0 2px 8px rgba(0, 0, 0, 0.15)",
            border: " 1px solid rgba(0, 0, 0, 0.1)",
            padding: "16px",
            borderRadius: "8px"
          }}>
            <Title level={4}>课程学生</Title>
            <Table columns={columns} dataSource={students} pagination={false} />
          </Content>
        </Row>
      </Col>
    </Row>
  </Layout >)
}

export default ClassTeacherPage
