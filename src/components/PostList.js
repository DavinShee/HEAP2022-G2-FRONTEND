import React, { Component, useState } from 'react';
import axios from 'axios';

class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  handlerSubmitClick() {
    axios
      .get(
        'https://ff4b-2406-3003-206f-4ac0-e97e-a025-b0bf-6e90.ap.ngrok.io/routes/buyer'
      )
      .then((response) => {
        const notes = response.data.data.notes;
        notes.map((note) => {
          console.log('authorName: ' + note.authorName);
          console.log('modId: ' + note.modId);
          console.log('profName: ' + note.profName);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        PostList
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
          <button type="submit">Submit</button>
        </form>
        {this.state.posts.map((post) => (
          <div key={post._id}>
            <div>{post.modId}</div>
            <div>{post.profName}</div>
            <div>{post.authorName}</div>
            <div>{post.createdAt}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default PostList;
