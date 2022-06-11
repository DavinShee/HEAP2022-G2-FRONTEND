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
    axios.get('https://1d0f-2406-3003-206f-4ac0-2de8-3ce9-31e3-993d.ap.ngrok.io/routes/buyer')
    .then(response => {
      const notes = response.data.data.notes
      notes.map(note => {
        console.log("authorName: " + note.authorName)
        console.log("modId: " + note.modId)
        console.log("profName: " + note.profName)
      })
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