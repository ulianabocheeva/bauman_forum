import React, {useCallback, useEffect, useState} from "react";
import TabsLike from "./TabsLike.jsx";
import ModalW from "../Modal/Modal.jsx";
import Button from "../Button/Button.jsx";
import useInput from "../hooks/useInput.jsx";

export default function Answer({questionId}) {
    const [tab, setTab] = useState(null)
    const [answers, setAnswers] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchAnswers = useCallback(async () => {
        const response = await fetch('http://localhost:5045/api/Answers/question/' + questionId)
        const answers = await response.json()
        setAnswers(answers)
        setLoading(false)
    }, [])

    useEffect(() => {
        fetchAnswers()
    }, [fetchAnswers])

    return (
        ( loading ? "Загрузка..." :
                (answers.length === 0 ? "Ответов еще нет!" :
                    answers.map((answer) => (
                        <li key={answer.Id}>
                            <p style={{paddingBottom: 2}}>{answer.UserAuthor.Name + " " + answer.UserAuthor.Surname}</p>
                            <hr style={{width: "15%"}}/>
                            <p style={{paddingTop: "1rem"}}> - {answer.Text}</p>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                {/*<TabsLike active={tab} onChange={(current) => setTab(current)}/>*/}
                                {/*{tab === 'like'}*/}
                                {/*{tab === 'dislike'}*/}
                                <ModalW id={answer.Id}/>
                                <p style={{marginLeft: "auto", marginEight: 0}}> | {answer.DatePost.replace("T", " ").substring(0, answer.DatePost.replace("T", " ").indexOf("."))}</p>
                            </div>
                        </li>)
                    )
            )
        )
    )
}