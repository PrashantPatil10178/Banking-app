import React, { useState } from "react";
import { createNewUser } from "../api/bankAPI";
import { Form, Input, Button, message, Card } from "antd";
import { UserAddOutlined, CloseOutlined } from "@ant-design/icons";

const CreateNewUser = ({ setUsers }) => {
  const [form] = Form.useForm();
  const [showForm, setShowForm] = useState(false);
  const [creationConfirmed, setCreationConfirmed] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const toggleCreate = () => {
    setShowForm(!showForm);
    setCreationConfirmed(false);
    form.resetFields();
  };

  const handleConfirmCreateNewUser = (values) => {
    setLoading(true); // Start loading
    createNewUser(values)
      .then((response) => {
        message.success("User created successfully!");
        setCreationConfirmed(true);
        setUsers((prevUsers) => [...prevUsers, response.data]);
      })
      .catch((error) => {
        message.error("Error creating user");
        console.error("Error creating user", error);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  const handleCancelCreateNewUser = () => {
    form.resetFields();
    setShowForm(false);
  };

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      {!creationConfirmed && (
        <>
          {showForm ? (
            <Card
              title="Create New User"
              style={{
                maxWidth: 400,
                margin: "0 auto",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Form
                form={form}
                layout="vertical"
                onFinish={handleConfirmCreateNewUser}
              >
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    { required: true, message: "Please input the first name!" },
                  ]}
                >
                  <Input placeholder="Enter first name" />
                </Form.Item>

                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[
                    { required: true, message: "Please input the last name!" },
                  ]}
                >
                  <Input placeholder="Enter last name" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please input a valid email!",
                    },
                  ]}
                >
                  <Input placeholder="Enter email" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<UserAddOutlined />}
                    block
                    loading={loading} // Show loading spinner
                  >
                    Create User
                  </Button>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="default"
                    onClick={handleCancelCreateNewUser}
                    icon={<CloseOutlined />}
                    block
                  >
                    Cancel
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          ) : (
            <Button
              type="primary"
              onClick={toggleCreate}
              icon={<UserAddOutlined />}
              size="large"
              style={{ borderRadius: "8px" }} // Add a slight border radius
            >
              Create New User
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default CreateNewUser;
