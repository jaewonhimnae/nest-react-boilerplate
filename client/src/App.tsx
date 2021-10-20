import { Route, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthContextProvider from './contexts/AuthContext';
import { Layout } from "antd";
const { Content } = Layout;

function App() {
  return (
    <AuthContextProvider>
      <Layout>
        <Header />
        <Content>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <div style={{ minHeight: 300, padding: '2rem' }}>
              <Route exact path="/" component={LandingPage} />
            </div>
          </Switch>
        </Content>
        <Footer />
      </Layout>
    </AuthContextProvider>
  );
}

export default App;
