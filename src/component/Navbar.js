import React, { useState, useEffect } from "react"
import { Menu, Button } from "antd"
import { checkAuth, logout } from "../service/user"
import { HomeOutlined, DatabaseOutlined, DashboardOutlined, LineChartOutlined, AppstoreAddOutlined, CaretDownOutlined } from "@ant-design/icons"

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
      (username === "") ?
        <div style={{ margin: "auto 32px auto auto" }}>
          <Button
            style={{ margin: "auto 32px auto auto", color: "#000", border: "1px solid #000" }}
            onClick={() => {
              window.location.href = "/login"
            }}
            type="primary"
            ghost
          >
            登录
          </Button>
        </div>
        :

        <div style={{ margin: "auto 32px auto auto" }}>
          <Button
            style={{ margin: "auto 32px auto auto", color: "#000", border: "1px solid #000" }}
            onClick={() => {
              window.location.href = "/test"
            }}
            type="primary"
            ghost
          >
            学生登录
          </Button>

          <Button
            style={{ margin: "auto 32px auto auto", color: "#000", border: "1px solid #000" }}
            onClick={() => {
              window.location.href = "/"
            }}
            type="primary"
            ghost
          >
            教师登录
          </Button>

          <Button
            style={{ margin: "auto 32px auto auto", color: "#000", border: "1px solid #000" }}
            onClick={() => {
              logout()
              setTimeout(() => {
                window.location.reload()
              }, 1000)
            }}
            type="primary"
            ghost
          >
            登出
          </Button >
        </div>

    }
  </>
}

const PageMenu = (props) => {
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
    },
    {
      key: 3,
      label: (<div className="menu-item" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>
        <span style={{ margin: "auto 8px auto auto" }}>
          <DashboardOutlined />
        </span>
        管理
      </div>)
    }
  ]

  const switchTable = [
    "/",
    "/problems",
    "/judgeStatus",
    "/admin"
  ]

  return <Menu
    style={{ width: "auto" }}
    theme="light"
    mode="horizontal"
    items={items}
    onClick={(event) => {
      window.location.href = (switchTable[event.key] !== undefined) ? switchTable[event.key] : "/"
    }} />
}

export default Navbar
