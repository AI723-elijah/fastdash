import React, { Component } from 'react';
import MainQandA from '../Components/QandA/main';
import { message } from 'antd';
class QandA extends Component {
    constructor() {
        super()
        this.state = {
            questions: [],
        };
    }
    componentDidMount() {
        const { getQuestions } = this.props;
        getQuestions()
    }
    componentDidUpdate(oldProps) {
        if (oldProps.questions !== this.props.questions) {
            this.setState({ questions: this.props.questions })

        }
    }
    handleUpdate = (questions) => {
        this.setState({ ...this.state, questions: [...questions] })
    }

    handleSingleQASubmit = (data) => {
        const { answerEmail, updateQA, getQuestions } = this.props;
        updateQA(data).then(() => {
            answerEmail({
                email: data.email,
                question: data.question,
                answer: data.answer,
                webLink: data.webLink ? data.webLink : 'https://www.westgatemfg.com/'
            }).then(() => {
                getQuestions().then(() => {
                    message.success('Questions updated Successfully!', 5);
                })
            })
        })
    }

    handleSubmit = () => {
        const { bulkQuestionsUpdate, getQuestions } = this.props;
        const finalData = this.state.questions && this.state.questions.map(q => q.question);
        bulkQuestionsUpdate(finalData).then(() => {
            getQuestions().then(()=>{
                message.success('Questions updated Successfully!', 5);
            })
        })
    }

    render() {
        return (
            <MainQandA
                questions={this.state.questions} {...this.props}
                handleSubmit={this.handleSubmit}
                handleSingleQASubmit={this.handleSingleQASubmit}/>
        )
    }
}
export { QandA };