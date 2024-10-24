import React, { useState } from "react";
import { Modal, Input, Button, message, Card, Typography, Space } from "antd";

const { Text } = Typography;

const Withdraw = ({ selectedUser, users, setCurrentAction }) => {
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleWithdrawAmount = (event) => {
    const value = Number(event.target.value);
    setWithdrawAmount(value);
  };

  const handleConfirmWithdraw = async () => {
    const targetUser = users.find((user) => user._id === selectedUser._id);
    if (targetUser) {
      if (withdrawAmount <= 0) {
        message.error("Please enter a valid amount to withdraw.");
        return;
      }
      if (withdrawAmount > targetUser.balance) {
        message.error("Insufficient funds for this withdrawal.");
        return;
      }

      // Assuming you have a function to handle the withdrawal API call
      // await withdrawFunds(targetUser.accountId, withdrawAmount);
      console.log(
        `Withdrawn $${withdrawAmount} from ${targetUser.firstName} ${targetUser.lastName}`
      );

      message.success(
        `Successfully withdrawn $${withdrawAmount} from ${targetUser.firstName}`
      );
    } else {
      message.error("Something went wrong.");
    }
    setShowConfirmation(false);
  };

  const handleWithdrawCancel = () => {
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
          Enter amount to withdraw:
        </Text>
        <Input
          type="number"
          min="0"
          onChange={handleWithdrawAmount}
          style={{ width: "100%", borderRadius: "4px" }}
          placeholder="Enter withdrawal amount"
        />
        <Button
          type="danger"
          onClick={() => setShowConfirmation(true)}
          disabled={withdrawAmount <= 0}
          style={{ width: "100%" }}
        >
          Withdraw
        </Button>
      </Space>

      <Modal
        title="Confirm Withdraw"
        visible={showConfirmation}
        onOk={handleConfirmWithdraw}
        onCancel={handleWithdrawCancel}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>
          Withdraw ${withdrawAmount} from {selectedUser.firstName}?
        </p>
      </Modal>
    </Card>
  );
};

export default Withdraw;
