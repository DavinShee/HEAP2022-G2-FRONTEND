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
    axios.get('https://149f-116-15-168-211.ap.ngrok.io/routes/buyer')
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