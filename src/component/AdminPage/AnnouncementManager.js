import { Space, Table, Button, Modal, Form, Input, message } from "antd"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { addAnnouncement, deleteAnnouncement, getAnnouncement, updateAnnouncement } from "../../service/announcement"


const AnnouncementManager = (props) => {

  const { Textarea } = Input
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "发布时间",
      dataIndex: "time",
      key: "time"
    },
    {
      title: "公告作者",
      dataIndex: "username",
      key: "username"
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

  const [announcements, setAnnouncements] = useState([])
  const [visible, setVisible] = useState(false)
  const [add, setAdd] = useState(false)
  const [form] = Form.useForm()
  const [form2] = Form.useForm()
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

  const handleaddOK = () => {
    form2.submit()
    setAdd(false)
  }

  const handleaddCancel = () => {
    setAdd(false)
  }

  const handleAdd = () => {
    setAdd(true)
  }

  const onFinishadd = (values) => {
    console.log(values)
    addAnnouncement(values, (result) => {
      console.log(result)
      if (result.code === 200) {
        message.success("增加成功")
        getAnnouncement((result) => {
          setAnnouncements(result.data)
        })
      }
      else {
        message.error("增加失败")
      }
    })
  }

  const onFinish = (values) => {
    delete values.username
    delete values.time
    console.log(values)
    updateAnnouncement(values, (result) => {
      console.log(result)
      if (result.code === 200) {
        message.success("更改成功")
        getAnnouncement((result) => {
          setAnnouncements(result.data)
        })
      } else {
        message.error("更改失败")
      }
    })
  }

  const onDelete = (values) => {
    delete values.username
    delete values.time
    deleteAnnouncement(values, (result) => {
      console.log(result)
      if (result.code === 200) {
        message.success("删除成功")
        getAnnouncement((result) => {
          setAnnouncements(result.data)
        })
      } else {
        message.error("删除失败")
      }
    })
  }

  useEffect(() => {
    getAnnouncement((result) => {
      if (result.code === 1) {
        setAnnouncements(result.data)
      } else {
        console.log(result.msg)
      }
    })
  }, [])
  return <div>
    <Button style={{ margin: "10px 10px 10px 10px" }} onClick={handleAdd}>+ 新增公告</Button>
    <Table columns={columns} dataSource={announcements}></Table>
    <Modal title="Edit Item" visible={visible} onOk={handleOk} onCancel={handleCancel}>
      <Form form={form} onFinish={onFinish}>
        <Form.Item label="ID" name="id">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Time" name="time">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Author" name="username">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Title" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="Detail" name="detail">
          <Input.TextArea rows={4} showCount />
        </Form.Item>
      </Form>
    </Modal>
    <Modal title="Add Item" visible={add} onCancel={handleaddCancel} onOk={handleaddOK}>
      <Form form={form2} onFinish={onFinishadd}>
        <Form.Item label="Title" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="Detail" name="detail">
          <Input.TextArea rows={4} showCount />
        </Form.Item>
      </Form>
    </Modal>
  </div>
}

export default AnnouncementManager