"use strict"

const React = require('react')
const Modal = require('react-bootstrap').Modal
const axios = require('axios')

class Detail extends React.PureComponent {
    constructor(props, context) {
        super(props, context)

        this.fieldChange = this.fieldChange.bind(this)
        this.submitButton = this.submitButton.bind(this)
        this.submitApplication = this.submitApplication.bind(this)
        this.updateApplication = this.updateApplication.bind(this)

        this.state = {
            formData: {
                companyName: "",
                jobTitle: "",
                siteUsed: "",
                status: "",
                employerInfo: ""
            },
            show: false
        }
    }

    componentWillReceiveProps(props) {
        if (props.show !== this.props.show) {
            this.setState(prevState => {
                let newState = Object.assign({}, prevState.formData)
                newState = props.formData
                return {
                    formData: {
                        companyName: newState.companyName,
                        jobTitle: newState.jobTitle,
                        siteUsed: newState.siteUsed,
                        status: newState.status,
                        employerInfo: newState.employerInfo
                    },
                    show: props.show
                }
            })
        }
    }

    componentDidMount() {
        this.setState({
            show: this.props.show
        })
    }

    fieldChange(event) {
        let target = event.target
        let name = target.name
        let value = target.value

        this.setState(prevState => {
            let newState = Object.assign({}, prevState.formData)
            newState[name] = value

            return {
                formData: newState
            }
        })
    }

    submitButton() {
        if (!this.props.id) {
            this.submitApplication()
        }
        else {
            this.updateApplication()
        }
    }

    submitApplication() {
        return axios.post("/api/application", this.state.formData)
            .then(data => {
                this.props.create(this.state.formData)
                this.props.close()
            })
            .catch(error => {
                console.warn(error)
            })
    }

    updateApplication() {
        return axios.put(`/api/application/${id}`, this.state.formData)
            .then(data => {
                this.props.close()
            })
            .catch(err => {
                console.warn(err)
            })
    }

    render() {
        return (
            <div>
                <div>
                    <Modal show={this.state.show} onHide={this.props.close}>
                        <Modal.Header>
                            <div>
                                <h1 className="title text-center">Add a New Application</h1>
                            </div>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="form-group">
                                    <label className="control-label">Company Name</label>
                                    <input type="text" name="companyName" onChange={this.fieldChange} value={this.state.formData.companyName} className="form-control" placeholder="Enter company name" />
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Job Title</label>
                                    <input type="text" name="jobTitle" onChange={this.fieldChange} value={this.state.formData.jobTitle} className="form-control" placeholder="Enter job title" />
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Site Used</label>
                                    <input type="text" name="siteUsed" onChange={this.fieldChange} value={this.state.formData.siteUsed} className="form-control" placeholder="Enter site used" />
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Status</label>
                                    <select className="form-control" name="status" value={this.state.formData.status} onChange={this.fieldChange}>
                                        <option value="">Select a status</option>
                                        <option value="Success">Interview Request</option>
                                        <option value="Pending">Sent/Pending</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Employer Info</label>
                                    <input type="text" name="employerInfo" onChange={this.fieldChange} value={this.state.formData.employerInfo} className="form-control" placeholder="Enter employer info" />
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" onClick={this.submitButton} className="btn btn-success">Add Application</button>
                            <button type="button" onClick={this.props.close} className="btn btn-default">Cancel</button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}

module.exports = Detail