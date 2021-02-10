import React, { Component } from 'react'
import axios from 'axios';

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ''
    }

    componentDidMount() {
        this.fetchValues()
        this.fetchIndexes()
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current')
        this.setState({ values: values.data })
    }

    async fetchIndexes() {
        const seenIndexes = await axios.get('/api/values/all')
        this.setState({ seenIndexes: seenIndexes.data })
    }

    renderSeenIndexes() {
        return this.state.seenIndexes.map(({ number }) => number).join(', ')
    }

    renderValues() {
        const entries = []
        for (const key in this.state.values) {
            entries.push(<div key={key}>For index {key}, I calculated {this.state.values[key]}</div>)
        }

        return entries
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post('/api/values', {
            index: this.state.index
        })
        this.setState({ index: '' })
    }

    render() {
        return <div>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Enter your index:</label>
                </div>
                <input value={this.state.index} onChange={e => this.setState({ index: e.target.value })} />
                <button>Submit</button>
            </form>
            <h3>Seen indexes:</h3>
            {this.renderSeenIndexes()}
            <h3>Calculated values:</h3>
            {this.renderValues()}
        </div>
    }
}

export default Fib