import React, { useEffect, useState } from "react"
import Navbar from "../component/Navbar"
import { Button, Layout, message, Col, Row, Tabs, Progress, Descriptions, List, Table, Typography, Space, Card, Collapse, Statistic } from "antd"
import img from "../assets/logo.gif"
import { Chart } from 'react-google-charts'
import { Link, useSearchParams } from "react-router-dom"
import { getClassById, getClassStudentById } from "../service/students"
import OpenAI from "openai"

const { Title, Paragraph, Text } = Typography
const { Panel } = Collapse
const { Header, Content, Footer, Sider } = Layout
const { TabPane } = Tabs

const openai = new OpenAI({
  dangerouslyAllowBrowser: true,
  apiKey: "sk-jTX5O4SX9fkX67tR0bA58cB248Ea4fFaBc282cE2AaA98448", // Use environment variable for API key
  baseURL: "https://free.gpt.ge/v1",
})

const ClassTeacherPage = (props) => {
  const [params] = useSearchParams()
  const id = params.get("id")
  const [detail, setDetail] = useState(null)
  const [students, setStudents] = useState([])
  const [learningSuggestions, setLearningSuggestions] = useState("")

  useEffect(() => {
    if (students.length > 0) {
      fetchLearningSuggestions(students)
    }
  }, [students])

  useEffect(() => {
    getClassById(id, (data) => {
      console.log("detail info ", data.data)
      setDetail(data.data)
    })
  }, [])

  useEffect(() => {
    getClassStudentById(id, (data) => {
      console.log("data.data : ", data.data)
      const temp = data.data.map(studentData => ({
        id: studentData.id,
        studentId: studentData.student.id,
        name: studentData.student.name,
        process: studentData.process,
        chapters: JSON.parse(studentData.chapters),
        gradeAnalysis: JSON.parse(studentData.gradeAnalysis),
        finishClassNum: studentData.finishClassNum,
        homeworkTotal: studentData.homeworkTotal,
        homeworkSubmitted: studentData.homeworkSubmitted,
        feedback: studentData.feedback,
        score: studentData.score,
        studyDuration: studentData.studyDuration,
        attendance: studentData.attendance
      }))
      setStudents(temp)
      console.log("students info : ", temp)
    })
  }, [id])
  const fetchLearningSuggestions = async (studentData) => {
    const formattedData = studentData.map(student => ({
      name: student.name,
      score: student.score,
      homeworkSubmitted: student.homeworkSubmitted,
      homeworkTotal: student.homeworkTotal,
      attendance: student.attendance,
      feedback: student.feedback,
      studyDuration: student.studyDuration,
    }))

    try {
      const response = await openai.chat.completions.create({
        messages: [{ role: "user", content: `请用中文为一下所有学生的学习情况进行分析，并且给老师提出教学建议: ${JSON.stringify(formattedData)}` }],
        model: 'gpt-3.5-turbo',
      })

      setLearningSuggestions(response.choices[0].message.content)
    } catch (error) {
      console.error('Error fetching learning suggestions:', error)
      setLearningSuggestions("无法获取学习建议，请稍后再试。")
    }
  }

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
      // render: (text, record) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
      render: process => <Progress percent={parseFloat(process)} />
    }
  ]
  const chartData = students.map(student => [
    student.name,
    parseFloat(student.studyDuration.replace(' hours', '')),
    student.score,
    student.homeworkSubmitted,
    student.homeworkTotal
  ])
  const options = {
    title: "学生表现分析",
    hAxis: { title: '学习时间 (hours)', viewWindow: { min: 0, max: 100 } },
    vAxis: { title: '分数', viewWindow: { min: 0, max: 100 } },
    bubble: { textStyle: { fontSize: 11 } },
    width: '100%'
  }


  const showTeachers = (teachers) => {
    const teacherNames = teachers.map(teacher => teacher.name)
    return <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>
      {teacherNames.join(",")}
    </span>
  }

  const calculateAverageScore = () => {
    if (students.length === 0) {
      message.warning('没有学生数据，无法计算平均分。')
      return
    }

    const totalScore = students.reduce((sum, student) => {
      return sum + student.score
    }, 0)

    const averageScore = totalScore / students.length
    message.success(`学生平均分是：${averageScore.toFixed(2)}`)
  }

  const calculateAverageProgress = () => {
    if (students.length === 0) {
      message.warning('没有学生数据，无法计算平均进度。')
      return
    }

    const totalProgress = students.reduce((sum, student) => {
      return sum + parseFloat(student.process) // 确保process是数字类型
    }, 0)

    const averageProgress = totalProgress / students.length
    message.success(`学生平均进度是：${averageProgress.toFixed(2)}%`)
  }

  const calculateTotalHomeworkSubmissionRate = () => {
    if (students.length === 0) {
      message.warning('没有学生数据，无法计算作业提交率。')
      return
    }

    let totalSubmitted = 0
    let totalAssigned = 0

    students.forEach(student => {
      totalSubmitted += student.homeworkSubmitted
      totalAssigned += student.homeworkTotal
    })

    if (totalAssigned === 0) {
      message.warning('作业布置总数为0，无法计算作业提交率。')
      return
    }

    const submissionRate = (totalSubmitted / totalAssigned) * 100
    message.success(`总的作业提交率是：${submissionRate.toFixed(2)}%`)
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
                  <TabPane tab="总体学情分析" key="2">
                    <Chart
                      chartType="BubbleChart"
                      width="100%"
                      height="400px"
                      data={[["姓名", "分数", "学习时长 (hours)", "作业提交", "作业总数"], ...chartData]}
                      options={{ options }}
                    />
                    <List
                      itemLayout="vertical"
                      dataSource={students}
                      renderItem={student => (
                        <List.Item>
                          <List.Item.Meta
                            title={<span>{student.name}</span>}
                            description={<span>Score: {student.score}</span>}
                          />
                          <Paragraph>学生反馈: {student.feedback}</Paragraph>
                          <Paragraph>出勤次数: {student.attendance}</Paragraph>
                          <Paragraph>作业提交: {student.homeworkSubmitted}/{student.homeworkTotal}</Paragraph>
                        </List.Item>
                      )}
                    />
                  </TabPane>
                  <TabPane tab="课程评价" key="3">
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
                <Paragraph>总学习时长：{
                  students.reduce((total, student) => {
                    //studyDuration格式为"X hours"，需要提取数字部分并转换为数值
                    const durationInHours = parseFloat(student.studyDuration.replace(' hours', ''))
                    return total + durationInHours
                  }, 0)
                }小时</Paragraph>
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
            <Row>
              <Content style={{
                marginLeft: "36px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                padding: "16px",
                borderRadius: "8px",
                marginBottom: "16px"
              }}>
                <Title level={4}>gpt学情分析</Title>
                <Paragraph style={{ marginTop: '20px', padding: '30px', background: '#f0f', borderRadius: '10px' }}>{learningSuggestions}</Paragraph>
              </Content>

              <Content style={{
                marginLeft: "36px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                padding: "16px",
                borderRadius: "8px",
                marginBottom: "16px"
              }}>
                <Title level={4}>课程指标分析</Title>
                <Button type="primary" ghost='true' style={{ marginLeft: '10px' }} onClick={calculateAverageScore}>计算平均分</Button>
                <Button type="primary" ghost='true' style={{ marginLeft: '10px' }} onClick={calculateAverageProgress}>计算平均进度</Button>
                <Button type="primary" ghost='true' style={{ marginLeft: '10px' }} onClick={calculateTotalHomeworkSubmissionRate}>计算总的作业提交率</Button>
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
