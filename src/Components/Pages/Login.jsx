import React, {useState, useRef, useEffect} from 'react'
import Button from "../Button/Button.jsx"
import {Link, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import classes from "./Pages.module.css"

export default function LoginSection() {

    const [form, setForm] = useState({
        email: '',
        password: '',
        hasError: false
    })

    function handleEmailChange(event) {
        setForm((prev) => ({
            ...prev,
            email: event.target.value,
            hasError: event.target.value.trim().length === 0,
        }))
        if(error){
            setError("")
        }
    }

    function handlePasswordChange(event) {
        setForm((prev) => ({
            ...prev,
            password: event.target.value,
            hasError: event.target.value.trim().length === 0,
        }))
        if(error){
            setError("")
        }
    }

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if(form.email !== '' && form.password !== '') {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [form.email, form.password]);

    const cookie = Cookies.get("auth")
    const navigate = useNavigate()
    const [error, setError] = useState("")

    useEffect(() => {
        if(cookie){
            navigate("/profile")
        }
    });

    async function fetchLogin(email, password){
        await fetch(
            `http://localhost:5045/api/Account/login`, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
            }
        ).then(response => {
            if (response.ok){
                response.json().then(json => {
                    Cookies.set("auth", json.Token)
                    navigate("/profile")
                })
            } else {
                setError("Неправильный пароль или Email ")
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!error) {
            const email = event.target.email.value
            const password = event.target.password.value
            fetchLogin(email, password).then(r => {
                navigate("/")
            })
        }
    };

    return (
        <div style={{height: '100vh'}}>
            <form onSubmit={handleSubmit} className={classes.loginDiv}>
                <h1 style={{marginBottom: 10}}>Войти в BaumanForum</h1>
                <label htmlFor="email" className={classes.label}>Электронная почта</label>
                <input
                    type="text"
                    id="email"
                    className="control"
                    placeholder="Бауманская почта"
                    value={form.email}
                    onChange={handleEmailChange}
                    autoComplete="on"
                    required
                />
                <label htmlFor="password" className={classes.label}>Пароль</label>
                <input
                    type="text"
                    id="password"
                    className="control"
                    placeholder="Пароль"
                    value={form.password}
                    onChange={handlePasswordChange}
                    autoComplete="on"
                    required
                />
                {error && <p>{error}</p>}
                <h5 style={{color: '#3C31DB', marginBottom: 10}}>Забыли пароль?</h5>
                <Button type="submit" disabled={form.hasError || !isFormValid} isActive={!form.hasError || isFormValid}>
                    Войти
                </Button>
                <Link to={'/register'}>
                    <h5 style={{margin: 10}}><span style={{color: 'grey'}}>Еще нет аккаунта? </span>
                        <span style={{color: '#3C31DB'}}>Зарегистрироваться</span></h5>
                </Link>
            </form>
        </div>
    )
}