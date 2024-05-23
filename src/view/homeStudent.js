import React, { useState } from "react"
import Navbar from "../component/Navbar"
import { Button, Col, Row, Form, Layout, Table, Upload, Card } from "antd"
import "../App.css"
import { Link, useSearchParams } from "react-router-dom"
import img from "../assets/logo.gif"
import { useEffect } from "react"
import { getAnnouncements, getAnnouncementById } from "../service/students"
import Navbar_student from "../component/Navbar_student"
import { getStudentCourseDataByStudentId } from "../service/students"

const { Header, Content, Footer } = Layout


const HomeStudentPage = (props) => {
  const [params] = useSearchParams()
  const studentId = params.get("studentId")
  const [classes, setClasses] = useState([])
  const [announcements, setAnnouncements] = useState([])

  useEffect(() => {
    getStudentCourseDataByStudentId(studentId, (data) => {
      console.log(data.data)
      setClasses(data.data)
    })
  }, [])
  const columns = [
    {
      title: <p style={{ fontSize: "17px", fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>公告标题</p>,
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <Link to={{
        pathname: "/announcementStudent",
        search: "?id=" + record.id + "&studentId=" + studentId
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
      dataIndex: 'course',
      key: 'course',
      render: (_, record) => <Link to={{
        pathname: "/classStudent",
        search: "?id=" + record.course.id + "&studentId=" + studentId + "&dataId=" + record.id
      }}>
        <Button type="link" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{record.course.className}</Button>
      </Link>
    },
    {
      title: <p style={{ fontSize: "17px", fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>课程时间</p>,
      dataIndex: 'classTime',
      key: 'classTime',
      render: (_, record) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{record.course.classTime}</span>
    },
    {
      title: <p style={{ fontSize: "17px", fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>授课教师</p>,
      dataIndex: 'teachers',
      key: 'teachers',
      render: (_, record) => {
        const teacherNames = record.course.teachers.map(teacher => teacher.name)
        return <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>
          {teacherNames.join(",")}
        </span>
      }
    }
  ]

  const columns2 = [
    {
      title: <p style={{ fontSize: "17px", fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>课程名称</p>,
      dataIndex: 'class',
      key: 'class',
      render: (_, record) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{record.course.className}</span>
    },
    {
      title: <p style={{ fontSize: "17px", fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>课程进度</p>,
      dataIndex: 'process',
      key: 'process',
      render: (_, record) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{record.process}</span>
    },
    {
      title: <p style={{ fontSize: "17px", fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>操作</p>,
      key: 'Operation',
      render: (_, record) => <Link to={{
        pathname: "/study",
        search: "?id=" + record.id + "&studentId=" + studentId
      }}>
        <Button type="link" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>查看</Button>
      </Link>
    },
  ]

  useEffect(() => {
    getAnnouncements((data) => {
      //console.log(result)
      setAnnouncements(data.data)
    })
  }, [])


  return (
    classes && announcements ?
      <Layout style={{ minHeight: "100vh" }}>
        <Header className="header">
          <img src={img} className="img"></img>
          <div className="logo" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>学不会平台</div>
          <Navbar_student />
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
                  <Table dataSource={classes} columns={columns2} />
                </Content>
              </Col>
            </Row>
          </Col>
        </Content>
        <Footer>
        </Footer>
      </Layout>
      :
      null
  )
}


export default HomeStudentPage
