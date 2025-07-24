import React, {useCallback, useEffect, useState} from "react";

export default function Categories() {
    const [questions, setQuestions] = useState([])

    const fetchQuestions = useCallback(async () => {
        const response = await fetch('http://localhost:5045/api/CategoriesOfQuestion')
        const data = await response.json()
        const slicedQuestions = data.slice(0, 5) // Обрезаем массив до первых 5 элементов
        setQuestions(slicedQuestions)
    }, [])

    useEffect(() => {
        fetchQuestions()
    }, [])

    return (
        questions.map((question) => (
            <li key={question.Id}>
                <p style={{paddingTop: 32, paddingBottom: 15}}><strong>{question.CategoryName}</strong></p>
            </li>))
    )
}