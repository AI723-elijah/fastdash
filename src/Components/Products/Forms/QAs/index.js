import React, { Component } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Card, Button, Row, Col, Input, Modal, message } from 'antd';
import "./qa.scss";
const { Item } = Form;
const { TextArea } = Input;

class QAs extends Component {

    state = {
        modalOpen: false,
        allQAs: this.props.productQAs,
        approved: [],
        disAprroved: [],
        selectedOperation: 'All Questions'
    }
    componentDidUpdate(previousProps, previousState) {
        if (previousProps !== this.props) {
            const { productQAs } = this.props;
            if(productQAs){
                if (this.state.selectedOperation === 'Approved Questions') {
                    this.setState({ allQAs: productQAs.filter(q => (q.approved === true || q.approved === 1) && q.productQAsID), selectedOperation: 'Approved Questions' })
                }
                else if (this.state.selectedOperation === 'Pending Questions') {
                    this.setState({ allQAs: productQAs.filter(q => (q.approved === false || q.approved === 0) && q.productQAsID), selectedOperation: 'Pending Questions' })
                }
                else if (this.state.selectedOperation === 'All Questions') {
                    this.setState({ allQAs: productQAs, selectedOperation: 'All Questions' })
                }
            }else{
                this.setState({ allQAs:[]})
            }
         
        }
    }

    handleQuestion = (e, i) => {
        const { productQAs, handleStateChange } = this.props;
        if (i.productQAsID) {
            const index = productQAs.findIndex(question => question.productQAsID === i.productQAsID)
            productQAs[index].question = e.target.value
            handleStateChange(productQAs, 'productQAs')
        } else {
            const index = productQAs.findIndex(question => question.tempID === i.tempID)
            productQAs[index].question = e.target.value
            handleStateChange(productQAs, 'productQAs')
        }
    }

    handleAnswer = (e, i) => {
        const { productQAs, handleStateChange } = this.props;
        if (i.productQAsID) {
            const index = productQAs.findIndex(question => question.productQAsID === i.productQAsID)
            productQAs[index].answer = e.target.value
            handleStateChange(productQAs, 'productQAs')
        } else {
            const index = productQAs.findIndex(question => question.tempID === i.tempID)
            productQAs[index].answer = e.target.value
            handleStateChange(productQAs, 'productQAs')
        }
    }

    handleDelete = i => {
        this.setState({ modalOpen: true, selectedQuestion: i })
    }

    deleteQuestion = () => {
        this.setState({ modalOpen: false }, () => {
            if(!this.state.selectedQuestion.tempID){
                const { productQAs, handleStateChange, removeQuestion, product } = this.props;
                let updatedQAs = productQAs.filter(option => option.productQAsID !== this.state.selectedQuestion.productQAsID);
                const removePayload = {
                    productID: product.productID,
                    productQAsID: this.state.selectedQuestion.productQAsID
                }
                removeQuestion(removePayload).then(() => {
                    message.success('Question deleted Successfully!', 5);
                })
                handleStateChange(updatedQAs, 'productQAs')
            }else{
                const { productQAs, handleStateChange } = this.props;
                let updatedQAs = productQAs.filter(option => option.tempID !== this.state.selectedQuestion.tempID);
                handleStateChange(updatedQAs, 'productQAs');
                message.success('Question deleted Successfully!', 5);
            }
         
        });
    }

    approveHandler = (e) => {
        const { productQAs, handleStateChange } = this.props;
        if (e.productQAsID) {
            const index = productQAs.findIndex(q => q.productQAsID === e.productQAsID)
            productQAs[index].approved = !productQAs[index].approved
            handleStateChange(productQAs, 'productQAs')
        } else {
            const index = productQAs.findIndex(q => q.tempID === e.tempID)
            productQAs[index].approved = !productQAs[index].approved
            handleStateChange(productQAs, 'productQAs')
        }

    }

