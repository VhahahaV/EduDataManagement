import { Table, Button, Layout, Tag } from "antd"
import React, { useEffect, useState } from "react"
import Navbar from "../component/Navbar"
import { getProblems } from "../service/problem"
import { Link } from "react-router-dom"
import img from "../assets/logo.gif"

const { Header, Content, Footer } = Layout

const renderDifficulty = (value) => {
  let color = ''
  if (value === '简单') {
    color = 'green'
  }
  else if (value === '中等') {
    color = 'orange'
  } else if (value === '困难') {
    color = 'red'
  }
  return <Tag color={color}>{value}</Tag>
}
const ProblemsPage = (props) => {
  const columns = [
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>题号</p>,
      dataIndex: "id",
      key: "id",
      render: (text) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>标题</p>,
      dataIndex: "name",
      key: "title",
      render: (text) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>难度</p>,
      dataIndex: "difficulty",
      key: "difficulty",
      render: renderDifficulty
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>操作</p>,
      key: "operation",
      render: (_, record) => <Link to={{
        pathname: "/problem",
        search: "?id=" + record.id
      }}>
        <Button type="link" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>查看</Button>
      </Link>
    }
  ]

  const [problems, setProblems] = useState([])

  useEffect(() => {
    getProblems((result) => {
      console.log(result)
      if (result.code === 1) {
        setProblems(result.data)
      } else {
        console.log(result.msg)
      }
    })
  }, [])


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
        <Table columns={columns} dataSource={problems} />
      </Layout>
    </Content>
    <Footer>
    </Footer>
  </Layout>)
}

export default ProblemsPage
