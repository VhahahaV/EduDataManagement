import { Layout, Menu } from "antd"
import React, { useState } from "react"
import UserManager from "../component/AdminPage/UserManager"
import ProblemManager from "../component/AdminPage/ProblemManager"
import JudgeManager from "../component/AdminPage/JudgeManager"
import AnnouncementManager from "../component/AdminPage/AnnouncementManager"
import EditManager from "../component/AdminPage/EditManager"
import "../App.css"

const { Header, Content, Footer, Sider } = Layout

const AdminPage = (props) => {
  const [index, setIndex] = useState(0)

  const switchTable = [<UserManager />, <ProblemManager />, <JudgeManager />, <AnnouncementManager />, <EditManager />]

  return <Layout style={{ display: "flex", flexDirection: "row", minHeight: "100vh" }}>
    <Sider style={{ backgroundColor: "white" }}>
      <div className="logo" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive", marginBottom: "16px", marginLeft: "48px", marginTop: "16px" }}>CodeArena</div>
      <div className="logo" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive", marginBottom: "32px", marginLeft: "48px" }}>AdminPage</div>
      <SideBar setIndex={setIndex} />

    </Sider>
    <div style={{ margin: "64px", width: "70vw" }}>
      {switchTable[index]}
    </div>
  </Layout>
}

const SideBar = (props) => {
  const items = [
    {
      key: 0,
      label: (<div className="menu-item" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive", fontSize: "16px", marginLeft: "32px" }}>
        用户管理
      </div>
      ),
    },
    {
      key: 1,
      label: (<div className="menu-item" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive", fontSize: "16px", marginLeft: "32px" }}>
        新增题目
      </div>
      ),
    },
    {
      key: 2,
      label: (<div className="menu-item" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive", fontSize: "16px", marginLeft: "32px" }}>
        评测管理
      </div>)
    },
    {
      key: 3,
      label: (<div className="menu-item" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive", fontSize: "16px", marginLeft: "32px" }}>
        公告管理
      </div>)
    },
    {
      key: 4,
      label: (<div className="menu-item" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive", fontSize: "16px", marginLeft: "32px" }}>
        编辑题目
      </div>)
    }
  ]

  return <Menu
    style={{ width: "auto" }}
    theme="light"
    items={items}
    onClick={(event) => {
      console.log(event)
      props.setIndex(event.key)
    }}
    mode="vertical"
  />
}

export default AdminPage
