import { Table, Button, Layout, Typography } from "antd";
import React, { useEffect, useState } from "react";
import Navbar_student from "../component/Navbar_student";
import { Link, useSearchParams } from "react-router-dom";
import img from "../assets/logo.gif";
import { getStudentCourseDataByStudentId } from "../service/students";
import { Chart } from 'react-google-charts';
import OpenAI from "openai";
const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const openai = new OpenAI({
  dangerouslyAllowBrowser: true,
  apiKey: "sk-jTX5O4SX9fkX67tR0bA58cB248Ea4fFaBc282cE2AaA98448", // Use environment variable for API key
  baseURL: "https://free.gpt.ge/v1",
});

const MyStudyPage = () => {
  const [studies, setStudies] = useState([]);
  const [learningSuggestions, setLearningSuggestions] = useState("");
  const [params] = useSearchParams();
  const studentId = params.get("studentId");

  useEffect(() => {
    getStudentCourseDataByStudentId(studentId, (data) => {
      console.log(data.data);
      setStudies(data.data);
      fetchLearningSuggestions(data.data);
    });
  }, [studentId]);

  const fetchLearningSuggestions = async (data) => {
    const courseData = data.map(course => ({
      className: course.course.className,
      score: course.score,
      homeworkSubmitted: course.homeworkSubmitted,
      homeworkTotal: course.homeworkTotal,
      attendance: course.attendance,
      feedback: course.feedback,
    }));

    try {
      const response = await openai.chat.completions.create({
        messages: [{ role: "user", content: `请用中文为以下学习情况做出总结并且提出建议: ${JSON.stringify(courseData)}` }],
        model: 'gpt-3.5-turbo',
      });

      console.log("response log: ", response);
      setLearningSuggestions(response.choices[0].message.content);
    } catch (error) {
      console.error('Error fetching learning suggestions:', error);
      setLearningSuggestions("无法获取学习建议，请稍后再试。");
    }
  };

  const columns = [
    {
      title: <p style={{ fontFamily: "Arial, sans-serif" }}>学生课程</p>,
      dataIndex: "class",
      key: "class",
      render: (_, record) => <span style={{ fontFamily: "Arial, sans-serif" }}>{record.course.className}</span>
    },
    {
      title: <p style={{ fontFamily: "Arial, sans-serif" }}>学习时长</p>,
      dataIndex: "time",
      key: "time",
      render: (_, record) => <span style={{ fontFamily: "Arial, sans-serif" }}>{record.studyDuration}</span>
    },
    {
      title: <p style={{ fontFamily: "Arial, sans-serif" }}>学习进度</p>,
      dataIndex: "process",
      key: "process",
      render: (_, record) => <span style={{ fontFamily: "Arial, sans-serif" }}>{record.process}</span>
    },
    {
      title: <p style={{ fontFamily: "Arial, sans-serif" }}>学习情况</p>,
      key: "operation",
      render: (_, record) => <Link to={{
        pathname: "/studyStudent",
        search: "?id=" + record.id + "&studentId=" + studentId
      }}>
        <Button type="link" style={{ fontFamily: "Arial, sans-serif" }}>查看</Button>
      </Link>
    }
  ];

  const scoreDistributionData = [
    ['Course', 'Score'],
    ...studies.map(study => [study.course.className, study.score])
  ];

  const progressData = [
    ['Course', 'Progress'],
    ...studies.map(study => [study.course.className, parseFloat(study.process)])
  ];

  const homeworkData = [
    ['Course', 'Homework Submitted', 'Homework Total'],
    ...studies.map(study => [study.course.className, study.homeworkSubmitted, study.homeworkTotal])
  ];

  const attendanceData = [
    ['Course', 'Attendance'],
    ...studies.map(study => [study.course.className, study.attendance])
  ];

  const scoreOptions = {
    title: '学生各科成绩分布',
    pieHole: 0.4,
  };

  const progressOptions = {
    title: '学生各科学习进度',
    hAxis: { title: '课程' },
    vAxis: { title: '进度 (%)' },
  };

  const homeworkOptions = {
    title: '作业提交情况',
    hAxis: { title: '课程' },
    vAxis: { title: '作业数量' },
  };

  const attendanceOptions = {
    title: '出勤次数',
    hAxis: { title: '课程' },
    vAxis: { title: '出勤次数' },
  };

  return (
    studies.length > 0 ?
      <Layout style={{ minHeight: "100vh" }}>
        <Header className="header">
          <img src={img} className="img" alt="logo" />
          <div className="logo" style={{ fontFamily: "Arial, sans-serif" }}>学不会平台</div>
          <Navbar_student />
        </Header>
        <Content>
          <Layout style={{ padding: '24px 96px' }}>
            <Table columns={columns} dataSource={studies} />
            <div style={{ marginTop: '20px' }}>
              <Chart
                chartType="PieChart"
                data={scoreDistributionData}
                options={scoreOptions}
                width={'100%'}
                height={'400px'}
              />
            </div>
            <div style={{ marginTop: '20px' }}>
              <Chart
                chartType="BarChart"
                data={progressData}
                options={progressOptions}
                width={'100%'}
                height={'400px'}
              />
            </div>
            <div style={{ marginTop: '20px' }}>
              <Chart
                chartType="BarChart"
                data={homeworkData}
                options={homeworkOptions}
                width={'100%'}
                height={'400px'}
              />
            </div>
            <div style={{ marginTop: '20px' }}>
              <Chart
                chartType="BarChart"
                data={attendanceData}
                options={attendanceOptions}
                width={'100%'}
                height={'400px'}
              />
            </div>
            <div style={{ marginTop: '20px', padding: '30px', background: '#f0f', borderRadius: '10px' }}>
              <Title level={3}>gpt学习建议</Title>
              <Typography.Paragraph>
                {learningSuggestions}
              </Typography.Paragraph>
            </div>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©2023 CodeArena
        </Footer>
      </Layout>
      : null
  );
};

export default MyStudyPage;
