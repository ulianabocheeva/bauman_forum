import React, {useCallback, useEffect, useState} from "react";

export default function Question({questionId}) {
    const [loading, setLoading] = useState(true)
    const [question, setQuestion] = useState({})

    const fetchQuestion = useCallback(async () => {
        const response = await fetch('http://localhost:5045/api/Questions/' + questionId)
        const question = await response.json()
        //const user = users.find(user => user.id === 1)
        setQuestion(question)
        setLoading(false)
    }, [])

    useEffect(() => {
        fetchQuestion()
    }, [fetchQuestion])

    return (
        (
            loading ? "Загрузка..." : <li key={question.Id}>
                <p style={{paddingBottom: 2}}><strong>Вопрос </strong> {question.Theme}</p>
                <p style={{paddingTop: 2, paddingBottom: 2}}><strong>Категория </strong> {question.CategoryOfQuestion.CategoryName}</p>
                <p style={{
                    paddingTop: 2,
                    paddingBottom: 2
                }}><strong>Автор </strong> {question.UserAuthor.Name + " " + question.UserAuthor.Surname}</p>
                <p style={{paddingTop: 2}}><strong>Описание </strong> {question.Description}</p>
            </li>
        )
    )
}