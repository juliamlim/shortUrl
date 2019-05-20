import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Database from './database';
import { UrlDetails, UrlInput, UrlList } from './components';

import './App.scss';

const IP = require('public-ip');

// Placeholder origin hostname
const host = 'http://short.';
const db = new Database(host);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.updateList = this.updateList.bind(this);
    this.seeDetails = this.seeDetails.bind(this);
    this.setRedirect = this.setRedirect.bind(this);

    this.state = {
      list: [],
      details: null
    };
  }

  componentDidMount() {
    db.data.then(res => {
      this.setState({ list: this.sortList(res) });
    });
  }

  updateList(item) {
    const list = this.sortList([...this.state.list, item]);
    this.setState({ list });
  }

  seeDetails(id) {
    const { list = [] } = this.state;
    this.setState({details: list.find(v => v.id === id)});
  }

  setRedirect(id) {
    const { list = [] } = this.state;

    const item = list.find(v => v.id === id);
    const oldList = list.filter(v => v.id !== id);

    const date = new Date();

    IP.v4().then(ip => {
      item.visits.push({
        date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
        ip
      });
    });

    this.setState({ list: this.sortList([...oldList, item]) });
  }

  sortList(list) {
    return list.sort((a, b) => a.id < b.id ? -1 : 1 )
  }

  render() {
    return (
      <div>
        <h1>ShortUrl</h1>
        <UrlInput host={host} updateList={this.updateList}/>
        <UrlList list={this.state.list} seeDetails={this.seeDetails} setRedirect={this.setRedirect}/>
        {
          this.state.details ?
            <UrlDetails details={this.state.details} />
          : ''
        }
      </div> 
    );
  }
}
