import React, { Component } from 'react'

// Component
import Levels from '../Levels'
import ProgressBar from '../ProgressBar'

class Quiz extends Component {

  render() {
    // console.log("props>>>>", this.props)
    const {username, email } = this.props.userData

    return (
      <div>
        <h2>Pseudo: <span style={{color: 'blue'}}>{username}</span></h2>
        <Levels />
        <ProgressBar />

        <h2>Notre Question Quiz</h2>
        <p className='answerOptions'>Question 1</p>
        <p className='answerOptions'>Question 2</p>
        <p className='answerOptions'>Question 3</p>
        <p className='answerOptions'>Question 3</p>
        <button disabled className='btnSubmit'>Suivant</button>
    </div>

    )
  }
}

export default Quiz