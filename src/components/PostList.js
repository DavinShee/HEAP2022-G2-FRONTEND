import React, { Component } from 'react'
import axios from 'axios';

class PostList extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        posts: []
      }
    }
handlerSubmitClick() {
    axios.get('http://5f72-2406-3003-206f-4ac0-4847-2509-e0d-ec17.ap.ngrok.io/routes/buyer')
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    })
}


  render() {
    return (
      <div>PostList
      <button onClick={this.handlerSubmitClick}>YOLO</button>
      </div>
    )
  }
}

export default PostList