import React, { useState } from "react"
import Navbar from "../component/Navbar"
import { Button, Col, Row, Form, Layout, Table, Upload, Card } from "antd"
import "../App.css"
import { getProblemById } from "../service/problem"
import { Link } from "react-router-dom"
import img from "../assets/logo.gif"
import { useEffect } from "react"
import { getAnnouncement, getAnnouncementById } from "../service/announcement"
import { getProblemStaticsById } from "../service/problem"

const { Header, Content, Footer } = Layout

const HomePage = () => {
  const [announcements, setAnnouncements] = useState([])
  const [problem, setProblem] = useState(null)
  const [statics, setStatics] = useState([])
  const [url, setUrl] = useState("")
  const [id, setId] = useState(Math.floor(Math.random() * 3) + 1)
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

  useEffect(() => {
    getAnnouncement((result) => {
      //console.log(result)
      if (result.code === 1) {
        setAnnouncements(result.data)
      } else {
        console.log(result.msg)
      }
    })
  }, [])


  useEffect(() => {
    getProblemById(id, (result) => {
      //console.log(result)
      setProblem(result.data)
      setUrl("/problem?id=" + result.data.id)
    })
  }, [id])

  useEffect(() => {
    getProblemStaticsById(id, (result) => {
      console.log(result)
      setStatics(result.data)
    })
  }, [id])

  return (<Layout style={{ minHeight: "100vh" }}>
    <Header className="header">
      <img src={img} className="img"></img>
      <div className="logo" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>CodeArena</div>
      <Navbar />
    </Header>

    <Content>
      <Col>
        <Row>
          <Content style={{ margin: "64px 64px", backgroundColor: "#fff", padding: "32px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)", borderRadius: "8px" }}>
            <h1 style={{ fontSize: "25px", fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>公告栏</h1>
            <Table dataSource={announcements} columns={columns} />
          </Content>
        </Row>
        <Row>
          {(problem == null) ? null : <Col span={12}>
            <Content style={{
              marginLeft: "64px",
              boxShadow: " 0 2px 8px rgba(0, 0, 0, 0.15)",
              border: " 1px solid rgba(0, 0, 0, 0.1)",
              padding: "16px",
              borderRadius: "8px"
            }}>
              <h1>每日一题</h1>
              {(problem == null) ? null : <Card title={problem.name} extra={<a href={url}>详情</a>}>
                <p>题目ID：{problem.id}</p>
                <p>难度：{problem.difficulty}</p>
                <p>总提交次数：{statics.TLE + statics.AC + statics.CE + statics.MLE + statics.RE + statics.SE + statics.WA}</p>
                <p>通过次数：{statics.AC}</p>
                <p>通过率：{(statics.AC * 100 / (statics.AC + statics.WA + statics.TLE + statics.MLE + statics.RE + statics.CE)).toFixed(2) + "%"}</p>
              </Card>}
            </Content>
          </Col>}
        </Row>
      </Col>
    </Content>
    <Footer>
    </Footer>
  </Layout>)
}

export default HomePage
