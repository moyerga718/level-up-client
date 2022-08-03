import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { GameList } from "../components/game/GameList"
import { EventList } from "../components/event/EventList"
import { EventForm } from "../components/event/EventForm"
import { UpdateEvent } from "../components/event/UpdateEvent"
import { Authorized } from "./Authorized"
import { GameForm } from "../components/game/GameForm"
import { UpdateGame } from "../components/game/UpdateGame"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<GameList />} />
                <Route path="/events" element= {<EventList /> }/>
                <Route path="/games/new" element={<GameForm />} />
                <Route path="/events/new" element={<EventForm />} />
                <Route path="/events/edit/:eventId" element={<UpdateEvent />} />
                <Route path="/games/edit/:gameId" element={<UpdateGame />} />
            </Route>
        </Routes>
    </>
}
