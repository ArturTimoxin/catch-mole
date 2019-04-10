import React, { Component } from 'react';
import { connect } from "react-redux";
import StatusBar from '../../components/StatusBar/StatusBar';
import GridBurrows from '../../components/GridBurrows/GridBurrows'
import {SET_SCORE, ADD_DIFFICULTY_LEVEL, SET_COUNT_FAILS} from '../../constants/constants';
// все кроты изначально "как бы" пойманы чтобы пройти первую проверку на наличие пойманых кротов
class GamePage extends Component {
    state = {
      moles: [
          {
            id: 0,
            show: false,
            catch: true,
          }, 
          {
            id: 1,
            show: false,
            catch: true,
          }, 
          {
            id: 2,
            show: false,
            catch: true,
          },
          {
            id: 3,
            show: false,
            catch: true,
          },
          {
            id: 4,
            show: false,
            catch: true,
          },
          {
            id: 5,
            show: false,
            catch: true,
          },
      ],
      runGame: false,
      titleModal: 'START',
    }
    startGame = () => {
      this.setState({runGame: true});
      this.runGame(this.props.time);
      this.props.setScoreAction(0);
      this.props.setCountFailsAction(0);
      this.props.addDifficultyLevelAction(0, 2000);
    }

    runGame = (timeDelay) => {
      let timerId = setInterval(() => {
        let newMoles = this.state.moles;
        let catchMole = newMoles.find(elem => {
          return elem.catch;
        })
        let randomNumberMole = Math.floor(Math.random() * 6);
        if(newMoles[randomNumberMole].show) {
          newMoles.forEach(elem => {
            elem.show = false;
            elem.catch = false;
          })
          this.setState({moles: newMoles});
          let differentRandomNumberMole = Math.floor(Math.random() * 6);
          while(differentRandomNumberMole === randomNumberMole) {
            differentRandomNumberMole = Math.floor(Math.random() * 6);
          }
          newMoles[differentRandomNumberMole].show = true;
          this.setState({moles: newMoles});
        } else {
          newMoles.forEach(elem => {
            elem.show = false;
            elem.catch = false;
          })
          this.setState({moles: newMoles});
          newMoles[randomNumberMole].show = true;
          this.setState({moles: newMoles});
        }

        if(!catchMole) {
          let newFails = this.props.countFails + 1;
          this.props.setCountFailsAction(newFails);
          if(newFails === 3) {
            this.endGame('GAME OVER! Click for start again.');
          }
        }
      } ,timeDelay)
      this.setState({timerId});
    }

    endGame = (titleModal) => {
      let newMoles = this.state.moles;
      newMoles.forEach(elem => {
        elem.show = false;
        elem.catch = true; // чтобы при первом показе крота не бьло засчитан fail
      }) 
      clearInterval(this.state.timerId);
      this.setState({moles: newMoles});
      setTimeout(() => this.setState({runGame: false, titleModal: titleModal}), 1000);
    }

    catchMole = id => {
      let newMoles = this.state.moles;
      newMoles.forEach(elem => {
        elem.show = false;
        if(elem.id === id) {
          elem.catch = true;
        }
      })
      this.setState({moles: newMoles});
      let newScore = this.props.score + 1;
      this.props.setScoreAction(newScore);
      if(newScore % 10 === 0) {
          let newLevelDifficult = this.props.difficult + 1;
          let newTimeDelay = 2000 - 130 * newLevelDifficult;
          this.props.addDifficultyLevelAction(newLevelDifficult, newTimeDelay);
          clearInterval(this.state.timerId);
          this.runGame(newTimeDelay);
      } 
      if(newScore === 100) { 
        this.endGame('YOU WIN! Click for start again');
      }
    }

  render() {
      const {moles, runGame, titleModal} = this.state;
      const {score, time, difficult, countFails } = this.props;
    return (
      <div className="wrapper">
        <h1>CATCH THE MOLE</h1>
        <div className="wrapperGame">
            <GridBurrows startGame={this.startGame} catchMole={this.catchMole} runGame={runGame} moles={moles} titleModal={titleModal} />
            <StatusBar score={score} time={time} difficult={difficult} countFails={countFails}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => {
    return {
        score: store.gameReducer.score,
        difficult: store.gameReducer.difficult,
        time: store.gameReducer.time,
        countFails: store.gameReducer.countFails
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      setScoreAction: score => dispatch({ type: SET_SCORE, payload: {score} }),
      setCountFailsAction: countFails => dispatch({type: SET_COUNT_FAILS, payload: {countFails}}),
      addDifficultyLevelAction: (difficult, time) => dispatch({type: ADD_DIFFICULTY_LEVEL, payload: {difficult, time}}),
    };
  };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GamePage);