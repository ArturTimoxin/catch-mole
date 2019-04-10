import React from 'react'

const StatusBar = (props) => {
    return (
        <div className="statusBar">
          <h2>Status Bar</h2>
          <div className="info">
            <div>Game difficult: {props.difficult}</div>
            <div>Score: {props.score} / 100 point(s)</div>
            <div>Fails: {props.countFails} / 3</div>
            <div>You failed: {props.time} ms</div>
          </div>
        </div>
      )
}

export default StatusBar;



