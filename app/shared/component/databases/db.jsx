import React, { Component } from 'react';

export default class Database extends Component {
  constructor(props) {
    super(props);
    console.log('constructing');
  }

  render() {
    const {
      selectedDatabase,
      listDb
    } = this.props;
    return (
      <div className="selectedDatabase">
        {selectedDatabase.name}
        {selectedDatabase.description}
        {selectedDatabase.type}
        {selectedDatabase.config ? selectedDatabase.config[0].desc : ''}
        <button type="button" onClick={() => listDb(selectedDatabase.name)}>
          List
        </button>
      </div>
    );
  }
}
