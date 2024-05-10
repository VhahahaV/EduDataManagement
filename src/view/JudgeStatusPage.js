import { Button, Table, Layout, Tag, Pagination, Switch, Row, Col } from "antd"
import React, { useEffect, useState } from "react"
import Navbar from "../component/Navbar"
import { getJudgeResults, getJudgeStatusByPage, getJudgeStatusNumber, getJudgeStatusNumberByUser } from "../service/judge"
import { Link } from "react-router-dom"
import img from "../assets/logo.gif"

const { Header, Content, Footer, Sider } = Layout

const renderResult = (value) => {
  let color = ''
  if (value === 'CE') {
    color = 'red'
  } else if (value === 'WA' || value === 'TLE' || value === 'MLE' || value === 'RE' || value === 'SE') {
    color = 'red'
  } else if (value === 'AC') {
    color = 'green'
  } else if (value === 'running') {
    color = 'orange'
  }
  return <Tag color={color} style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{value}</Tag>
}
const JudgeStatusPage = (props) => {
  const columns = [
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>题目编号</p>,
      dataIndex: "problemId",
      key: "id",
      render: (text) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>评测状态</p>,
      dataIndex: "status",
      key: "status",
      render: renderResult
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>提交时间</p>,
      dataIndex: "submitTime",
      key: "time",
      render: (text) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>使用语言</p>,
      dataIndex: "language",
      key: "language",
      render: (text) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>用户ID</p>,
      dataIndex: "userId",
      key: "userId",
      render: (text) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>操作</p>,
      key: "operation",
      render: (_, record) => {
        return <Link to={{
          pathname: "/judgeDetail",
          search: "?id=" + record.id
        }}>
          <Button type="link" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>查看</Button>
        </Link>
      }
    }
  ]

  const [data, setData] = useState([])

  const [pageIndex, setPageIndex] = useState(1)

  const [state, setState] = useState(false)

  const [judgeResultNumber, setJudgeResultNumber] = useState(0)


  useEffect(() => {
    getJudgeStatusNumber((result) => {
      setJudgeResultNumber(result.data)
    })
  }, [])


  useEffect(() => {
    if (state) {
      getJudgeResults(pageIndex, 5, (result) => {
        if (result.code === 1) {
          setData(result.data)
          getJudgeStatusNumberByUser((tmp) => {
            //console.log(tmp.data)
            setJudgeResultNumber(tmp.data)
          })
        }
      })
    }
    else {
      getJudgeStatusByPage(pageIndex, 5, (result) => {
        if (result.code === 1) {
          setData(result.data)
          getJudgeStatusNumber((tmp) => {
            //console.log(tmp.data)
            setJudgeResultNumber(tmp.data)
          })
        }
      })
    }
  }, [pageIndex])

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
          <Row>
            <Switch style={{ marginBottom: "16px" }} checkedChildren="Mine" unCheckedChildren="All" onChange={(value) => {
              if (value) {
                setState(value)
                setPageIndex(1)
                getJudgeResults(pageIndex, 5, (result) => {
                  if (result.code === 1) {
                    setData(result.data)
                    getJudgeStatusNumberByUser((tmp) => {
                      //console.log(tmp.data)
                      setJudgeResultNumber(tmp.data)
                    })
                  }
                })
              } else {
                setState(value)
                setPageIndex(1)
                getJudgeStatusByPage(pageIndex, 5, (result) => {
                  if (result.code === 1) {
                    setData(result.data)
                    getJudgeStatusNumber((tmp) => {
                      //console.log(tmp.data)
                      setJudgeResultNumber(tmp.data)
                    })
                  }
                })
              }
            }} />
          </Row>
          <Table columns={columns} dataSource={data} pagination={{
            position: ["none", "none"],
          }} />
          {judgeResultNumber === 0 ? null : <Pagination onChange={setPageIndex}
            defaultCurrent={1} defaultPageSize={5} total={judgeResultNumber} />}
        </Layout>
      </Content>
      <Footer>
      </Footer>
    </Layout>)
}

export default JudgeStatusPage
