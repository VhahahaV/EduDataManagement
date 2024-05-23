import React, { useEffect, useState } from "react"
import Navbar from "../component/Navbar"
import { Button, Layout, message, Col, Row, Tabs, Descriptions, List, Table, Typography, Space, Card, Collapse, Statistic } from "antd"
import img from "../assets/logo.gif"
import { Link, useSearchParams } from "react-router-dom"
import { getClassById, getClassStudentById } from "../service/students"
const { Title, Paragraph, Text } = Typography
const { Panel } = Collapse
const { Header, Content, Footer, Sider } = Layout
const { TabPane } = Tabs

const ClassTeacherPage = (props) => {
  const [params] = useSearchParams()
  const id = params.get("id")
  const [detail, setDetail] = useState(null)
  const [students, setStudents] = useState([])
  useEffect(() => {
    getClassById(id, (data) => {
      console.log(data.data)
      setDetail(data.data)
    })
  }, [])

  useEffect(() => {
    getClassStudentById(id, (data) => {
      console.log(data.data)
      let temp = []
      for (let i = 0; i < data.data.length; i++) {
        let student = {
          id: data.data[i].id,
          studentId: data.data[i].student.id,
          name: data.data[i].student.name,
          process: data.data[i].process
        }
        temp.push(student)
      }
      setStudents(temp)
    })
  }, [])

  const { TabPane } = Tabs

  const columns = [
    {
      title: <p style={{ fontSize: "17px", fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>学生编号</p>,
      dataIndex: 'studentId',
      key: 'studentId',
      render: (text) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
    },
    {
      title: <p style={{ fontSize: "17px", fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>学生昵称</p>,
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <Link to={{
        pathname: "/study",
        search: "?id=" + record.id
      }}>
        <Button type="link" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</Button>
      </Link>
    },
    {
      title: <p style={{ fontSize: "17px", fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>学习进度</p>,
      dataIndex: 'process',
      key: 'process',
      render: (text, record) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
    }
  ]

  const calculateAverageScore = (students) => {
    let totalScore = 0
    students.forEach(student => {
      totalScore += student.score
    })
    return (totalScore / students.length).toFixed(2)
  }

  const calculatePassRate = (students) => {
    let excellent = 0
    students.forEach(student => {
      if (student.score >= 60) {
        excellent++
      }
    })
    return (excellent / students.length * 100).toFixed(2)
  }

  const calculateExcellentRate = (students) => {
    let excellent = 0
    students.forEach(student => {
      if (student.score >= 85) {
        excellent++
      }
    })
    return (excellent / students.length * 100).toFixed(2)
  }

  const showTeachers = (teachers) => {
    const teacherNames = teachers.map(teacher => teacher.name)
    return <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>
      {teacherNames.join(",")}
    </span>
  }

  return (
    detail && students ?
      <Layout style={{ minHeight: "100vh" }}>
        <Header className="header">
          <img src={img} className="img"></img>
          <div className="logo" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>学不会平台</div>
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
                <Title level={2}>{detail.className}</Title>
                <Paragraph>
                  {detail.classCourseDetail.classDescription}
                </Paragraph>
                <Title level={3}>课程内容</Title>
                <Paragraph>
                  {detail.classCourseDetail.classIntro}
                </Paragraph>
                <Title level={3}>课程大纲</Title>
                <List
                  itemLayout="horizontal"
                  dataSource={JSON.parse(detail.classCourseDetail.classFrame)}
                  renderItem={(item, index) => (
                    <List.Item>
                      <Text>{item}</Text>
                    </List.Item>
                  )}
                />
                <Title level={3}>开课时间</Title>
                <Paragraph>{detail.classCourseDetail.classTime}</Paragraph>
                <Title level={3}>学时安排</Title>
                <Paragraph>{detail.classCourseDetail.classTimeDetail}</Paragraph>
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
                      <Paragraph>{detail.classCourseDetail.classDescription}</Paragraph>
                      <Title level={3}>课程目标</Title>
                      <Paragraph>{detail.classCourseDetail.classAim}</Paragraph>
                      <Title level={3}>课程详情</Title>
                      <Collapse>
                        {Object.keys(JSON.parse(detail.classCourseDetail.sections)).map((section, index) => (
                          <Panel header={section} key={index}>
                            <List
                              itemLayout="horizontal"
                              dataSource={JSON.parse(detail.classCourseDetail.sections)[section]}
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
                      <Paragraph>{detail.classCourseDetail.preKnowledge}</Paragraph>
                    </Space>
                  </TabPane>
                  <TabPane tab="课程评价" key="2">
                    <Space direction="vertical" style={{ width: '100%', padding: '0 16px' }}>
                      {detail.classCourseDetail.courseReviews.map((review, index) => (
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
                <Paragraph>选课人数：{students.length}</Paragraph>
                <Paragraph>完课情况：{students.filter(student => student.process == "100%").reduce((total, student) => total + 1, 0)}/{students.length}</Paragraph>
                <Paragraph>课程教师：{showTeachers(detail.teachers)}</Paragraph>
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
      </Layout>
      :
      null
  )
}

export default ClassTeacherPage
