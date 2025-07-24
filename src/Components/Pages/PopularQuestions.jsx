import PreviewQuestions from '../Parse/previewQuestions.jsx'
import Categories from '../Parse/Categories.jsx'
import classes from './Pages.module.css'
import {Link} from "react-router-dom";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";

export default function PopularQuestions() {
    return (
        <section>
            <div className={classes.popQuestionDiv}>
                <div className={classes.mainPageDiv}>
                    <h3>Категории</h3>
                    <ul><Categories/></ul>
                </div>
                <div className={classes.mainPageDiv}>
                    <h3>Последние</h3>
                    <ul><PreviewQuestions url={"http://localhost:5045/latest"}/></ul>
                </div>
                <div className={classes.mainPageDiv}>
                    <h3>Популярное</h3>
                    <ul><PreviewQuestions url={"http://localhost:5045/popular"}/> </ul>
                </div>
            </div>
        </section>
    )
}