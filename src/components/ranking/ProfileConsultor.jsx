import React from 'react';

class ProfileConsulter extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>{this.props.match.params.id}</div>
    );
  }
}

export default ProfileConsulter;
