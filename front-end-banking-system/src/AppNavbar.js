import React, { Component } from 'react';
import './css/App.css';
import dbMainPicture from './images/dbMainPicture.jpg'
import dbFullLogo from './images/dbFullLogo.png'


export default class AppNavbar extends Component {
    render() {
        return <div>
                <div className="top">
                  <ul className="list-inline headerclass">
                    <img src={dbFullLogo} className="dbFullLogo"></img>
                  </ul>
                </div>
                <div class="mainPictureDiv">
                  <img src = {dbMainPicture} className="dbMainPicture"></img>
                </div>
              </div>
    }
}
