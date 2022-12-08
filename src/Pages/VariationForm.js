import React, { Component } from 'react';
import { Layout, PageHeader, Spin, message } from 'antd';
import { Fields } from '../Components/Variations';

class VariationForm extends Component {
  async componentDidMount() {
    const { getVariation, getCategories, getAttributes, match: { params: { id } } } = this.props;
    await getAttributes();
    await getVariation(id);
    await getCategories();
  }

  handleSubmit = (e, form) => {
    e.preventDefault();
    form.validateFields(async err => {
      if (!err) {
        const { updateVariation, variation, history } = this.props;
        await updateVariation(variation);
        message.success('Product has been updated', 5);
        history.push('/variations');
      } else {
        message.error('Empty fields found! Fill in the required fields before saving', 5);
      }
    });
  }

  render() {
    const { history, variation } = this.props;

    return (
      <Spin spinning={this.props.loading}>
        <Layout className='width-100 min-height-100vh'>
          <PageHeader onBack={() => history.goBack()} title={variation.name ? `${variation.name} - ${variation.sku}` : ''} />
          <Fields {...this.props} handleSubmit={this.handleSubmit} />
        </Layout>
      </Spin>
    );
  }
}

export { VariationForm };
