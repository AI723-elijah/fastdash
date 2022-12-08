import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import debounce from 'lodash/debounce';
import xlsx from 'xlsx';
import he from 'he';
import { PlusSquareOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { Input, Select, Button, Upload, message } from 'antd';
import { CSVLink } from "react-csv";
import { DonwloadOrdersModal } from '../../Common/Modal';
import { headers } from '../../Static/staticObjects';
import { PickDate } from './DatePicker';

const { Option } = Select;

class Actions extends Component {
  constructor() {
    super();

    this.state = {
      channels: [],
      productsToDownload: [],
      openDatePickerModal: false
    }

    this.handleSearch = debounce(this.handleSearch, 800);
  }

  handleBulkUpload = (option) => {
    const { bulkUpload } = this.props;
    this.makeJSON(option.file).then(jsonData => {
      bulkUpload(jsonData)
        .then((res) => {
          option.onSuccess({ data: 'success' })
          this.fetchMasterProducts(0);
        })
        .catch(err => {
          message.error(err.payload.message, 5);
        });

    }).catch(err => {
      console.log(err);
    })
  }

  makeJSON = (file) => {
    return new Promise((resolve, reject) => {
      const { amazonLookUp } = this.props;
      var fileReader = new FileReader();
      fileReader.onloadend = async function (e) {
        var data = new Uint8Array(e.target.result);
        var oFile = xlsx.read(data, { type: 'array' });
        let items = xlsx.utils.sheet_to_json(oFile.Sheets[oFile.SheetNames[0]]);
        // for (const item of items) {
          items && items.map(async(item) => {
          try {
            const amazonRes = await amazonLookUp({ upc: item.upc });
            if (amazonRes.payload.status === true) {
              item.name = amazonRes.payload.products[0].name;
              item.description = amazonRes.payload.products[0].description;
              item.images = amazonRes.payload.products[0].images;
              item.price = amazonRes.payload.products[0].price;
              item.productChannels = amazonRes.payload.products[0].productChannels;
              item.list_type = 'master';
              item.created_by = localStorage.getItem('userEmail');
              item.type = 'Parent';
            } else {
              item.list_type = 'master';
              item.created_by = localStorage.getItem('userEmail');
              item.type = 'Parent';
              item.name = item.description;
            }
          } catch (err) {
            console.log(err);
          }
        })
        resolve(items)
      };
      fileReader.readAsArrayBuffer(file);
    })
  }

  handleSearch = e => {
    const { searchProducts, fetchSelectedProducts, fetchMasterProducts, emptyProducts, location: { pathname } } = this.props;
    if (e) {
      searchProducts(e)
        .catch(() => {
          message.error('Cannot find any product', 5);
        });
    } else {
      emptyProducts();
      if (pathname === '/products') {
        fetchSelectedProducts(0);
      } else {
        fetchMasterProducts(0);
      }
    }
  }

  handleInput = e => {
    const { saveSearchCriteria } = this.props;
    saveSearchCriteria(e.target.value);
    this.handleSearch(e.target.value);
  }

  // handleSync = () => {

  //   const { selectedAttributes, syncAttributesToSite } = this.props;
  //   syncAttributesToSite({ attributesToSync: selectedAttributes }).then(res=>{
  //     const { syncableAttributes } = res.payload;
  //     if(syncableAttributes.length!==0) {
  //       const formattedArray = syncableAttributes.map(sa=>{
  //         return {
  //           attribute_code: sa.attributeName,
  //           frontend_input: sa.type
  //         };
  //       });
  //       this.setState({
  //         ...this.state,
  //         unSyncedAttributes: formattedArray
  //       }, () => {
  //         this.handleUnsyncedModal();
  //       });
  //     } else {
  //       // exists case
  //     }
  //   })
  // }

  handlePublish = (event) => {
    const { publish, selected } = this.props;
    const { channels } = this.state;
    const { name } = event.target; 
    let type = 'create';
    if(name === 'update') {
      type='update';
    } else if(name === 'disable') {
      type='disable'; 
    } else if(name === 'relist')  {
      type='relist';
    } else if(name === 'enable') {
      type='enable';
    }
  
    let data = {
      type,
      channelID: channels,
      productID: selected
    };

    if(process.env.REACT_APP_FEATURE_FLAG === 'website-on') {

    }

    publish(data)
      .then(() => message.success('Product has been submitted, you will be nofied shortly about the status', 5))
      .catch(() => message.error('An error occured when publishing the product, please try again!'));
  }

  addChannels = e => {
    this.setState({ channels: e });
  }

  uploadProgress = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  handleRefresh = () => {
    this.props.refreshTierPricing()
      .then(() => {
        message.success('Tier Prices Refreshed!', 5);
      });
  }
  // Code Below is a very known anti pattern in React. The method needs to improve
  downloadAllVariations = async () => {
    const { getProductsVariations } = this.props;
    const headerData = [...headers];
    let total_products = 0;
    let variations = [];
    while (true) {
      const res = await getProductsVariations([], total_products)
      if (res.payload.length === 0) {
        break;
      }
      for (let index = 0; index < res.payload.length; index++) {
        let image = '';
        let video = '';
        const item = res.payload[index];
        item.application = item.application ? he.decode(item.application.split('\n').join('').replace(/,/g, ':')) : '';
        item.technicalSpecs = item.technicalSpecs ? he.decode(item.technicalSpecs.split('\n').join('').replace(/,/g, ':')) : '';
        if(item.images.length > 0) {
          let name = '';
          if(item.images[0].image.indexOf('.png') > -1) {
            name = item.images[0].image.replace('.png', '.jpg');
          } else {
            name = item.images[0].image
          }
          image = `${process.env.REACT_APP_NEW_PRODUCTIMAGEURL}${name}?alt=media`
        }
        if(item.videos.length > 0) {
          let name = '';
            name = item.videos[0].video
          video = `${process.env.REACT_APP_PRODUCTVIDEOURL}${name}?alt=media`
        }
        const obj = {
          productID : item.productID,
          type: item.type,
          name: item.name && item.name.replace(/(^"|"$)/g, ''),
          sku: item.sku,
          description: item.description && item.description.replace(/(^"|"$)/g, ''),
          price: item.price,
          status: item.status,
          upc: item.upc,
          quantity: item.quantity,
          technicalSpecs: item.technicalSpecs,
          application: item.application,
          productImage: image,
          productVideo: video
        }
        for (let attribute_index = 0; attribute_index < item.productAttributes.length; attribute_index++) {
          if (item.productAttributes[attribute_index] && item.productAttributes[attribute_index].attribute !== null && item.productAttributes[attribute_index].attribute.attributeName) {
            // Check the header here
            const matchedHeader = headerData.filter(h => h.key === `ATTRIBUTE-${item.productAttributes[attribute_index].attribute.attributeName}`);
            if (matchedHeader.length === 0) {
              headerData.push({ label: `ATTRIBUTE-${item.productAttributes[attribute_index].attribute.attributeName}`, key: `ATTRIBUTE-${item.productAttributes[attribute_index].attribute.attributeName}` })
            }
            // push to Object
            obj[`ATTRIBUTE-${item.productAttributes[attribute_index].attribute.attributeName}`] = item.productAttributes[attribute_index].value && item.productAttributes[attribute_index].value.replace(/(^"|"$)/g, '');
          }
        }
        for (let document_index = 0; document_index < item.productDocuments.length; document_index++) {
          if (item.productDocuments[document_index].documentType) {
            let baseUrl = '';
            if (item.productDocuments[document_index].documentType === "SPC") {
              baseUrl = process.env.REACT_APP_SPCDOCUMENTURL;
            } else if (item.productDocuments[document_index].documentType === "LM79") {
              baseUrl = process.env.REACT_APP_LMDOCUMENTURL;
            } else if (item.productDocuments[document_index].documentType === "CAT") {
              baseUrl = process.env.REACT_APP_CATDOCUMENTURL;
            } else if (item.productDocuments[document_index].documentType === "IES") {
              baseUrl = process.env.REACT_APP_IESDOCUMENTURL;
            } else if (item.productDocuments[document_index].documentType === "MAN") {
              baseUrl = process.env.REACT_APP_MANDOCUMENTURL;
            }
            // check here if the key exists in the headers
            const matchedHeader = headerData.filter(h => h.key === `DOCUMENT-${item.productDocuments[document_index].documentType}`);
            if (matchedHeader.length === 0) {
              headerData.push({ label: `DOCUMENT-${item.productDocuments[document_index].documentType}`, key: `DOCUMENT-${item.productDocuments[document_index].documentType}` })
            }
            obj[`DOCUMENT-${item.productDocuments[document_index].documentType}`] = `${baseUrl}${item.productDocuments[document_index].document}?alt=media`
          }
        }
        for (let icon_index = 0; icon_index < item.productIcons.length; icon_index++) {
          if (item.productIcons[icon_index] && item.productIcons[icon_index].iconDetails !== null && item.productIcons[icon_index].iconDetails.iconName) {
            // check for data in headerData
            const matchedHeader = headerData.filter(h => h.key === `ICON-${item.productIcons[icon_index].iconDetails.iconName}`);
            if (matchedHeader.length === 0) {
              headerData.push({ label: `ICON:${item.productIcons[icon_index].iconDetails.iconName}`, key: `ICON-${item.productIcons[icon_index].iconDetails.iconName}` })
            }
            obj[`ICON-${item.productIcons[icon_index].iconDetails.iconName}`] = `${process.env.REACT_APP_ICONURL}${item.productIcons[icon_index].iconDetails.iconURL}?alt=media`
          }
        }
        for (let options_index = 0; options_index < item.productOptions.length; options_index++) {
          const currentOption = item.productOptions[options_index];
          if (currentOption && currentOption.optionDetails !== null) {
            const matchedHeader = headerData.filter(h => h.key === `OPTION-${currentOption.optionDetails.name}`);
            if (matchedHeader.length === 0) {
              headerData.push({ label: `OPTION-${currentOption.optionDetails.name}`, key: `OPTION-${currentOption.optionDetails.name}` })
            }
            obj[`OPTION-${currentOption.optionDetails.name}`] = currentOption.optionDetails.name;
            if (currentOption.optionDetails.documents && currentOption.optionDetails.documents.length > 0) {
              const baseUrl = process.env.REACT_APP_OPTIONDOC;
              for (let document_index = 0; document_index < currentOption.optionDetails.documents.length; document_index++) {
                const currentDoc = currentOption.optionDetails.documents[document_index];
                if (currentDoc.documentName) {
                  const matchedHeader = headerData.filter(h => h.key === `OPTIONDOC-${currentDoc.documentName}`);
                  if (matchedHeader.length === 0) {
                    headerData.push({ label: `OPTIONDOC-${currentDoc.documentName}`, key: `OPTIONDOC-${currentDoc.documentName}` })
                  }
                  obj[`OPTIONDOC-${currentDoc.documentName}`] = `${baseUrl}${currentDoc.document}?alt=media`
                }
              }
            }
            if (currentOption.optionDetails.images && currentOption.optionDetails.images.length > 0) {
              const baseUrl = process.env.REACT_APP_OPTIONURL;
              for (let image_index = 0; image_index < currentOption.optionDetails.images.length; image_index++) {
                const currentImage = currentOption.optionDetails.images[image_index];
                if (currentImage.image) {
                  const matchedHeader = headerData.filter(h => h.key === `OptionImage-${currentImage.image.split('.')[0]}`);
                  if (matchedHeader.length === 0) {
                    headerData.push({ label: `OptionImage-${currentImage.image.split('.')[0]}`, key: `OptionImage-${currentImage.image.split('.')[0]}` })
                  }
                  obj[`OptionImage-${currentImage.image.split('.')[0]}`] = `${baseUrl}${currentImage.image}?alt=media`
                }
              }
            }
          }
        }
        variations.push(obj);
      }
      total_products = variations.length;
    }
    const element = (
      <CSVLink
        separator=','
        id="download_link"
        data={variations}
        headers={headerData}
        filename='ProductVariations.csv'
        style={{ visibility: 'hidden' }}
      >
        Download All Variations
      </CSVLink>
    );

    ReactDOM.render(element, document.querySelector('#downloadAllVariations'));
    document.getElementById('download_link').click();
  }

  downloadVariations = () => {
    const { selected, getProductsVariations } = this.props;
    getProductsVariations(selected)
      .then((res) => {
       
        const headerData = [...headers];
        let variations = [];
        for (let index = 0; index < res.payload.length; index++) {
          let image = '';
          if(res.payload[index].images.length > 0) {
            let name = '';
            if(res.payload[index].images[0].image.indexOf('.png') > -1) {
              name = res.payload[index].images[0].image.replace('.png', '.jpg');
            } else {
              name = res.payload[index].images[0].image
            }
            image = `${process.env.REACT_APP_NEW_PRODUCTIMAGEURL}${name}?alt=media`
          }
          let video = '';
          if(res.payload[index].videos.length > 0) {
            let name = '';
            name = res.payload[index].videos[0].video
            video = `${process.env.REACT_APP_PRODUCTVIDEOURL}${name}?alt=media`
          }
          const obj = {
            id: res.payload[index].childProductDetails.productID,
            name: res.payload[index].childProductDetails.name,
            sku: res.payload[index].childProductDetails.sku,
            description: res.payload[index].childProductDetails.description,
            price: res.payload[index].childProductDetails.price,
            status: res.payload[index].childProductDetails.status,
            upc: res.payload[index].childProductDetails.upc,
            quantity: res.payload[index].childProductDetails.quantity,
            technicalSpecs: res.payload[index].childProductDetails.technicalSpecs,
            application: res.payload[index].childProductDetails.application,
            productImage: image,
            productVideo: video
          }
          for (let attribute_index = 0; attribute_index < res.payload[index].childProductDetails.productAttributes.length; attribute_index++) {
            if (res.payload[index].childProductDetails.productAttributes[attribute_index] && res.payload[index].childProductDetails.productAttributes[attribute_index].attribute !== null) {
              // Check the header here
              const matchedHeader = headerData.filter(item => item.key === res.payload[index].childProductDetails.productAttributes[attribute_index].attribute.attributeName);
              if (matchedHeader.length === 0) {
                headerData.push({ label: res.payload[index].childProductDetails.productAttributes[attribute_index].attribute.attributeName, key: res.payload[index].childProductDetails.productAttributes[attribute_index].attribute.attributeName })
              }
              // push the attribute to the variation data
              obj[res.payload[index].childProductDetails.productAttributes[attribute_index].attribute.attributeName] = res.payload[index].childProductDetails.productAttributes[attribute_index].value;
            }
          }
          for (let document_index = 0; document_index < res.payload[index].childProductDetails.productDocuments.length; document_index++) {
            let baseUrl = '';
            if (res.payload[index].childProductDetails.productDocuments[document_index].documentType === "SPC") {
              baseUrl = process.env.REACT_APP_SPCDOCUMENTURL;
            } else if (res.payload[index].childProductDetails.productDocuments[document_index].documentType === "LM79") {
              baseUrl = process.env.REACT_APP_LMDOCUMENTURL;
            } else if (res.payload[index].childProductDetails.productDocuments[document_index].documentType === "CAT") {
              baseUrl = process.env.REACT_APP_CATDOCUMENTURL;
            } else if (res.payload[index].childProductDetails.productDocuments[document_index].documentType === "IES") {
              baseUrl = process.env.REACT_APP_IESDOCUMENTURL;
            } else if (res.payload[index].childProductDetails.productDocuments[document_index].documentType === "MAN") {
              baseUrl = process.env.REACT_APP_MANDOCUMENTURL;
            }
            // check here if the key exists in the headers
            const matchedHeader = headerData.filter(item => item.key === res.payload[index].childProductDetails.productDocuments[document_index].documentType);
            if (matchedHeader.length === 0) {
              headerData.push({ label: res.payload[index].childProductDetails.productDocuments[document_index].documentType, key: res.payload[index].childProductDetails.productDocuments[document_index].documentType })
            }
            obj[res.payload[index].childProductDetails.productDocuments[document_index].documentType] = `${baseUrl}${res.payload[index].childProductDetails.productDocuments[document_index].document}`
          }
          for (let icon_index = 0; icon_index < res.payload[index].childProductDetails.productIcons.length; icon_index++) {
            if (res.payload[index].childProductDetails.productIcons[icon_index] && res.payload[index].childProductDetails.productIcons[icon_index].iconDetails !== null) {
              // check for data in headerData
              const matchedHeader = headerData.filter(item => item.key === res.payload[index].childProductDetails.productIcons[icon_index].iconDetails.iconName);
              if (matchedHeader.length === 0) {
                headerData.push({ label: `ICON:${res.payload[index].childProductDetails.productIcons[icon_index].iconDetails.iconName}`, key: res.payload[index].childProductDetails.productIcons[icon_index].iconDetails.iconName })
              }
              obj[res.payload[index].childProductDetails.productIcons[icon_index].iconDetails.iconName] = `${process.env.REACT_APP_ICONURL}${res.payload[index].childProductDetails.productIcons[icon_index].iconDetails.iconURL}`
            }
          }
          variations.push(obj);
        }
        const element = (<CSVLink
          id="download_link"
          data={variations}
          headers={headerData}
          filename='ProductVariations.csv'
          style={{ visibility: 'hidden' }}
        >
          Download Variations
        </CSVLink>);

        ReactDOM.render(element, document.querySelector('#downloadVariations'));
        document.getElementById('download_link').click();
      })
  }

  handleDownloadOrders = () => {
    this.setState({ ...this.state.openDatePickerModal, openDatePickerModal: true });
  }

  handleCancel = () => {
    this.setState({ ...this.state.openDatePickerModal, openDatePickerModal: false});
  }

  handleElasticSearch = async () => {
    const { BulkUploadElasticSearch, deleteIndex, createMapping } = this.props;
    await deleteIndex();
    await createMapping();
    let page = 1;
    while (page < 14) {
      await BulkUploadElasticSearch(page);
      page++;
    }
  }

  render() {
    const { selected, type, location: { pathname }, handleAdd, query, downloadOrders, loading } = this.props;
    const { channels, openDatePickerModal } = this.state;

    return (
      <div className='d-flex-row justify-between'>
        <div className='f-flex-row'>
          <Input
            className='search-box'
            placeholder='Search Products'
            onChange={this.handleInput}
            value={query}
            addonAfter={<SearchOutlined />}
          />
          { selected.length > 0 && (process.env.REACT_APP_NAME === 'fas' || process.env.REACT_APP_NAME === 'mexmax') && (
            pathname === '/products' ?
              <>
                <Select
                  mode='multiple'
                  className='select mx-10'
                  placeholder='Select Channel To Publish'
                  onChange={this.addChannels}
                  value={channels}
                >
                  <Option value={1}>Publish to Ebay</Option>
                  <Option value={2}>Publish to Amazon</Option>
                  <Option value={3}>Publish to Etsy</Option>
                  <Option value={4}>Publish to Magento</Option>
                  <Option value={6}>Publish to Walmart</Option>
                </Select>
                <Button 
                  disabled={channels.length === 0}
                  name='publish'
                  className='mx-10'
                  onClick={this.handlePublish}>
                    Publish
                </Button>
                <Button 
                  disabled={channels.length === 0}
                  name='update'
                  className='mx-10'
                  onClick={this.handlePublish}>
                    Update
                </Button>
                <Button 
                  disabled={channels.length === 0}
                  name='disable'
                  className='mx-10'
                  onClick={this.handlePublish}>
                    disable
                </Button>
                <Button 
                  disabled={channels.length === 0}
                  name='enable'
                  className='mx-10'
                  onClick={this.handlePublish}>
                    enable
                </Button>
                <Button 
                  disabled={channels.length === 0}
                  name='relist'
                  className='mx-10'
                  onClick={this.handlePublish}>
                    Relist
                </Button>
              </>
              :
              <Button className='mx-10'>Move to Selected Products</Button>
          )}
        </div>
        <div className='d-flex-row justify-between'>
          {/* { selected.length > 0 &&
            <DownloadExcel products={products} selected={selected} />
          } */}
          {process.env.REACT_APP_NAME === 'mexmax' &&
            <Upload className='mx-5' accept='.xlsx,.xls' onChange={(e) => this.uploadProgress(e)} customRequest={e => this.handleBulkUpload(e)} >
              <Button><UploadOutlined />Bulk Upload</Button>
            </Upload>
          }
            <Button className='mx-5' onClick={this.handleDownloadOrders}>
              Download Orders
            </Button>

            {openDatePickerModal && 
            <DonwloadOrdersModal
              open={openDatePickerModal}
              title='Request to Download Orders'
              handleCancel={this.handleCancel}
              handleSave={this.handleSave}
              Component={PickDate}
              downloadOrders={downloadOrders}
              loading={loading}
            />}
          {process.env.REACT_APP_NAME === 'fas' &&
            <Button className='mx-5' onClick={this.handleRefresh}>
              Refresh Tier Pricing
            </Button>
          }
          <div id="downloadAllVariations"></div>
          <Button className='mx-5' onClick={this.downloadAllVariations}>
            Download All Variations
          </Button>
          {selected.length > 0 &&
            <div id="downloadVariations"></div>
          }
          {selected.length > 0 &&
            <Button className='mx-5' onClick={this.downloadVariations}>
              Download Variations
            </Button>
          }
          { process.env.REACT_APP_NAME === 'westgate' &&
            <Button className='mx-5' onClick={this.handleElasticSearch}>
              Republish To Elasticsearch
            </Button>
          }
          <Button type='primary' icon={<PlusSquareOutlined />} onClick={() => handleAdd(`${type}/new`)}>Add Product</Button>
        </div>
      </div>
    );
  }
}

export { Actions };
