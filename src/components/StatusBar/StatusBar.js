import React from 'react'

const StatusBar = (props) => {
    return (
        <div className="statusBar">
          <h2>Status Bar</h2>
          <div className="info">
            <div>Game difficult: {props.difficult}</div>
            <div>Score: {props.score} point(s)</div>
            <div>Time: {props.time} ms</div>
          </div>
        </div>
      )
}

export default StatusBar;



