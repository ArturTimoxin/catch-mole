import React, { Component } from 'react'
import { connect } from "react-redux";
import StatusBar from '../../components/StatusBar/StatusBar'
class GamePage extends Component {
    state = {
      showMoleInBurrow: [0, 0, 0, 0, 0, 0],
      runGame: false,
    }
    startGame = () => {
      this.setState({runGame: !this.state.runGame});
      let timerId = setInterval(this.runGame, this.props.time);
      this.setState({timerId});
    }

    runGame = () => {
      let newShowMoleInBurrow = [0,0,0,0,0,0];
      this.setState({showMoleInBurrow: newShowMoleInBurrow});
      newShowMoleInBurrow[Math.floor(Math.random() * 6)] = 1;
      this.setState({showMoleInBurrow: newShowMoleInBurrow});
    }

  render() {
      const {showMoleInBurrow, runGame} = this.state;
      const {score, time, difficult} = this.props;
    return (
      <div className="wrapper">
        <h1>CATCH THE MOLE</h1>
        <div className="wrapperGame">
            <div className="gridBurrows">
              <div className={`modalStart ${runGame ? "hide" : ""}`} onClick={this.startGame}>START</div>
                {showMoleInBurrow.map((burrowCell, i) => {
                    return (
                        <div className="burrowCell" key={i}>
                            <div className={`mole ${burrowCell ? 'show' : ''}`} />
                            <div className="burrow" />
                            <div className="blockHiddenMole" />
                        </div>
                    )
                })}
            </div>
            <StatusBar score={score} time={time} difficult={difficult}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => {
    return {
        score: store.gameReducer.score,
        difficult: store.gameReducer.difficult,
        time: store.gameReducer.time
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      
    };
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    )(GamePage);