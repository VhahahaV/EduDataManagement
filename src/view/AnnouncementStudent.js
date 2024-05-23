import React, { useState } from "react"
import Navbar_student from "../component/Navbar_student"
import { Layout, Card } from "antd"
import "../App.css"
import { useSearchParams } from "react-router-dom"
import img from "../assets/logo.gif"
import { useEffect } from "react"
import { getAnnouncementById } from "../service/students"
import AnnouncementInfo from "../component/AnnouncementInfo"

const { Header, Content, Footer } = Layout

const AnnouncementStudentPage = (props) => {
  const [params] = useSearchParams()
  const id = params.get("id")
  const [announcement, setAnnouncement] = useState(null)

  useEffect(() => {
    getAnnouncementById(id, (result) => {
      setAnnouncement(result.data)
    })
  }, [])

  return (<Layout style={{ minHeight: "100vh" }}>
    <Header className="header">
      <img src={img} className="img"></img>
      <div className="logo" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>学不会平台</div>
      <Navbar_student />
    </Header>

    <Content >
      {(announcement == null) ? null : <AnnouncementInfo info={announcement} />}
    </Content>
    <Footer>
    </Footer>
  </Layout>)
}

export default AnnouncementStudentPage
