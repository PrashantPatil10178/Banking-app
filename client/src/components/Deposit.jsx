import React, { useState } from "react";
import { depositCash } from "../api/bankAPI";
import { Input, Button, Modal, message, Card, Typography, Space } from "antd";

const { Text } = Typography;

const Deposit = ({ users, selectedUser, setCurrentAction }) => {
  const [depositAmount, setDepositAmount] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDepositAmount = (event) => {
    const value = Number(event.target.value);
    if (value < 0) {
      message.error("Deposit amount cannot be negative!");
      setDepositAmount(0);
    } else {
      setDepositAmount(value);
    }
  };

  const handleConfirmDeposit = async () => {
    const targetUser = users.find((user) => user._id === selectedUser._id);
    if (targetUser) {
      setLoading(true);
      try {
        await depositCash(
          selectedUser._id,
          selectedUser.accountId,
          depositAmount
        );
        message.success(
          `Deposited $${depositAmount} to ${targetUser.firstName} ${targetUser.lastName}`
        );
        setCurrentAction("");
      } catch (error) {
        message.error("Error depositing money. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
        setShowConfirmation(false);
      }
    } else {
      message.error("Something went wrong");
      setShowConfirmation(false);
    }
  };

  const handleDepositCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <Card
      style={{
        maxWidth: 400,
        margin: "20px auto",
        textAlign: "center",
        borderRadius: "8px",
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Text strong style={{ fontSize: "18px" }}>
          Enter amount to deposit:
        </Text>
        <Input
          type="number"
          min="0"
          value={depositAmount}
          onChange={handleDepositAmount}
          placeholder="Enter deposit amount"
          style={{ width: "100%", borderRadius: "4px" }}
        />
        <Button
          type="primary"
          onClick={() => setShowConfirmation(true)}
          disabled={depositAmount <= 0}
          style={{ width: "100%" }}
        >
          Deposit
        </Button>
      </Space>

      <Modal
        title="Confirm Deposit"
        visible={showConfirmation}
        onOk={handleConfirmDeposit}
        onCancel={handleDepositCancel}
        okText="Confirm"
        cancelText="Cancel"
        confirmLoading={loading}
      >
        <p>
          Deposit ${depositAmount} to {selectedUser.firstName}{" "}
          {selectedUser.lastName}?
        </p>
      </Modal>
    </Card>
  );
};

export default Deposit;
