import React from 'react'

const GridBurrows = (props) => {
  const {runGame, titleModal, moles, startGame, catchMole} = props;
  return (
    <div className="gridBurrows">
        <div className={`modalStart ${runGame ? "hide" : ""}`} onClick={startGame}>{titleModal}</div>
        {moles.map(mole => {
            return (
                <div className="burrowCell" key={mole.id}>
                    <div className={`mole ${mole.show ? 'show' : 'hide'}`} onClick={() => catchMole(mole.id)}/>
                    <div className="burrow" />
                    <div className="blockHiddenMole" />
                </div>
            )
        })}
    </div>
  )
}

export default GridBurrows;