import React, { useState, useContext } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import LeftNavbar from "../navbar/left-navbar"
import TopNavbar from "../navbar/top-navbar"
import PageFooter from "../footer"
import { UserContext } from "../../context/userContext"
import QuillTextEditor from "../QuillTextEditor"
import three_dots from "../../assets/img/three-dots.svg"

// ===== Import EditorJS =====
import EditorJs from "react-editor-js"
import { EDITOR_JS_TOOLS } from "./tools"
import slugify from "slugify"

// ===== Query and Mutation Section =====
import { GET_CATEGORIES, GET_POSTS } from "../../graphql/query"
import { CREATE_POST } from "../../graphql/mutation"
import _ from "lodash"

import { Form, Input, Button, Row, Col, Upload, Select, Layout, message } from "antd"

const FormItem = Form.Item
const { Content } = Layout
const { TextArea } = Input
const { Option } = Select

const children = []

function NewPost(props) {
  const { getFieldDecorator } = props.form

  // ===== State Management =====
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState("")
  const [desc, setDesc] = useState("")

  // ===== User Context Section =====
  const userData = useContext(UserContext)

  const { refetch: categoryRefetch } = useQuery(GET_CATEGORIES)
  const { refetch: postsRefetch } = useQuery(GET_POSTS)
  const [createPost] = useMutation(CREATE_POST)

  const handleDescChange = (value) => {
    setDesc(value)
  }

  const DisplayCategories = () => {
    const { error, loading, data } = useQuery(GET_CATEGORIES)
    if (error) console.log(error)
    if (loading) return "Loading ..."
    if (data.categories.length === 0) {
      message.error("Please create a category.", 5)
      return (
        <Form.Item label="Categories">
          {getFieldDecorator("category", {
            rules: [
              {
                required: true,
                message: "Please select your category!",
              },
            ],
          })(<Select placeholder="No Category"></Select>)}
        </Form.Item>
      )
    } else {
      const filtered_pages = _.filter(data.categories, function (p) {
        return _.includes(["news", "events"], p.slug)
      })

      return (
        <Form.Item label="Categories">
          {getFieldDecorator("category", {
            rules: [
              {
                required: true,
                message: "Please select your category!",
              },
            ],
            initialValue: filtered_pages[0].title,
          })(
            <Select placeholder="Please select the category" size="large">
              {filtered_pages.map((cate) => {
                return (
                  <Option value={cate.title} key={cate.id}>
                    {cate.title}
                  </Option>
                )
              })}
            </Select>
          )}
        </Form.Item>
      )
    }
  }

  const uploadImage = {
    name: "file",
    multiple: false,
    action: "https://admin.koompi.com/upload/image",
    defaultFileList: image,
    onChange(info) {
      const { status } = info.file
      if (status !== "uploading") {
        console.log(info.file, info.fileList)
      }
      if (status === "done") {
        setImage(info.file.name.replace(/\s+/g, "-").toLowerCase())
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  // ===== EditorJS =====
  const editorJsRef = React.useRef(null)
  const handleSubmit = () => {
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        createPost({
          variables: {
            ...values,
            slug: slugify(values.title, { lower: true }),
            description: desc === "" ? null : desc,
          },
        })
          .then(async (res) => {
            setLoading(true)
            setTimeout(() => {
              setLoading(false)
            }, 3000)
            setDesc("")
            categoryRefetch()
            postsRefetch()
            props.form.resetFields()
            await message.success(res.data.create_post.message, 3)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    })
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* =========Left Navbar ======= */}
      <LeftNavbar />
      <Layout>
        {/* =========Top Navbar ======= */}
        <TopNavbar />

        <Content style={{ margin: "20px 16px" }}>
          {/* ======= Display content ====== */}
          <div className="koompi container">
            <div className="background_container">
              <h1 className="title_new_post">New Post</h1>

              <Form className="login-form">
                <Row gutter={[24, 8]}>
                  <Col span={16}>
                    <FormItem label="Title">
                      {getFieldDecorator("title", {
                        rules: [
                          {
                            required: true,
                            message: "The title is required",
                          },
                        ],
                      })(<Input size="large" />)}
                    </FormItem>

                    <FormItem label="Created By: " style={{ display: "none" }}>
                      {getFieldDecorator("created_by", {
                        rules: [
                          {
                            required: true,
                            message: "The user name is required",
                          },
                        ],
                        initialValue: userData.user.fullname,
                      })(<Input placeholder="SAN Vuthy" size="large" />)}
                    </FormItem>

                    <FormItem label="Description: ">
                      {/* <EditorJs
                        instanceRef={(instance) => (editorJsRef.current = instance)}
                        tools={EDITOR_JS_TOOLS}
                        placeholder="Let's write an awesome story!"
                      /> */}
                      <QuillTextEditor
                        handleDescChange={handleDescChange}
                        defaultValue={desc}
                      />
                    </FormItem>
                  </Col>

                  <Col span={8}>
                    {/* ======= Drag and Drop Image ======= */}

                    <FormItem label="Thumnail">
                      <Upload.Dragger {...uploadImage}>
                        {image ? (
                          <img
                            src={`${
                              "https://admin.koompi.com/public/uploads/" + `${image}`
                            }`}
                            alt="avatar"
                            style={{ width: "100%" }}
                          />
                        ) : (
                          <img
                            src="/images/no-image.jpg"
                            alt="koompi"
                            width="100%"
                          />
                        )}
                      </Upload.Dragger>
                      <div style={{ display: "none" }}>
                        {getFieldDecorator("thumnail", {
                          rules: [
                            {
                              required: true,
                              message: "Thumnail is required",
                            },
                          ],
                          initialValue: "/public/uploads/" + image,
                        })(<Input size="large" />)}
                      </div>
                    </FormItem>

                    {/* ======= Category Sections ======= */}
                    <DisplayCategories />

                    {/* ======= Tags ======= */}
                    <FormItem label="Tags">
                      {getFieldDecorator("tags", {
                        rules: [
                          {
                            required: true,
                            message: "The tags is required",
                          },
                        ],
                      })(
                        <Select mode="tags" style={{ width: "100%" }} size="large">
                          {children}
                        </Select>
                      )}
                    </FormItem>

                    {/* ======= SEO and Keywords ======= */}
                    <FormItem label="SEO or Keywords">
                      {getFieldDecorator("keywords", {
                        rules: [
                          {
                            required: true,
                            message: "The keywords is required",
                          },
                        ],
                      })(
                        <Select mode="tags" style={{ width: "100%" }} size="large">
                          {children}
                        </Select>
                      )}
                    </FormItem>

                    {/* ======= Post Description ======= */}
                    <FormItem label="Meta Description: ">
                      {getFieldDecorator("meta_desc", {
                        rules: [
                          {
                            required: true,
                            message: "The Meta Description is required",
                          },
                        ],
                      })(<TextArea rows={4} />)}
                    </FormItem>

                    <div style={{ float: "right" }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        className="btnSubmit"
                        disabled={loading ? true : false}
                        onClick={handleSubmit}
                      >
                        {loading ? (
                          <img src={three_dots} alt="btn-loading" height="10" />
                        ) : (
                          "Submit"
                        )}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </Content>
        <PageFooter />
      </Layout>
    </Layout>
  )
}

export default Form.create()(NewPost)
