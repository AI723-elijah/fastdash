import React, { Component, Suspense } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Tabs, Button, Spin, message } from 'antd';
import { CSVLink } from 'react-csv';
import { tabsList } from './TabsList';
import { featureTabs } from './FeatureTabs';
import { headers } from '../../../Static/staticObjects';

const { TabPane } = Tabs;

class ProductForm extends Component {
  constructor() {
    super();

    this.state = {
      addVariations: false,
      addTierPrices: false,
      variations: []
    }
  }

  componentDidUpdate(oldProps) {
    const { match: { params }, productRelations, product } = this.props;
 

    if (product !== oldProps.product) {
      if (params.id) {
        this.setState({
          addVariations: productRelations.length > 0,
          addTierPrices: product.tierPricing,
          variations: productRelations.map(rel => {
            return {
              name: rel.childProductDetails.name,
              sku: rel.childProductDetails.sku,
              description: rel.childProductDetails.description,
              price: rel.childProductDetails.price,
              status: rel.childProductDetails.status,
              upc: rel.childProductDetails.upc,
              quantity: rel.childProductDetails.quantity,
              technicalSpecs: rel.childProductDetails.technicalSpecs,
              application: rel.childProductDetails.application,
              titleMetaTags: rel.childProductDetails.titleMetaTags,
              descriptionTags: rel.childProductDetails.descriptionTags
            }
          })
        });
      }
    }
  }

  handleSwitch = (e, name) => {
    this.setState({ [name]: e });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { handleSave } = this.props;
        handleSave();
      } else {
        message.error('Empty fields found! Fill in the required fields before saving', 5);
      }
    });
  }

  handlePublish = () => {
    const { publish, match: { params: { id } } } = this.props;
  
    let data = {
      type: 'create',
      channelID: 4,
      productID: id
    };

    publish(data)
      .then(() => message.success('Product has been submitted, you will be nofied shortly about the status', 5))
      .catch(() => message.error('An error occured when publishing the product, please try again!'));
  }

  render() {
    const { addVariations, addTierPrices, variations } = this.state;
    const { match: { params: { id } }, handleMoveProduct, duplicateProduct, loading, buttonTitle, product } = this.props;


    const fRoutes = process.env.REACT_APP_FEATURES.split(',') || [];
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className='d-flex-row justify-end m-15'>
          {process.env.REACT_APP_NAME === 'mexmax' && id &&
            <Button className='mx-10' onClick={this.handlePublish}>
              Publish to Magento
            </Button>
          }
          {process.env.REACT_APP_NAME === 'westgate' && id &&
            <Button>
              <CSVLink data={variations} headers={headers} filename={product.sku}>Download Variations</CSVLink>
            </Button>
          }
          {process.env.REACT_APP_NAME === 'westgate' && id &&
            <Button className='mx-10' onClick={() => this.props.publishProduct(product.sku)}>
              Publish to Westgate
            </Button>
          }
          {id &&
            <Button onClick={() => handleMoveProduct(buttonTitle)}>
              Move to {buttonTitle.toUpperCase()} Products
            </Button>
          }
          {product.list_type === 'master' && <Button className="mx-10" onClick={() => duplicateProduct(id)}>
            Clone Product
           </Button>}
          <Button className="mx-10" htmlType='submit'>Save</Button>
        </div>
        <Tabs className='my-10'>
          {tabsList.map(e => {
               if(process.env.REACT_APP_NAME !== "westgate" &&(e.key==='options' || e.key==='QAs')){
                 return null;
               }
            const Component = e.Component;
            return (
              e.key === 'channels' && !id ?
                null :
                ((e.key === 'variations' && !addVariations) || (e.key === 'prices' && !addTierPrices)) ?
                  null :
                  e.key === 'variations' ?
                    <TabPane key={e.key} tab={e.title}>
                      <Suspense fallback={<Spin spinning={loading}></Spin>}>
                        <Component
                          {...this.props}
                          handleSwitch={this.handleSwitch}
                          addVariations={addVariations}
                          addTierPrices={addTierPrices}
                        />
                      </Suspense>
                    </TabPane>
                    :
                    <TabPane tab={e.title} key={e.key}>
                      <Component
                        {...this.props}
                        handleSwitch={this.handleSwitch}
                        addVariations={addVariations}
                        addTierPrices={addTierPrices}
                      />
                    </TabPane>
            )
          })}
          {featureTabs.map(e => {
            const Component = e.Component;
            return (
              fRoutes.indexOf(e.feature) > -1 ?
                <TabPane tab={e.title} key={e.key}>
                  <Component
                    {...this.props}
                    handleSwitch={this.handleSwitch}
                    addVariations={addVariations}
                    addTierPrices={addTierPrices}
                  />
                </TabPane>
                :
                null
            )
          })}
        </Tabs>
      </Form>
    );
  }
}

let ProductTabs = Form.create()(ProductForm);
export { ProductTabs };
