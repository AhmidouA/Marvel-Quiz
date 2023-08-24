import React, { Component } from 'react'

class Quiz extends Component {

  render() {
    // console.log("props>>>>", this.props)
    const {username, email } = this.props.userData

    return (
      <div>
        <h2>Pseudo: {username}</h2>
    </div>

    )
  }
}

export default Quiz