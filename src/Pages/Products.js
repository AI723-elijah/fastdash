import React, { Component } from "react";
import { Card, Button, Checkbox, message, Switch } from "antd";
import { Actions } from "../Components/Products/Actions";
import { Filters } from "../Components/Products/Filters";
import { ProductList } from "../Components/Products/ProductList";

import "./Styles/Products.scss";

class Products extends Component {
  constructor() {
    super();

    this.state = {
      type: "",
      rank: "Parent",
      title: "",
      selected: [],
      channels: [],
    };
  }

  async componentDidMount() {
    const {
      location: { pathname },
      searchProducts,
      query,
    } = this.props;
    if (pathname === "/products") {
      this.setState({ type: "product", title: "PRODUCTS" });
      if (query) {
        searchProducts(query);
      } else {
        this.fetchSelectedProducts(0, true);
      }
    } else {
      this.setState({ type: "master-product", title: "MASTER PRODUCTS" });
      this.fetchMasterProducts(0);
    }
  }

  componentWillUnmount() {
    const { emptyProducts } = this.props;

    emptyProducts();
  }

  fetchSelectedProducts = (skip, newList) => {
    const { getProducts, getCategories, getChannels } = this.props;
    if (process.env.REACT_APP_NAME === "westgate") {
      getProducts(skip, "Parent")
        .then(() => {
          if (newList) {
            getCategories();
            getChannels();
          }
        })
        .catch((err) => {
          message.error(err.payload.message, 5);
        });
    } else {
      const { rank } = this.state;
      getProducts(skip, rank)
        .then(() => {
          if (newList) {
            getCategories();
            getChannels();
          }
        })
        .catch((err) => {
          message.error(err.payload.message, 5);
        });
    }
  };

  fetchMasterProducts = (skip) => {
    const { getMasterProducts } = this.props;
    getMasterProducts(skip).catch((err) => {
      message.error(err.payload.message, 5);
    });
  };

  handleAdd = (route) => {
    const { history } = this.props;

    history.push(route);
  };

  uploadProgress = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  loadMore = () => {
    const { products } = this.props;
    const {
      location: { pathname },
    } = this.props;
    if (pathname === "/products") {
      this.fetchSelectedProducts(products.length);
    } else {
      this.fetchMasterProducts(products.length);
    }
  };

  handleSelectList = (e, value) => {
    if (e.target.checked) {
      this.setState((prevState) => ({
        selected: [...prevState.selected, value],
      }));
    } else {
      this.setState((prevState) => ({
        selected: prevState.selected.filter((s) => s !== value),
      }));
    }
  };

  handleChange = (checked) => {
    checked
      ? this.setState(
          {
            ...this.state,
            rank: "Child",
          },
          () => {
            this.fetchSelectedProducts(0, false);
          }
        )
      : this.setState(
          {
            ...this.state,
            rank: "Parent",
          },
          () => {
            this.fetchSelectedProducts(0, false);
          }
        );
  };

  selectAll = (e) => {
    if (e.target.checked) {
      let s = [];
      this.props.products.map((p) => {
        if (p.status === "active") {
          s.push(p.productID);
          this.setState({ selected: s });
        }
        return p;
      });
    } else {
      this.setState({ selected: [] });
    }
  };

  render() {
    const { type, title, selected } = this.state;
    const {
      location: { pathname },
      categories,
      channels,
      applyFilter,
    } = this.props;

    return (
      <Card title={title} className="width-100 products-list">
        <Actions
          {...this.props}
          selected={selected}
          type={type}
          handleAdd={this.handleAdd}
          fetchSelectedProducts={this.fetchSelectedProducts}
          fetchMasterProducts={this.fetchMasterProducts}
        />
        {pathname === "/products" && (
          <Filters
            categories={categories}
            channels={channels}
            fetchSelectedProducts={this.fetchSelectedProducts}
            applyFilter={applyFilter}
          />
        )}
        <Switch
          size="small"
          checkedChildren="children on"
          unCheckedChildren=" children off"
          onChange={(checked) => this.handleChange(checked)}
        />
        {this.props.products.length > 0 && (
          <div className="m-15">
            <Checkbox className="p-10" onChange={this.selectAll}>
              {this.props.products.length === selected.length
                ? "Deselect All"
                : "Select All"}{" "}
              (Selected: {selected.length})
            </Checkbox>
          </div>
        )}
        <ProductList
          selected={selected}
          handleSelectList={this.handleSelectList}
          loading={this.props.loading}
          products={this.props.products.sort((a, b) => a.sorting - b.sorting)}
          handleAdd={this.handleAdd}
          pathname={type}
        />
        {this.props.products.length >= 50 && (
          <div className="d-flex-row justify-center">
            <Button onClick={this.loadMore}>Load More</Button>
          </div>
        )}
      </Card>
    );
  }
}

export { Products };
