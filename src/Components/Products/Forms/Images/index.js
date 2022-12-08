import React, { Component } from "react";
import { DeleteTwoTone } from '@ant-design/icons';
import { Row, Col, InputNumber, Card, Typography } from "antd";
import firebase from "firebase/app";
import "firebase/storage";
import FileUploader from "react-firebase-file-uploader";
import { imageURL } from "../../../../Common/createImageURL";
import { updateProductImagesSort } from "./../../../../Redux/Actions/Products";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import * as _ from "lodash";
import { bindActionCreators } from "redux";
import "./images.scss";
import { connect } from "react-redux";

const { Title } = Typography;

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  margin: `0 ${grid}px 0 0`,
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: "none",
  display: "flex",
  flexWrap: "wrap",
  padding: "5px 45px",
  overflow: "auto",
});

const innerItemStyle = { height: "325px", width: "350px" };

class ImagesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedImages: [],
      updatedProduct: null,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  componentDidMount() {
    const { product } = this.props;
    if (product.images) {
      let images = product.images;

      images && images.map((img) => {
        if (img.thumbnail === null) 
          img.thumbnail = false;
        return img
      });
      product.images = images;
      this.setState({ updatedProduct: product }, () => {
      });
    } else {
      product.images = []
      this.setState({ updatedProduct: product });
    }

  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const { productRelations, updateProductImagesSort } = this.props;
    if (this.state.sortedImages.length !== 0) {
      const sortedImages = reorder(
        this.state.sortedImages,
        result.source.index,
        result.destination.index
      );
      let { destination, source } = result;
      if (destination.index !== source.index) {
        this.setState(
          {
            sortedImages: [...sortedImages],
          },
          () => {
            let images = this.state.sortedImages.map((img, i) => {
              let image = img.childProductDetails.images[0];
              return {
                productImageID: image.productImageID,
                sort: i + 1,
              };
            });
            updateProductImagesSort(images);
          }
        );
      } else {
        return;
      }
    } else {
      let updatedProductRelations = _.sortBy(
        productRelations,
        ["childProductDetails.images[0].sort"],
        ["asc"]
      );
      const sortedImages = reorder(
        updatedProductRelations,
        result.source.index,
        result.destination.index
      );
      let { destination, source } = result;
      if (destination.index !== source.index) {
        this.setState(
          {
            sortedImages: [...sortedImages],
          },
          () => {
            let images = this.state.sortedImages.map((img, i) => {
              let image = img.childProductDetails.images[0];
              return {
                productImageID: image.productImageID,
                sort: i + 1,
              };
            });
            updateProductImagesSort(images);
          }
        );
      } else {
        return;
      }
    }
  }
  handleUpload = (url) => {
    const { handleStateChange } = this.props;
    let images = [...this.props.images];
    let image = {};
    if (images.length === 0) {
      image = {
        channelID: 1,
        image: "",
        sort: 1,
      };
      images.push(image);
    }
    images[0].image = url;

    handleStateChange(images, "images");
  };

  handleWGImage = (name, i) => {
    const { handleStateChange } = this.props;
    let images = [...this.props.images];
    let image = images[i] || {};
    if (image.sort) {
      images[i].image = name;
    } else {
      image = {
        channelID: 1,
        image: name,
        sort: images.length,
      };
      images.push(image);
    }

    handleStateChange(images, "images");
  };

  handleProductImages = (name) => {
    const { handleStateChange, product, removeParentProductImage } = this.props;

    let { images } = product;
    images.map((item, index) => {
      if (item.image === "") {
        removeParentProductImage(item.productImageID);
      }
      return item
    });
    images = images.filter((item) => item.image !== "");
    let newImage = {
      channelID: 0,
      image: name,
      sort: 1,
    };
    images.push(newImage);
    product.images = images;
    handleStateChange(product.images, "images");
    handleStateChange(product, "product");
  };

  handleChange = (e, i) => {
    const { handleStateChange } = this.props;
    let productRelations = [...this.props.productRelations];

    productRelations[i].childProductDetails.images[0].sort = e;
    handleStateChange(productRelations, "productRelations");
  };

  handleSort = (e, i) => {
    const { handleStateChange, product } = this.props;
     let images = product.images;
    images[i].sort = e;
    product.images = images
    handleStateChange(product.images, "images");
    handleStateChange(product, "product");
  };

  handleRemoveImage = (prd) => {
    const { handleStateChange, product, removeParentProductImage } = this.props;
    const { images } = product;
    const filteredImages = images.filter(
      (item) => item.productImageID !== prd.productImageID
    );
    product.images = filteredImages;
    removeParentProductImage(prd.productImageID);
    handleStateChange(product, "product");
  };

  onUploadStart = () => {
    this.props.startLoading();
  };

  onUploadSuccess = (filename) => {
    this.props.stopLoading();
    this.handleProductImages(filename);
  };
  updateThumbnail = (e, a) => {
    const { product, handleStateChange } = this.props;
    let images = product.images;

    images && images.map(img => {
      if (img.productImageID === e.productImageID) {
        img.thumbnail = !img.thumbnail;
      } else {
        img.thumbnail = false;
      }
      return img
    })
    product.images = images;

    this.setState({
      updatedProduct: product
    }, () => {
      this.handleChange(product.images, 'images')
      handleStateChange(product, "product");
    })


  }

  render() {
    const { addVariations, product } = this.props;
    let images = product.images;
    let { productRelations } = this.props;
   
    productRelations = _.sortBy(
      productRelations,
      ["childProductDetails.images[0].sort"],
      ["asc"]
    );
    return <>
      {(images &&
        images.length === 0) ||
        (images && images[0] && !images[0].image) ? (
          <Row gutter={16}>
            <Col span={24}>
              <Card className="my-10" hoverable>
                <label>IMAGE</label>
                <FileUploader
                  className="width-100"
                  accept="image/*"
                  name="image"
                  storageRef={firebase.storage().ref("productImages")}
                  onUploadStart={this.onUploadStart}
                  onUploadSuccess={(e) => this.onUploadSuccess(e)}
                />
              </Card>
            </Col>
          </Row>
        ) : (
          <Row
            className="images px-10"
            style={{ padding: "5px 45px" }}
            gutter={16}
          >
            {images && images.map((e, i) => {
                let src = "";

                if (e && e.image) {
                  src =
                    e.image.indexOf("http") > -1 ? e.image : imageURL(e.image);
                } else {
                  src = e ? e.image : "";
                }

                return (
                  <Col key={i} xs={24} sm={12} md={8}>
                    <Card className="item my-10" hoverable title={product.sku}>
                      {/* <input type="checkbox" key={i} onChange={a => this.updateThumbnail(e, a)} className="thumbnail-checkbox" checked={e.thumbnail} /> */}
                      {src && (
                        <DeleteTwoTone
                          className="remove-btn"
                          twoToneColor="#eb2f96"
                          onClick={() => this.handleRemoveImage(e)} />
                      )}
                      {
                        src && (
                          <div className="center">
                            <img
                              className="p-10"
                              src={src}
                              alt="Product Variation"
                            />
                            <div className="position my-15">
                              <label className="left">Position</label>
                              <InputNumber
                                className="width-100"
                                value={e.sort}
                                onChange={(e) => this.handleSort(e, i)}
                              />
                            </div>
                          </div>
                        ) 
                        //: (
                        //    ""
                         // )
                        // <FileUploader
                        //   className='width-100'
                        //   accept='image/*'
                        //   name='image'
                        //   storageRef={firebase.storage().ref('productImages')}
                        //   onUploadStart={this.onUploadStart}
                        //   onUploadSuccess={e => this.onUploadSuccess(e, i)}
                        // />
                      }
                    </Card>
                  </Col>
                );
              })}

            {process.env.REACT_APP_NAME === "westgate" && (
              <Col xs={24} sm={12} md={8}>
                <Card className="my-10" hoverable>
                  <label>IMAGE</label>
                  <FileUploader
                    className="width-100"
                    accept="image/*"
                    name="image"
                    storageRef={firebase.storage().ref("productImages")}
                    onUploadStart={this.onUploadStart}
                    onUploadSuccess={(e) => this.onUploadSuccess(e)}
                  />
                </Card>
              </Col>
            )}
          </Row>
        )}
       {addVariations && productRelations.length === 0 ? (
        <Title level={4} className="center">
          Image uploaded in Variations will appear here!
        </Title>
      ) : (
          <>
            {this.state.sortedImages.length === 0 && (
              <>
                <DragDropContext onDragEnd={this.onDragEnd}>
                  <Droppable droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                      >
                        {productRelations.map((p, i) => {
                          const image = p.childProductDetails
                            ? p.childProductDetails.images[0]
                            : "";
                          let src = "";
                          if (image && image.image) {
                            src =
                              image.image.indexOf("http") > -1
                                ? image.image
                                : imageURL(image.image);
                          } else {
                            src = image ? image.image : "";
                          }
                          return (
                            <Draggable
                              key={p.childID}
                              draggableId={`${p.childID}`}
                              index={i}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                  )}
                                >
                                  <Card
                                    className="item my-10"
                                    hoverable
                                    title={
                                      p.childProductDetails
                                        ? p.childProductDetails.sku
                                        : `Image ${i + 1}`
                                    }
                                  >
                                    {src ? (
                                      <div className="center">
                                        <img
                                          style={innerItemStyle}
                                          className="p-10"
                                          src={src}
                                          alt="Product Variation"
                                        />
                                      </div>
                                    ) : (
                                        <label
                                          style={innerItemStyle}
                                          className="d-flex-row align-center justify-center center missing-label"
                                        >
                                          IMAGE IS MISSING, PLEASE UPLOAD THE
                                      IMAGE TO VARIATION # {i + 1}
                                        </label>
                                      )}
                                  </Card>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </>
            )}
            {this.state.sortedImages.length > 0 && (
              <>
                <DragDropContext onDragEnd={this.onDragEnd}>
                  <Droppable droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                      >
                        {this.state.sortedImages.map((p, i) => {
                          const image = p.childProductDetails
                            ? p.childProductDetails.images[0]
                            : "";
                          let src = "";
                          if (image && image.image) {
                            src =
                              image.image.indexOf("http") > -1
                                ? image.image
                                : imageURL(image.image);
                          } else {
                            src = image ? image.image : "";
                          }
                          return (
                            <Draggable
                              key={p.childID}
                              draggableId={`${p.childID}`}
                              index={i}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                  )}
                                >
                                  <Card
                                    className="item my-10"
                                    hoverable
                                    title={
                                      p.childProductDetails
                                        ? p.childProductDetails.sku
                                        : `Image ${i + 1}`
                                    }
                                  >
                                    {src ? (
                                      <div className="center">
                                        <img
                                          style={innerItemStyle}
                                          className="p-10"
                                          src={src}
                                          alt="Product Variation"
                                        />
                                      </div>
                                    ) : (
                                        <label
                                          style={innerItemStyle}
                                          className="d-flex-row align-center justify-center center missing-label"
                                        >
                                          IMAGE IS MISSING, PLEASE UPLOAD THE
                                      IMAGE TO VARIATION # {i + 1}
                                        </label>
                                      )}
                                  </Card>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </>
            )}
          </>
        )}
    </>;
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateProductImagesSort: bindActionCreators(
      updateProductImagesSort,
      dispatch
    ),
  };
};

ImagesTab = connect(null, mapDispatchToProps)(ImagesTab);
export { ImagesTab };
