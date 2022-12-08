import React, { Component } from "react";

import { PlusSquareOutlined } from "@ant-design/icons";

import { Card, Button, message, Modal, Input } from "antd";
// import { IMModal } from '../Common/Modal';
import { List } from "../Components/options/List";
import { OptionsForm } from "../Components/options/optionsForm";
import { UpdateOptionForm } from "../Components/options/updateOptionForm";
import { optionURL } from "../Common/createOptionURL";
import { BulkAssociation } from "../Components/options/bulkAssiciation";
class Options extends Component {
  constructor() {
    super();
    this.state = {
      options: [],
      open: false,
      imageURL: "",
      selectedOption: "",
      openUpdate: false,
      openBulkAdd: false,
      updateImageURL: "",
      src: null,
      spc: null,
      cat: null,
      lm79: null,
      ies: null,
      man: null,
    };
  }

  componentDidMount() {
    const { getOptions, getAllProductsInSystem } = this.props;
    getOptions();
    getAllProductsInSystem();
  }

  componentDidUpdate(oldProps) {
    const { options } = this.props;

    if (oldProps.options !== options) {
      this.setState({ options: options });
    }
  }

  handleSearch = async (e) => {
    const { options } = this.props;

    var searchFilter = e.target.value && e.target.value.toLowerCase();
    let searchOption = [];

    searchOption =
      options &&
      options.filter((item) => {
        return Object.keys(item).some(
          (key) =>
            typeof item[key] === "string" &&
            item[key] &&
            item[key].toLowerCase().includes(searchFilter)
        );
      });

    if (searchOption) {
      this.setState({ options: searchOption });
    } else {
      this.setState({ options: options });
    }
  };

  handleModal = () => {
    this.setState({ src: null }, () => {
      this.setState({ open: !this.state.open });
    });
  };

  handleBulkAddModal = (option) => {
    this.setState({ selectedOption: option }, () => {
      this.setState({ openBulkAdd: !this.state.openBulkAdd });
    });
  };

  handleUpdateModal = (option) => {
    if (option && option.images) {
      if (option.images.length > 0) {
        let img = optionURL(option.images[0].image);
        this.setState({ src: img });
        // this.state.src = optionURL(option.images[0].image)
      }
      this.setState(
        {
          selectedOption: option,
        },
        () => {
          this.setState({ openUpdate: !this.state.openUpdate });
        }
      );
    } else {
      this.setState({ src: null }, () => {
        this.setState({ openUpdate: !this.state.openUpdate });
      });
    }
  };

