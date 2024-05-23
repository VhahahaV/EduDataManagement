import { Table, Button, Layout, Tag } from "antd"
import React, { useEffect, useState } from "react"
import Navbar_student from "../component/Navbar_student"
import { Link, useSearchParams } from "react-router-dom"
import img from "../assets/logo.gif"
import { getStudentCourseDataByStudentId } from "../service/students"

const { Header, Content, Footer } = Layout

const MyStudyPage = () => {

  const [studies, setStudies] = useState([])
  const [params] = useSearchParams()
  const studentId = params.get("studentId")

  useEffect(() => {
    getStudentCourseDataByStudentId(studentId, (data) => {
      setStudies(data.data)
    })
  })

  const columns = [
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>学生课程</p>,
      dataIndex: "class",
      key: "class",
      render: (_, record) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{record.course.className}</span>
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>学习时长</p>,
      dataIndex: "time",
      key: "time",
      render: (_, record) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{record.studyDuration}</span>
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>学习进度</p>,
      dataIndex: "process",
      key: "process",
      render: (_, record) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{record.process}</span>
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>学习情况</p>,
      key: "operation",
      render: (_, record) => <Link to={{
        pathname: "/studyStudent",
        search: "?id=" + record.id + "&studentId=" + studentId
      }}>
        <Button type="link" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>查看</Button>
      </Link>
    }
  ]

  return (
    studies ?
      <Layout style={{ minHeight: "100vh" }}>
        <Header className="header">
          <img src={img} className="img"></img>
          <div className="logo" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>学不会平台</div>
          <Navbar_student />
        </Header>
        <Content>
          <Layout
            style={{
              padding: '24px 96px',
            }}
          >
            <Table columns={columns} dataSource={studies} />
          </Layout>
        </Content>
        <Footer>
        </Footer>
      </Layout> :
      null)
}

export default MyStudyPage