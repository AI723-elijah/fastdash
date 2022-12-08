import React from 'react';
import { Layout, Collapse, PageHeader, Row, Col, Switch, Input } from 'antd';
import { dummyData } from './dummyData';

const { Content } = Layout;
const { Panel } = Collapse;

const renderSwitch = () => {
  return (
    <Switch onChange={(value, e) => e.stopPropagation()} defaultChecked={true} />
  )
}

const SettingsList = () => {
  return (
    <Content>
      <PageHeader title={'CHANNELS'} />
      <Collapse defaultActiveKey={['0', '1', '2', '3']} expandIconPosition='left'>
        {dummyData.map((p, i) => {
          return (
            <Panel key={i} header={p.name} extra={renderSwitch()}>
              <Row gutter={16}>
                {p.fields.map((f, i) => {
                  return (
                    <Col className='py-10' key={i} xs={24} sm={12}>
                      <label>{f.name}</label>
                      <Input readOnly value={f.value} />
                    </Col>
                  );
                })}
              </Row>
            </Panel>
          );
        })}
      </Collapse>
    </Content>
  )
}

export { SettingsList };
