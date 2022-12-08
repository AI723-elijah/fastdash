import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CaretRightOutlined, DeleteOutlined } from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import {
  Button,
  Row,
  Col,
  Input,
  Collapse,
  Select,
  InputNumber,
  Alert,
  Modal,
  Radio,
  message,
} from "antd";
import { Images } from "./Images/variationImages";
import { Videos } from "./Videos/variationVideos";
import { Documents } from "./Westgate/variationDocuments";
import { Attributes } from "./Westgate/variationAttributes";
import { Icons } from "./Westgate/variationIcons";
import { Options } from "./Westgate/variationOptions";
import { Accessories } from "./Westgate/variationAccessories";
import { SageProductDetails } from "./SageProductDetails";

import "./Variations.scss";
import {
  getProductsUrlKeys,
  setUserCanEnterUrlKey,
} from "../../../../Redux/Actions/Products";
import { useState } from "react";
import { deleteAccessory } from "../../../../Redux/Actions/accessories";
import { searchVariations } from "../../../../Redux/Actions/Variations";
import {
  getInventoryItems,
  getSageItem,
} from "../../../../Redux/Actions/Portal";
import { getAllProductsInSystem } from "../../../../Redux/Actions/options";

const { TextArea } = Input;

const { Panel } = Collapse;
const { Item } = Form;
const { Option } = Select;

const CloneVariationModal = ({
  isVisible,
  handleClose,
  variations,
  setVariationId,
}) => {
  const [selectedVariation, setSelectedVariation] = useState(null);

  return (
    <Modal
      title="Choose a Variation"
      visible={isVisible}
      destroyOnClose
      bodyStyle={{
        maxHeight: "400px",
        overflowY: "scroll",
      }}
      onOk={() => setVariationId(selectedVariation)}
      // confirmLoading={ }
      onCancel={() => handleClose()}
    >
      <>
        <Radio.Group style={{ marginBottom: "20px" }}>
          {variations &&
            variations.map((variation) => {
              return (
                <div key={variation.childProductDetails.sku}>
                  <Radio
                    onChange={() => setSelectedVariation(variation)}
                    value={variation.childProductDetails.sku}
                  >
                    {variation.childProductDetails.sku}
                  </Radio>
                </div>
              );
            })}
        </Radio.Group>
      </>
    </Modal>
  );
};

class VariationsTab extends Component {
  state = {
    sortedProductRelations: [],
    message: "",
    modalOpen: false,
    variationCloneModalOpen: false,
    sageProduct: null,
    sageModal: false,
  };

  componentDidMount() {
    const {
      getIcons,
      getOptions,
      getInventoryItems,
      inventoryItems,
      getAllProductsInSystem,
      allSkus,
    } = this.props;
    getIcons();
    getOptions();
    if (!inventoryItems) {
      getInventoryItems();
    }
    if (allSkus && allSkus.length === 0) {
      getAllProductsInSystem();
    }
  }

  handleChange = (e, name, i, p) => {
    const { handleStateChange, productRelations } = this.props;
    const index = p.childID
      ? productRelations.findIndex((item) => item.childID === p.childID)
      : productRelations.findIndex(
          (item) =>
            item.childProductDetails.sorting === p.childProductDetails.sorting
        );
    productRelations[index].childProductDetails[name] = e;
    handleStateChange(productRelations, "productRelations");
  };

  closeVariationCloneModal = () => {
    this.setState({
      variationCloneModalOpen: false,
    });
  };

  openCloneVariationModal = () => {
    this.setState({
      variationCloneModalOpen: true,
    });
  };

