import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Table, Button, Layout, Tag, Row } from "antd"
import { getJudgeDetail, getCodeById } from "../service/judge"
import Navbar from "../component/Navbar"
import img from "../assets/logo.gif"
import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-c_cpp"

const { Header, Content, Footer, Sider } = Layout

const JudgeDetailPage = (props) => {

  const renderResult = (value) => {
    let color = ''
    if (value === 'CE') {
      color = 'red'
    } else if (value === 'WA' || value === 'TLE' || value === 'MLE' || value === 'RE') {
      color = 'red'
    } else if (value === 'AC') {
      color = 'green'
    } else if (value === 'running') {
      color = 'orange'
    }
    return <Tag color={color} style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{value}</Tag>
  }
  const columns = [
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>测试用例编号</p>,
      dataIndex: "caseIndex",
      key: "caseIndex",
      render: (text) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>评测状态</p>,
      dataIndex: 'status',
      key: "status",
      render: renderResult
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>运行时间</p>,
      dataIndex: "time",
      key: "runtime",
      render: (text) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
    },
    {
      title: <p style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>内存使用</p>,
      dataIndex: "memory",
      key: "memoryuse",
      render: (text) => <span style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>{text}</span>
    }
  ]

  const [params] = useSearchParams()
  const id = params.get("id")

  const [data, setData] = useState(null)

  const [code, setCode] = useState("")

  useEffect(() => {
    getJudgeDetail(id, (result) => {
      console.log(result)
      setData(result.data)
    })
  }, [])

  useEffect(() => {
    getCodeById(id, (result) => {
      console.log(result)
      setCode(result.data)
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
        {(data == null) ? null : (<Table style={{
          boxShadow: " 0 2px 8px rgba(0, 0, 0, 0.15)",
          border: " 1px solid rgba(0, 0, 0, 0.1)",
          borderRadius: "8px"
        }} columns={columns} dataSource={data.results} />)}

      </Layout>

      <Layout
        style={{
          padding: '24px 96px',
        }}
      >
        {(code == "") ? null :
          <div>
            <Row style={{
              boxShadow: " 0 2px 8px rgba(0, 0, 0, 0.15)",
              border: " 1px solid rgba(0, 0, 0, 0.1)",
              padding: "16px",
              borderRadius: "8px"
            }}>
              <h1 style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>您提交的代码：</h1>
              <AceEditor
                mode="c_cpp"
                theme="xcode"
                defaultValue={code}
                readOnly={true}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                fontSize="13px"
                style={{ width: "1300px", height: "200px", marginTop: "10px" }}
                setOptions={
                  {
                    enableLiveAutocompletion: true,
                    enableBasicAutocompletion: true,
                  }
                }
              />
            </Row>
          </div>
        }

      </Layout>
    </Content>
    <Footer>
    </Footer>
  </Layout>)
}

export default JudgeDetailPage
