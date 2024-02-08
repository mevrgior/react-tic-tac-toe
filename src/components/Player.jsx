import { useState } from "react";

export default function Player({name, symbol, isActive, onNameChange}) {
    const initialName = name;
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    function handleButton(){
        setIsEditing((editing) => !editing);
        if(isEditing){
            onNameChange(symbol, playerName)
        }
    }

    function handleChange(event){
        setPlayerName(event.target.value)
    }

    return(
        <li className={isActive ? 'active' : ''}>
        <span className="player">
            {isEditing 
            ?  (<input type="text" required value={playerName} onChange={handleChange} />)
            : (<span className="player-name">{playerName}</span>)
            }
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleButton}>{isEditing ? ("Save") : ("Edit")}</button>
      </li>
    );
}