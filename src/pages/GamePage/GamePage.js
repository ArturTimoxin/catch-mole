import React, { Component } from 'react';
import { connect } from "react-redux";
import StatusBar from '../../components/StatusBar/StatusBar';
import {SET_SCORE, ADD_DIFFICULTY_LEVEL} from '../../constants/constants';

class GamePage extends Component {
    state = {
      showMoleInBurrow: [0, 0, 0, 0, 0, 0],
      runGame: false,
      titleModal: 'START',
    }
    startGame = () => {
      clearInterval(this.state.timerId);
      this.setState({runGame: true});
      this.runGame(this.props.time);
    }

    runGame = (timeDelay) => {
      let timerId = setInterval(() => {
        let newShowMoleInBurrow = [0,0,0,0,0,0];
        this.setState({showMoleInBurrow: newShowMoleInBurrow});
        newShowMoleInBurrow[Math.floor(Math.random() * 6)] = 1;
        this.setState({showMoleInBurrow: newShowMoleInBurrow});
      } ,timeDelay)
      this.setState({timerId});
    }

    endGame = (titleModal) => {
      clearInterval(this.state.timerId);
      let newShowMoleInBurrow = [0,0,0,0,0,0];
      this.props.setScoreAction(0);
      this.props.addDifficultyLevelAction(0, 2000);
      this.setState({runGame: false, titleModal: titleModal, showMoleInBurrow: newShowMoleInBurrow});
    }

    catchMole = () => {
      let newShowMoleInBurrow = [0,0,0,0,0,0];
      let newScore = this.props.score + 1;
      this.props.setScoreAction(newScore);
      this.setState({showMoleInBurrow: newShowMoleInBurrow});
      if(newScore % 10 === 0 && newScore !== 0) {
          let newLevelDifficult = this.props.difficult + 1;
          let newTimeDelay = 2000 - 130 * newLevelDifficult;
          this.props.addDifficultyLevelAction(newLevelDifficult, newTimeDelay);
          clearInterval(this.state.timerId);
          this.runGame(newTimeDelay);
      } 
      if(newScore === 10) { 
        this.endGame('YOU WIN! Click for start again');
      }
    }

  render() {
      const {showMoleInBurrow, runGame, titleModal} = this.state;
      const {score, time, difficult } = this.props;
    return (
      <div className="wrapper">
        <h1>CATCH THE MOLE</h1>
        <div className="wrapperGame">
            <div className="gridBurrows">
              <div className={`modalStart ${runGame ? "hide" : ""}`} onClick={this.startGame}>{titleModal}</div>
                {showMoleInBurrow.map((burrowCell, i) => {
                    return (
                        <div className="burrowCell" key={i}>
                            <div className={`mole ${burrowCell ? 'show' : 'hide'}`} onClick={this.catchMole}/>
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
      setScoreAction: score => dispatch({ type: SET_SCORE, payload: score }),
      addDifficultyLevelAction: (difficult, time) => dispatch({type: ADD_DIFFICULTY_LEVEL, payload: {difficult, time}}),
    };
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    )(GamePage);