import React, { Component } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Card, Row, Col, Button, message, Input } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSiteMap, saveSiteMap } from '../Redux/Actions/SiteMap';
import { withRouter } from 'react-router-dom';

class SiteMap extends Component {
    constructor(props){
        super(props)
        this.state = {
            siteUrls: [],
            newSiteUrl: ''
        }
    }

    async componentWillMount(){
        const { getSiteMap } = this.props
        await getSiteMap();
        const { siteMap } = this.props
        this.setState({
            siteUrls: [...siteMap]
        })
    }
    changeHandler = (e, i) => {
        const { value } = e.currentTarget
        let currentSiteUrls = this.state.siteUrls
        currentSiteUrls[i] = value
        this.setState({
            siteUrls: [...currentSiteUrls],
        })
    }

    addSiteUrlHandler = e => {
        if (this.state.newSiteUrl === ''){
            message.error('Please Enter Site URL', 1)
        } else if(this.state.siteUrls.includes(this.state.newSiteUrl)){
            message.error('Site URL Already Exists', 1)
        } else if(this.state.newSiteUrl.substr(0, 24) !== 'https://westgatemfg.com/'){
            message.error('URL should contain the Domain : https://westgatemfg.com/', 1)
            return
        }else if (this.state.newSiteUrl !== '') {
            let currentSiteUrls = this.state.siteUrls
            currentSiteUrls.unshift(this.state.newSiteUrl)
            this.setState({
                siteUrls: [...currentSiteUrls],
                newSiteUrl: ''
            })
        }
    }

    newSiteHandler = e => {
        const { value } = e.currentTarget
        this.setState({
            newSiteUrl: value
        })
    }

    deleteSiteUrlHandler = index => {
        let currentSiteUrls = this.state.siteUrls
        if(currentSiteUrls[index].includes('https://westgatemfg.com/product/')){
            message.error('Cannot Delete Product URLs from here', 1)
            return
        }else{
            currentSiteUrls.splice(index, 1)
            this.setState({
                siteUrls: [...currentSiteUrls]
            })
        }
    }
    saveChangesHandler = async() => {
        const { saveSiteMap } = this.props
        await saveSiteMap({siteMap: [...this.state.siteUrls]})
        // this.props.history.push('/')
    }
    render() {
        
        return <>
        <Card title="SiteMap" className='width-100 products-list'>
            <Row>
                <Col span={12} offset={4}>
                    <Input onChange={this.newSiteHandler} value={this.state.newSiteUrl}  placeholder="Enter New Url to the Sitemap" />
                </Col>
                <Col span={4}>
                    <Button onClick={this.addSiteUrlHandler} className="mx-10" type="primary">Add</Button>
                </Col>
            </Row>
            {
                this.state.siteUrls.map((site, i) => {
                    return (
                        <Row key={i} className="my-45">
                            <Col span={12} offset={4} >
                                <Input disabled={site.includes('https://westgatemfg.com/product/')} key={i} onChange={(e) => this.changeHandler(e, i)}  value={site}  className="form-control my-1" placeholder="Enter New URL to the Sitemap" />
                            </Col>
                            <Col span={4}>
                                <DeleteOutlined
                                    onClick={() => this.deleteSiteUrlHandler(i)}
                                    className='mx-15'
                                    key='delete' />
                            </Col>
                        </Row>
                    );
                })
            }
            {
                this.state.siteUrls.length > 0
                &&
                <Row>
                    <Col span={12} offset={8}>
                        <Button onClick={this.saveChangesHandler} className="width-50" type="primary">Save Changes</Button>
                    </Col>
                </Row>
            }
            
        </Card>
        </>;
    }
}

const mapStateToProps = (state) => {
    return {
        siteMap: state.siteMapReducer.siteMap.siteMap
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSiteMap: bindActionCreators(getSiteMap, dispatch),
        saveSiteMap: bindActionCreators(saveSiteMap, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiteMap));
