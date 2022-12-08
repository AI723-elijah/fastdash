import React, { Component } from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Card, Button, Radio, Checkbox, message, Modal, Select, Input } from 'antd';
import { CSVLink } from "react-csv";
import { List } from '../Components/Users/List';
import { UserForm } from '../Components/Users/UserForm';

const { Option } = Select;

class Users extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            modalType: '',
            user: 'dashboardUser',
            pendingFilter: false,
            usersList: this.props && this.props.dashboardUsers
        };
    }

    componentDidMount() {
        const { getUsersList } = this.props;
        getUsersList()
    }

    componentDidUpdate(oldProps) {
        const { dashboardUsers, portalUsers } = this.props;

        if (this.state.pendingFilter && oldProps.portalUsers !== portalUsers) {
            this.setState({ usersList: portalUsers.filter(item => item.pendingRep)});
        } 
        else if (this.state.user === 'portalUser' && oldProps.portalUsers !== portalUsers) {
            this.setState({ usersList: portalUsers });
        }
        else if (oldProps.dashboardUsers !== dashboardUsers) {
            this.setState({ usersList: dashboardUsers });
        }
    }

    handleFilterUser = async (e) => {
        const { dashboardUsers } = this.props;
        let filterUser = [];
        if (e !== undefined && e !== "all") {
            await dashboardUsers && dashboardUsers
                .filter((data) => data.role === e)
                .map((data) =>
                    filterUser.push(data)
                )
            this.setState({ usersList: filterUser })
        }
        else {
            this.setState({ usersList: dashboardUsers })
        }
    }

    handleSearch = async (e) => {
        const { dashboardUsers, portalUsers } = this.props;
        let { user } = this.state
        var searchFilter = e.target.value && e.target.value.toLowerCase()
        let searchUser = [];

        let list = user === 'dashboardUser' ? dashboardUsers : portalUsers;

        searchUser = list && list.filter(item => {
            return Object.keys(item).some(key =>
                typeof item[key] === "string" && item[key] && item[key].toLowerCase().includes(searchFilter)
            );
        })

        if (searchUser) {
            this.setState({ usersList: searchUser })
        }
        else {
            this.setState({ usersList: list })
        }
    }

    handlePendingReps = async (e) => {
        const { portalUsers } = this.props;
        let searchUsers = [];

        searchUsers = portalUsers.filter(item => item.pendingRep)


        if (e.target.checked) {
            this.setState({ usersList: searchUsers, pendingFilter: true })
        }
        else {
            this.setState({ usersList: portalUsers, pendingFilter: false })
        }
    }

    handleUserChange = (e) => {
        e.preventDefault();
        const { dashboardUsers, portalUsers } = this.props;
        this.setState({ user: e.target.value })
        this.setState({ usersList: e.target.value === 'portalUser' ? portalUsers : dashboardUsers })
    }

    handleModal = (values, type) => {
        this.setState({ open: !this.state.open, modalType: type });
        if (!this.state.open) {
            if (values && 'userID' in values) {
                this.props.editRep(values);
            } else {
                this.props.editRep({
                    fname: ''
                })
            }
        }
    }

    handleStatus = (e, values, statType) => {
        const { getUsersList, updateUser } = this.props;
        let status = e;
        let payload;
        if (status) {
            payload = {
                ...values,
                status: 'Active'
            }
        }
        else {
            payload = {
                ...values,
                status: 'Inactive',
                hideUser: statType === 'del' ? true : false
            }
        }
        updateUser(payload)
            .then(() => {
                message.success(`${statType === 'del' ? 'Delete user' : 'Update user status'} successfully`, 5);
                getUsersList();
            })
            .catch((err) => message.error(err.payload.message, 5));
    }

    handleDecline = (values) => {
        const { getUsersList, updateUser, sendRepDeclinedEmail } = this.props;

        const payload = {
            ...values, 
            pendingRep: null
        }

        updateUser(payload)
            .then(() => {
                message.success('User denied successfully');
                getUsersList();
                sendRepDeclinedEmail(payload);
            })
            .catch((err) => message.error(err.payload.message, 5));
    }


    handleResetPassword = (values) => {
        const { resetUserPassword, getUsersList } = this.props;

        let payload = {
            email: values.email
        }

        resetUserPassword(payload)
            .then(() => {
                message.success('Reset password email sent successfully to the requested email', 5);
                getUsersList();
            })
            .catch((err) => message.error(err.payload.message, 5));
    }

    handleSave = (e, form) => {
        e.preventDefault();

        const { createNewUser, updateUser, getUsersList, portalUsers, dashboardUsers } = this.props;
        form.validateFields((err, values) => {

            if (!err) {
                if (this.state.modalType === 'Add User') {

                    if ([...portalUsers, ...dashboardUsers].filter(user => user.email === values.email).length !== 0) {
                        return message.error("User with that email already exists!", 5)
                    }

                    if (!values.customerType) {
                        values.customerType = 'Basic'
                        values.allowedAccess = []
                    }
                    if (values.customerType !== 'Basic') {
                        if (values.role === 'contact') {
                            values.allowedAccess = ['dashboard', 'manageUsers','returnRequest', 'openOrder', 'rmaSummary']
                        }
                        if (values.role === 'admin') {
                            values.allowedAccess = ['dashboard', 'manageUsers', 'newOrder', 'returnRequest', 'openOrder', 'rmaSummary']
                        }
                    }
                    if (this.state.user === 'portalUser') {
                        values.type = 'portal'

                        if (values.customerType === 'Representative') {
                            values.salesRepID = values.salesRepID.split(',').map(item => item.trim()).filter(item => item !== "");
                            values.assignedAccountID = values.assignedAccountID ? values.assignedAccountID.split(',').map(item => item.trim()).filter(item => item !== "") : null
                        }
                        if (values.customerType === 'Distributor') {
                            values.accountID = values.accountID.split(',').map(item => item.trim()).filter(item => item !== "");
                        }
                    }

                    else {
                        values.type = 'dashboard'
                    }
                    createNewUser({ ...values, website: 'westgate' })
                        .then(() => {
                            this.handleModal();
                            message.success('Added new user successfully', 5);
                            getUsersList();
                        })
                        .catch((err) => message.error(err.payload.response.data.error || err.payload.message, 5));
                }
                else {
                    let payload = {
                        ...this.props.rep,
                        ...values
                    }

                    if (values.customerType === 'Basic') {
                        payload.accountID = null;
                        payload.salesRepID = null;
                        payload.allowedAccess = [];
                        payload.role = ""
                    }

                    if (values.customerType === 'Representative') {
                        payload.accountID = null;
                        payload.allowedAccess = values.role === 'contact' ? ['dashboard', 'returnRequest', 'openOrder', 'rmaSummary'] : ['dashboard', 'manageUsers', 'newOrder', 'returnRequest', 'openOrder', 'rmaSummary'];

                        if(typeof values.salesRepID === 'string') {
                            payload.salesRepID = values.salesRepID.split(',').map(item => item.trim()).filter(item => item !== "");
                        }

                        if(typeof values.assignedAccountID === 'string') {
                            payload.assignedAccountID = values.assignedAccountID !== "" ? values.assignedAccountID.split(',').map(item => item.trim()).filter(item => item !== "") : null;
                        }
                    }

                    if (values.customerType === 'Distributor') {
                        payload.salesRepID = null;
                        payload.allowedAccess = values.role === 'contact' ? ['dashboard', 'returnRequest', 'openOrder', 'rmaSummary'] : ['dashboard', 'manageUsers', 'newOrder', 'returnRequest', 'openOrder', 'rmaSummary'];
                    
                        if(typeof values.accountID === 'string') {
                            payload.accountID = values.accountID.split(',').map(item => item.trim()).filter(item => item !== "");
                        }
                    }
                    updateUser(payload)
                        .then(() => {
                            this.handleModal();
                            message.success('User has been updated', 5);
                            getUsersList();

                            const previousType = this.props.portalUsers.find(user => user.userID === payload.userID).customerType;

                            if (payload.customerType === 'Representative' && previousType !== 'Representative') {
                                const ids = payload.salesRepID;
                                const existingReps = this.props.portalUsers.filter(user => {
                                    if (Array.isArray(user.salesRepID)) {
                                        return user.salesRepID.includes(ids[0]) || user.salesRepID.includes(ids[1]) || user.salesRepID.includes(ids[2]) || user.salesRepID.includes(ids[3]) || user.salesRepID.includes(ids[4]) ||
                                            user.salesRepID.includes(ids[5]) || user.salesRepID.includes(ids[6]) || user.salesRepID.includes(ids[7]) || user.salesRepID.includes(ids[8]) || user.salesRepID.includes(ids[9])
                                    } else {
                                        return false;
                                    }
                                })

                                this.props.sendVerifiedUserEmail({ ...payload, emailsToBeSent: existingReps && existingReps.map(rep => rep.email) })
                            }

                            if (payload.customerType === 'Distributor' && previousType !== 'Distributor') {
                                const existingDistributors = this.props.portalUsers.filter(user => user.accountID === payload.accountID);
                                this.props.sendVerifiedUserEmail({ ...payload, emailsToBeSent: existingDistributors && existingDistributors.map(dist => dist.email) })
                            }
                        })
                        .catch((err) => message.error(err.payload.message, 5));
                }
            }
        });
    }

    render() {
        const { open, user, usersList } = this.state;
        const { portalUsers } = this.props;
        const modalTitle = `${this.state.modalType}`;

        return (
            <Card title='User' className='width-100'>
                <div className='d-flex-row justify-between'>
                    <Radio.Group onChange={this.handleUserChange} value={user}>
                        <Radio value={'dashboardUser'}>Dashboard User</Radio>
                        <Radio value={'portalUser'}>Portal User</Radio>
                    </Radio.Group>
                    <div className='d-flex'>
                        {user === 'portalUser' && portalUsers.length &&
                            <div style={{ width: '300px', display: 'flex', alignItems: 'center'}}>
                                <Checkbox onChange={this.handlePendingReps}>{`Pendig reps (${portalUsers.filter(item => item.pendingRep).length})`}</Checkbox>
                            </div>

                        }
                        <Input
                            className='select-user mx-10'
                            placeholder='Search User'
                            onChange={(e) => this.handleSearch(e)}
                        />
                        {user === 'dashboardUser' &&
                            <Select
                                style={{ width: 230 }}
                                className='select-user mx-10'
                                placeholder='Filter User'
                                showSearch
                                allowClear
                                clearIcon
                                defaultValue='all'
                                onChange={(e) => this.handleFilterUser(e)}
                            >
                                <Option value='all'>All</Option>
                                <Option value='user'>User</Option>
                                <Option value='admin'>Admin</Option>
                            </Select>
                        }
                        {localStorage.getItem('userRole') === 'admin' &&
                            <CSVLink
                                style={{ border: '1px solid #d9d9d9', padding: '0.2rem 1rem', borderRadius: '10%', marginRight: '5px' }}
                                data={usersList && usersList.length > 0 ? usersList : []}
                                filename={user === 'dashboardUser' ? "dashboardUsers.csv" : 'portalUsers.csv'}
                            >
                                <i className="download" aria-hidden="true"></i>{" "}
                                CSV
                            </CSVLink>
                        }
                        {localStorage.getItem('userRole') === 'admin' &&
                            <Button icon={<PlusSquareOutlined />} onClick={() => this.handleModal(null, 'Add User')}>
                                Add User
                            </Button>
                        }
                    </div>
                </div>
                <List
                    user={user}
                    users={usersList}
                    loading={this.props.loading}
                    handleModal={this.handleModal}
                    handleStatus={this.handleStatus}
                    handleDecline={this.handleDecline}
                    handleResetPassword={this.handleResetPassword}
                />
                <Modal title={modalTitle} visible={open} footer={null} onCancel={this.handleModal} destroyOnClose={true}>
                    <UserForm
                        handleSave={this.handleSave}
                        loading={this.props.loading}
                        userInfo={this.props.rep}
                        formType={this.state.modalType}
                        user={user}
                    />
                </Modal>
            </Card>
        );
    }
}

export { Users };
