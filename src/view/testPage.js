import React, { useState } from "react"
import Navbar from "../component/Navbar"
import { Button, Col, Row, Form, Layout, Table, Upload, Card } from "antd"
import "../App.css"
import { Link } from "react-router-dom"
import img from "../assets/logo.gif"
import { useEffect } from "react"
import { getAnnouncement, getAnnouncementById } from "../service/announcement"

const { Header, Content, Footer } = Layout


const TestPage = (props) => {
  const [announcements, setAnnouncements] = useState([])
  const columns = [
    {
      title: <p style={{ fontSize: "17px", fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>公告标题</p>,
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <Link to={{
        pathname: "/announcement",
        search: "?id=" + record.id
      }}>
        <Button type="link" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</Button>
      </Link>
    },
    {
      title: <p style={{ fontSize: "17px", fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>公告时间</p>,
      dataIndex: 'time',
      key: 'time',
      render: (text) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
    },
    {
      title: <p style={{ fontSize: "17px", fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>公告作者</p>,
      dataIndex: 'username',
      key: 'username',
      render: (text) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
    }
  ]

  const columns1 = [
    {
      title: <p style={{ fontSize: "17px", fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>课程名称</p>,
      dataIndex: 'className',
      key: 'className',
      render: (text, record) => <Link to={{
        pathname: "/rank",
      }}>
        <Button type="link" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</Button>
      </Link>
    },
    {
      title: <p style={{ fontSize: "17px", fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>课程时间</p>,
      dataIndex: 'classTime',
      key: 'classTime',
      render: (text) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
    },
    {
      title: <p style={{ fontSize: "17px", fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>授课教师</p>,
      dataIndex: 'classTeacher',
      key: 'classTeacher',
      render: (text) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
    }
  ]

  const columns2 = [
    {
      title: <p style={{ fontSize: "17px", fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>课程名称</p>,
      dataIndex: 'class',
      key: 'class',
      render: (text) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
    },
    {
      title: <p style={{ fontSize: "17px", fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>课程进度</p>,
      dataIndex: 'process',
      key: 'process',
      render: (text) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text + "%"}</span>
    },
    {
      title: <p style={{ fontSize: "17px", fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>操作</p>,
      key: 'Operation',
      render: (_, record) => <Link to={{
        pathname: "/judgeResultStatistic",
      }}>
        <Button type="link" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>查看</Button>
      </Link>
    },
  ]

  const classes = [
    {
      id: 1,
      className: "高等数学",
      classTime: "2024.5.1-2025.5.1",
      classTeacher: "武忠祥"
    },
    {
      id: 2,
      className: "线性代数",
      classTime: "2024.5.1-2025.5.1",
      classTeacher: "武忠祥"
    },
    {
      id: 3,
      className: "概率论与梳理统计",
      classTime: "2024.5.1-2025.5.1",
      classTeacher: "武忠祥"
    },
    {
      id: 4,
      className: "软件工程原理与实践",
      classTime: "2024.5.1-2025.5.1",
      classTeacher: "沈备军"
    }
  ]

  const students = [
    {
      id: 1,
      Name: "Lyican",
      class: "高等数学",
      process: 100
    },
    {
      id: 2,
      Name: "Lyican",
      class: "线性代数",
      process: 0
    },
    {
      id: 3,
      Name: "Lyican",
      class: "概率论与数理统计",
      process: 0
    },
    {
      id: 4,
      Name: "Sske",
      class: "高等数学",
      process: 70
    },
  ]

  useEffect(() => {
    getAnnouncement((result) => {
      //console.log(result)
      if (result.code === 1) {
        setAnnouncements(result.data)
        //console.log(result.data)
      } else {
        console.log(result.msg)
      }
    })
  }, [])


  return (<Layout style={{ minHeight: "100vh" }}>
    <Header className="header">
      <img src={img} className="img"></img>
      <div className="logo" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>学不会平台</div>
      <Navbar />
    </Header>

    <Content>
      <Col>
        <Row>
          <Content style={{ margin: "64px 64px", backgroundColor: "#fff", padding: "32px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)", borderRadius: "8px" }}>
            <h1 style={{ fontSize: "25px", fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>平台公告栏</h1>
            <Table dataSource={announcements} columns={columns} />
          </Content>
        </Row>
        <Row>
          <Col span={12}>
            <Content style={{
              marginLeft: "64px",
              boxShadow: " 0 2px 8px rgba(0, 0, 0, 0.15)",
              border: " 1px solid rgba(0, 0, 0, 0.1)",
              padding: "16px",
              borderRadius: "8px"
            }}>
              <h1 style={{ fontSize: "25px", fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>我学习的课程</h1>
              <Table dataSource={classes} columns={columns1} />
            </Content>
          </Col>
          <Col span={12}>
            <Content style={{
              marginLeft: "16px",
              marginRight: "64px",
              boxShadow: " 0 2px 8px rgba(0, 0, 0, 0.15)",
              border: " 1px solid rgba(0, 0, 0, 0.1)",
              padding: "16px",
              borderRadius: "8px"
            }}>
              <h1 style={{ fontSize: "25px", fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>我的学习情况</h1>
              <Table dataSource={students} columns={columns2} />
            </Content>
          </Col>
        </Row>
      </Col>
    </Content>
    <Footer>
    </Footer>
  </Layout>)
}


export default TestPage
