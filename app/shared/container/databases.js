import { connect } from 'react-redux';
import { get, getOr } from 'lodash/fp';
import { getDbs, selectDb, listDb } from '../redux/action/dbs';
import Databases from '../component/databases/index';


const mapStateToProps = (store) => {
  console.log(store);
  const currentDb =  get('selected.selectedDatabase.name', store)
  return {
    databases: get('dbs.databases', store),
    selectedDatabase: get('selected.selectedDatabase', store),
    results: getOr(undefined, `selected.results.${currentDb}`, store),
  };
};

const mapDispatchToProps = dispatch => {
  console.log(dispatch);
  return {
    refreshDbs: () => { dispatch(getDbs); },
    selectDb: (db) => { dispatch(selectDb(db)); },
    listDb: (db) => { dispatch(listDb(db)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Databases);
