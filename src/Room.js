import React, { Component } from "react";
import moment from 'moment-timezone';
 
class Room extends Component {
    componentDidMount() {
        function createFrameAndJoinRoom(room) {
            let roomName = "meet-" + room;
            window.callFrame = window.DailyIframe.createFrame(
                document.getElementById("frame"), {
                showLeaveButton: true,
                iframeStyle: {
                    position: 'fixed',
                    bottom: 0,
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '95%',
                }
            });
            
            console.log("Joining " + roomName);
            window.callFrame.join({ url: "https://roulette.daily.co/" + roomName });
        }

        let timerElt = document.getElementById("date");
          
        window.timerId = setInterval(() => {
          timerElt.innerText = currentDatetime();
        }, 1);

        createFrameAndJoinRoom(window.location.pathname.replace("/", ""));
    }

    render() {
    
    return (
        <div className="room">
            <div id="frame"></div>
            <div className="header">
                <h2 className="title">MEETING WITH {this.props.name.toUpperCase()} &#x2F;&#x2F; GUEST</h2>
                <a href="https://root.vc" target="_new"><img alt="Root Ventures" className="logotype" src="logotype.png"></img></a>
            </div>
            <div className="footer">
                <div className="date" id="date"></div>
                <div className="plug">
                    <span className="daily">Made with <a href="https://daily.co">daily.co</a></span>
                    <a href="https://github.com/rootvc/meet" target="_new"><img alt="GitHub" className="github" src="github.png"></img></a>
                </div>
            </div>
        </div>
    );
   };
}

function currentDatetime() {
    let date = new Date();
    let zoneName = moment.tz.guess();
    let time = moment(date).format("h:mma z");
    let day = moment(date).format(" | MMMM DD, YYYY");
    let zone = moment().tz(zoneName).format("z");
    return  [time, zone, day].join(" ");
}

export default Room;