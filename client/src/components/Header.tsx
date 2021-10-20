import { useContext, useEffect } from "react";
import { Layout, Row, Menu, Col } from "antd";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const { Header } = Layout;

function HeaderComponent() {
  const history = useHistory();
  const {
    authInfo: { username, image },
    authentication,
    signOut
  } = useContext(AuthContext);

  useEffect(() => {
    authentication();
  }, [])

  useEffect(() => {
    if (username && (history.location.pathname === "/login" || history.location.pathname === "/register")) {
      history.push('/');
    }
  }, [username])

  const onSignOut = () => {
    history.push("/login");
    signOut();
    localStorage.removeItem('accessToken');
  };

  return (
    <Header className="header" style={{ background: "white" }}>
      <Row>
        <Col span={12}>
          <h1>
            😊
          </h1>
        </Col>

        <Col span={12}>
          <Menu mode="horizontal" style={{ display: 'flex', justifyContent: 'end' }}>
            {username ?
              <>
                <Menu.Item key={username}>
                  {username}
                </Menu.Item>
                <Menu.Item key="image">
                  <img style={{ width: 30, borderRadius: 15 }} src={image} />
                </Menu.Item>
                <Menu.Item key="SignOut" onClick={onSignOut}>
                  SignOut
                </Menu.Item>
              </>
              :
              <>
                <Menu.Item key="signin">
                  <Link to="/login">Signin</Link>
                </Menu.Item>
                <Menu.Item key="signup">
                  <Link to="/register">Signup</Link>
                </Menu.Item>
              </>
            }
          </Menu>
        </Col>
      </Row >
    </Header >
  );
}

export default HeaderComponent;