  handleSave = (e, form) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const { saveOption, getOptions } = this.props;
        values.image = this.state.imageURL;
        values.documents = [];
        if (this.state.spc) values.documents.push(this.state.spc);
        if (this.state.cat) values.documents.push(this.state.cat);
        if (this.state.lm79) values.documents.push(this.state.lm79);
        if (this.state.ies) values.documents.push(this.state.ies);
        if (this.state.man) values.documents.push(this.state.man);
        this.handleModal();
        saveOption(values).then(() => {
          message.success("Option is Added", 5);
          this.setState({
            ...this.state,
            spc: null,
            cat: null,
            lm79: null,
            ies: null,
            man: null,
          });
          getOptions();
        });
      }
    });
  };

  handleUpdate = (e, form) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        values.productID = this.state.selectedOption.productID;
        values.image = this.state.updateImageURL;
        const { updateOption, getOptions } = this.props;
        this.handleUpdateModal();
        updateOption(values).then(() => {
          message.success("Option is updated", 5);
          getOptions();
        });
      }
    });
  };

  handleBulkAddSave = (prds, optionID) => {
    const { bulkProductOptionsUploading } = this.props;
    const selectedProducts = prds.filter((op) => op.checked === true);
    const finalData = selectedProducts.map((prd) => {
      return { productID: prd.productID, optionID };
    });
    bulkProductOptionsUploading(finalData)
      .then(() => {
        this.handleBulkCanel();
        message.success("Options published successfully!", 5);
      })
      .catch((err) => {
        message.error("Network error, try again!", 5);
      });
  };

  handleUploadStart = () => {
    this.props.startLoading();
  };

  handleUploadSuccess = (filename) => {
    message.success("Image Uploaded Successfully!", 5);
    this.setState({ imageURL: filename, src: optionURL(filename) });
    this.props.stopLoading();
  };
  handleSPCSuccess = (filename) => {
    message.success("File Uploaded Successfully!", 5);
    const spcDoc = {
      documentName: filename.split(".pdf")[0],
      document: filename,
      type: "SPC",
    };
    this.setState({ ...this.state, spc: spcDoc });
    this.props.stopLoading();
  };

  handleCATSuccess = (filename) => {
    message.success("File Uploaded Successfully!", 5);
    const spcDoc = {
      documentName: filename.split(".pdf")[0],
      document: filename,
      type: "CAT",
    };
    this.setState({ ...this.state, cat: spcDoc });
    this.props.stopLoading();
  };

  handleLM79Success = (filename) => {
    message.success("File Uploaded Successfully!", 5);
    const spcDoc = {
      documentName: filename.split(".pdf")[0],
      document: filename,
      type: "LM79",
    };
    this.setState({ ...this.state, lm79: spcDoc });
    this.props.stopLoading();
  };

  handleIESSuccess = (filename) => {
    message.success("File Uploaded Successfully!", 5);
    const spcDoc = {
      documentName: filename.split(".ies")[0],
      document: filename,
      type: "IES",
    };
    this.setState({ ...this.state, ies: spcDoc });
    this.props.stopLoading();
  };

  handleMANSuccess = (filename) => {
    message.success("File Uploaded Successfully!", 5);
    const spcDoc = {
      documentName: filename.split(".pdf")[0],
      document: filename,
      type: "MAN",
    };
    this.setState({ ...this.state, man: spcDoc });
    this.props.stopLoading();
  };

  handleUpdateUplaodSuccess = (filename) => {
    message.success("Image Uploaded Successfully!", 5);
    this.setState({ updateImageURL: filename, src: optionURL(filename) });
    this.props.stopLoading();
  };

  handleDelete = (id) => {
    const { getOptions, deleteOption } = this.props;
    deleteOption(id).then(() => {
      message.success("Option deleted Successfully!", 5);
      getOptions();
    });
  };

  onCancelDoc = (document) => {
    const { deleteOptionDocument } = this.props;
    let selected = this.state.selectedOption;
    selected.documents = selected.documents.filter(
      (item) =>
        item.documentId !== document.documentId && item.type !== document.type
    );
    this.setState({ selectedOption: selected });
    deleteOptionDocument(document.documentId).then((res) => {
      message.success("Document deleted Successfully!", 5);
    });
  };
  updateDoc = (filename, type) => {
    const { AddOptionDocument } = this.props;
    message.success("File Uploaded Successfully!", 5);
    const doc = {
      documentName: filename.split(".pdf")[0],
      document: filename,
      type: type,
      productID: this.state.selectedOption.productID,
    };
    AddOptionDocument(doc).then((res) => {
      let selected = this.state.selectedOption;
      selected.documents.push(res.payload);
      this.setState({ selectedOption: selected });
    });
    this.props.stopLoading();
  };

  handleBulkCanel = () => {
    this.setState({ selectedOption: "" }, () => {
      this.setState({ openBulkAdd: !this.state.openBulkAdd });
    });
  };

  render() {
    const { open, openUpdate, selectedOption, src, openBulkAdd } = this.state;
    return (
      <Card title="Options" className="width-100">
        <div className="d-flex-row justify-end">
          <Input
            className="select-option max-width-50 mx-10"
            placeholder="Search Option"
            onChange={(e) => this.handleSearch(e)}
          />
          <Button icon={<PlusSquareOutlined />} onClick={this.handleModal}>
            Add Option
          </Button>
        </div>
        <List
          options={this.state.options}
          deleteoption={this.handleDelete}
          updateOption={this.handleUpdateModal}
          loading={this.props.loading}
          openLinkModal={this.handleBulkAddModal}
        />

        {/* ADD OPTION MODAL  */}
        <Modal
          width={900}
          destroyOnClose={true}
          title="New Option"
          visible={open}
          onCancel={this.handleModal}
          footer={[
            <Button key="close" onClick={this.handleModal}>
              Close
            </Button>,
            <Button
              loading={this.props.loading}
              form="addForm"
              key="submit"
              htmlType="submit"
            >
              Submit
            </Button>,
          ]}
        >
          <OptionsForm
            handleSave={this.handleSave}
            handleUploadStart={this.handleUploadStart}
            handleUploadSuccess={this.handleUploadSuccess}
            loading={this.props.loading}
            handleSPCSuccess={this.handleSPCSuccess}
            handleCATSuccess={this.handleCATSuccess}
            handleLM79Success={this.handleLM79Success}
            handleIESSuccess={this.handleIESSuccess}
            handleMANSuccess={this.handleMANSuccess}
          />
        </Modal>
        {/* UPDATE MODAL */}
        <Modal
          destroyOnClose={true}
          width={900}
          title="Update Option"
          visible={openUpdate}
          onCancel={this.handleUpdateModal}
          footer={[
            <Button key="close" onClick={this.handleUpdateModal}>
              Close
            </Button>,
            <Button
              loading={this.props.loading}
              form="imForm"
              key="submit"
              htmlType="submit"
            >
              Submit
            </Button>,
          ]}
        >
          <UpdateOptionForm
            src={src}
            handleSave={this.handleUpdate}
            selectedOption={selectedOption}
            handleUploadStart={this.handleUploadStart}
            handleUploadSuccess={this.handleUpdateUplaodSuccess}
            onCancelDoc={this.onCancelDoc}
            onUpdateDoc={this.updateDoc}
            loading={this.props.loading}
          />
        </Modal>

        {/* BULK ASSOCIATION  */}
        <Modal
          title="Associate Option"
          visible={openBulkAdd}
          onCancel={this.handleBulkCanel}
          onOk={this.handleBulkAddSave}
          destroyOnClose={true}
          footer={null}
        >
          <BulkAssociation
            option={selectedOption}
            loading={this.props.loading}
            parentProducts={this.props.parentProducts}
            childProducts={this.props.childProducts}
            getProductsByOption={this.props.getProductsByOption}
            optionProducts={this.props.optionProducts}
            ResetSelectedOptionProducts={this.props.ResetSelectedOptionProducts}
            close={this.handleBulkCanel}
            save={this.handleBulkAddSave}
          />
        </Modal>
      </Card>
    );
  }
}

export { Options };
