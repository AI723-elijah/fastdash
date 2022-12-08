import React, { Component } from "react";
import { Layout, PageHeader, Spin, message } from "antd";
import { ProductTabs } from "../Components/Products/Forms";
import { AmazonModal } from "../Common/AmazonModal";
import { product } from "../Static/staticObjects";

class ProductForm extends Component {
  constructor() {
    super();

    this.state = {
      buttonTitle: "",
      title: "",
      upc: "",
      product: product,
      productRelations: [],
      productAttributes: [],
      productCategories: [],
      productSuppliers: [],
      productTierPrices: [],
      productChannels: [],
      productPromotions: [],
      productIcons: [],
      productOptions: [],
      productDocuments: [],
      productAccessories: [],
      productQAs: [],
      images: [],
      videos: [],
      amazonData: [],
      open: false,
    };
  }

  componentDidMount() {
    const {
      getProduct,
      match: { params },
      location: { pathname },
    } = this.props;
    if (pathname.indexOf("master") > -1) {
      this.setState((prevState) => ({
        buttonTitle: "selected",
        title: "MASTER PRODUCT",
        product: {
          ...prevState.product,
          list_type: "master",
        },
      }));
    } else {
      this.setState((prevState) => ({
        buttonTitle: "master",
        title: "SELECTED PRODUCT",
        product: {
          ...prevState.product,
          list_type: "selected",
        },
      }));
    }

    if (params.id) {
      getProduct(params.id).then((res) => {
        this.getAdditionalInfo();
        localStorage.setItem(
          "productFormData",
          JSON.stringify({
            formproductdetails: res.payload,
          })
        );
      });
    } else {
      this.getAdditionalInfo();
    }
  }

  componentDidUpdate(oldProps) {
    const {
      attributes,
      product,
      productDetails,
      match: { params },
      productRequestPayload,
    } = this.props;

    if (productRequestPayload !== oldProps.productRequestPayload) {
      this.saveProduct();
    }
    if (params.id) {
      if (product !== oldProps.product) {
        this.setState({
          product,
          productRelations: productDetails.productRelations.sort((a, b) => {
            return (
              a.childProductDetails.sorting - b.childProductDetails.sorting
            );
          }),
          productAttributes: productDetails.productAttributes,
          productCategories: productDetails.productCategories,
          productSuppliers: productDetails.productSuppliers,
          productTierPrices: productDetails.productTierPrices,
          productChannels: productDetails.productChannels,
          productPromotions: productDetails.productPromotions,
          productIcons: productDetails.productIcons,
          productQAs: productDetails.productQAs,
          productDocuments: productDetails.productDocuments,
          productOptions: productDetails.productOptions,
          images: product.images,
          videos: product.videos,
          productAccessories: productDetails.productAccessories,
          title: `${product.name} (${product.sku})`,
        });
      }
      if (attributes !== oldProps.attributes) {
        let atts = [];

        attributes &&
          attributes.map((at) => {
            let att = {};
            att = productDetails.productAttributes.find(
              (p) => p.attributeID === at.attributeID
            );
            atts = [...atts, att ? att : at];
            return atts;
          });

        // }
        this.setState({ productAttributes: atts });
        if (
          process.env.REACT_APP_NAME !== "westgate" &&
          productDetails.productAttributes.length === 0
        ) {
          let children = [];
          this.state.productRelations.map((r) => {
            const child = Object.assign({}, r);
            child.childProductDetails.productAttributes = atts;
            children.push(child);
            return children;
          });
          this.setState({ productRelations: children });
        }
      }
    } else {
      if (attributes !== oldProps.attributes) {
        this.setState({ productAttributes: attributes });
      }
    }
  }

  getAdditionalInfo = () => {
    const { getAttributes, getCategories, getChannels } = this.props;

    getAttributes();
    getCategories();
    getChannels();
  };

  handleChange = (e, tab) => {
    e.persist();
    this.setState((prevState) => ({
      [tab]: {
        ...prevState[tab],
        [e.target.name]: e.target.value,
      },
    }));
  };

  handleObject = (value, name) => {
    this.setState({ [name]: value });
  };

