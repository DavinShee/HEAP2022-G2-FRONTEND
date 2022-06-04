import React from 'react';
/*import { Link } from 'react-router-dom';*/

function ModBar() {
  return (
    <div className="mod">
        <form>
            <label>
                <table>
                    <tr>
                        <td>Mod</td>
                        <td><input name='mod' /></td>
                        <td>Prof</td>
                        <td><input name='prof' /></td>
                        <td><button type="submit">Submit</button></td>
                    </tr>
                </table>     
            </label>
        </form>
    </div>
  )
}

export default ModBar