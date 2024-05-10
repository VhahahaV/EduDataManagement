import React, { useState, useEffect } from "react"
import Navbar from "../component/Navbar"
import { Table, Layout, Pagination } from "antd"
import { getRank, getUserNumber } from "../service/user"
import img from "../assets/logo.gif"

const { Header, Content, Footer, Sider } = Layout

const RankPage = (props) => {
  const columns = [
    {
      title: "用户名",
      dataIndex: "username",
      key: "username"
    },
    {
      title: "得分",
      dataIndex: "score",
      key: "score"
    }
  ]

  const [data, setData] = useState([])

  const [userNumber, setUserNumber] = useState(0)

  const [pageIndex, setPageIndex] = useState(1)

  useEffect(() => {
    getUserNumber((result) => {
      setUserNumber(result.data)
      console.log(result)
    })
  }, [])

  useEffect(() => {
    getRank(5, pageIndex, (result) => {
      setData(result.data)
    })
  }, [pageIndex])

  if (userNumber === 0) {
    return null
  }

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
        <Table columns={columns} dataSource={data} pagination={{
          position: ["none", "none"],
        }} />
        <Pagination defaultCurrent={1} defaultPageSize={5} total={userNumber}
          onChange={(event) => {
            setPageIndex(event)
          }} />
      </Layout>
    </Content>
    <Footer>
    </Footer>
  </Layout>)
}

export default RankPage
