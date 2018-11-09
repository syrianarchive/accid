import React, { Component } from 'react';
import {map, curry, getOr} from 'lodash/fp';

import Filter from './filter';

const mapW = map.convert({cap: false});

export default class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(db, filter, event) {
    console.log('A change was detected: ');
    console.log(this.state);
    this.setState({[filter]: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
    const { filterDb } = this.props;
    console.log('A name was submitted: ');
    console.log(this.state);
    console.log(filterDb(this.state));
  }

  render() {
    const {
      db,
      filters
    } = this.props;

    const hc = curry(
      (database, filter, e) => this.handleChange(database, filter, e)
    );

    return (
      <form className="filters" onSubmit={this.handleSubmit}>
        {mapW((v, k) => (
          <div className="filter">
            <h6 className="filtertitle">
              {k}
            </h6>
            <Filter value={getOr(undefined, k, this.state)} filter={v} update={hc(db, k)} />
          </div>
        ))(filters)}
        <input type="submit" value="Filter" />
      </form>
    );
  }
}
