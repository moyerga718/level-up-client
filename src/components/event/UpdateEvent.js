import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGames } from '../../managers/GameManager.js'
import { updateEvent, getEventById } from '../../managers/EventManager.js'


export const UpdateEvent = () => {
    const { eventId } = useParams()
    const navigate = useNavigate()
    const [games, setGames] = useState([])

    const [currentEvent, setCurrentEvent] = useState({
        description: "",
        date: "",
        time: "",
        gameId: 0
    })

    const [ eventData, setEventData ] = useState({})

    useEffect(() => {
        getGames().then(setGames)
        getEventById(eventId).then(setEventData)
    }, [])

    useEffect(() => {
        if (eventData) {
            const eventCopy = {...currentEvent}
            eventCopy.description = eventData.description
            eventCopy.date = eventData.date
            eventCopy.time = eventData.time
            eventCopy.gameId = eventData?.game?.id
            setCurrentEvent(eventCopy)
        }
    }, [eventData])


    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Edit Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={(changeEvent) => {
                            const eventCopy = {...currentEvent}
                            eventCopy.description = changeEvent.target.value
                            setCurrentEvent(eventCopy)
                        }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">date (YYYY-MM-DD): </label>
                    <input type="text" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={(changeEvent) => {
                            const eventCopy = {...currentEvent}
                            eventCopy.date = changeEvent.target.value
                            setCurrentEvent(eventCopy)
                        }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="text" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={(changeEvent) => {
                            const eventCopy = {...currentEvent}
                            eventCopy.time = changeEvent.target.value
                            setCurrentEvent(eventCopy)
                        }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <select onChange={(changeEvent) => {
                            const eventCopy = {...currentEvent}
                            eventCopy.gameId = changeEvent.target.value
                            setCurrentEvent(eventCopy)
                        }}
                        >
                        <option value = "0">PICK A GAME</option>
                        {
                            games.map( game => {
                                if (game.id === currentEvent.gameId) {
                                    return <option value = {game.id} selected>{game.title}</option>
                                } else {
                                    return <option value = {game.id}>{game.title}</option>
                                }
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

                    const event = {
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        game: parseInt(currentEvent.gameId),
                    }

                    // Send POST request to your API
                    updateEvent(eventId, event)
                        .then(navigate("/events"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}