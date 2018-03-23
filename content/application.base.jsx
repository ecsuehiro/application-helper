"use strict"

const React = require('react')
const axios = require('axios')
const List = require('./application.list')

class Base extends React.PureComponent {
    constructor(props, context) {
        super(props, context)

        this.getApplication = this.getApplication.bind(this)
        this.updateList = this.updateList.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.sortAlphabet = this.sortAlphabet.bind(this)
        this.sortStatus = this.sortStatus.bind(this)
        this.sortDate = this.sortDate.bind(this)

        this.state = {
            list: ""
        }
    }

    componentDidMount() {
        this.getApplication()
    }

    getApplication() {
        return axios.get('/api/application')
            .then(response => {
                this.setState({
                    list: response.data
                })
            })
            .catch(err => {
                console.warn(err)
            })
    }

    updateList(data) {
        this.setState(prevState => {
            let newState = prevState.list.slice()
            newState.push(data)
            return {
                list: newState
            }
        })
    }

    removeItem(id) {
        this.setState(prevState => {
            let newState = prevState.list.slice()

            return {
                list: newState.filter(item => {
                    return item._id !== id
                })
            }
        })
    }

    sortAlphabet() {
        this.setState(prevState => {
            let sortList = prevState.list.slice()
            sortList.sort((a, b) => {
                if (a.companyName < b.companyName) { return -1 }
                if (a.companyName > b.companyName) { return 1 }
                return 0
            })
            return {
                list: sortList
            }
        })
    }

    sortStatus() {
        this.setState(prevState => {
            let sortList = prevState.list.slice()
            sortList.sort((a, b) => {
                if (a.status < b.status) { return -1 }
                if (a.status > b.status) { return 1 }
                return 0
            })
            return {
                list: sortList
            }
        })
    }

    sortDate() {
        this.setState(prevState => {
            let sortList = prevState.list.slice()
            sortList.sort((a, b) => {
                if (a.dateApplied < b.dateApplied) { return -1 }
                if (a.dateApplied > b.dateApplied) { return 1 }
                return 0
            })
            return {
                list: sortList
            }
        })
    }

    render() {
        return (
            <div>
                <div>
                    <h1 className="title text-center">Application List</h1>
                    <button type="button" className="base-button btn btn-default" onClick={this.sortDate}>Sort by Date</button>
                    <button type="button" className="base-button btn btn-default" onClick={this.sortAlphabet}>Sort Alphabetically</button>
                    <button type="button" className="base-button btn btn-default" onClick={this.sortStatus}>Sort By Status</button>
                </div>
                <hr />
                <div>
                    <div>
                        <List list={this.state.list} update={this.updateList} remove={this.removeItem}></List>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = Base