import React, { useState, useEffect } from "react"
import { Menu, Button } from "antd"
import { checkAuth, logout } from "../service/user"
import { HomeOutlined, DatabaseOutlined, DashboardOutlined, LineChartOutlined, AppstoreAddOutlined, CaretDownOutlined } from "@ant-design/icons"
import { Link, useSearchParams } from "react-router-dom"

const Navbar = (props) => {
  const [username, setUsername] = useState("")
  useEffect(() => {
    checkAuth((result) => {
      if (result.code === 200) {
        setUsername(result.data.username)
      } else {
        setUsername("")
      }
    })
  }, [])

  return <>
    {/* <img src="" alt="(logo)" style={{ margin: "auto 32px" }} /> */}
    <PageMenu />
    {
      <div style={{ margin: "auto 32px auto auto" }}>
        <Link to={{ pathname: "/" }}>
          <Button
            style={{ margin: "auto 32px auto auto", color: "#000", border: "1px solid #000" }}
            type="primary"
            ghost
          >
            登出
          </Button>
        </Link>
      </div>
    }
  </>
}

const PageMenu = (props) => {
  const [params] = useSearchParams()
  const teacherId = params.get("teacherId")

  const items = [
    {
      key: 0,
      label: (<div className="menu-item" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>
        <span style={{ margin: "auto 8px auto auto" }}>
          <HomeOutlined />
        </span>
        首页
      </div>
      ),
    },
    {
      key: 1,
      label: (<div className="menu-item" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>
        <span style={{ margin: "auto 8px auto auto", }}>
          <DatabaseOutlined />
        </span>
        课程
      </div>
      ),
    },
    {
      key: 2,
      label: (<div className="menu-item" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>
        <span style={{ margin: "auto 8px auto auto" }}>
          <DashboardOutlined />
        </span>
        学生
      </div>)
    }
  ]

  const switchTable = [
    `/home?teacherId=${teacherId}`,
    `/classesTeacher?teacherId=${teacherId}`,
    `/students?teacherId=${teacherId}`,
  ]

  return <Menu
    style={{ width: "auto" }}
    theme="light"
    mode="horizontal"
    items={items}
    onClick={(event) => {
      window.location.href = (switchTable[event.key] !== undefined) ? switchTable[event.key] : "/home"
    }} />
}

export default Navbar
