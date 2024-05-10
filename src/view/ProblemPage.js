import React, { useEffect, useRef, useState } from "react"
import Navbar from "../component/Navbar"
import { useSearchParams } from "react-router-dom"
import { Button, Layout, message, Col, Row, Select, Descriptions, List, Avatar } from "antd"
import { getProblemById, getProblemStaticsById } from "../service/problem"
import { getCommentByProblemId, addComment } from "../service/comment"
import { Input } from 'antd'
import { submitAnswer } from "../service/judge"
import { PieChartOutlined, ReloadOutlined } from "@ant-design/icons"
import * as echarts from 'echarts'
import ProblemInfo from "../component/ProblemInfo"
import img from "../assets/logo.gif"
import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-c_cpp"
import "ace-builds/src-noconflict/mode-java"
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/mode-csharp"
import "ace-builds/src-noconflict/theme-xcode"
import "ace-builds/src-noconflict/ext-language_tools"
import Problemdescription from "../component/Problemdescription"

const { Header, Content, Footer, Sider } = Layout

const { TextArea } = Input

const highlight = [
  "c_cpp", "java", "python", "csharp"
]

const ProblemPage = (props) => {
  const [params] = useSearchParams()
  const id = params.get("id")

  const chartRef = useRef(null)
  const chartInstanceRef = useRef(null)

  const [data, setData] = useState(null)

  const [commentData, setCommentData] = useState([])

  const [comment, setComment] = useState("")

  const [code, setCode] = useState("")

  const [loading, setLoading] = useState(false)

  const [language, setLanguage] = useState("C++")

  const [highLight, setHighLight] = useState(0)

  const [statics, setStatics] = useState([])

  useEffect(() => {
    getProblemById(id, (result) => {
      setData(result.data)
    })
  }, [id])

  useEffect(() => {
    getCommentByProblemId(id, (result) => {
      setCommentData(result.data)
    })
  }, [id])

  useEffect(() => {
    const chart = echarts.init(chartRef.current)
    chartInstanceRef.current = chart
    return () => {
      chart.dispose()
    }
  }, [])

  useEffect(() => {
    getProblemStaticsById(id, (result) => {
      setStatics(result.data)
      const chart = chartInstanceRef.current
      const options = {
        series: [
          {
            type: "pie",
            stillShowZeroSum: false,
            data: [
              { value: result.data.AC, name: "AC" },
              { value: result.data.WA, name: "WA" },
              { value: result.data.TLE, name: "TLE" },
              { value: result.data.MLE, name: "MLE" },
              { value: result.data.CE, name: "CE" },
              { value: result.data.RE, name: "RE" }
            ],
            label: {
              show: true,
              formatter: function (params) {
                if (params.value === 0) {
                  return ""
                } else {
                  return `${params.name} : ${params.value}`
                }
              },
              position: 'inside'
            }
          },
        ],
        color: ['#32CD32', '#FF0000', '#FFA500', '#FF00FF', '#FFD700', '#800080']
      }

      chart.setOption(options)
    })
  }, [id])

  const Title = () => {
    return (
      <div>
        <span style={{ margin: "auto 8px auto auto" }}><PieChartOutlined /></span>
        <span>统计数据</span>
      </div>
    )
  }

  const handlesubmit = () => {
    console.log(code)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      message.success('提交成功')
    }, 1000)
    submitAnswer(code, highlight[highLight], id)
  }

  const handleReload = () => {
    getProblemStaticsById(id, (result) => {
      setStatics(result.data)
      console.log(result.data)
      const chart = chartInstanceRef.current
      const options = {
        series: [
          {
            type: "pie",
            stillShowZeroSum: false,
            data: [
              { value: result.data.AC, name: "AC" },
              { value: result.data.WA, name: "WA" },
              { value: result.data.TLE, name: "TLE" },
              { value: result.data.MLE, name: "MLE" },
              { value: result.data.CE, name: "CE" },
              { value: result.data.RE, name: "RE" },
              { value: result.data.SE, name: "SE" }
            ],
            label: {
              show: true,
              formatter: function (params) {
                if (params.value === 0) {
                  return ""
                } else {
                  return `${params.name} : ${params.value}`
                }
              },
              position: 'inside'
            }
          },
        ],
        color: ['#32CD32', '#FF0000', '#FFA500', '#FF00FF', '#FFD700', '#800080', '#FFC300']
      }

      chart.setOption(options)
    })
  }

  return (<Layout style={{ minHeight: "100vh" }}>
    <Header className="header">
      <img src={img} className="img"></img>
      <div className="logo" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>CodeArena</div>
      <Navbar />
    </Header>
    <Row>
      <Col span={16} style={{ marginTop: "16px" }}>
        <Row gutter={16} style={{ marginBottom: '16px' }}>
          <Content style={{
            marginLeft: "36px",
            boxShadow: " 0 2px 8px rgba(0, 0, 0, 0.15)",
            border: " 1px solid rgba(0, 0, 0, 0.1)",
            padding: "16px",
            borderRadius: "8px"
          }}>
            <div style={{ width: "50vw", marginRight: "36px" }}>
              {(data == null) ? null : <ProblemInfo info={data} />}
            </div>
          </Content>
        </Row>
        <Row gutter={16} style={{ marginBottom: '16px' }}>
          <Content style={{
            marginLeft: "36px",
            boxShadow: " 0 2px 8px rgba(0, 0, 0, 0.15)",
            border: " 1px solid rgba(0, 0, 0, 0.1)",
            padding: "16px",
            borderRadius: "8px",
            height: "765px"
          }}>
            <div>
              {"语言选择:"}
              <Select style={{ marginBottom: "10px", marginLeft: "10px", width: 120 }}
                defaultValue="C++/C"
                onChange={(value) => {
                  setLanguage(value)
                  if (value === "C++/C") {
                    setHighLight(0)
                  } else if (value === "Java") {
                    setHighLight(1)
                  } else if (value === "Python") {
                    setHighLight(2)
                  } else if (value === "C#") {
                    setHighLight(3)
                  }
                }}
                options={[
                  { value: "C++", label: "C++" },
                  { value: "Java", label: "Java" },
                  { value: "Python", label: "Python" },
                  { value: "C#", label: 'C#' },
                ]} />
            </div>
            <AceEditor
              mode={highlight[highLight]}
              theme="xcode"
              onChange={(value) => {
                setCode(value)
              }}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
              fontSize="13px"
              style={{ width: "800px", height: "600px", marginTop: "10px" }}
              setOptions={
                {
                  enableLiveAutocompletion: true,
                  enableBasicAutocompletion: true,
                }
              }
            />
            <Button
              style={{
                marginTop: "50px",
                color: "#000", border: "1px solid #000"
              }}
              ghost
              type="primary"
              loading={loading}
              onClick={() => {
                handlesubmit()
              }}>提交代码</Button>
          </Content>
        </Row>
      </Col>
      <Col span={7} style={{ marginTop: "16px" }}>
        <Row>
          <Content style={{
            marginLeft: "36px",
            boxShadow: " 0 2px 8px rgba(0, 0, 0, 0.15)",
            border: " 1px solid rgba(0, 0, 0, 0.1)",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "16px"
          }}>
            {(data == null || statics == null) ? null : <Problemdescription data={data} statics={statics} />}
          </Content>
        </Row>
        <Row>
          <Content style={{
            marginLeft: "36px",
            boxShadow: " 0 2px 8px rgba(0, 0, 0, 0.15)",
            border: " 1px solid rgba(0, 0, 0, 0.1)",
            padding: "16px",
            borderRadius: "8px"
          }}>
            <Descriptions title={<Title />}>
              <Descriptions.Item>
                <div ref={chartRef} style={{ width: "100%", height: "400px" }} />
              </Descriptions.Item>
            </Descriptions>
            <Descriptions.Item>
              <Button onClick={() => { handleReload() }} style={{ color: "#000", border: "1px solid #000" }} type="primary" ghost icon={<ReloadOutlined />}>刷新</Button>
            </Descriptions.Item>
          </Content>
        </Row>
        <Row>
          <Content style={{
            marginTop: "16px",
            marginLeft: "36px",
            boxShadow: " 0 2px 8px rgba(0, 0, 0, 0.15)",
            border: " 1px solid rgba(0, 0, 0, 0.1)",
            padding: "16px",
            borderRadius: "8px"
          }}>
            <div style={{ height: "400px", overflow: 'auto' }}>
              <List
                itemLayout="horizontal"
                dataSource={commentData}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                      title={<a href="https://ant.design">{item.username}</a>}
                      description={item.time}
                    />
                    {item.content}
                  </List.Item>
                )}
              />
            </div>
            <TextArea rows={4} style={{ marginTop: "16px" }} onChange={(e) => {
              setComment(e.target.value)
            }}>
            </TextArea>
            <Button style={{ marginTop: "8px", marginRight: "16px", color: "#000", border: "1px solid #000" }} ghost
              onClick={() => {
                if (comment === '') {
                  message.error("不能提交空评论")
                }
                else {
                  let commentInfo = {
                    problemId: id,
                    content: comment,
                  }
                  console.log(commentInfo)
                  addComment(commentInfo, (result) => {
                    console.log(result)
                    if (result.code === 200) {
                      message.success("评论已发表")
                      getCommentByProblemId(id, (result) => {
                        setCommentData(result.data)
                      })
                    }
                    else {
                      message.error("评论失败")
                    }
                  })
                }
              }}>提交评论</Button>
          </Content>
        </Row>
      </Col>
    </Row>
  </Layout >)
}

export default ProblemPage
