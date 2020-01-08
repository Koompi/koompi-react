import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import QuillTextEditor from "../QuillTextEditor";
import LeftNavbar from "../navbar/left-navbar";
import TopNavbar from "../navbar/top-navbar";
import PageFooter from "../footer";
import { UserContext } from "../../context/userContext";
import three_dots from "../../assets/img/three-dots.svg";
// ===== Query and Mutation Section =====
import { GET_CATEGORIES, GET_POST, GET_POSTS } from "../../graphql/query";
import { UPDATE_POST } from "../../graphql/mutation";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Upload,
  Select,
  Layout,
  message
} from "antd";

const FormItem = Form.Item;
const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;

const children = [];

function EditPost(props) {
  const { getFieldDecorator } = props.form;
  //   ===== Global Data =====
  const { loading: postLoading, data: postData } = useQuery(GET_POST, {
    variables: { id: window.location.pathname.split("/")[4] }
  });

  // ===== State Management =====
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  // ===== User Context Section =====
  const userData = useContext(UserContext);

  const { refetch: postRefetch } = useQuery(GET_POSTS);
  const [updatePost] = useMutation(UPDATE_POST);

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
        <Form.Item label="Categories">
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

  const handleDescChange = value => {
    setDescription(value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);

        updatePost({
          variables: {
            id: window.location.pathname.split("/")[4],
            ...values
          }
        })
          .then(async () => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 3000);
            postRefetch();
            await message.success("Post updated successfully.", 3);
            await props.history.push("/admin/all-posts");
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

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

  if (postLoading) {
    return "Loading...";
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
              <h1 className="title_new_post">Update Post</h1>

              <Form className="login-form" onSubmit={handleSubmit}>
                <Row gutter={[24, 8]}>
                  <Col span={16}>
                    <FormItem label="Title">
                      {getFieldDecorator("title", {
                        rules: [
                          {
                            required: true,
                            message: "The title is required"
                          }
                        ],
                        initialValue: postData.post.title
                      })(<Input size="large" />)}
                    </FormItem>

                    {/* ======= Category Sections ======= */}
                    <DisplayCategories />

                    <FormItem label="Updated By: " style={{ display: "none" }}>
                      {getFieldDecorator("updated_by", {
                        rules: [
                          {
                            required: true,
                            message: "The user name is required"
                          }
                        ],
                        initialValue: userData.user.fullname
                      })(<Input size="large" />)}
                    </FormItem>

                    <FormItem label="update at: " style={{ display: "none" }}>
                      {getFieldDecorator("updated_at", {
                        rules: [
                          {
                            required: true,
                            message: "The user name is required"
                          }
                        ],
                        initialValue: new Date().toISOString()
                      })(<Input size="large" />)}
                    </FormItem>

                    <FormItem label="Description: ">
                      {getFieldDecorator("description", {
                        rules: [
                          {
                            required: true
                          }
                        ],
                        initialValue: postLoading
                          ? ""
                          : description === ""
                          ? postData.post.description
                          : description
                      })(
                        <div>
                          <QuillTextEditor
                            defaultValue={
                              postLoading
                                ? "Loading ..."
                                : postData.post.description
                            }
                            handleDescChange={handleDescChange}
                          />
                        </div>
                      )}
                    </FormItem>
                    <div>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        // disabled=
                      >
                        {loading ? (
                          <img src={three_dots} alt="btn-loading" height="10" />
                        ) : (
                          "Update"
                        )}
                      </Button>
                    </div>
                  </Col>

                  <Col span={8}>
                    {/* ======= Drag and Drop Image ======= */}

                    <FormItem label="Thumnail">
                      <Upload.Dragger {...uploadImage}>
                        {image === null ? (
                          <img
                            src={`${"http://localhost:8080" +
                              postData.post.thumnail}`}
                            alt="avatar"
                            style={{ width: "100%" }}
                          />
                        ) : (
                          <img
                            src={`${"http://localhost:8080/public/uploads/" +
                              image}`}
                            alt="avatar"
                            style={{ width: "100%" }}
                          />
                        )}
                      </Upload.Dragger>
                      <div style={{ display: "none" }}>
                        {getFieldDecorator("thumnail", {
                          rules: [
                            {
                              required: true,
                              message: "Thumnail is required"
                            }
                          ],
                          initialValue:
                            image === null
                              ? postData.post.thumnail
                              : "/public/uploads/" + image
                        })(<Input size="large" />)}
                      </div>
                    </FormItem>

                    {/* ======= Tags ======= */}
                    <FormItem label="Tags">
                      {getFieldDecorator("tags", {
                        rules: [
                          {
                            required: true,
                            message: "The tags is required"
                          }
                        ],
                        initialValue: postLoading ? "" : postData.post.tags
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

                    {/* ======= SEO and Keywords ======= */}
                    <FormItem label="SEO or Keywords">
                      {getFieldDecorator("keywords", {
                        rules: [
                          {
                            required: true,
                            message: "The keywords is required"
                          }
                        ],
                        initialValue: postLoading ? "" : postData.post.keywords
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
                        ],
                        initialValue: postLoading ? "" : postData.post.meta_desc
                      })(<TextArea rows={4} />)}
                    </FormItem>
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

export default Form.create()(EditPost);
