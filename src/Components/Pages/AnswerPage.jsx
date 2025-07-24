import classes from './Pages.module.css'
import Question from "../Parse/Question.jsx";
import Answer from "../Parse/Answer.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import Button from "../Button/Button.jsx";
import ModalAnswer from "../Modal/ModalAnswer.jsx";
import React, {useCallback, useEffect, useState} from "react";
import TabsLike from "../Parse/TabsLike.jsx";
import ModalW from "../Modal/Modal.jsx";
import Cookies from "js-cookie";

export default function ReportPage() {
    let { aid, rid } = useParams();
    const cookie = Cookies.get("auth")

    const [answer, setAnswer] = useState([])
    const [report, setReport] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const fetchAnswer = useCallback(async () => {
        const response = await fetch('http://localhost:5045/api/Answers/' + aid)
        const answer = await response.json()
        setAnswer(answer)

        const response2 = await fetch('http://localhost:5045/api/Reports/' + rid, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + cookie,
            },
        })
        const report = await response2.json()
        setReport(report)

        setLoading(false)
    }, [aid])

    useEffect(() => {
        fetchAnswer()
    }, [fetchAnswer])

    const fetchReportDelete = useCallback(async () => {
        const response = await fetch('http://localhost:5045/api/Reports/' + rid, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + cookie,
            },
            method: "delete",
        })
        const answer = await response.json()
        if(!response.ok){
            console.log(answer)
        }
    }, [rid])

    const handleDeleteReport = (event) => {
        event.preventDefault();
        fetchReportDelete().then(() => (
            navigate("/admin")
        ))
    };

    const fetchAnswerDelete = useCallback(async () => {
        const response = await fetch('http://localhost:5045/api/Answers/' + aid, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + cookie,
            },
            method: "delete",
        })
        const answer = await response.json()
        if(!response.ok){
            console.log(answer)
        }
    }, [rid])

    const handleDeleteAnswer = (event) => {
        event.preventDefault();
        fetchAnswerDelete()
        fetchReportDelete().then(() => (
            navigate("/admin")
        ))
    };

    return (
        <section>
            <div className={classes.questionPage}>
                {
                    (loading ? "Загрузка..." :
                        <>
                            <h3 style={{textAlign: 'left', paddingTop: 0, paddingLeft: 15}}>Ответ</h3>
                            <ul>
                                <li key={answer.Id}>
                                    <p style={{paddingBottom: 2}}>{answer.UserAuthor.Name + " " + answer.UserAuthor.Surname}</p>
                                    <hr style={{width: "15%"}}/>
                                    <p style={{paddingTop: "1rem"}}> - {answer.Text}</p>
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <p style={{marginLeft: "auto", marginEight: 0}}> | {answer.DatePost.replace("T", " ").substring(0, answer.DatePost.replace("T", " ").indexOf("."))}</p>
                                    </div>
                                </li>
                            </ul>
                            <h3 style={{textAlign: 'left', paddingTop: 0, paddingLeft: 15}}>Жалоба</h3>
                            <ul>
                                <li key={report.Id}>
                                    <p style={{fontWeight: "bold"}}><strong>🙋🏼‍♂️ Жалоба #{report.Id}</strong></p>
                                    <h5 style={{color: 'white'}}>Отправил: {report.UserAuthor.Name + " " + report.UserAuthor.Surname}</h5>
                                    <h5 style={{color: 'white'}}>Время: {report.DatePost.replace("T", " ").substring(0, report.DatePost.replace("T", " ").indexOf("."))}</h5>
                                    <h5 style={{color: 'white'}}>Жалоба на: {report.ReportType.Name}</h5>
                                    <h5 style={{color: 'white'}}>Категория: {report.CategoryOfReport.CategoryName}</h5>
                                    <h5 style={{color: 'white'}}>Описание: {report.Text}</h5>
                                </li>
                            </ul>
                        </>
                    )
                }
                <form onSubmit={handleDeleteReport}>
                    <Button type="submit" style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        backgroundColor: '#93AAFD'
                    }}>Удалить жалобу</Button>
                </form>
                <form onSubmit={handleDeleteAnswer} style={{marginTop: "1rem"}}>
                    <Button type="submit" style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        backgroundColor: '#93AAFD'
                    }}>Удалить ответ</Button>
                </form>
            </div>
        </section>
    )
}