    disApproveHandler = (e) => {
        const { productQAs, handleStateChange } = this.props;
        if (e.productQAsID) {
            const index = productQAs.findIndex(q => q.productQAsID === e.productQAsID)
            productQAs[index].approved = !productQAs[index].approved
            handleStateChange(productQAs, 'productQAs')
        } else {
            const index = productQAs.findIndex(q => q.tempID === e.tempID)
            productQAs[index].approved = !productQAs[index].approved
            handleStateChange(productQAs, 'productQAs')
        }
    }
    showAll = () => {
        const { productQAs } = this.props;
        this.setState({ allQAs: productQAs, selectedOperation: 'All Questions' })
    }
    showApproved = () => {
        const { productQAs } = this.props;
        this.setState({ allQAs: productQAs.filter(q => (q.approved === true || q.approved === 1) && q.productQAsID), selectedOperation: 'Approved Questions' })
    }
    showDisApproved = () => {
        const { productQAs } = this.props;
        this.setState({ allQAs: productQAs.filter(q => (q.approved === false || q.approved === 0) && q.productQAsID), selectedOperation: 'Pending Questions' })
    }
    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & (0x3 | 0x8));
          return v.toString(16);
        });
      }


    render() {
        const { productQAs, handleAddToArray, form: { getFieldDecorator } } = this.props;
        const question = {
            question: '',
            answer: null,
            approved: false,
            tempID: productQAs ? productQAs.length+1 :this.uuidv4()
        }

        return <>
            <Modal
                title="Delete Question"
                visible={this.state.modalOpen}
                onOk={this.deleteQuestion}
                onCancel={() => { this.setState({ modalOpen: false }) }}
            >
                <h3>Are you sure you want to delete this Question? </h3>
                <p>Note: Once this question is delted,it won't be recoverable!</p>
            </Modal>
            <div className='mx-15 d-flex-row justify-between'>
                <div>
                    <Button
                        style={{ background: "blue", borderColor: "blue", color: 'white', marginRight: '10px' }}
                        onClick={() => this.showAll()}>
                        <span className='info-count'>
                            {productQAs&&productQAs.length}
                        </span>
                          All
                            {productQAs&&productQAs.filter(q=>q.tempID).length>0?<>
                                <span className='info-count' style={{marginLeft:'10px'}}>
                            { productQAs&&productQAs.filter(q=>q.tempID).length}
                        </span> New
                            </>:''}
                          </Button>
                    <Button
                        style={{ background: "green", borderColor: "green", color: 'white', marginRight: '10px' }}
                        onClick={() => this.showApproved()}>
                        <span className='info-count'>
                            {productQAs&&productQAs.filter(q => q.approved && q.productQAsID).length}
                        </span>
                          Approved</Button>
                    <Button
                        style={{ background: "orange", borderColor: "orange", color: 'white', marginRight: '10px' }}
                        onClick={() => this.showDisApproved()}>
                        <span className='info-count'>
                            {productQAs&&productQAs.filter(q => !q.approved && q.productQAsID).length}
                        </span>
                        Pending</Button>
                </div>
                <div>
                    <Button onClick={() => handleAddToArray('productQAs', question)}>Add Question</Button>

                </div>
            </div>
            <div className='mx-15 active-section' >
                <h3>{this.state.selectedOperation}</h3>
            </div>
            <Row className='my-10' gutter={16}>
                {this.state.allQAs &&this.state.allQAs.map((e, i) => {
                    return (
                        <Col key={i} xs={24}>
                            <Card hoverable className='my-10'
                                extra={<>
                                    {e.approved
                                        ?
                                        <button
                                            type="button"
                                            className='button approved'
                                            onClick={() => { this.disApproveHandler(e) }}
                                        >Disapprove</button>
                                        :
                                        <button
                                            type="button"
                                            className='button disapproved'
                                            onClick={() => { this.approveHandler(e) }}
                                        >Approve</button>
                                    }
                                    <DeleteOutlined onClick={() => this.handleDelete(e)} />
                                </>}
                                title={e.question.toUpperCase()}
                            >
                                <label>Question</label>
                                <Item>
                                    {getFieldDecorator(`question${e.productQAsID?e.productQAsID:e.tempID}`, {
                                        rules: [{ required: true, message: 'Please Enter Question!' }],
                                        setFieldsValue: e.question,
                                        initialValue: e.question
                                    })(
                                        <Input
                                            onChange={d => this.handleQuestion(d, e)}
                                        ></Input>
                                    )}
                                </Item>

                                <label>Answer</label>
                                <Item>
                                    {getFieldDecorator(`answer${e.productQAsID?e.productQAsID:e.tempID}`, {
                                        rules: [{ required: false, message: 'Please Enter Answer!' }],
                                        setFieldsValue: e.answer ? e.answer : '',
                                        initialValue: e.answer ? e.answer : ''
                                    })(
                                        <TextArea rows={3}
                                            onChange={d => this.handleAnswer(d, e)}
                                        ></TextArea>
                                    )}
                                </Item>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </>;
    }
}

let QAsTab = Form.create()(QAs);
export { QAsTab };
