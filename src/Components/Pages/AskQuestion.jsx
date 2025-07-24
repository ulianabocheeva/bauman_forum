import React, {useState, useRef, useCallback, useEffect} from 'react'
import Button from "../Button/Button.jsx"
import {Link, useNavigate} from "react-router-dom";
import classes from './Pages.module.css'
import Cookies from "js-cookie";

export default function AskSection() {
    const [form, setForm] = useState({
        topic: '',
        description: '',
        category: '',
        hasError: false
    })
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const cookie = Cookies.get("auth")

    function handleTopicChange(event) {
        setForm((prev) => ({
            ...prev,
            topic: event.target.value,
            hasError: event.target.value.trim().length === 0,
        }))
    }

    function handleDescriptionChange(event) {
        setForm((prev) => ({
            ...prev,
            description: event.target.value,
            hasError: event.target.value.trim().length === 0,
        }))
    }

    const navigate = useNavigate()
    async function fetchAsk(topic, description, category){
        const response = await fetch('http://localhost:5045/api/Questions', {
            method: "post",
            body: JSON.stringify({
                theme: topic,
                description: description,
                categoryId: category
            }),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + cookie,
            }
        })
        const json = await response.json()
        if(response.ok){
            navigate("/question/" + json.Id)
        } else {
            console.log(json)
        }
    }

    const fetchCategories = useCallback(async () => {
        const response = await fetch('http://localhost:5045/api/CategoriesOfQuestion')
        const categories = await response.json()
        //const user = users.find(user => user.id === 1)
        setCategories(categories)
        setLoading(false)
    }, [])

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])

    const handleSubmit = (event) => {
        event.preventDefault();
        const topic = event.target.topic.value
        const description = event.target.description.value
        const category = event.target.category.value
        console.log(topic, description, category)
        fetchAsk(topic, description, category)
    };

    return (
        (loading ? "Загрузка..." :
            <div>
                <form onSubmit={handleSubmit} className={classes.loginDiv}>
                    <h1>Задать вопрос</h1>
                    <label htmlFor="topic" className={classes.label}>Тема</label>
                    <input
                        type="text"
                        id="topic"
                        className="control"
                        placeholder="Тема вопроса"
                        value={form.topic}
                        onChange={handleTopicChange}
                        autoComplete="on"
                        required
                    />
                    <label htmlFor="category" className={classes.label}>Категория вопроса</label>
                    <select
                        id="category"
                        className="control"
                        value={form.category}
                        onChange={(event) =>
                            setForm((prev) => ({...prev, category: event.target.value}))
                        }
                    >
                        {categories.map((category) => (
                                <option key={category.Id} value={category.Id}>{category.CategoryName}</option>
                            )
                        )}
                    </select>
                    <label htmlFor="description" className={classes.label}>Описание вопроса</label>
                    <input
                        type="text"
                        id="description"
                        className="control"
                        value={form.description}
                        onChange={handleDescriptionChange}
                        autoComplete="on"
                        style={{width: 400, height: 200}}
                        required
                    />
                    <Button type="submit" disabled={form.hasError} isActive={!form.hasError}>
                        Задать вопрос
                    </Button>
                </form>
            </div>
        )
    )
}