import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import FontAwesome from './font_awesome';

const SetTable = ({ sets, selectedSet, onSetClick, hideOwner, addLink, fetching, showLocked }) => {
  if (sets.length == 0) {
    return <p className="text-center">No sets found.</p>
  }

  let rows = sets.map((set, index) => {
    if (!set.attributes.locked || (showLocked && set.attributes.locked)) {
      return <SetRow set={set} selected={(set.id == selectedSet)} onClick={onSetClick} key={index} hideOwner={hideOwner} addLink={addLink} />;
    }
  });

  // Show a spinning icon if more Sets are being fetched
  if (fetching) {
    rows.push(
      <tr key="loading">
        <td colSpan={ hideOwner ? 3 : 4}>
          <FontAwesome icon="spinner fa-spin" size="lg"></FontAwesome>
        </td>
      </tr>
    )
  }

  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Created</th>
          <th>Size</th>
          { !hideOwner && <th>Owner</th>}
        </tr>
      </thead>
      <tbody>
        { rows }
      </tbody>
    </table>
  )
};

SetTable.defaultProps = {
  sets: [],
  selectedSet: undefined,
  addLink: false,
  showLocked: true
}

export default SetTable;

const SetRow = ({ set, selected, onClick, hideOwner, addLink }) => {
  const trClass = classNames({
    info: selected
  })

  let ownerCell;
  if (!hideOwner) {
    if (set.attributes.owner_id) {
      ownerCell = <td>{ set.attributes.owner_id }</td>;
    } else {
      ownerCell = <td><i>Not set</i></td>;
    }
  }

  let setNameLink = set.attributes.name;
  if (addLink) {
    setNameLink = <Link to={ `/simple/sets/${set.id}` }>{ setNameLink }</Link>
  } else {
    setNameLink = <a href='#' onClick={ (e) => { e.preventDefault(); onClick(set.id) }}>{ setNameLink }</a>
  }

  return (
    <tr className={ trClass }>
      <td>{ setNameLink } { set.attributes.locked && <FontAwesome icon="lock" style={{"color": "#e61c1c"}} /> }</td>
      <td>{ new Date(set.attributes.created_at).toDateString() }</td>
      <td>{ set.meta.size }</td>
      { !hideOwner && ownerCell }
    </tr>
  );
};
