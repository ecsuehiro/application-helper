"use strict"

const React = require('react')
const Detail = require('./application.detail')
const axios = require('axios')

class List extends React.PureComponent {
    constructor(props, context) {
        super(props, context)

        this.state = {
            formData: {
                companyName: "",
                jobTitle: "",
                siteUsed: "",
                status: "",
                employerInfo: ""
            },
            id: "",
            list: [],
            show: false
        }

        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.onCreate = this.onCreate.bind(this)
        this.deleteEntry = this.deleteEntry.bind(this)
        this.loadEntry = this.loadEntry.bind(this)
    }

    componentWillReceiveProps(props) {
        if (props.list !== this.props.list) {
            this.setState({
                list: props.list
            })
        }
    }

    componentDidMount() {
        this.setState({
            list: this.props.list
        })
    }

    openModal() {
        this.setState({
            show: true
        })
    }

    closeModal() {
        this.setState({
            show: false
        })
    }

    onCreate(data) {
        this.props.update(data)
    }

    deleteEntry(event) {
        let target = event.target
        let id = target.id

        return axios.delete(`/api/application/${id}`)
            .then(data => {
                this.props.remove(id)
            })
            .catch(err => {
                console.warn(err)
            })
    }

    loadEntry(event) {
        let target = event.target
        let id = target.id
        
        return axios.get(`/api/application/${id}`)
            .then(response => {
                this.setState(prevState => {
                    let newState = Object.assign({}, prevState.formData)
                    newState = response.data
                    return {
                        formData: {
                            companyName: newState.companyName,
                            jobTitle: newState.jobTitle,
                            siteUsed: newState.siteUsed,
                            status: newState.status,
                            employerInfo: newState.employerInfo
                        },
                        id: id,
                        show: true
                    }
                })
            })
    }

    render() {
        let listData
        let n = 0
        if (this.state.list) {
            listData =
                this.state.list.map(item => (
                    <tr key={item._id}>
                        <td>{n += 1}</td>
                        <td>{item.companyName}</td>
                        <td>{item.jobTitle}</td>
                        <td>{item.siteUsed}</td>
                        <td>{item.employerInfo}</td>
                        <td>{item.dateApplied}</td>
                        <td>{item.status}</td>
                        <td>
                            <input type="button" className="btn btn-success" id={item._id} value="Edit" onClick={this.loadEntry} />
                            <input type="button" className="btn btn-danger" id={item._id} value="Delete" onClick={this.deleteEntry} />
                        </td>
                    </tr>
                ))
        }

        return (
            <div>
                <div>
                    <Detail close={this.closeModal} show={this.state.show} create={this.onCreate} id={this.state.id} formData={this.state.formData}></Detail>
                </div>
                <div className="table-responsive col-sm-11">
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Company Name</th>
                                <th>Job Title</th>
                                <th>Site Used</th>
                                <th>Employer Info</th>
                                <th>Date Applied</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {listData}
                        </tbody>
                    </table>
                </div>
                <div>
                    <input type="button" className="btn btn-default" onClick={this.openModal} value="Add Application" />
                </div>
            </div>
        )
    }
}

module.exports = List