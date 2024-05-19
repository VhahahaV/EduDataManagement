import React from 'react'
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
  Tooltip,
  Button,
} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import Navbar from "../component/Navbar"
import { Link } from "react-router-dom"
import img from "../assets/logo.gif"

const { Text, Title } = Typography
const { Meta } = Card
const { Header, Content, Footer, Sider } = Layout
const { Panel } = Collapse

const studentCourseData = {
  name: 'Lyican',
  course: '高等数学',
  score: 85,
  homeworkSubmitted: 10,
  homeworkTotal: 12,
  attendance: 15,
  feedback: '这门课程非常有趣，我学到了很多。',
  // 模拟章节完成情况数据
  chapters: [
    { title: '第一章', completed: true },
    { title: '第二章', completed: true },
    { title: '第三章', completed: false },
    // 更多章节...
  ],
  // 模拟学习时长统计数据
  studyDuration: '总学习时长：20小时',
  // 成绩分析数据
  gradeAnalysis: {
    excellent: 10,
    good: 15,
    average: 5,
    poor: 0,
  },
}

const learningIndicators = (
  <List
    itemLayout="horizontal"
    dataSource={[
      { type: '成绩', value: studentCourseData.score },
      { type: '作业提交', value: `${studentCourseData.homeworkSubmitted}/${studentCourseData.homeworkTotal}` },
      { type: '出勤次数', value: studentCourseData.attendance },
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
)

const StudyPage = (props) => {
  const chapterCompletion = (
    <Collapse defaultActiveKey={['1', '2']}>
      {studentCourseData.chapters.map((chapter, index) => (
        <Panel
          header={chapter.title}
          key={index.toString()}
          extra={chapter.completed ? <Tag color="green">已完成</Tag> : <Tag color="red">未完成</Tag>}
        >
          <Text type="secondary">请完成本章节的所有练习和阅读材料。</Text>
        </Panel>
      ))}
    </Collapse>
  )

  const gradeAnalysisStatistic = (
    <Descriptions
      title="成绩分析"
      bordered
      column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
    >
      <Descriptions.Item label="优秀">{studentCourseData.gradeAnalysis.excellent}</Descriptions.Item>
      <Descriptions.Item label="良好">{studentCourseData.gradeAnalysis.good}</Descriptions.Item>
      <Descriptions.Item label="中等">{studentCourseData.gradeAnalysis.average}</Descriptions.Item>
      <Descriptions.Item label="待提高">{studentCourseData.gradeAnalysis.poor}</Descriptions.Item>
    </Descriptions>
  )

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <img src={img} className="img" />
        <div className="logo" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>CodeArena</div>
        <Navbar />
      </Header>
      <Content>
        <Layout style={{ padding: '24px 96px' }}>
          <div style={{ padding: '16px' }}>
            <Card
              title={
                <div>
                  <Title level={3}>{studentCourseData.name}</Title>
                  <Text type="secondary">{studentCourseData.course}</Text>
                </div>
              }
              avatar={<Avatar>L</Avatar>}
              extra={<Tag color="blue">优秀学生</Tag>}
            >
              <Typography.Paragraph strong>{studentCourseData.feedback}</Typography.Paragraph>
              {learningIndicators}
              <Divider>学习统计</Divider>
              <Space direction="vertical">
                <Statistic title="学习时长" value={studentCourseData.studyDuration} />
                {gradeAnalysisStatistic}
              </Space>
              <Divider>章节完成情况</Divider>
              {chapterCompletion}
            </Card>
          </div>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        ©2023 CodeArena
      </Footer>
    </Layout>
  )
}

export default StudyPage
