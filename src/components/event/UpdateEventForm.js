import { useEffect, useState } from "react"
import { getGames } from "../../managers/GameManager"
import { useNavigate, useParams } from "react-router-dom"
import { getEventDetails, updateEventDetails } from "../../managers/EventManager"

export const UpdateEventForm = () => {
    const navigate = useNavigate()
    const { eventId } = useParams()
    const [games, setGames] = useState([])
    const [feedback, setFeedback] = useState("")
    const [event, updateEvent] = useState({
        description: "",
        date: "",
        time: "",
        gameId: 0
    })

    useEffect(
        () => {
            getEventDetails(eventId)
                .then((data) => {
                    const eventObject = data
                    eventObject.description = data.description
                    eventObject.date = data.date
                    eventObject.time = data.time
                    eventObject.gameId = data.game
                    updateEvent(eventObject)
                })
        },
        [eventId]
    )

    useEffect(
        () => {
            getGames()
                .then((res) => setGames(res))
        },
        []
    )


    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    const changeEventState = (domEvent) => {
        const copy = {...event}
        copy[domEvent.target.name] = domEvent.target.value
        updateEvent(copy)
        }

    return (<article>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        <form className="event">
            <h2 className="event__title">Event Details:</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        name="description"
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={event.description}
                        onChange={changeEventState}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input
                        name="date"
                        type="date"
                        className="form-control"
                        value={event.date}
                        onChange={changeEventState}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time:</label>
                    <input
                        name="time"
                        type="time"
                        className="form-control"
                        value={event.time}
                        onChange={changeEventState}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game:</label>
                    <select
                        name="gameId"
                        required
                        className="form-control"
                        value={event.gameId}
                        onChange={changeEventState}>
                        <option value="0">Select Game:</option>
                        {games.map(g => 
                            <option key={`game--${g.id}`} value={g.id}>{g.title}</option>
                        )}
                    </select>
                </div>
            </fieldset>
            <button className="btn btn-primary"
            onClick={evt => {
                evt.preventDefault()
                
                const updatedEvent = {
                    id: eventId,
                    description: event.description,
                    date: event.date,
                    time: event.time,
                    game: parseInt(event.gameId)
                }

                updateEventDetails(updatedEvent)
                .then(() => navigate("/events"))}}>
                Save Event
            </button>
        </form>
    </article>
    )
}