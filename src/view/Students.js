import { Table, Button, Layout, Tag } from "antd"
import React, { useEffect, useState } from "react"
import Navbar from "../component/Navbar"
import { Link, useSearchParams } from "react-router-dom"
import img from "../assets/logo.gif"
import { getStudentCourseDataByCourseId, getClasses, getCourseTeachers } from "../service/students"

const { Header, Content, Footer } = Layout

const StudentsPage = () => {

  const [students, setStudents] = useState([])
  const [params] = useSearchParams()
  const teacherId = params.get("teacherId")

  useEffect(() => {
    getCourseTeachers((result) => {
      let coursesId = []
      let students = []
      console.log(result.data)
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i].teacher == teacherId) {
          coursesId.push(result.data[i].course)
        }
      }
      console.log(coursesId)
      for (let j = 0; j < coursesId.length; j++) {
        getStudentCourseDataByCourseId(coursesId[j], (student_data) => {
          console.log(student_data.data)
          for (let z = 0; z < student_data.data.length; z++) {
            students = [...students, student_data.data[z]]
            setStudents(students)
          }
        })
      }
    })
  }, [])

  const columns = [
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>学生编号</p>,
      dataIndex: "studentId",
      key: "studentId",
      render: (_, record) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{record.student.id}</span>
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>学生名称</p>,
      dataIndex: "name",
      key: "name",
      render: (_, record) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{record.student.name}</span>
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>学习课程</p>,
      dataIndex: "className",
      key: "class",
      render: (_, record) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{record.course.className}</span>
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>学习情况</p>,
      key: "operation",
      render: (_, record) => <Link to={{
        pathname: "/study",
        search: "?id=" + record.id + "&teacherId=" + teacherId
      }}>
        <Button type="link" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>查看</Button>
      </Link>
    }
  ]

  return (
    (students.length != 0) ?
      <Layout style={{ minHeight: "100vh" }}>
        <Header className="header">
          <img src={img} className="img"></img>
          <div className="logo" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>学不会平台</div>
          <Navbar />
        </Header>
        <Content>
          <Layout
            style={{
              padding: '24px 96px',
            }}
          >
            <Table columns={columns} dataSource={students} />
          </Layout>
        </Content>
        <Footer>
        </Footer>
      </Layout> :
      null)
}

export default StudentsPage