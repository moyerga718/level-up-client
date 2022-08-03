import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameTypes } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    useEffect(() => {
        getGameTypes().then(setGameTypes)
    }, [])

    const changeGameState = (domEvent) => {
        console.log(domEvent)
        const gameCopy = {...currentGame}
        gameCopy.domEvent.target.name = domEvent.target.value
        setCurrentGame(gameCopy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={(changeEvent) => {
                            const gameCopy = {...currentGame}
                            gameCopy.title = changeEvent.target.value
                            setCurrentGame(gameCopy)
                        }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={(changeEvent) => {
                            const gameCopy = {...currentGame}
                            gameCopy.maker = changeEvent.target.value
                            setCurrentGame(gameCopy)
                        }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of Players: </label>
                    <input type="number" name="number_of_players" required autoFocus className="form-control"
                        value={currentGame.number_of_players}
                        onChange={(changeEvent) => {
                            const gameCopy = {...currentGame}
                            gameCopy.numberOfPlayers = changeEvent.target.value
                            setCurrentGame(gameCopy)
                        }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill Level (1-10): </label>
                    <input type="number" name="skill_level" required autoFocus className="form-control"
                        value={currentGame.skill_level}
                        onChange={(changeEvent) => {
                            const gameCopy = {...currentGame}
                            gameCopy.skillLevel = changeEvent.target.value
                            setCurrentGame(gameCopy)
                        }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_type">Game Type: </label>
                    <select onChange={(changeEvent) => {
                            const gameCopy = {...currentGame}
                            gameCopy.gameTypeId = changeEvent.target.value
                            setCurrentGame(gameCopy)
                        }}>
                        <option value = "0">PICK A GAME TYPE</option>
                        {
                            gameTypes.map( type => {
                                return <option value = {type.id}>{type.label}</option>
                            } )
                        }
                    </select>
                    
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: parseInt(currentGame.skillLevel),
                        game_type: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => navigate("/"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}