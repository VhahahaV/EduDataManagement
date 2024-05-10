import { Space, Table, Button, Modal, Form, Input, message, Upload } from "antd"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { deleteProblem, deleteTestCase, getProblems, modifyProblem, uploadTestCase } from "../../service/problem"
import { UploadOutlined } from "@ant-design/icons"


const EditManager = (props) => {

  const { Textarea } = Input
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "题目名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "题目难度",
      dataIndex: "difficulty",
      key: "difficulty"
    },
    {
      title: "操作",
      key: 'action',
      render: (_, record) => {
        return <Space>
          <Button onClick={() => { handleEdit(record) }} ghost type="primary" style={{ color: "#000", border: "1px solid #000" }}>编辑</Button>
          <Button onClick={() => { onDelete(record) }} ghost type="primary" style={{ color: "#000", border: "1px solid #000" }}>删除</Button>
        </Space>
      }
    }
  ]

  const [data, setData] = useState([])
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const handleEdit = (record) => {
    form.setFieldsValue(record)
    setVisible(true)
  }

  const handleOk = () => {
    form.submit()
    setVisible(false)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const onFinish = (values) => {
    delete values.username
    delete values.time
    let testcase = values.testCase
    values.testCase = null
    console.log(values)
    modifyProblem(values, (result) => {
      console.log(result)
      if (result.code === 1) {
        let f = testcase.file.originFileObj
        let formData = new FormData()
        formData.append("file", f)
        formData.append("problemId", values.id)
        uploadTestCase(values.id, formData, (result) => {
          console.log(result)
          message.success("更改成功")
        })
        getProblems((result) => {
          setData(result.data)
        })
      } else {
        message.error("更改失败")
      }
    })
  }

  const onDelete = (values) => {
    const id = values.id
    console.log(id)
    delete values.name
    delete values.description
    delete values.difficulty
    console.log(values)
    deleteProblem(values, (result) => {
      console.log(result)
      if (result.code === 1) {
        message.success("删除成功")
        deleteTestCase({ "problemId": id }, (result) => {
          console.log(result)
        })
        getProblems((result) => {
          setData(result.data)
        })
      } else {
        message.error("删除失败")
      }
    })
  }

  useEffect(() => {
    getProblems((result) => {
      if (result.code === 1) {
        console.log(result.data)
        setData(result.data)
      } else {
        console.log(result.msg)
      }
    })
  }, [])
  return <div>
    <Table columns={columns} dataSource={data}></Table>
    <Modal title="Edit Item" visible={visible} onOk={handleOk} onCancel={handleCancel}>
      <Form form={form} onFinish={onFinish}>
        <Form.Item label="ID" name="id">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Difficulty" name="difficulty">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={8} showCount />
        </Form.Item>
        <Form.Item name="testCase" label="Reupload testcase">
          <Upload>
            <Button icon={<UploadOutlined />}>上传</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  </div>
}

export default EditManager