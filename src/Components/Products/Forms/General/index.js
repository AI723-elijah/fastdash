import React, { useEffect } from "react";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import { Card, Row, Col, Input, InputNumber, Select } from "antd";
import { AdditionalFields } from "./AdditionalFields";
import { Info } from "./Info";
import { bindActionCreators } from "redux";
import {
  getProductsUrlKeys,
  setUserCanEnterUrlKey,
} from "../../../../Redux/Actions/Products";
import { getInventoryItems } from "../../../../Redux/Actions/Portal";
import { getAllProductsInSystem } from "../../../../Redux/Actions/options";
import { connect } from "react-redux";

const { Item } = Form;
const { Option } = Select;

const General = (props) => {
  const {
    getInventoryItems,
    inventoryItems,
    getAllProductsInSystem,
    allSkus,
    getProductsUrlKeys,
    setUserCanEnterUrlKey,
    userCanEnterUrlKey,
    configuredUrls,
    product,
    handleChange,
    handleBlur,
    handleSelect,
    handleSwitch,
    addVariations,
    addTierPrices,
    form: { getFieldDecorator },
  } = props;

  useEffect(() => {
    if (!inventoryItems) {
      getInventoryItems();
    }
    // eslint-disable-next-line
  }, [inventoryItems]);

  useEffect(() => {
    if (allSkus && allSkus.length === 0) {
      getAllProductsInSystem();
    }
    // eslint-disable-next-line
  }, [allSkus]);

  return (
    <Card hoverable>
      <Row gutter={16}>
        {process.env.REACT_APP_NAME === "mexmax" && (
          <Col sm={12} xs={12}>
            <label>UPC</label>
            <Item>
              {getFieldDecorator("upc", {
                rules: [{ required: true, message: "Please enter UPC!" }],
                setFieldsValue: product.upc,
                initialValue: product.upc,
              })(
                <Input
                  name="upc"
                  onChange={(e) => handleChange(e, "product")}
                  onBlur={(e) => handleBlur(e, "product")}
                />
              )}
            </Item>
          </Col>
        )}
        <Col sm={12}>
          <label>SKU</label>
          <Item>
            {getFieldDecorator("sku", {
              rules: [
                { required: true, message: "Please enter SKU!" },
                { min: 3, message: "SKU should be atlease 3 characters long!" },
              ],
              setFieldsValue: product.sku,
              initialValue: product.sku,
            })(
              <Input name="sku" onChange={(e) => handleChange(e, "product")} />
            )}
          </Item>
        </Col>
        <Col sm={12}>
          <label>Product Name</label>
          <Item>
            {getFieldDecorator("name", {
              rules: [
                { required: true, message: "Please enter Product Name!" },
                { min: 3, message: "SKU should be atlease 3 characters long!" },
              ],
              setFieldsValue: product.name,
              initialValue: product.name,
            })(
              <Input name="name" onChange={(e) => handleChange(e, "product")} />
            )}
          </Item>
        </Col>
        <Col sm={12}>
          <label>Description</label>
          <Item>
            {getFieldDecorator("description", {
              setFieldsValue: product.description,
              initialValue: product.description,
            })(
              <Input
                name="description"
                onChange={(e) => handleChange(e, "product")}
              />
            )}
          </Item>
        </Col>
        <Col sm={12} md={process.env.REACT_APP_NAME === "westgate" ? 6 : 12}>
          <label>Status</label>
          <Item>
            {getFieldDecorator("status", {
              setFieldsValue: product.status,
              initialValue: product.status,
            })(
              <Select
                className="width-100"
                onChange={(e) => handleSelect(e, "product", "status")}
              >
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            )}
          </Item>
        </Col>

        {process.env.REACT_APP_NAME === "westgate" && (
          <Col sm={12} md={6}>
            <label>Discontinued</label>
            <Item>
              {getFieldDecorator("Discontinued?", {
                setFieldsValue: product.discontinued,
                initialValue: product.discontinued,
              })(
                <Select
                  className="width-100"
                  onChange={(e) => handleSelect(e, "product", "discontinued")}
                >
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              )}
            </Item>
          </Col>
        )}

        <Col sm={8}>
          <label>Price</label>
          <Item>
            {getFieldDecorator("price", {
              setFieldsValue: product.price,
              initialValue: product.price,
            })(
              <InputNumber
                className="width-100"
                onChange={(e) => handleSelect(e, "product", "price")}
              />
            )}
          </Item>
        </Col>
        <Col sm={8}>
          <label>Quantity</label>
          <Item>
            {getFieldDecorator("quantity", {
              setFieldsValue: product.quantity,
              initialValue: product.quantity,
            })(
              <InputNumber
                className="width-100"
                onChange={(e) => handleSelect(e, "product", "quantity")}
              />
            )}
          </Item>
        </Col>
        <Col sm={8}>
          <label>Sort</label>
          <Item>
            {getFieldDecorator("sorting", {
              setFieldsValue: product.sorting,
              initialValue: product.sorting,
            })(
              <InputNumber
                className="width-100"
                onChange={(e) => handleSelect(e, "product", "sorting")}
              />
            )}
          </Item>
        </Col>
      </Row>
      <AdditionalFields
        setUserCanEnterUrlKey={setUserCanEnterUrlKey}
        userCanEnterUrlKey={userCanEnterUrlKey}
        getProductsUrlKeys={getProductsUrlKeys}
        configuredUrls={configuredUrls}
        product={product}
        handleChange={handleChange}
        handleSelect={handleSelect}
      />
      <Info
        handleSelect={handleSelect}
        addVariations={addVariations}
        addTierPrices={addTierPrices}
        handleSwitch={handleSwitch}
        product={product}
      />
    </Card>
  );
};

let GeneralTab = Form.create()(General);
const mapStateToProps = (state) => {
  return {
    configuredUrls: state.productReducer.configuredUrls,
    userCanEnterUrlKey: state.productReducer.userCanEnterUrlKey,
    inventoryItems: state.portalReducer.inventoryItems,
    allSkus: state.productReducer.allSkus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductsUrlKeys: bindActionCreators(getProductsUrlKeys, dispatch),
    setUserCanEnterUrlKey: bindActionCreators(setUserCanEnterUrlKey, dispatch),
    getInventoryItems: bindActionCreators(getInventoryItems, dispatch),
    getAllProductsInSystem: bindActionCreators(
      getAllProductsInSystem,
      dispatch
    ),
  };
};
GeneralTab = connect(mapStateToProps, mapDispatchToProps)(GeneralTab);
export { GeneralTab };
