import { Table, Button, Layout, Tag } from "antd"
import React, { useEffect, useState } from "react"
import Navbar from "../component/Navbar"
import { Link, useSearchParams } from "react-router-dom"
import img from "../assets/logo.gif"
import { getClasses, getCourseTeachers } from "../service/students"

const { Header, Content, Footer } = Layout
const ClassesTeacherPage = (props) => {

  const [courses, setCourses] = useState([])
  const [params] = useSearchParams()
  const teacherId = params.get("teacherId")

  useEffect(() => {
    getClasses((data) => {
      console.log(data.data)
      getCourseTeachers((result) => {
        let coursesId = []
        let courses = []
        console.log(result.data)
        for (let i = 0; i < result.data.length; i++) {
          if (result.data[i].teacher == teacherId) {
            coursesId.push(result.data[i].course)
          }
        }
        for (let j = 0; j < coursesId.length; j++) {
          for (let k = 0; k < data.data.length; k++) {
            if (data.data[k].id == coursesId[j]) {
              courses.push(data.data[k])
            }
          }
        }
        setCourses(courses)
      })
    })
  }, [])

  const columns = [
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>课程编号</p>,
      dataIndex: "id",
      key: "id",
      render: (_, record) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{record.id}</span>
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>课程名称</p>,
      dataIndex: "className",
      key: "className",
      render: (text) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>课程教师</p>,
      dataIndex: "teachers",
      key: "teachers",
      render: (_, record) => {
        const teacherNames = record.teachers.map(teacher => teacher.name)
        return <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>
          {teacherNames.join(",")}
        </span>
      }
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>操作</p>,
      key: "operation",
      render: (_, record) => <Link to={{
        pathname: "/classTeacher",
        search: "?id=" + record.id + "&teacherId=" + teacherId
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
          <Navbar />
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
      </Layout> :
      null)
}

export default ClassesTeacherPage
