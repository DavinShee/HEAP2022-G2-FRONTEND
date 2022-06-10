import axios from 'axios';
import React from 'react';
import { Component } from 'react';
/*import { Link } from 'react-router-dom';*/

/*class ModBar extends Component{
    constructor() {
        super();
        this.state = {
            test: "testing"
        };
    }

    handleBarClick = () => {
        console.log("step1")
        axios.get("https://149f-116-15-168-211.ap.ngrok.io/routes/buyer").then(response =>{
            this.setState({
                test: response.data.notes.modId
            });
            console.log(response);
            console.log("This is working");
            console.log(this.test);
        });        
    };

        render(){
        return (
          <div className="modprofbar">
              <form>
                  <label>
                      <table>
                          <tbody>
                          <tr>
                              <td>Mod</td>
                              <td><input name='mod-id' /></td>
                              <td>Prof</td>
                              <td><input name='prof-name' /></td>
                              <td><button onClick={this.handleBarClick}>Submit</button></td>
                              <td>{this.state.test}</td>
                          </tr>
                          </tbody>
                      </table>     
                  </label>
              </form>
          </div>
        )
        }


}*/


/*function ModBar() {
  return (
    <div className="mod">
        <form>
            <label>
                <table>
                    <tr>
                        <td>Mod</td>
                        <td><input name='mod-id' /></td>
                        <td>Prof</td>
                        <td><input name='prof-name' /></td>
                        <td><button type="submit">Submit</button></td>
                    </tr>
                </table>     
            </label>
        </form>
    </div>
  )
}

export default ModBar*/