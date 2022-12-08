import React, { Component } from "react";
import { CloseOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Card, Row, Col } from "antd";
import firebase from "firebase/app";
import "firebase/storage";
import FileUploader from "react-firebase-file-uploader";
import { documentURL } from "../../../../../Common/createDocumentURL";

class Documents extends Component {
  handleDeleteDocument = (docName) => {
    const storage = firebase.storage();
    var desertRef = storage.refFromURL(docName);
    // Delete the file
    desertRef.delete();
  };
  handleChange = (v, name, i) => {
    const { handleStateChange, parentIndex } = this.props;
    let productRelations = [...this.props.productRelations];

    productRelations[parentIndex].childProductDetails.productDocuments[i][
      name
    ] = v;
    handleStateChange(productRelations, "productRelations");
  };

  onUploadStart = () => {
    this.props.startLoading();
  };

  onUploadSuccess = (filename, i) => {
    this.props.stopLoading();
    this.handleChange(filename, `document`, i);
  };

  render() {
    const { productRelation } = this.props;

    return (
      <Card title="Variation Documents" type="inner">
        <Row className="variation-row" gutter={16}>
          {productRelation.childProductDetails.productDocuments.map((p, i) => {
            let src = "";
            if (p.document) {
              src = documentURL(p.document, p.documentType);
            }

            return (
              <section key={`document-${i}`}>
                <Col xs={24} sm={24}>
                  <p>{p.documentType}</p>
                  <div className="d-flex-row align-center image-container">
                    {src ? (
                      <span className="d-flex-row align-center">
                        <FilePdfOutlined className="icon" />
                        <a
                          className="mx-10"
                          href={src}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {p.document}
                        </a>
                      </span>
                    ) : (
                      <FileUploader
                        accept=".doc,.docx,.txt,.pdf,.ies"
                        name="document"
                        storageRef={firebase
                          .storage()
                          .ref(`documents/${p.documentType}`)}
                        onUploadStart={this.onUploadStart}
                        onUploadSuccess={(e) => this.onUploadSuccess(e, i)}
                      />
                    )}
                    {src && (
                      <CloseOutlined
                        className="close-btn h-pointer"
                        onClick={() => {
                          this.handleDeleteDocument(src);
                          this.handleChange("", "document", i);
                        }}
                      />
                    )}
                  </div>
                </Col>
              </section>
            );
          })}
        </Row>
      </Card>
    );
  }
}

export { Documents };
