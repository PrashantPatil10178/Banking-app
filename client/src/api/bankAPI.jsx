import axios from "axios";

// Fetch all users
export const getUsers = async () => {
  try {
    const response = await axios.get("/api/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Create a new user
export const createNewUser = async ({ firstName, lastName, email }) => {
  try {
    const response = await axios.post("/api/users", {
      firstName: firstName.toString(),
      lastName: lastName.toString(),
      email: email.toString(),
    });
    console.log("User created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Update user details
export const updateUser = async (userId, { firstName, lastName, email }) => {
  try {
    const response = await axios.put(`/api/users/${userId}`, {
      firstName: firstName.toString(),
      lastName: lastName.toString(),
      email: email.toString(),
    });
    console.log("User updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`/api/users/${userId}`);
    console.log("User deleted:", response.data);
    return response.data; // Return response for confirmation if needed
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Deposit cash into user's account
export const depositCash = async (userId, accountId, amount) => {
  console.log("depositCash function called");
  try {
    const response = await axios.post("/api/transactions/deposit", {
      userId,
      accountId,
      amount,
    });
    console.log("Cash deposited:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error depositing cash:", error);
    throw error;
  }
};

// Transfer money from one account to another
export const transferMoney = async (fromAccountId, toAccountId, amount) => {
  console.log(
    "transferMoney function called",
    fromAccountId,
    toAccountId,
    amount
  );
  try {
    const response = await axios.post("/api/transactions/transfer", {
      fromAccountId,
      toAccountId,
      amount,
    });
    console.log("Money transferred:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error transferring money:", error);
    throw error;
  }
};

// Get all accounts (uncomment if needed)
// export const getAccounts = async () => {
//     try {
//         const response = await axios.get('/api/accounts');
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching accounts:", error);
//         throw error;
//     }
// };

// Get all transactions (uncomment if needed)
// export const getTransactions = async () => {
//     try {
//         const response = await axios.get('/api/transactions');
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching transactions:", error);
//         throw error;
//     }
// };
