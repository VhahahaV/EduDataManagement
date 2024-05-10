import React, { useState } from "react"
import Navbar from "../component/Navbar"
import { Layout, Card } from "antd"
import "../App.css"
import { useSearchParams } from "react-router-dom"
import img from "../assets/logo.gif"
import { useEffect } from "react"
import { getAnnouncementById } from "../service/announcement"
import AnnouncementInfo from "../component/AnnouncementInfo"

const { Header, Content, Footer } = Layout

const AnnouncementPage = (props) => {
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
      <div className="logo" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>CodeArena</div>
      <Navbar />
    </Header>

    <Content >
      {(announcement == null) ? null : <AnnouncementInfo info={announcement} />}
    </Content>
    <Footer>
    </Footer>
  </Layout>)
}

export default AnnouncementPage
