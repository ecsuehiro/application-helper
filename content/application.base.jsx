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

    render() {
        return (
            <div>
                <div>
                    <h1 className="title text-center">Application List</h1>
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