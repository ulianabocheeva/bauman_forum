import classes from "./Pages.module.css";
import React, {useCallback, useEffect, useState} from "react";
import Question from "../Parse/Question.jsx";
import {Link, useParams} from "react-router-dom";

export default function SearchQuestions() {
    let { text } = useParams();

    const [loading, setLoading] = useState(true)
    const [questions, setQuestion] = useState([])

    const fetchQuestions = useCallback(async () => {
        const response = await fetch("http://localhost:5045/search?words=" + text)
        const questions = await response.json()
        //const user = users.find(user => user.id === 1)
        if(response.ok){
            setQuestion(questions)
        } else {
            setQuestion([])
        }
        setLoading(false)
    }, [text])

    useEffect(() => {
        fetchQuestions()
    }, [fetchQuestions, text])

    return (
        (loading ? "Загрузка..." :
            <section>
                <div className={classes.questionPage}>
                    <h3 style={{textAlign: 'left', paddingLeft: 15}}>Найденные вопросы</h3>
                    <ul>
                        {
                            (questions.length === 0 ? "Вопрос '" + text + "' не найден!" :
                                questions.map((question) => (
                                    <Link to={"/question/" + question.Id}>
                                        <li key={question.Id}>
                                            <p style={{paddingBottom: 2}}><strong>Вопрос </strong> {question.Theme}</p>
                                            <p style={{paddingTop: 2, paddingBottom: 2}}>
                                                <strong>Категория </strong> {question.CategoryOfQuestion.CategoryName}</p>
                                            <p style={{
                                                paddingTop: 2,
                                                paddingBottom: 2
                                            }}>
                                                <strong>Автор </strong> {question.UserAuthor.Name + " " + question.UserAuthor.Surname}
                                            </p>
                                            <p style={{paddingTop: 2}}><strong>Описание </strong> {question.Description}</p>
                                        </li>
                                    </Link>
                                ))
                            )
                        }
                    </ul>
                </div>
            </section>
        )
    )
}