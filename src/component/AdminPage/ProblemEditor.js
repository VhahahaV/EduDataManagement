import { UploadOutlined } from "@ant-design/icons"
import { Button, Divider, Form, Input, Radio, Upload, message } from "antd"
import React, { useState } from "react"
import { addProblem, uploadTestCase } from "../../service/problem"
import { redirect } from "react-router-dom"

const { TextArea } = Input

const ProblemEditor = (props) => {
  const [loading, setLoading] = useState(false)

  const [resetform, setResetform] = useState(false)

  const template = "## 问题描述 \n\n## 输入格式 \n\n## 输入样例 \n\n## 输出格式 \n\n## 输出样例 \n\n## 其它要求"

  return <div style={{ width: "100%" }}>
    <Form
      key={resetform ? 'reset' : 'normal'}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={(values) => {
        setLoading(true)
        let testCase = values.testCase
        values.testCase = null
        addProblem(values, (result) => {
          if (result.code === 1) {
            let f = testCase.file.originFileObj
            let formData = new FormData()
            formData.append("file", f)
            formData.append("problemId", result.data)
            uploadTestCase(result.data, formData, (result) => {
              console.log(result)
              setLoading(false)
              message.info("添加成功")
              setResetform(true)
            })
          } else {
            setLoading(false)
          }

        })
      }}
    >
      <Form.Item name="name" label="标题" rules={[{ required: "true" }]}>
        <Input />
      </Form.Item>
      <Form.Item name="difficulty" label="难度" rules={[{ required: "true" }]}>
        <Radio.Group>
          <Radio value={"简单"}>简单</Radio>
          <Radio value={"中等"}>中等</Radio>
          <Radio value={"困难"}>困难</Radio>
        </Radio.Group>
      </Form.Item>
      <Divider />
      <Form.Item name="description" label="描述" initialValue={template}
        rules={[{ required: "true" }]}>
        <TextArea rows={8} />
      </Form.Item>
      <Form.Item name="testCase" label="测试用例" rules={[{ required: "true" }]}>
        <Upload>
          <Button icon={<UploadOutlined />}>上传</Button>
        </Upload>
      </Form.Item>
      <Divider />
      <Button loading={loading} type="primary" htmlType="submit" style={{ float: "right" }}>
        submit
      </Button>
    </Form>
  </div>
}

export default ProblemEditor
