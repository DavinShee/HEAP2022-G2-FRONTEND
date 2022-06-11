import React, { Component, useState } from 'react'
import axios from 'axios';


class PostList extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         posts: [],
         
      }
    }
    
  handlerSubmitClick = async() => {
    let response =await axios.get('https://aeb0-116-15-168-211.ap.ngrok.io/routes/buyer?mod-id=')       //http url changes, copy from ngrok//
    this.setState({
      posts: response.data.data.notes,
    })
    console.log(this.state.posts)
    }
    
  
  render() {
      return (
        <div>PostList
      <button onClick={this.handlerSubmitClick}>YOLO</button>
        <form>
          <label>
            Mod:
            <input type="text" name="mod-id" />
          </label>
          <label>
            Prof:
            <input type="text" name="prof-name" />
          </label>
          <button type='submit'>Submit</button>
        </form>
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
  
}

export default PostList