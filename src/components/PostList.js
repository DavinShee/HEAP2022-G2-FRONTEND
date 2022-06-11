import React, { Component, useState } from 'react'
import axios from 'axios';


class PostList extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         posts: [],
         click: true,
      }
    }
    
  handlerSubmitClick = async() => {
    let response =await axios.get('https://7a65-116-15-168-211.ap.ngrok.io/routes/buyer?mod-id=')       //http url changes, copy from ngrok//
    this.setState({
      posts: response.data.data.notes,
      click: false
    })
    console.log(this.state.posts)
    }
    
  render() {
    if(this.state.click === false){
      return (
        <div>PostList
      <button onClick={this.handlerSubmitClick}>YOLO</button>
        {this.state.posts.map(post => (
          <div key={post._id}>
            <div>{post.modId}</div>
            <div>{post.profName}</div>
            <div>{post.authorName}</div>
            <div>{post.createdAt}</div>
          </div>
        ))}
      </div>
      )
    }
    return (
      <div>PostList
      <button onClick={this.handlerSubmitClick}>YOLO</button>
      </div>
      
    )
    
  }
  
}

export default PostList