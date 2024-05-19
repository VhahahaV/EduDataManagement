import React, { useState } from "react"
import { Button, Card, Form, Input, Menu, message, Layout } from "antd"
import { Link } from "react-router-dom"
import Navbar from "../component/Navbar"
import img from "../assets/logo.gif"

const { Header, Content, Footer, Sider } = Layout

const LoginPage = (props) => {


  const [currentKey, setCurrentKey] = useState("teacher")

  const menuItems = [
    {
      label: "Student",
      key: "student",
    },
    {
      label: "Teacher",
      key: "teacher"
    },
    {
      label: "Register",
      key: "register",
    },
  ]

  const onClickMenu = (e) => {
    console.log(e)
    setCurrentKey(e.key)
  }

  return (<Layout style={{ minHeight: "100vh" }}>
    <Header className="header">
      <img src={img} className="img"></img>
      <div className="logo" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>CodeArena</div>
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
            <ContentBox currentKey={currentKey} />
          </div>
        </Card>
      </Layout>
    </Content>
    <Footer>
    </Footer>
  </Layout>)
}

function ContentBox (props) {
  if (props.currentKey === "student") {
    return <LoginBox_Student />
  } else if (props.currentKey === "teacher") {
    return <LoginBox_Teacher />
  } else {
    return <RegisterBox />
  }
}

function LoginBox_Student (props) {
  const [messageApi, contextHolder] = message.useMessage()

  // const onFinish = (values) => {
  //   login(values, (result) => {
  //     const code = result.code
  //     const msg = result.msg
  //     const token = result.data
  //     if (code !== undefined && code === 1) {
  //       messageApi.info("success")
  //       setCookie("token", token, 1000 * 60)
  //       setTimeout(() => {
  //         window.location.href = "/"
  //       }, 1000)
  //     } else {
  //       if (msg !== undefined) {
  //         messageApi.info(msg)
  //       } else {
  //         messageApi.info("error")
  //       }
  //     }
  //   })
  // }

  return (
    <>
      {contextHolder}
      <Form
        //onFinish={onFinish}
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
          <Link to={{ pathname: "/homeStudent" }}>
            <Button type="primary" htmlType="submit">
              学生登录
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </>

  )
}

function LoginBox_Teacher (props) {
  const [messageApi, contextHolder] = message.useMessage()

  // const onFinish = (values) => {
  //   login(values, (result) => {
  //     const code = result.code
  //     const msg = result.msg
  //     const token = result.data
  //     if (code !== undefined && code === 1) {
  //       messageApi.info("success")
  //       setCookie("token", token, 1000 * 60)
  //       setTimeout(() => {
  //         window.location.href = "/"
  //       }, 1000)
  //     } else {
  //       if (msg !== undefined) {
  //         messageApi.info(msg)
  //       } else {
  //         messageApi.info("error")
  //       }
  //     }
  //   })
  // }

  return (
    <>
      {contextHolder}
      <Form
        //onFinish={onFinish}
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
          <Link to={{ pathname: "/home" }}>
            <Button type="primary" htmlType="submit">
              教师登录
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </>

  )
}


function RegisterBox () {
  const [messageApi, contextHolder] = message.useMessage()

  // const onFinish = (values) => {

  //   register(values, (result) => {
  //     const code = result.code
  //     const msg = result.msg
  //     if (code !== undefined && code === 1) {
  //       messageApi.info("success")
  //       setTimeout(() => {
  //         window.location.reload()
  //       }, 1000)
  //     } else {
  //       if (msg !== undefined) {
  //         messageApi.info(msg)
  //       } else {
  //         messageApi.info("error")
  //       }
  //     }
  //   })

  // }

  return (
    <>
      {contextHolder}
      <Form
        //onFinish={onFinish}
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
        <Form.Item label="Mail" name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="phone" name="phone"
          rules={[
            {
              required: true,
              message: 'please input your phone number'
            },
            {
              pattern: /^1[3-9][0-9]{9}$/,
              message: "please input your phone number"
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item label="Username" name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!'
            },
            {
              min: 3,
              message: "min length is 3"
            },
            {
              max: 12,
              message: "max length is 12"
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              min: 6,
              message: "min length is 6"
            },
            {
              max: 12,
              message: "max length is 12"
            }
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="Repeat" name="repeat"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator (_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'))
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Link to={{ pathname: "/home" }}>
            <Button type="primary" htmlType="submit">
              注册
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </>
  )
}

export default LoginPage
