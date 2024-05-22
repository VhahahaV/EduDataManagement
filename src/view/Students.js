import { Table, Button, Layout, Tag } from "antd"
import React, { useEffect, useState } from "react"
import Navbar from "../component/Navbar"
import { Link } from "react-router-dom"
import img from "../assets/logo.gif"
import { getStudents } from "../service/students"

const { Header, Content, Footer } = Layout

const StudentsPage = () => {

  useEffect(() => {
    getStudents((data) => {
      console.log(data)
    })
  }, [])

  const columns = [
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>学生编号</p>,
      dataIndex: "studentId",
      key: "studentId",
      render: (text) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>学生名称</p>,
      dataIndex: "name",
      key: "name",
      render: (text) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>学习课程</p>,
      dataIndex: "class",
      key: "class",
      render: (text) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>学习情况</p>,
      key: "operation",
      render: (_, record) => <Link to={{
        pathname: "/study"
      }}>
        <Button type="link" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>查看</Button>
      </Link>
    }
  ]

  const data = [
    {
      id: 1,
      studentId: 1,
      name: "Lyican",
      class: "高等数学"
    },
    {
      id: 2,
      studentId: 1,
      name: "Lyican",
      class: "概率论与数理统计"
    },
    {
      id: 3,
      studentId: 1,
      name: "Lyican",
      class: "线性代数"
    },
    {
      id: 4,
      studentId: 2,
      name: "Sske",
      class: "高等数学"
    },
  ]

  return (<Layout style={{ minHeight: "100vh" }}>
    <Header className="header">
      <img src={img} className="img"></img>
      <div className="logo" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>CodeArena</div>
      <Navbar />
    </Header>
    <Content>
      <Layout
        style={{
          padding: '24px 96px',
        }}
      >
        <Table columns={columns} dataSource={data} />
      </Layout>
    </Content>
    <Footer>
    </Footer>
  </Layout>)
}

export default StudentsPage