import React, { useEffect, useState } from 'react';
import {
  Layout,
  Card,
  Typography,
  List,
  Tag,
  Descriptions,
  Collapse,
  Space,
  Divider,
  Statistic,
  Button,
  Avatar
} from 'antd';
import Navbar from "../component/Navbar";
import img from "../assets/logo.gif";
import { useSearchParams } from "react-router-dom";
import jsPDF from 'jspdf';
import { getStudentCourseDataById } from '../service/students';
import { Chart } from 'react-google-charts';

const { Text, Title } = Typography;
const { Meta } = Card;
const { Header, Content, Footer } = Layout;
const { Panel } = Collapse;

const reportData = {
  name: "John Doe",
  date: "2024-05-20",
  details: "This is the report detail content.",
};

const generatePDF = () => {
  const doc = new jsPDF();
  doc.text("Report Title", 10, 10);
  doc.text(`Name: ${reportData.name}`, 10, 20);
  doc.text(`Date: ${reportData.date}`, 10, 30);
  doc.text(`Details: ${reportData.details}`, 10, 40);
  doc.save("report.pdf");
};

const StudyPage = () => {
  const [params] = useSearchParams();
  const id = params.get("id");
  const [courseData, setCourseData] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    getStudentCourseDataById(id, (data) => {
      setCourseData(data.data);
      setAnalysis(JSON.parse(data.data.gradeAnalysis));
      setChapters(JSON.parse(data.data.chapters));
    });
  }, [id]);

  const learningIndicators = courseData ? (
    <List
      itemLayout="horizontal"
      dataSource={[
        { type: '成绩', value: courseData.score },
        { type: '作业提交', value: `${courseData.homeworkSubmitted}/${courseData.homeworkTotal}` },
        { type: '出勤次数', value: courseData.attendance },
      ]}
      renderItem={(item, index) => (
        <List.Item key={index}>
          <Meta
            title={<Text strong>{item.type}</Text>}
            description={item.value}
          />
        </List.Item>
      )}
    />
  ) : null;

  const chapterCompletion = courseData ? (
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
  ) : null;

  const gradeAnalysisStatistic = courseData ? (
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
  ) : null;

  const gradeDistributionData = [
    ['Category', 'Number of Students'],
    ['优秀', analysis ? analysis.excellent : 0],
    ['良好', analysis ? analysis.good : 0],
    ['中等', analysis ? analysis.average : 0],
    ['待提高', analysis ? analysis.poor : 0],
  ];

  const chartOptions = {
    title: '学生成绩分布',
    pieHole: 0.4,
  };

  return (
    courseData ? (
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="header">
          <img src={img} className="img" alt="logo" />
          <div className="logo" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>学不会平台</div>
          <Navbar />
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
                avatar={<Avatar>{courseData.student.name.charAt(0)}</Avatar>}
                extra={<Tag color="blue">优秀学生</Tag>}
              >
                <Typography.Paragraph strong>{courseData.feedback}</Typography.Paragraph>
                {learningIndicators}
                <Divider>学习统计</Divider>
                <Space direction="vertical">
                  <Statistic title="学习时长" value={courseData.studyDuration} />
                  {gradeAnalysisStatistic}
                  <Chart
                    chartType="PieChart"
                    data={gradeDistributionData}
                    options={chartOptions}
                    width={'100%'}
                    height={'400px'}
                  />
                </Space>
                <Divider>章节完成情况</Divider>
                {chapterCompletion}
              </Card>
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button type='primary' onClick={generatePDF}>
                下载报告
              </Button>
            </div>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©2023 CodeArena
        </Footer>
      </Layout>
    ) : null
  );
};

export default StudyPage;
