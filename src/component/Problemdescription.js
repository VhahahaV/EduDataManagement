import React from "react"
import { Descriptions } from "antd"

const Problemdescription = (props) => {
  const data = props.data
  const statics = props.statics

  return (
    <div>
      <Descriptions title="题目信息">
        <Descriptions.Item label="题目ID" style={{ display: "block" }}>
          {data.id}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions>
        <Descriptions.Item label="题目难度" style={{ display: "block" }}>
          {data.difficulty}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions>
        <Descriptions.Item label="题目通过数量" style={{ display: "block" }}>
          {statics.AC}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions>
        <Descriptions.Item label="题目尝试数量" style={{ display: "block" }}>
          {statics.AC + statics.WA + statics.TLE + statics.MLE + statics.RE + statics.CE}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions>
        <Descriptions.Item label="题目通过率" style={{ display: "block" }}>
          {(statics.AC * 100 / (statics.AC + statics.WA + statics.TLE + statics.MLE + statics.RE + statics.CE)).toFixed(2) + "%"}
        </Descriptions.Item>
      </Descriptions>
    </div >
  )
}

export default Problemdescription