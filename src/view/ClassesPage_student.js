import { Table, Button, Layout, Tag } from "antd"
import React, { useEffect, useState } from "react"
import Navbar_student from "../component/Navbar_student"
import { Link, useSearchParams } from "react-router-dom"
import img from "../assets/logo.gif"
import { getStudentCourseDataByStudentId } from "../service/students"

const { Header, Content, Footer } = Layout
const ClassesStudentPage = (props) => {
  const [courses, setCourses] = useState([])
  const [params] = useSearchParams()
  const studentId = params.get("studentId")
  useEffect(() => {
    getStudentCourseDataByStudentId(studentId, (data) => {
      setCourses(data.data)
    })
  }, [])
  const columns = [
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>课程编号</p>,
      dataIndex: "id",
      key: "id",
      render: (_, record) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{record.course.id}</span>
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>课程名称</p>,
      dataIndex: "className",
      key: "className",
      render: (_, record) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{record.course.className}</span>
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>课程教师</p>,
      dataIndex: "classTeacher",
      key: "classTeacher",
      render: (_, record) => {
        const teacherNames = record.course.teachers.map(teacher => teacher.name)
        return <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>
          {teacherNames.join(",")}
        </span>
      }
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>操作</p>,
      key: "operation",
      render: (_, record) => <Link to={{
        pathname: "/classStudent",
        search: "?id=" + record.course.id + "&studentId=" + studentId + "&dataId=" + record.id
      }}>
        <Button type="link" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>查看</Button>
      </Link>
    }
  ]

  return (
    courses ?
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
            <Table columns={columns} dataSource={courses} />
          </Layout>
        </Content>
        <Footer>
        </Footer>
      </Layout> : null)
}

export default ClassesStudentPage
