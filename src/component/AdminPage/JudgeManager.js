import { Button, Table, Layout, Tag, Pagination, Switch, Row, Col } from "antd"
import React, { useEffect, useState } from "react"
import { getJudgeResults, getJudgeStatusByPage, getJudgeStatusNumber } from "../../service/judge"
import { Link } from "react-router-dom"

const JudgeManager = (props) => {
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [judgeResultNumber, setJudgeResultNumber] = useState(0)
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

  ]

  const subColumns = [
    {
      title: "Case Index",
      dataIndex: "caseIndex",
      key: "caseIndex"
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time"
    },
    {
      title: "Memory",
      dataIndex: "memory",
      key: "memory"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: renderResult
    }
  ]


  useEffect(() => {
    getJudgeStatusNumber((result) => {
      setJudgeResultNumber(result.data)
    })
  })

  useEffect(() => {
    getJudgeStatusByPage(pageIndex, 5, (result) => {
      if (result.code === 1) {
        setData(result.data)
      }
    })
  }, [pageIndex])
  return <div>
    <Table rowKey={(record) => (record.id)} columns={columns} dataSource={data} pagination={{
      position: ["none", "none"],
    }}
      expandable={{
        expandedRowRender: (record) => {
          if (record.results == null) {
            return null
          }
          else {
            return (
              <Table
                columns={subColumns}
                dataSource={record.results}
                pagination={false}
              />)
          }
        }
      }}
    />
    {judgeResultNumber === 0 ? null : <Pagination onChange={setPageIndex}
      defaultCurrent={1} defaultPageSize={5} total={judgeResultNumber} />}
  </div>
}

export default JudgeManager