  addToArray = (variationObject) => {
    const { handleAddToArray, productRelations } = this.props;
    this.setState({
      variationCloneModalOpen: false,
    });
    const product = Object.assign({}, this.props.product);
    const image = {
      channelID: 1,
      image: "",
      sort: 999,
    };
    const video = {
      channelID: 1,
      video: "",
      sort: 999,
      thumbnail: "",
    };
    let variation = {};

    if (productRelations && productRelations.length) {
      const index =
        variationObject && variationObject.childID
          ? productRelations &&
            productRelations.findIndex(
              (item) => item.childID === variationObject.childID
            )
          : productRelations &&
            productRelations.findIndex(
              (item) =>
                item.childProductDetails.sorting ===
                variationObject.childProductDetails.sorting
            );

      if (index > -1) {
        variation.childProductDetails = Object.assign(
          {},
          productRelations[index].childProductDetails
        );

        variation.childProductDetails.sku =
          variation.childProductDetails.sku + "-CLONED";
        variation.childProductDetails.urlKey =
          variation.childProductDetails.urlKey + "-CLONED";
        variation.childProductDetails.sorting = 999;
        variation.childProductDetails.images = productRelations[
          index
        ].childProductDetails.images.map((e) => {
          return {
            image: e.image,
            sort: 999,
            channelID: e.channelID,
          };
        });
        variation.childProductDetails.videos = productRelations[
          index
        ].childProductDetails.videos.map((e) => {
          return {
            video: e.video,
            sort: 999,
            channelID: e.channelID,
            thumbnail: e.thumbnail,
          };
        });
        variation.childProductDetails.productAttributes = productRelations[
          index
        ].childProductDetails.productAttributes.map((e) => {
          return {
            value: e.value,
            attributeID: e.attributeID,
            attribute: e.attribute,
          };
        });
        variation.childProductDetails.productDocuments = productRelations[
          index
        ].childProductDetails.productDocuments.map((e) => {
          return {
            document: e.document,
            documentType: e.documentType,
          };
        });
        variation.childProductDetails.productIcons = productRelations[
          index
        ].childProductDetails.productIcons.map((e) => {
          return {
            iconID: e.iconID,
            iconDetails: e.iconDetails,
          };
        });
        variation.childProductDetails.productAccessories = productRelations[
          index
        ].childProductDetails.productAccessories.map((e) => {
          return {
            ...e,
          };
        });
      }
    } else {
      variation = {
        childProductDetails: {
          ...product,
          type: "child",
          productAttributes: [],
          productIcons: [],
          productOptions: [],
        },
      };
      variation.childProductDetails.images = [{ ...image }];
      variation.childProductDetails.videos = [{ ...video }];
      const documents = [
        { document: "", documentType: "SPC" },
        { document: "", documentType: "IES" },
        { document: "", documentType: "CAT" },
        { document: "", documentType: "LM79" },
        { document: "", documentType: "MAN" },
      ];
      variation.childProductDetails.productDocuments = [...documents];
    }
    delete variation.childProductDetails["productID"];
    handleAddToArray("productRelations", variation);
    message.success(
      "Variation cloned successfully! Click Save to persist the changes."
    );
  };

  deleteVariation = () => {
    this.setState({ modalOpen: false }, () => {
      const { removeProductsVariation } = this.props;
      let productRelations = [...this.props.productRelations];
      let productID =
        productRelations[this.state.selectedVariation].childProductDetails
          .productID;
      if (productID) {
        removeProductsVariation(productID);
      }
      productRelations.splice(this.state.selectedVariation, 1);
      this.props.handleStateChange(productRelations, "productRelations");
    });
  };

  handleDelete = (i) => {
    this.setState({ modalOpen: true, selectedVariation: i });
  };

  handleSort = async (variation, e, i) => {
    const { handleStateChange } = this.props;
    let productRelations = [...this.props.productRelations];
    const replacedVariationIndex = productRelations.findIndex(
      (p) => p.childProductDetails.sorting === e
    );
    const prevSortValue = variation.childProductDetails.sorting;
    productRelations[i].childProductDetails.sorting = e;
    productRelations[replacedVariationIndex].childProductDetails.sorting =
      prevSortValue;
    handleStateChange(productRelations, "productRelations");
  };

  getSageProduct = async (params) => {
    try {
      const product = await this.props.getSageItem(
        params.childProductDetails.sku
      );
      if (product) {
        this.setState({
          ...this.state,
          sageProduct: product.payload[0],
          sageModal: true,
        });
      }
    } catch (error) {
      message.error("Failed to fetch product!", 5);
    }
  };

