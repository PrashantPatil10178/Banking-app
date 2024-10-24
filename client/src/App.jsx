import { Layout, Typography } from "antd";
import { useState } from "react";
import UsersList from "./components/UsersList";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  const [count, setCount] = useState(0);

  return (
    <Layout className="App">
      <Header
        style={{ backgroundColor: "#007bff", color: "#fff", borderRadius: 10 }}
      >
        <Title
          level={1}
          style={{
            color: "#fff",
            margin: 0,
            textAlign: "center",
            marginTop: 10,
          }}
        >
          Banking App
        </Title>
      </Header>
      <Content style={{ padding: "20px", minHeight: "calc(100vh - 140px)" }}>
        <Title level={2}>Hey</Title>
        <UsersList />
      </Content>
      <Footer style={{ textAlign: "center", backgroundColor: "#f1f1f1" }}>
        <p style={{ margin: 0 }}>
          © 2024 Dariyan Naggar Industries. All rights reserved.
        </p>
      </Footer>
    </Layout>
  );
}

export default App;
