import { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../api/bankAPI"; // Import the deleteUser function
import { Card, Button, Typography, Row, Col, Modal, message } from "antd";
import TransferFunds from "./TransferFunds";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import CreateNewUser from "./CreateNewUser";

const { Title, Text } = Typography;

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentAction, setCurrentAction] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // State for delete confirmation

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleActionClick = (action) => {
    setCurrentAction(action);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setCurrentAction(""); // Reset action when selecting a new user
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    try {
      await deleteUser(selectedUser._id); // Call the API to delete the user
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== selectedUser._id)
      ); // Update the state
      message.success(
        `${selectedUser.firstName} ${selectedUser.lastName} has been deleted.`
      );
      setSelectedUser(null); // Reset selected user
      setCurrentAction(""); // Reset action
    } catch (error) {
      message.error("Error deleting user. Please try again.");
      console.error(error);
    } finally {
      setShowDeleteConfirm(false); // Close confirmation modal
    }
  };

  const confirmDeleteUser = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="App">
      <Title level={1} style={{ textAlign: "center" }}>
        Users
      </Title>

      <Row gutter={[16, 16]} justify="center">
        {users.map((user) => (
          <Col span={8} key={user._id}>
            <Card
              hoverable
              onClick={() => handleUserSelect(user)}
              style={{ margin: "16px", cursor: "pointer" }}
            >
              <Card.Meta
                title={`${user.firstName} ${user.lastName}`}
                description={user.email}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {selectedUser && (
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <Title level={2}>
            {selectedUser.firstName} {selectedUser.lastName}
          </Title>
          <Text>Email: {selectedUser.email}</Text>
          <div style={{ marginTop: 16 }}>
            <Button
              type="primary"
              onClick={() => handleActionClick("transfer")}
              style={{ margin: "0 8px" }}
            >
              Transfer Funds
            </Button>
            <Button
              type="default"
              onClick={() => handleActionClick("deposit")}
              style={{ margin: "0 8px" }}
            >
              Deposit Cash
            </Button>
            <Button
              type="danger"
              onClick={() => handleActionClick("withdraw")}
              style={{ margin: "0 8px" }}
            >
              Withdraw Cash
            </Button>
            <Button
              type="danger"
              onClick={confirmDeleteUser}
              style={{ margin: "0 8px" }}
            >
              Delete User
            </Button>
          </div>
        </div>
      )}

      {currentAction === "transfer" && (
        <TransferFunds
          users={users}
          selectedUser={selectedUser}
          setCurrentAction={setCurrentAction}
        />
      )}

      {currentAction === "deposit" && (
        <Deposit
          users={users}
          selectedUser={selectedUser}
          setCurrentAction={setCurrentAction}
        />
      )}

      {currentAction === "withdraw" && (
        <Withdraw
          users={users}
          selectedUser={selectedUser}
          setCurrentAction={setCurrentAction}
        />
      )}

      <CreateNewUser />

      {/* Confirmation Modal for Deleting User */}
      <Modal
        title="Confirm Deletion"
        visible={showDeleteConfirm}
        onOk={handleDeleteUser}
        onCancel={handleDeleteCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>
          Are you sure you want to delete {selectedUser?.firstName}{" "}
          {selectedUser?.lastName}?
        </p>
      </Modal>
    </div>
  );
};

export default UsersList;
