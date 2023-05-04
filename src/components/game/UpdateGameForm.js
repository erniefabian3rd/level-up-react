import { useEffect, useState } from "react"
import { getGameDetails, getGameTypes, updateGameDetails } from "../../managers/GameManager"
import { useNavigate, useParams } from "react-router-dom"

export const UpdateGameForm = () => {
    const navigate = useNavigate()
    const { gameId } = useParams()
    const [feedback, setFeedback] = useState("")
    const [gameTypes, setGameTypes] = useState([])
    const [game, updateGame] = useState({
        skillLevel: 0,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    useEffect(
        () => {
            getGameDetails(gameId)
                .then((data) => {
                    const gameObject = data
                    gameObject.skillLevel = data.skill_level
                    gameObject.numberOfPlayers = data.number_of_players
                    gameObject.gameTypeId = data.game_type
                    updateGame(gameObject)
                })
        },
        [gameId]
    )

    useEffect(
        () => {
            getGameTypes()
                .then((res) => setGameTypes(res))
        },
        []
    )


    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    const changeGameState = (domEvent) => {
        const copy = {...game}
        copy[domEvent.target.name] = domEvent.target.value
        updateGame(copy)
        }

    return (<article>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        <form className="game">
            <h2 className="game__title">Game Details:</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        name="title"
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={game.title}
                        onChange={changeGameState}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker:</label>
                    <input
                        name="maker"
                        type="text"
                        className="form-control"
                        value={game.maker}
                        onChange={changeGameState}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players:</label>
                    <input
                        name="numberOfPlayers"
                        type="number"
                        className="form-control"
                        value={game.numberOfPlayers}
                        onChange={changeGameState}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level:</label>
                    <input
                        name="skillLevel"
                        type="number"
                        className="form-control"
                        value={game.skillLevel}
                        onChange={changeGameState}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type:</label>
                    <select
                        name="gameTypeId"
                        required
                        className="form-control"
                        value={game.gameTypeId}
                        onChange={changeGameState}>
                        <option value="0">Select Game Type:</option>
                        {gameTypes.map(gt => 
                            <option key={`game_type--${gt.id}`} value={gt.id}>{gt.label}</option>
                        )}
                    </select>
                </div>
            </fieldset>
            <button className="btn btn-primary"
            onClick={evt => {
                evt.preventDefault()
                
                const updatedGame = {
                    id: gameId,
                    maker: game.maker,
                    title: game.title,
                    number_of_players: parseInt(game.numberOfPlayers),
                    skill_level: parseInt(game.skillLevel),
                    game_type: parseInt(game.gameTypeId)
                }

                updateGameDetails(updatedGame)
                .then(() => navigate("/games"))}}>
                Save Game
            </button>
        </form>
    </article>
    )
}