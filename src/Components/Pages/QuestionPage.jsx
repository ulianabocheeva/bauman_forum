import classes from './Pages.module.css'
import Question from "../Parse/Question.jsx";
import Answer from "../Parse/Answer.jsx";
import {useParams} from "react-router-dom";
import Button from "../Button/Button.jsx";
import ModalAnswer from "../Modal/ModalAnswer.jsx";

export default function QuestionPage() {
    let { id } = useParams();

    return (
        <section>
            <div className={classes.questionPage}>
                <h3 style={{textAlign: 'left', paddingLeft: 15}}>Вопрос</h3>
                <ul><Question questionId={id}/></ul>
            </div>

            <div className={classes.questionPage}>
                <h3 style={{textAlign: 'left', paddingTop: 0, paddingLeft: 15}}>Ответы</h3>
                <ModalAnswer/>
                <ul><Answer questionId={id}/></ul>
            </div>
        </section>
    )
}