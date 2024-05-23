import React, { useEffect, useRef, useState } from 'react'
import {
  Layout,
  Card,
  Typography,
  List,
  Avatar,
  Tag,
  Descriptions,
  Collapse,
  Space,
  Divider,
  Statistic,
  Button,
} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import Navbar_student from "../component/Navbar_student"
import { Link } from "react-router-dom"
import img from "../assets/logo.gif"
import * as echarts from 'echarts'
import jsPDF from 'jspdf'
import { getStudentsCourseData, getStudentCourseDataById } from '../service/students'
import { useSearchParams } from "react-router-dom"

const { Text, Title } = Typography
const { Meta } = Card
const { Header, Content, Footer, Sider } = Layout
const { Panel } = Collapse


const reportData = {
  name: "John Doe",
  date: "2024-05-20",
  details: "This is the report detail content.",
}


const generatePDF = () => {
  const doc = new jsPDF()

  // 假设reportData是一个包含报告内容的对象
  // 你可以根据需要调整内容和样式
  doc.text("Report Title", 10, 10)
  doc.text(`Name: ${reportData.name}`, 10, 20)
  doc.text(`Date: ${reportData.date}`, 10, 30)
  doc.text(`Details: ${reportData.details}`, 10, 40)

  doc.save("report.pdf")
}

const StudyStudentPage = (props) => {

  const [params] = useSearchParams()
  const id = params.get("id")

  const [courseData, setcourseData] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [chapters, setChapters] = useState([])

  useEffect(() => {
    getStudentCourseDataById(id, (data) => {
      setcourseData(data.data)
      console.log(courseData)
      setAnalysis(JSON.parse(data.data.gradeAnalysis))
      setChapters(JSON.parse(data.data.chapters))
    })
  })
  const learningIndicators = (
    courseData ?
      <List
        itemLayout="horizontal"
        dataSource={[
          { type: '成绩', value: courseData.score },
          { type: '作业提交', value: `${courseData.homeworkSubmitted}/${courseData.homeworkTotal}` },
          { type: '出勤次数', value: courseData.attendance },
        ]}
        renderItem={(item, index) => (
          <List.Item>
            <Meta
              title={<Text strong>{item.type}</Text>}
              description={item.value}
            />
          </List.Item>
        )}
      />
      :
      null
  )

  const chapterCompletion = (
    courseData ?
      <Collapse defaultActiveKey={['1', '2']}>
        {chapters.map((chapter, index) => (
          <Panel
            header={chapter.title}
            key={index.toString()}
            extra={chapter.completed ? <Tag color="green">已完成</Tag> : <Tag color="red">未完成</Tag>}
          >
            <Text type="secondary">请完成本章节的所有练习和阅读材料。</Text>
          </Panel>
        ))}
      </Collapse>
      :
      null
  )

  const gradeAnalysisStatistic = (
    courseData ?
      <Descriptions
        title="成绩分析"
        bordered
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
      >
        <Descriptions.Item label="优秀">{analysis.excellent}</Descriptions.Item>
        <Descriptions.Item label="良好">{analysis.good}</Descriptions.Item>
        <Descriptions.Item label="中等">{analysis.average}</Descriptions.Item>
        <Descriptions.Item label="待提高">{analysis.poor}</Descriptions.Item>
      </Descriptions>
      :
      null
  )

  return (
    courseData
      ?
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="header">
          <img src={img} className="img" />
          <div className="logo" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>学不会平台</div>
          <Navbar_student />
        </Header>
        <Content>
          <Layout style={{ padding: '24px 96px' }}>
            <div style={{ padding: '16px' }}>
              <Card
                title={
                  <div>
                    <Title level={3}>{courseData.student.name}</Title>
                    <Text type="secondary">{courseData.course.className}</Text>
                  </div>
                }
                avatar={<Avatar>L</Avatar>}
                extra={<Tag color="blue">优秀学生</Tag>}
              >
                <Typography.Paragraph strong>{courseData.feedback}</Typography.Paragraph>
                {learningIndicators}
                <Divider>学习统计</Divider>
                <Space direction="vertical">
                  <Statistic title="学习时长" value={courseData.studyDuration} />
                  {gradeAnalysisStatistic}
                </Space>
                <Divider>章节完成情况</Divider>
                {chapterCompletion}
              </Card>
            </div>

            {/* <div>
            <Button type='primary' onClick={generatePDF}>
              下载报告
            </Button>
          </div> */}
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©2023 CodeArena
        </Footer>
      </Layout>
      :
      null
  )
}

export default StudyStudentPage
