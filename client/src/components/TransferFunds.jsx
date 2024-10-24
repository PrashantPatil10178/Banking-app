import React, { useState } from "react";
import { transferMoney } from "../api/bankAPI";
import {
  Input,
  Button,
  Modal,
  List,
  message,
  Spin,
  Typography,
  Card,
  Space,
} from "antd";
import { DollarOutlined, UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function TransferFunds({
  selectedUser = { firstName: "John", lastName: "Doe", accountId: "123" },
  users = [],
  setCurrentAction = () => {},
}) {
  const [transferAmount, setTransferAmount] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [targetUser, setTargetUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTransferAmount = (value) => {
    setTransferAmount(value);
  };

  const handleTransferTarget = async () => {
    try {
      setLoading(true);
      await transferMoney(
        selectedUser.accountId,
        targetUser.accountId,
        transferAmount
      );
      message.success(
        `Transferred $${transferAmount} to ${targetUser.firstName} ${targetUser.lastName}`
      );
      setCurrentAction("");
    } catch (error) {
      message.error("Error transferring funds. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
      setShowConfirmation(false);
    }
  };

  const handleConfirmTransfer = () => {
    if (transferAmount <= 0) {
      message.error("Transfer amount must be greater than zero.");
      return;
    }
    setShowConfirmation(true);
  };

  const handleTransferCancel = () => {
    setShowConfirmation(false);
    setTransferAmount(0);
    setTargetUser(null);
  };

  return (
    <Card style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Title level={2}>Transfer Funds</Title>

        <Space direction="vertical" style={{ width: "100%" }}>
          <Text strong>Enter transfer amount:</Text>
          <Input
            type="number"
            min="0"
            value={transferAmount}
            onChange={(e) => handleTransferAmount(Number(e.target.value))}
            placeholder="Enter transfer amount"
            prefix={<DollarOutlined />}
            style={{ width: "100%" }}
          />
        </Space>

        <Space direction="vertical" style={{ width: "100%" }}>
          <Text strong>Select target user to transfer funds to:</Text>
          <List
            bordered
            dataSource={users.filter((user) => user._id !== selectedUser._id)}
            renderItem={(user) => (
              <List.Item
                onClick={() => {
                  setTargetUser(user);
                  handleConfirmTransfer();
                }}
                style={{
                  cursor: "pointer",
                  background:
                    targetUser?._id === user._id ? "#f0f0f0" : "transparent",
                }}
              >
                <UserOutlined /> {user.firstName} {user.lastName}
              </List.Item>
            )}
            style={{ textAlign: "left" }}
          />
        </Space>
      </Space>

      <Modal
        title="Confirm Transfer"
        visible={showConfirmation}
        onOk={handleTransferTarget}
        onCancel={handleTransferCancel}
        okText="Confirm"
        cancelText="Cancel"
        confirmLoading={loading}
      >
        {targetUser && (
          <p>
            Transfer ${transferAmount} from {selectedUser.firstName}{" "}
            {selectedUser.lastName} to {targetUser.firstName}{" "}
            {targetUser.lastName}?
          </p>
        )}
      </Modal>
    </Card>
  );
}
