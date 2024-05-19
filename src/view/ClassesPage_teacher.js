import { Table, Button, Layout, Tag } from "antd"
import React, { useEffect, useState } from "react"
import Navbar from "../component/Navbar"
import { Link } from "react-router-dom"
import img from "../assets/logo.gif"

const { Header, Content, Footer } = Layout
const ClassesTeacherPage = (props) => {
  const columns = [
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>课程编号</p>,
      dataIndex: "id",
      key: "id",
      render: (text) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>课程名称</p>,
      dataIndex: "className",
      key: "className",
      render: (text) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>课程教师</p>,
      dataIndex: "classTeacher",
      key: "classTeacher",
      render: (teachers) => {
        const teacherNames = teachers.map(teacher => teacher.name)
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
        search: "?id=" + record.id
      }}>
        <Button type="link" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>查看</Button>
      </Link>
    }
  ]

  const data = [
    {
      id: 1,
      className: "高等数学",
      classTeacher: [
        {
          id: 1,
          name: "武忠祥"
        },
        {
          id: 2,
          name: "张宇"
        }
      ],
    },
    {
      id: 2,
      className: "概率论与数理统计",
      classTeacher: [
        {
          id: 1,
          name: "武忠祥"
        },
        {
          id: 2,
          name: "张宇"
        }
      ],
    },
    {
      id: 3,
      className: "线性代数",
      classTeacher: [
        {
          id: 1,
          name: "武忠祥"
        },
        {
          id: 2,
          name: "张宇"
        }
      ],
    },
    {
      id: 4,
      className: "软件工程原理与实践",
      classTeacher: [
        {
          id: 3,
          name: "沈备军"
        }
      ],
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

export default ClassesTeacherPage
