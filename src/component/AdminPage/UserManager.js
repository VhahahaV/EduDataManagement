import { Button, Input, Pagination, Table, Form, Space } from "antd"
import React, { useEffect, useState } from "react"
import { getUserByKeyword, getUserByPage, getUserNumber } from "../../service/user"

const { Search } = Input

const UserManager = (props) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "用户名",
      dataIndex: "username",
      key: "username"
    },
    {
      title: "用户邮箱",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "手机号码",
      dataIndex: "phone",
      key: "phone"
    }
  ]

  const [userNumber, setUserNumber] = useState(0)

  const [data, setData] = useState([])

  const [pageIndex, setPageIndex] = useState(1)

  useEffect(() => {
    getUserNumber((result) => {
      if (result.code === 1) {
        setUserNumber(result.data)
      }
    })
  }, [])

  useEffect(() => {
    getUserByPage(pageIndex, 5, (result) => {
      if (result.code === 1) {
        setData(result.data)
      }
    })
  }, [pageIndex])

  return <div>
    <Form onFinish={(values) => {
      getUserByKeyword(values.keyword, (result) => {
        if (result.code === 1) {
          setData(result.data)
        }
      })
    }}
      style={{ marginBottom: "16px" }}>
      <Button type="primary" htmlType="submit" style={{ color: "#000", border: "1px solid #000" }} ghost>🔍搜索</Button>
      <Form.Item name="keyword" style={{ margin: "10px 10px 0px 0px" }}>
        <Input />
      </Form.Item>
    </Form>
    <Table columns={columns} dataSource={data} pagination={{
      position: ["none", "none"],
    }} />
    <Pagination onChange={setPageIndex}
      defaultCurrent={1} defaultPageSize={5} total={userNumber} />
  </div>
}

export default UserManager
