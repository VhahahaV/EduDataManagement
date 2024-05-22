import React, { useEffect, useRef } from 'react'
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
import Navbar from "../component/Navbar"
import { Link } from "react-router-dom"
import img from "../assets/logo.gif"
import * as echarts from 'echarts'
import jsPDF from 'jspdf'

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

const StudyPage = (props) => {

  const scoreTrendChartRef = useRef(null)
  const chapterCompletionChartRef = useRef(null)
  const homeworkCompletionChartRef = useRef(null)
  const gradeAnalysisChartRef = useRef(null)

  // 使用 useEffect 钩子来处理副作用
  useEffect(() => {
    // 初始化成绩趋势图
    if (scoreTrendChartRef.current) {
      const scoreTrendChart = echarts.init(scoreTrendChartRef.current)
      scoreTrendChart.setOption({
        title: { text: '成绩趋势' },
        tooltip: {},
        xAxis: {
          data: ['时间1', '时间2', '时间3'], // 替换为具体的时间点
        },
        yAxis: {},
        series: [
          {
            name: '成绩',
            type: 'line',
            data: [studentCourseData.score, 90, 85], // 替换为具体的成绩数据
          },
        ],
      })
    }

    // 初始化章节完成率饼图
    if (chapterCompletionChartRef.current) {
      const chapterCompletionChart = echarts.init(chapterCompletionChartRef.current)
      chapterCompletionChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [
              {
                value: studentCourseData.chapters.filter(chapter => chapter.completed).length,
                name: '已完成',
              },
              {
                value: studentCourseData.chapters.filter(chapter => !chapter.completed).length,
                name: '未完成',
              },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      })
    }

    // 初始化作业完成情况图表
    if (homeworkCompletionChartRef.current) {
      const homeworkCompletionChart = echarts.init(homeworkCompletionChartRef.current)
      homeworkCompletionChart.setOption({
        title: { text: '' },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: ['作业1', '作业2', '作业3', '作业4', '作业5', '作业6'] // 假设有6个作业
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [80, 90, 70, 85, 95, 75], // 假设的作业完成百分比
            type: 'bar'
          }
        ]
      })
    }

    // 初始化成绩分析图表
    if (gradeAnalysisChartRef.current) {
      const gradeAnalysisChart = echarts.init(gradeAnalysisChartRef.current)
      gradeAnalysisChart.setOption({
        title: { text: '' },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '成绩分布',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 10, name: '优秀' },
              { value: 15, name: '良好' },
              { value: 5, name: '中等' },
              { value: 0, name: '待提高' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }

  }, []) // 空依赖数组意味着这个 effect 只会在组件挂载后运行一次


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

            <div style={{ padding: '16px' }}>
              <Card
                title="成绩趋势图"
                style={{ width: '100%', marginBottom: 24 }}
              >
                {/* 使用 ref 引用 DOM 元素 */}
                <div id="score-trend-chart" ref={scoreTrendChartRef} style={{ width: '100%', height: 300 }} />
              </Card>
              <Card
                title="章节完成率"
                style={{ width: '100%', marginBottom: 24 }}
              >
                <div id="chapter-completion-chart" ref={chapterCompletionChartRef} style={{ width: '100%', height: 300 }} />
              </Card>
            </div>

            <div style={{ padding: '16px' }}>
              <Card
                title="作业完成情况"
                style={{ width: '100%', marginBottom: 24 }}
              >
                {/* 使用 ref 引用 DOM 元素 */}
                <div id="homework-completion-chart" ref={homeworkCompletionChartRef} style={{ width: '100%', height: 300 }} />
              </Card>
              <Card
                title="成绩分析"
                style={{ width: '100%', marginBottom: 24 }}
              >
                <div id="grade-analysis-chart" ref={gradeAnalysisChartRef} style={{ width: '100%', height: 300 }} />
              </Card>
            </div>
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
  )
}

export default StudyPage
