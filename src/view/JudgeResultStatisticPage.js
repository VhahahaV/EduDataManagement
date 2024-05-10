import { Table, Layout, Tag, } from "antd"
import React, { useEffect, useState } from "react"
import Navbar from "../component/Navbar"
import { getAnsweredProblemByPage, } from "../service/judge"
import img from "../assets/logo.gif"

const { Header, Content, Footer, Sider } = Layout

// const renderResult = (value) => {
//   let color = ''
//   if (value === 'CE') {
//     color = 'red'
//   } else if (value === 'WA' || value === 'TLE' || value === 'MLE' || value === 'RE' || value === 'SE') {
//     color = 'red'
//   } else if (value === 'AC') {
//     color = 'green'
//   } else if (value === 'running') {
//     color = 'orange'
//   }
//   return <Tag color={color} style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{value}</Tag>
// }

const JudgeResultStatisticPage = (props) => {
  const columns = [
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>题目编号</p>,
      dataIndex: "problemId",
      key: "problemId",
      render: (text) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>题目名称</p>,
      dataIndex: "problemName",
      key: "problemName",
      render: (text) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>提交次数</p>,
      dataIndex: "submit",
      key: "submit",
      render: (text) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>通过次数</p>,
      dataIndex: "correct",
      key: "correct",
      render: (text) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
    },


  ]

  const [data, setData] = useState([])


  useEffect(() => {
    getAnsweredProblemByPage((result) => {
      if (result.code === 1) {
        setData(result.data)
        console.log(result.data)
      }
    })
  }, [])

  return (
    <Layout style={{ minHeight: "100vh" }}>
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
          <Table columns={columns} dataSource={data}
          />
        </Layout>
      </Content>
      <Footer>
      </Footer>
    </Layout>)
}

export default JudgeResultStatisticPage
