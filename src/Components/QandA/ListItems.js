import React, { Component } from 'react';
import { DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Card, Input, message, Modal, Col, Row, Popconfirm} from 'antd';
const { Item } = Form;
const { TextArea } = Input;
// const { getFieldDecorator } = Form
class ListItems extends Component {

    state = {
        modalOpen: false,
    }

    disApproveHandler = (e) => {
        const { handleUpdate, questions } = this.props;
        const index = questions.findIndex(q => q.question.productQAsID === e.productQAsID)
        questions[index].question.approved = !questions[index].question.approved
        handleUpdate(questions)
    }

    approveHandler = (e) => {
        const { handleUpdate, questions } = this.props;
        const index = questions && questions.findIndex(q => q.question.productQAsID === e.productQAsID)
        questions[index].question.approved = !questions[index].question.approved
        handleUpdate(questions)
    }

    handleQuestion = (e, question) => {
        e.preventDefault();
        e.persist();
        const { handleUpdate, questions } = this.props;
        const index = questions && questions.findIndex(q => q.question.productQAsID === question.productQAsID)
        questions[index].question.question = e.target.value
        handleUpdate(questions)
    }

    handleAnswer = (e, answer) => {
        e.preventDefault();
        e.persist();
        const { handleUpdate, questions } = this.props;
        const index = questions && questions.findIndex(q => q.question.productQAsID === answer.productQAsID)
        questions[index].question.answer = e.target.value
        handleUpdate(questions)
    }

    handleDelete = (question) => {
        this.setState({ modalOpen: true, selectedQuestion: question })
    }

    deleteQuestion = () => {
        this.setState({ modalOpen: false }, () => {
            const { questions, handleUpdate, removeQuestion, getQuestions } = this.props;
            let updatedQAs = questions && questions.filter(option => option.question.productQAsID !== this.state.selectedQuestion.productQAsID);
            const removePayload = {
                productID: this.state.selectedQuestion.productID,
                productQAsID: this.state.selectedQuestion.productQAsID
            }
            removeQuestion(removePayload).then(() => {
                getQuestions()
                message.success('Question deleted Successfully!', 5);
            })
            handleUpdate(updatedQAs)
        });
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const { questions, loading } = this.props;

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
            {questions && questions.length > 0 ? questions.map(q => {
                const productLink = `https://westgatedash-d1341.firebaseapp.com/product/edit/${q.product.productID}`
                return (
                    <Form layout="inline" >
                        <Card hoverable className='my-10'
                            loading={loading}
                            extra={<>
                                 <SaveOutlined
                                     className='mx-10'
                                     onClick={() => this.props.handleSingleQASubmit(q.question)} 
                                />
                                {q.question.approved ?
                                // <EyeInvisibleOutlined 
                                //     className='mx-10' 
                                //     onClick={() => { 
                                //         this.disApproveHandler(q.question)
                                //         this.props.handleSingleQASubmit(q.question)
                                //     }}
                                //  />
                                <input
                                    className='mx-10 mt-5' 
                                    onChange={() => { 
                                        this.disApproveHandler(q.question)
                                        this.props.handleSingleQASubmit(q.question) }}
                                    type="checkbox"
                                    checked={q.question.approved}
                                />
                                : 
                                <input
                                    className='mx-10 mt-5'
                                    onChange={() => { 
                                        this.approveHandler(q.question)
                                        this.props.handleSingleQASubmit(q.question) }}
                                    type="checkbox"
                                    checked={q.question.approved}
                                />
                                // <EyeOutlined 
                                //     className='mx-10'
                                //     onClick={() => { 
                                //         this.approveHandler(q.question)
                                //         this.props.handleSingleQASubmit(q.question)
                                //     }}
                                // />
                            }

                                {/* {q.question.approved?

                                    <button
                                        type="button"
                                        className='button approved'
                                        onClick={() => { 
                                            this.disApproveHandler(q.question)
                                            this.props.handleSingleQASubmit(q.question)
                                         }}
                                    >Disapprove</button>
                                    :
                                    <button
                                        type="button"
                                        className='button disapproved'
                                        onClick={() => { 
                                            this.approveHandler(q.question)
                                            this.props.handleSingleQASubmit(q.question)
                                         }}
                                    >Approve</button>
                                } */}
                            <Popconfirm
                                title="Are you sure to delete this category?"
                                onConfirm={() => this.handleDelete(q.question)}
                                okText='Yes'
                                cancelText='No'
                            >
                                <DeleteOutlined className='mx-10 delete-icon' />
                            </Popconfirm>
                            </>}
                            title={<><a href={productLink} > {q.product.name}</a>
                            </>
                            }
                        >
                        <Row gutter={16} className='align-center'>
                            <Col xs={24}>
                                <label>Question</label>
                                <br />
                                <Item>
                                    {getFieldDecorator(`question${q.question.productQAsID}`, {
                                        rules: [{ required: true, message: 'Please Enter Question!' }],
                                        setFieldsValue: q.question.question,
                                        initialValue: q.question.question
                                    })(
                                        <Input
                                            onChange={d => this.handleQuestion(d, q.question)}
                                        ></Input>
                                    )}
                                </Item>
                            </Col>
                            <Col xs={24}>
                            <label>Answer</label>
                            <br />
                                <Item>
                                    {getFieldDecorator(`answer${q.question.productQAsID}`, {
                                        rules: [{ required: false, message: 'Please Enter Answer!' }],
                                        setFieldsValue: q.question.answer ? q.question.answer : '',
                                        initialValue: q.question.answer ? q.question.answer : ''
                                    })(
                                        <TextArea rows={3}
                                            onChange={d => this.handleAnswer(d, q.question)}
                                        ></TextArea>
                                    )}
                                </Item>
                            </Col>
                        </Row>
                        </Card>
                    </Form>
                );
            }
            ) : <div className="center " style={{ margin: '5rem' }} > No question</div>}
        </>;
    }
}

const QuestionListForm = Form.create({ name: 'questions' })(ListItems);
export default QuestionListForm;