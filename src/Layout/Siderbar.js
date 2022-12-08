import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon as LegacyIcon } from "@ant-design/compatible";
import { Layout, Menu, Button, message } from "antd";
import { privateRoutes } from "../Routes/privateRoutes";
import { featureRoutes } from "../Routes/featureRoutes";

const { Sider } = Layout;
const { Item } = Menu;

class Sidebar extends Component {
  constructor() {
    super();

    this.state = {
      key: "",
    };
  }

  componentDidMount() {
    const {
      location: { pathname },
    } = this.props;
    this.getTab(pathname);
  }

  componentDidUpdate(oldProps) {
    const {
      location: { pathname },
    } = this.props;

    if (oldProps.location.pathname !== pathname) {
      this.getTab(pathname);
    }
  }

  getTab = (pathname) => {
    if (pathname.indexOf("/product") > -1) {
      this.setState({ key: "/products" });
    } else if (pathname.indexOf("/master-product") > -1) {
      this.setState({ key: "/master-products" });
    } else {
      this.setState({ key: pathname });
    }
  };

  handleLogout = () => {
    const { logout, history } = this.props;

    logout()
      .then(() => history.push("/login"))
      .catch((err) => {
        message.error(err, 5);
      });
  };

  render() {
    const { key } = this.state;
    const fRoutes = process.env.REACT_APP_FEATURES.split(",") || [];

    return (
      <Sider
        className="im-sidebar min-height-100vh"
        breakpoint="lg"
        collapsedWidth="0"
      >
        <img
          className="width-100 p-15"
          src={`/Images/${process.env.REACT_APP_LOGO}`}
          alt="Logo"
        />
        <Menu
          className="menu-list"
          selectedKeys={[key]}
          theme={process.env.REACT_APP_THEME}
          mode="inline"
        >
          {privateRoutes
            .filter((e) =>
              localStorage.getItem("userRole") === "SEO"
                ? e.path === "/categories" || e.path === "/changePassword"
                : e.path
            )
            .map((e) =>
              (e.label === "Options" &&
                process.env.REACT_APP_NAME !== "westgate") ||
              (e.label === "Q&A" &&
                process.env.REACT_APP_NAME !== "westgate") ? (
                " "
              ) : (
                <Item key={e.key}>
                  <Link to={e.path}>
                    <LegacyIcon type={e.icon} />
                    <span>{e.label}</span>
                  </Link>
                </Item>
              )
            )}
          {featureRoutes
            .filter((e) =>
              localStorage.getItem("userRole") === "SEO"
                ? e.path === "/news"
                : e.path
            )
            .map((e) => {
              return fRoutes.indexOf(e.key) > -1 ? (
                <Item key={e.key}>
                  <Link to={e.path}>
                    <LegacyIcon type={e.icon} />
                    <span>{e.label}</span>
                  </Link>
                </Item>
              ) : null;
            })}
        </Menu>
        <div className="p-10 width-100 im-logout-btn">
          <Button
            type="danger"
            className="width-100"
            onClick={this.handleLogout}
          >
            LOGOUT
          </Button>
        </div>
      </Sider>
    );
  }
}

export { Sidebar };
