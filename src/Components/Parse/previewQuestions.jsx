import comment from "../Images/comment.svg";
import React, {useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Cookies from "js-cookie";

export default function PreviewQuestions({url}) {
    const [questions, setQuestions] = useState([])
    const cookie = Cookies.get("auth")

    const fetchQuestions = useCallback(async () => {
        const response = await fetch(
            url, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + cookie,
                }
            }
        )
        const data = await response.json()
        //const slicedQuestions = data.slice(0, 5) // Обрезаем массив до первых 5 элементов
        setQuestions(data)
    }, [])

    useEffect(() => {
        fetchQuestions()
    }, [fetchQuestions])

    return (
        (questions.length === 0 ? "Ничего нет!" :
            questions.map((question) => (
                <li key={question.Id}>
                    <Link to={"/question/" + question.Id}>
                        <p style={{fontWeight: "bold"}}><strong>🙋🏼‍♂️ {question.Theme}</strong></p>
                        <h5 style={{color: 'white'}}>{question.Description}</h5>
                        <h6 style={{paddingTop: "1rem", color: 'white'}}>Автор: {question.UserAuthor.Name + " " + question.UserAuthor.Surname}</h6>
                    </Link>
                </li>)
            )
        )
    )
}