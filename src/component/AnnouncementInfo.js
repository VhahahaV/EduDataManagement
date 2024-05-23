import React from "react"
import { Card } from "antd"

const AnnouncementInfo = (props) => {
  const info = props.info

  return <Card title={info.title} style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive", margin: "64px 64px", backgroundColor: "#fff", padding: "32px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)" }}>
    {info.content}
  </Card>
}

export default AnnouncementInfo
