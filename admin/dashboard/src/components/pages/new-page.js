import React, { useState, useContext } from "react";
// import QuillTextEditor from "../QuillTextEditor";
import LeftNavbar from "../navbar/left-navbar";
import TopNavbar from "../navbar/top-navbar";
import PageFooter from "../footer";
import { UserContext } from "../../context/userContext";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_PAGES, GET_CATEGORIES } from "../../graphql/query";
import three_dots from "../../assets/img/three-dots.svg";

// ===== Import EditorJS =====
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./tools";

import {
  Form,
  Icon,
  Input,
  Button,
  Row,
  Col,
  Upload,
  Select,
  Layout,
  message,
  InputNumber
} from "antd";

// ===== Query and Mutation Section =====
import { CREATE_PAGE } from "../../graphql/mutation";

const FormItem = Form.Item;
const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;

const children = [];

function NewPage(props) {
  const { getFieldDecorator } = props.form;

  const [createPage] = useMutation(CREATE_PAGE);

  // ===== state management =====
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const { refetch: pageRefetch } = useQuery(GET_PAGES);

  // ===== User Context Section =====
  const userData = useContext(UserContext);

  // ===== EditorJS =====
  const editorJsRef = React.useRef(null);
  const handleSubmit = React.useCallback(async () => {
    const savedData = await editorJsRef.current.save();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        createPage({
          variables: {
            ...values,
            description: JSON.stringify(savedData),
            sectionNumber: values.sectionNumber.toString()
          }
        })
          .then(async () => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 3000);
            props.form.resetFields();
            pageRefetch();
            await message.success("Page created successfully.", 3);
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  }, []);

  const uploadImage = {
    name: "file",
    multiple: false,
    action: "http://localhost:8080/upload/image",
    defaultFileList: image,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        setImage(info.file.name.replace(/\s+/g, "-").toLowerCase());
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  const DisplayCategories = () => {
    const { error, loading, data } = useQuery(GET_CATEGORIES);
    if (error) console.log(error);
    if (loading) return "Loading ...";
    if (data.categories.length === 0) {
      message.error("Please create a category.", 5);
      return (
        <Form.Item label="Categories">
          {getFieldDecorator("category", {
            rules: [
              {
                required: true,
                message: "Please select your category!"
              }
            ]
          })(<Select placeholder="No Category"></Select>)}
        </Form.Item>
      );
    } else {
      return (
        <Form.Item label="Page">
          {getFieldDecorator("category", {
            rules: [
              {
                required: true,
                message: "Please select your category!"
              }
            ],
            initialValue: data.categories[0].title
          })(
            <Select placeholder="Please select the category" size="large">
              {data.categories.map(cate => {
                return (
                  <Option value={cate.title} key={cate.id}>
                    {cate.title}
                  </Option>
                );
              })}
            </Select>
          )}
        </Form.Item>
      );
    }
  };

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
              {/* <h1 className="koompi-title-brand">KOOMPI</h1> */}
              <h1 className="title_new_post">New Page</h1>
              <Form className="login-form">
                <Row gutter={[24, 8]}>
                  <Col span={16}>
                    <FormItem label="Title: ">
                      {getFieldDecorator("title", {
                        rules: [
                          {
                            required: true,
                            message: "The title is required"
                          }
                        ]
                      })(<Input size="large" />)}
                    </FormItem>

                    <FormItem label="SubTitle: ">
                      {getFieldDecorator("subTitle")(<Input size="large" />)}
                    </FormItem>

                    <FormItem label="Created By: " style={{ display: "none" }}>
                      {getFieldDecorator("created_by", {
                        rules: [
                          {
                            required: true,
                            message: "The user name is required"
                          }
                        ],
                        initialValue: userData.user.fullname
                      })(<Input placeholder="SAN Vuthy" size="large" />)}
                    </FormItem>

                    <FormItem label="Description: ">
                      <EditorJs
                        instanceRef={instance =>
                          (editorJsRef.current = instance)
                        }
                        tools={EDITOR_JS_TOOLS}
                        placeholder="Let's write an awesome story!"
                      />
                    </FormItem>
                  </Col>

                  <Col span={8}>
                    {/* ======= Drag and Drop Image ======= */}
                    <FormItem label="Image">
                      <Upload.Dragger {...uploadImage}>
                        {image ? (
                          <img
                            src={`${"http://localhost:8080/public/uploads/" +
                              `${image}`}`}
                            alt="avatar"
                            style={{ width: "100%" }}
                          />
                        ) : (
                          <p className="ant-upload-drag-icon">
                            <Icon type="file-image" />
                          </p>
                        )}
                      </Upload.Dragger>
                      <div style={{ display: "none" }}>
                        {getFieldDecorator("image", {
                          rules: [
                            {
                              required: true,
                              message: "Image is required"
                            }
                          ],
                          initialValue: "/public/uploads/" + image
                        })(<Input size="large" />)}
                      </div>
                    </FormItem>

                    <Row gutter={16}>
                      <Col span={12}>
                        {/* ======= Section Number ======= */}
                        <FormItem label="Section Number: ">
                          {getFieldDecorator("sectionNumber", {
                            rules: [
                              {
                                required: true,
                                message: "The Section Number is required"
                              }
                            ],
                            initialValue: 1
                          })(
                            <InputNumber
                              min={1}
                              size="large"
                              style={{ width: "100%" }}
                            />
                          )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        {/* ======= Category Sections ======= */}
                        <DisplayCategories />
                      </Col>
                    </Row>

                    {/* ======= SEO and Keywords ======= */}
                    <FormItem label="SEO or Keywords">
                      {getFieldDecorator("keywords", {
                        rules: [
                          {
                            required: true,
                            message: "The keywords is required"
                          }
                        ]
                      })(
                        <Select
                          mode="tags"
                          style={{ width: "100%" }}
                          size="large"
                        >
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
                            message: "The Meta Description is required"
                          }
                        ]
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
  );
}

export default Form.create()(NewPage);
