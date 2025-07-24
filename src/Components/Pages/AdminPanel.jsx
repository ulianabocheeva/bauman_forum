import PreviewQuestions from '../Parse/previewQuestions.jsx'
import Categories from '../Parse/Categories.jsx'
import classes from './Pages.module.css'
import {Link} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import Cookies from "js-cookie";

export default function AdminPanel() {
    const [questions, setQuestions] = useState([])
    const cookie = Cookies.get("auth")

    const fetchQuestions = useCallback(async () => {
        const response = await fetch(
            "http://localhost:5045/api/Reports", {
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
        <section>
            <div className={classes.popQuestionDiv} >
                <div className={classes.mainPageDiv}>
                    <h3>Журнал жалоб</h3>
                    <ul>
                        {(questions.length === 0 ? "Ничего нет!" :
                            questions.map((question) => (
                                <li key={question.Id} style={{float: "left"}}>
                                    <Link to={"/answer/" + question.Uid + "/" + question.Id}>
                                        <p style={{fontWeight: "bold"}}><strong>🙋🏼‍♂️ Жалоба #{question.Id}</strong></p>
                                        <h5 style={{color: 'white'}}>Отправил: {question.UserAuthor.Name + " " + question.UserAuthor.Surname}</h5>
                                        <h5 style={{color: 'white'}}>Время: {question.DatePost.replace("T", " ").substring(0, question.DatePost.replace("T", " ").indexOf("."))}</h5>
                                        <h5 style={{color: 'white'}}>Жалоба на: {question.ReportType.Name}</h5>
                                        <h5 style={{color: 'white'}}>Категория: {question.CategoryOfReport.CategoryName}</h5>
                                        <h5 style={{color: 'white'}}>Описание: {question.Text}</h5>
                                    </Link>
                                </li>)
                            )
                        )}
                    </ul>
                </div>
            </div>
        </section>
    )
}