  render() {
    const {
      productRelations,
      setUserCanEnterUrlKey,
      getProductsUrlKeys,
      configuredUrls,
      removeProductVariationImage,
      inventoryItems,
      allSkus,
      form: { getFieldDecorator },
    } = this.props;

    let skusNotIncluded =
      inventoryItems &&
      inventoryItems.filter(
        (item) =>
          !(
            allSkus &&
            allSkus.some(
              (p) => p.sku === item.ItemCode || p.ItemCode === item.ItemCode
            )
          )
      );

    return (
      <>
        <Modal
          title="Delete Variation"
          visible={this.state.modalOpen}
          onOk={this.deleteVariation}
          onCancel={() => {
            this.setState({ modalOpen: false });
          }}
        >
          <h3>Are you sure you want to delete this variation? </h3>
          <p>
            Note: This will delete this variation and its related information
          </p>
        </Modal>

        <Modal
          title="Sage Product"
          visible={this.state.sageModal}
          onOk={() => {
            this.setState({ ...this.state, sageModal: false });
          }}
          onCancel={() => {
            this.setState({ ...this.state, sageModal: false });
          }}
        >
          <SageProductDetails product={this.state.sageProduct} />
        </Modal>

        <CloneVariationModal
          isVisible={this.state.variationCloneModalOpen}
          handleClose={this.closeVariationCloneModal}
          variations={this.props.productRelations}
          setVariationId={this.addToArray}
        />

        <div className="mx-15 d-flex-row justify-end">
          <Button onClick={() => this.openCloneVariationModal()}>
            Add Variation
          </Button>
        </div>
        <Collapse
          className="my-10 variation-collapse"
          bordered={false}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
        >
          {productRelations.map((p, i) => {
            return (
              <Panel
                key={i}
                extra={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      width: "140px",
                    }}
                  >
                    <span style={{ marginRight: "10px" }}>Sort: </span>
                    <Select
                      value={p.childProductDetails.sorting}
                      style={{ marginRight: "10px" }}
                      onChange={(e) => this.handleSort(p, e, i)}
                    >
                      {productRelations.map((p, index) => (
                        <Option key={p.childID} value={index + 1}>
                          {index + 1}
                        </Option>
                      ))}
                    </Select>

                    <DeleteOutlined onClick={() => this.handleDelete(i, p)} />
                  </div>
                }
                header={
                  p.childProductDetails.sku
                    ? p.childProductDetails.sku
                    : `Variation ${i + 1}`
                }
                className="variation-panel"
              >
                <Row className="variation-row" gutter={16}>
                  <Col xs={24} sm={12}>
                    <label>Name</label>
                    <Item>
                      {getFieldDecorator(`variation_name${i + 1}`, {
                        rules: [
                          {
                            required: true,
                            message: "Please enter name for this variation.",
                          },
                        ],
                        setFieldsValue: p.childProductDetails.name,
                        initialValue: p.childProductDetails.name,
                      })(
                        <Input
                          name="name"
                          onChange={(e) =>
                            this.handleChange(
                              e.target.value,
                              e.target.name,
                              i,
                              p
                            )
                          }
                          // disabled
                        />
                      )}
                    </Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <label>SKU</label>
                    <Item>
                      {getFieldDecorator(`variation_sku${i + 1}`, {
                        rules: [
                          {
                            required: true,
                            message: "Please enter SKU for this variation.",
                          },
                        ],
                        setFieldsValue: p.childProductDetails.sku,
                        initialValue: p.childProductDetails.sku,
                      })(
                        <Input
                          name="sku"
                          onChange={(e) =>
                            this.handleChange(
                              e.target.value,
                              e.target.name,
                              i,
                              p
                            )
                          }
                          // disabled
                        />
                      )}
                    </Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <label>Available in Sage</label>
                    <Item>
                      {getFieldDecorator(`itemCode${i + 1}`, {
                        setFieldsValue: p.childProductDetails.itemCode,
                        initialValue: p.childProductDetails.itemCode,
                      })(
                        <>
                          {inventoryItems &&
                          inventoryItems.filter(
                            (item) =>
                              item.ItemCode === p.childProductDetails.sku
                          ).length > 0 ? (
                            <Input defaultValue={"Yes"} disabled />
                          ) : (
                            <Select
                              showSearch
                              placeholder="Available Item Codes"
                              onChange={(e) =>
                                this.handleChange(e, "ItemCode", i, p)
                              }
                            >
                              {skusNotIncluded &&
                                skusNotIncluded.map((item) => (
                                  <Option value={item.ItemCode}>
                                    {item.ItemCode}
                                  </Option>
                                ))}
                            </Select>
                          )}
                        </>
                      )}
                    </Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <label>UPC</label>
                    <Item>
                      {getFieldDecorator(`variation_upc${i + 1}`, {
                        setFieldsValue: p.childProductDetails.upc,
                        initialValue: p.childProductDetails.upc,
                      })(
                        <Input
                          name="upc"
                          onChange={(e) =>
                            this.handleChange(
                              e.target.value,
                              e.target.name,
                              i,
                              p
                            )
                          }
                        />
                      )}
                    </Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <label>Sort</label>
                    <Item>
                      {getFieldDecorator(`variation_sorting${i + 1}`, {
                        setFieldsValue: p.childProductDetails.sorting,
                        initialValue: p.childProductDetails.sorting,
                      })(
                        <InputNumber
                          className="width-100"
                          name="sorting"
                          onChange={(e) =>
                            this.handleChange(e, "sorting", i, p)
                          }
                        />
                      )}
                    </Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} sm={8}>
                    <label>Price</label>
                    <Item>
                      {getFieldDecorator(`variation_price${i + 1}`, {
                        setFieldsValue: p.childProductDetails.price,
                        initialValue: p.childProductDetails.price,
                      })(
                        <InputNumber
                          className="width-100"
                          onChange={(e) => this.handleChange(e, "price", i, p)}
                        />
                      )}
                    </Item>
                  </Col>
                  <Col xs={24} sm={4}>
                    <label>Quantity</label>
                    <Item>
                      {getFieldDecorator(`variation_quantity${i + 1}`, {
                        setFieldsValue: p.childProductDetails.quantity,
                        initialValue: p.childProductDetails.quantity,
                      })(
                        <InputNumber
                          className="width-100"
                          onChange={(e) =>
                            this.handleChange(e, "quantity", i, p)
                          }
                        />
                      )}
                    </Item>
                  </Col>
                  <Col xs={24} sm={4}>
                    <label>Accessory</label>
                    <Item>
                      {getFieldDecorator(`variation_is_accessory${i + 1}`, {
                        setFieldsValue: p.childProductDetails.accessory,
                        initialValue: p.childProductDetails.accessory,
                      })(
                        <Select
                          className="width-100"
                          onChange={(e) =>
                            this.handleChange(e, "accessory", i, p)
                          }
                        >
                          <Option value="Y">Yes</Option>
                          <Option value="N">No</Option>
                        </Select>
                      )}
                    </Item>
                  </Col>
                  <Col xs={24} sm={4}>
                    <label>Status</label>
                    <Item>
                      {getFieldDecorator(`variation_status${i + 1}`, {
                        setFieldsValue: p.childProductDetails.status,
                        initialValue: p.childProductDetails.status,
                      })(
                        <Select
                          className="width-100"
                          onChange={(e) => this.handleChange(e, "status", i, p)}
                        >
                          <Option value="active">Active</Option>
                          <Option value="inactive">Inactive</Option>
                        </Select>
                      )}
                    </Item>
                  </Col>

                  <Col xs={24} sm={4}>
                    <label>Discontinued</label>
                    <Item>
                      {getFieldDecorator(`variation_discontinued${i + 1}`, {
                        setFieldsValue: p.childProductDetails.discontinued,
                        initialValue: p.childProductDetails.discontinued,
                      })(
                        <Select
                          className="width-100"
                          onChange={(e) =>
                            this.handleChange(e, "discontinued", i, p)
                          }
                        >
                          <Option value={true}>Yes</Option>
                          <Option value={false}>No</Option>
                        </Select>
                      )}
                    </Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} sm={8}>
                    <label>URL Keys</label>
                    <Item>
                      {getFieldDecorator(`variation_urlKey${i + 1}`, {
                        setFieldsValue: p.childProductDetails.urlKey,
                        initialValue: p.childProductDetails.urlKey,
                      })(
                        <Input
                          name="urlKey"
                          // disabled={!userCanEnterUrlKey}
                          onBlur={(e) => {
                            setUserCanEnterUrlKey(false);
                            const { value } = e.currentTarget;
                            if (value.length > 0) {
                              this.handleChange(value, "urlKey", i, p);
                              getProductsUrlKeys(value);
                              if (
                                configuredUrls &&
                                configuredUrls.productUrlKeys.length > 0
                              ) {
                                this.setState({ message: "Key Exists" });
                              } else if (
                                configuredUrls &&
                                configuredUrls.productUrlKeys.length === 0
                              ) {
                                this.setState({ message: "" });
                              } else {
                                this.setState({ message: "Key Exists" });
                              }
                            }
                          }}
                        />
                      )}
                    </Item>
                    {this.state.message.length > 0 && (
                      <>
                        <Alert
                          message="URL Key Exists"
                          description="This URL Keys is already defined for another Product. It will be modified to create a unique URL Key"
                          type="error"
                          closable
                          onClose={() => {
                            this.setState({ message: "" });
                          }}
                        />
                      </>
                    )}
                  </Col>
                  <Col xs={24} sm={8}>
                    <label>Technical Specs</label>
                    <Item>
                      {getFieldDecorator(`variation_technicalSpecs${i + 1}`, {
                        setFieldsValue: p.childProductDetails.technicalSpecs,
                        initialValue: p.childProductDetails.technicalSpecs,
                      })(
                        <TextArea
                          name="technicalSpecs"
                          onChange={(e) =>
                            this.handleChange(
                              e.target.value,
                              e.target.name,
                              i,
                              p
                            )
                          }
                        />
                      )}
                    </Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <label>Application</label>
                    <Item>
                      {getFieldDecorator(`variation_application${i + 1}`, {
                        setFieldsValue: p.childProductDetails.application,
                        initialValue: p.childProductDetails.application,
                      })(
                        <TextArea
                          name="application"
                          onChange={(e) =>
                            this.handleChange(
                              e.target.value,
                              e.target.name,
                              i,
                              p
                            )
                          }
                        />
                      )}
                    </Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <label>Title Tags</label>
                    <Item>
                      {getFieldDecorator(`titleMetaTags${i + 1}`, {
                        setFieldsValue: p.childProductDetails.titleMetaTags,
                        initialValue: p.childProductDetails.titleMetaTags,
                      })(
                        <TextArea
                          name="titleMetaTags"
                          onChange={(e) =>
                            this.handleChange(
                              e.target.value,
                              e.target.name,
                              i,
                              p
                            )
                          }
                        />
                      )}
                    </Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <label>Description Tags</label>
                    <Item>
                      {getFieldDecorator(`descriptionTags${i + 1}`, {
                        setFieldsValue: p.childProductDetails.descriptionTags,
                        initialValue: p.childProductDetails.descriptionTags,
                      })(
                        <TextArea
                          name="descriptionTags"
                          onChange={(e) =>
                            this.handleChange(
                              e.target.value,
                              e.target.name,
                              i,
                              p
                            )
                          }
                        />
                      )}
                    </Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <label>Fetch Sage Product</label>
                    <Item>
                      <Button
                        onClick={() => this.getSageProduct(p)}
                        type="primary"
                      >
                        Get Product
                      </Button>
                    </Item>
                  </Col>
                </Row>
                <Attributes
                  productRelations={productRelations}
                  productRelation={p}
                  parentIndex={i}
                  handleStateChange={this.props.handleStateChange}
                  attributes={this.props.productAttributes}
                  deleteProductAttribute={this.props.deleteProductAttribute}
                />
                <Images
                  productRelations={
                    this.state.sortedProductRelations.length === 0
                      ? productRelations
                      : this.state.sortedProductRelations
                  }
                  removeProductVariationImage={removeProductVariationImage}
                  productRelation={p}
                  parentIndex={i}
                  handleStateChange={this.props.handleStateChange}
                  startLoading={this.props.startLoading}
                  stopLoading={this.props.stopLoading}
                />
                <Videos
                  productRelations={productRelations}
                  productRelation={p}
                  parentIndex={i}
                  handleStateChange={this.props.handleStateChange}
                  attributes={this.props.productAttributes}
                  removeProductVariationVideo={
                    this.props.removeProductVariationVideo
                  }
                />
                <Documents
                  productRelations={productRelations}
                  productRelation={p}
                  parentIndex={i}
                  handleStateChange={this.props.handleStateChange}
                  startLoading={this.props.startLoading}
                  stopLoading={this.props.stopLoading}
                />
                <Icons
                  productRelations={productRelations}
                  productRelation={p}
                  parentIndex={i}
                  {...this.props}
                />
                <Options
                  productRelations={productRelations}
                  productRelation={p}
                  parentIndex={i}
                  {...this.props}
                />
                <Accessories
                  searchVariations={this.props.searchVariations}
                  productRelations={productRelations}
                  productRelation={p}
                  parentIndex={i}
                  {...this.props}
                />
              </Panel>
            );
          })}
        </Collapse>
      </>
    );
  }
}

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
    deleteAccessory: bindActionCreators(deleteAccessory, dispatch),
    searchVariations: bindActionCreators(searchVariations, dispatch),
    getInventoryItems: bindActionCreators(getInventoryItems, dispatch),
    getAllProductsInSystem: bindActionCreators(
      getAllProductsInSystem,
      dispatch
    ),
    getSageItem: bindActionCreators(getSageItem, dispatch),
  };
};
VariationsTab = connect(mapStateToProps, mapDispatchToProps)(VariationsTab);
export default Form.create()(VariationsTab);
