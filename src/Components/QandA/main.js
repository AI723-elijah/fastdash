import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Card, Button, Input } from 'antd';
import QuestionListForm from './ListItems';
class MainQandA extends React.Component {

  state = {
    tabs: [
      { id: 1, name: 'All', active: true, class: 'qa-first-tab' },
      { id: 2, name: 'Approved', active: false, class: 'qa-middle-tab' },
      { id: 3, name: 'Pending', active: false, class: 'qa-last-tab' },
    ],
    questions: [],
    copiedQuestions: [],
    selectedTab: 'All',
    searchText: ''
  };

  tabHandler = (e, t) => {

    e.persist();
    this.setState({ ...this.state, searchText: '' }, () => {
      if (t.id === 1) {
        this.setState({ ...this.state, selectedTab: 'All' }, () => {

          this.allQuestionsHandler()
        })
      }
      if (t.id === 2) {
        this.setState({ ...this.state, selectedTab: 'approved' }, () => {
          this.approvedQuestionsHandler()
        })
      }
      if (t.id === 3) {
        this.setState({ ...this.state, selectedTab: 'pending' }, () => {
          this.pendingQuestionsHandler()
        })
      }
      this.state.tabs.map(tab => {
        if (tab.id === t.id) {
          tab.active = true
        } else {
          tab.active = false;
        }
        return tab
      })
    })

  }

  allQuestionsHandler = (questions) => {
    if (questions) {
      this.setState({ ...this.state, questions: this.props.questions, copiedQuestions: this.props.questions })
    } else {
      this.setState({ ...this.state, questions: this.props.questions, copiedQuestions: this.props.questions }, () => {
      })
    }
  }

  approvedQuestionsHandler = (questions) => {
    if (questions) {
      const approved = this.props.questions && this.props.questions.filter(q => q.question.approved === true);
      this.setState({ ...this.state, questions: [...approved], copiedQuestions: [...approved] })
    } else {
      const approved = this.props.questions && this.props.questions.filter(q => q.question.approved === true);
      this.setState({ ...this.state, questions: [...approved], copiedQuestions: [...approved] })
    }
  }

  pendingQuestionsHandler = (questions) => {
    if (questions) {
      const pending = this.props.questions && this.props.questions.filter(q => q.question.approved === false);
      this.setState({ ...this.state, questions: [...pending], copiedQuestions: [...pending] })
    } else {
      const pending = this.props.questions && this.props.questions.filter(q => q.question.approved === false);
      this.setState({ ...this.state, questions: [...pending], copiedQuestions: [...pending] })
    }
  }

  componentDidUpdate(oldProps) {
    if (oldProps.questions !== this.props.questions) {
      if (this.state.selectedTab === 'All') this.allQuestionsHandler();
      if (this.state.selectedTab === 'approved') this.approvedQuestionsHandler();
      if (this.state.selectedTab === 'pending') this.pendingQuestionsHandler();
    }
  }

  handleUpdate = (questions) => {
    if (this.state.selectedTab === 'All') this.allQuestionsHandler(questions);
    if (this.state.selectedTab === 'approved') this.approvedQuestionsHandler(questions);
    if (this.state.selectedTab === 'pending') this.pendingQuestionsHandler(questions);
  }
  searchQuestion = (e) => {
    this.setState({ ...this.state, searchText: e }, () => {
      if (e !== '') {
        const filteredQuestions = this.state.copiedQuestions && this.state.copiedQuestions.filter(q => q.product.name.toLowerCase().includes(e))
        this.setState({ ...this.state, questions: filteredQuestions })
      }
      else {
        this.setState({ ...this.state, questions: this.state.copiedQuestions })
      }
    })

  }

  render() {
    const { handleSubmit } = this.props;
    return <>

      <Card title='Q&A' className='width-100'
        loading={this.props.loading}
        extra={<Button loading={this.props.loading} onClick={() => { handleSubmit() }}>SAVE</Button>}
      >
        <div className="d-flex-row justify-center">
          {this.state.tabs && this.state.tabs.map(tab => (
            <div
              onClick={(e) => { this.tabHandler(e, tab) }}
              className={tab.active ? `${tab.class} qa-active-tab` : tab.class}
            >{tab.name}</div>
          ))}
        </div>
        <div style={{ width: '40%', margin: '20px 0px' }}>
          <Input
            value={this.state.searchText}
            className='search-box'
            placeholder='Search Questions'
            onChange={e => this.searchQuestion(e.target.value)}
            addonAfter={<SearchOutlined />}
          />

        </div>

        <QuestionListForm
          loading={this.props.loading}
          questions={this.state.questions}
          handleUpdate={this.handleUpdate}
          removeQuestion={this.props.removeQuestion}
          getQuestions={this.props.getQuestions}
          handleSubmit={this.props.handleSubmit}
          handleSingleQASubmit={this.props.handleSingleQASubmit}
        />
      </Card>
    </>;
  }


}
export default MainQandA;