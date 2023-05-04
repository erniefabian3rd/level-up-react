import React, { useEffect, useState } from "react"
import { deleteEvent, getEvents, joinEvent, leaveEvent } from "../../managers/EventManager.js"
import "./Event.css"
import { useNavigate } from "react-router-dom"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
            navigate({ pathname: "/events/new" })
            }}
            >Register New Event</button>
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__description">{event.description}</div>
                        <div className="event__date">Date: {event.date}</div>
                        <div className="event__time">Time: {event.time}</div>
                        <button className="event__edit" onClick={() => {navigate(`/events/${event.id}/edit`)}}>Edit</button>
                        <button className="event__delete" onClick={() => {deleteEvent(event.id).then(() => {getEvents().then(data => setEvents(data))})}}>Delete</button>
                            {event.joined ?
                                // TODO: create the Leave button
                                <button className="event__leave" onClick={() => leaveEvent(event.id).then(() => {getEvents().then(data => setEvents(data))})}>Leave</button>
                            :
                                // TODO: create the Join button
                                <button className="event__join" onClick={() => joinEvent(event.id).then(() => {getEvents().then(data => setEvents(data))})}>Join</button>
                            }                    
                    </section>
                })
            }
        </article>
        </>
    )
}