  handleBlur = (e, tab) => {
    const { amazonLookUp } = this.props;
    const {
      target: { value },
    } = e;
    amazonLookUp({ upc: value }).then((res) => {
      if (res.payload.status === true) {
        this.setState({
          open: true,
          upc: value,
          amazonData: res.payload.products,
        });
      }
    });
  };
  amazonClicked = (changedProduct) => {
    const {
      product,
      productDetails,
      match: { params },
    } = this.props;
    if (params.id) {
      const newSelection = Object.assign({}, product);
      newSelection.name = changedProduct.name;
      newSelection.description = changedProduct.description;
      newSelection.price = changedProduct.price;
      newSelection.status = "inactive";
      newSelection.upc = changedProduct.upc;
      const newImages = productDetails.images;
      if (newImages.length > 0) {
        newImages[0].image = changedProduct.images[0].image;
      } else {
        newImages.push(changedProduct.images[0]);
      }
      this.setState({
        product: newSelection,
        images: newImages,
        open: false,
      });
    } else {
      let amazonProd = {
        upc: changedProduct.upc,
        name: changedProduct.name,
        description: changedProduct.description,
        price: changedProduct.price,
        status: "inactive",
      };
      let amazonImages = changedProduct.images;
      this.setState({
        product: amazonProd,
        images: amazonImages,
        open: false,
      });
    }
  };

  handleModal = () => {
    this.setState({ open: false });
  };

  handleSelect = (e, tab, name) => {
    const variations = JSON.parse(JSON.stringify(this.state.productRelations));
    if (tab === "product" && name === "status") {
      this.setState({
        productRelations: variations.map((i) => {
          i.childProductDetails.status = e;
          return i;
        }),
      });
    }
    this.setState((prevState) => ({
      [tab]: {
        ...prevState[tab],
        [name]: e,
      },
    }));
  };

  handleAddToArray = (name, emptyObj) => {
    this.setState((prevState) => ({
      [name]: [...prevState[name], emptyObj],
    }));
  };

  handleStateChange = (e, tab) => {
    this.setState({ [tab]: e });
  };

  handleSave = async () => {
    const { createProductPayload } = this.props;
    await createProductPayload(this.state);
  };

  saveProduct = () => {
    const {
      saveProduct,
      updateProduct,
      match: { params },
    } = this.props;
    let product = Object.assign({}, this.props.productRequestPayload);
    localStorage.removeItem("productFormData");
    if (params.id) {
      product.updated_at = new Date();
      updateProduct(product)
        .then(async () => {
          if (process.env.REACT_APP_NAME === "westgate") {
            await this.props.updateElasticSearchIndex(params.id);
          }
          message.success("Product has been updated", 5);
          this.redirect(product.list_type);
        })
        .catch((err) => {
          message.error(err.payload.message, 5);
        });
    } else {
      product.created_at = new Date();
      product.updated_at = new Date();
      saveProduct(product)
        .then(async (res) => {
          if (process.env.REACT_APP_NAME === "westgate") {
            await this.props.updateElasticSearchIndex(res.payload);
          }
          message.success("Product has been created", 5);
          this.redirect(product.list_type);
        })
        .catch((err) => {
          message.error(err.payload.message, 5);
        });
    }
  };

  redirect = (type) => {
    const { history } = this.props;

    if (type === "master") {
      history.push("/master-products");
    } else {
      history.push("/products");
    }
  };

  handleMoveProduct = (e) => {
    this.setState(
      (prevState) => ({
        product: {
          ...prevState.product,
          list_type: e,
          status: "active",
        },
      }),
      () => {
        this.handleSave();
      }
    );
  };

  render() {
    const { title } = this.state;
    const { history } = this.props;
    return (
      <Spin spinning={this.props.loading}>
        <Layout className="width-100 min-height-100vh">
          <PageHeader onBack={() => history.goBack()} title={title} />
          <ProductTabs
            {...this.props}
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            handleSelect={this.handleSelect}
            handleAddToArray={this.handleAddToArray}
            handleStateChange={this.handleStateChange}
            product={this.state.product}
            images={this.state.images}
            videos={this.state.videos}
            productRelations={this.state.productRelations}
            productAttributes={this.state.productAttributes}
            productCategories={this.state.productCategories}
            productTierPrices={this.state.productTierPrices}
            productSuppliers={this.state.productSuppliers}
            productPromotions={this.state.productPromotions}
            productChannels={this.state.productChannels}
            productIcons={this.state.productIcons}
            productQAs={this.state.productQAs}
            productOptions={this.state.productOptions}
            productAccessories={this.state.productAccessories || []}
            removeParentProductVideo={this.props.removeParentProductVideo}
            removeProductVariationVideo={this.props.removeProductVariationVideo}
            productDocuments={this.state.productDocuments}
            buttonTitle={this.state.buttonTitle}
            handleMoveProduct={this.handleMoveProduct}
            duplicateProduct={this.props.duplicateProduct}
            handleSave={this.handleSave}
            handleObject={this.handleObject}
          />
          <AmazonModal
            visible={this.state.open}
            amazonData={this.state.amazonData}
            upc={this.state.upc}
            onCancel={this.handleModal}
            amazonClicked={this.amazonClicked}
          />
        </Layout>
      </Spin>
    );
  }
}

export { ProductForm };
