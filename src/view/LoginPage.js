import React, { useEffect, useState } from "react"
import { Button, Card, Form, Input, Menu, message, Layout } from "antd"
import { Link } from "react-router-dom"
import Navbar from "../component/Navbar"
import img from "../assets/logo.gif"
import { getAllTeachers, getStudents } from "../service/students"

const { Header, Content, Footer, Sider } = Layout

const LoginPage = (props) => {
  const [messageApi, contextHolder] = message.useMessage()
  const [currentKey, setCurrentKey] = useState("teacher")
  const [teachers, setTeachers] = useState([])
  const [students, setStudents] = useState([])

  useEffect(() => {
    getAllTeachers((data) => {
      setTeachers(data.data)
    })
  }, [])

  useEffect(() => {
    getStudents((data) => {
      setStudents(data.data)
    })
  })

  const menuItems = [
    {
      label: "Student",
      key: "student",
    },
    {
      label: "Teacher",
      key: "teacher"
    }
  ]

  const onClickMenu = (e) => {
    console.log(e)
    setCurrentKey(e.key)
  }

  const onFinish1 = (values) => {
    console.log(values)
    let teacher = {}
    for (let i = 0; i < teachers.length; i++) {
      if (teachers[i].name === values.username) {
        teacher = teachers[i]
      }
    }
    if (teacher.name == null) {
      messageApi.error("no teacher")
    }
    else {
      if (teacher.passwd === values.password) {
        messageApi.success("login success")
        setTimeout(() => {
          window.location.href = "/home?teacherId=" + teacher.id
        }, 1000)
      }
      else {
        messageApi.error("wrong password!")
      }
    }
  }


  const onFinish2 = (values) => {
    console.log(values)
    let student = {}
    for (let i = 0; i < students.length; i++) {
      if (students[i].name === values.username) {
        student = students[i]
      }
    }
    if (student.name == null) {
      messageApi.error("no student")
    }
    else {
      if (student.passwd === values.password) {
        messageApi.success("login success")
        setTimeout(() => {
          window.location.href = "/homeStudent?studentId=" + student.id
        }, 1000)
      }
      else {
        messageApi.error("wrong password!")
      }
    }
  }

  return (
    teachers && students ?
      <Layout style={{ minHeight: "100vh" }}>
        <Header className="header">
          <img src={img} className="img"></img>
          <div className="logo" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>学不会平台</div>
          <Navbar />
        </Header>
        <Content>
          <Layout
            style={{
              padding: '24px 96px',
            }}
          >

            <Card style={{ width: "30vw", margin: "10vh auto" }}>
              <Menu
                items={menuItems}
                defaultSelectedKeys={["teacher"]}
                mode="horizontal"
                onClick={onClickMenu} />
              <div style={{ marginTop: "32px" }}>
                {(currentKey === "student") ?
                  <>
                    {contextHolder}
                    <Form onFinish={onFinish2}
                      labelCol={{
                        span: 8,
                      }}
                      wrapperCol={{
                        span: 16,
                      }}
                      style={{
                        maxWidth: 600,
                      }}
                    >
                      <Form.Item label="Username" name="username"
                        rules={[{ required: "true", message: "please input your username" }]}>
                        <Input />
                      </Form.Item>
                      <Form.Item label="Password" name="password"
                        rules={[{ required: "true", message: "please input your password" }]}>
                        <Input.Password />
                      </Form.Item>
                      <Form.Item
                        wrapperCol={{
                          offset: 8,
                          span: 16,
                        }}
                      >
                        <Button type="primary" htmlType="submit">
                          学生登录
                        </Button>
                      </Form.Item>
                    </Form>
                  </>
                  :
                  <>
                    {contextHolder}
                    <Form onFinish={onFinish1}
                      labelCol={{
                        span: 8,
                      }}
                      wrapperCol={{
                        span: 16,
                      }}
                      style={{
                        maxWidth: 600,
                      }}
                    >
                      <Form.Item label="Username" name="username"
                        rules={[{ required: "true", message: "please input your username" }]}>
                        <Input />
                      </Form.Item>
                      <Form.Item label="Password" name="password"
                        rules={[{ required: "true", message: "please input your password" }]}>
                        <Input.Password />
                      </Form.Item>
                      <Form.Item
                        wrapperCol={{
                          offset: 8,
                          span: 16,
                        }}
                      >
                        <Button type="primary" htmlType="submit">
                          教师登录
                        </Button>
                      </Form.Item>
                    </Form>
                  </>
                }
              </div>
            </Card>
          </Layout>
        </Content>
        <Footer>
        </Footer>
      </Layout>
      : null
  )
}

export default LoginPage
