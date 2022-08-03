import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getEvents } from "../../managers/EventManager.js"
import "./Events.css"

export const EventList = (props) => {
    const navigate = useNavigate()
    const [events, setEvents] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/events/new" })
                }}
            >Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">{event?.game?.title} Event</div>
                        <div className="event__date">{event.date}, {event.time}</div>
                        <div className="event__description">About: {event.description}</div>
                        <div className="event__organizer">Organized By: {event.organizer.user.first_name} {event.organizer.user.last_name}</div>
                        <button className="btn btn-2 btn-sep icon-create"
                            onClick={() => {
                                navigate({ pathname: `/events/edit/${event.id}` })
                            }}
                        >edit</button>
                    </section>
                })
            }
        </article>
    )
}