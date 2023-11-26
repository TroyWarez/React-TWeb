import React from 'react';
import propTypes from 'prop-types';
export class Container extends React.Component {
  render() {
    return <div ref={ ref => ref.appendChild(this.props.child) }></div>;
  }
}
Container.propTypes = {
  child: propTypes.object
};
export default Container;