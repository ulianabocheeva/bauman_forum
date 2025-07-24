import React, {useState, useEffect} from 'react'
import Button from "../Button/Button.jsx"
import classes from './Pages.module.css'
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";


export default function RegisterSection() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        group: '',
        hasError: false
    })

    function handleErrorReset(){
        if(error){
            setError("")
        }
    }

    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);

    const handleCheckbox1Change = () => {
        setCheckbox1(!checkbox1);
    };

    const handleCheckbox2Change = () => {
        setCheckbox2(!checkbox2);
    };

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if(form.name !== '' && form.email !== '' && form.password !== '' && form.group !== '') {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [form.name, form.email, form.password, form.group]);

    const cookie = Cookies.get("auth")
    const navigate = useNavigate()
    const [error, setError] = useState("")

    useEffect(() => {
        if(cookie){
            navigate("/profile")
        }
    });

    async function fetchReg(name, email, password, group){
        let names = name.split(" ")
        console.log(names, group, email)
        await fetch(
            `http://localhost:5045/api/Account/register`, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    surname: names[0],
                    name: names[1],
                    secondName: names[2],
                    group: group,
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
                setError("Введённые данные не соответсвуют данным из ЭУ")
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!error) {
            const name = event.target.name.value
            const group = event.target.group.value
            const email = event.target.email.value
            const password = event.target.password.value
            fetchReg(name, email, password, group).then(r => {
                //console.log("Success")
            })
        }
    };

    return (
        <div>
            <form className={classes.registerDiv} onSubmit={handleSubmit}>
                <h1 style={{textAlign: 'center', color: '#2D5BFF', marginBottom: 10}}>
                    Регистрация в BaumanForum</h1>
                <label htmlFor="name" className={classes.label}>
                    ФИО</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Иванов Иван Иванович"
                    autoComplete="on"
                    onChange={handleErrorReset}
                    required
                />
                <label htmlFor="email" className={classes.label}>
                    Электронная почта</label>
                <input
                    type="email"
                    id="email"
                    placeholder="iii@student.bmstu.ru"
                    autoComplete="on"
                    onChange={handleErrorReset}
                    required
                />
                <label htmlFor="password" className={classes.label}>
                    Пароль</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Пароль"
                    autoComplete="on"
                    onChange={handleErrorReset}
                    required
                />
                <label htmlFor="group" className={classes.label}>
                    Группа</label>
                <input
                    type="text"
                    id="group"
                    placeholder="СГН3-42Б"
                    autoComplete="on"
                    onChange={handleErrorReset}
                    required
                />
                <div style={{display: "flex", flexDirection: "column"}}>
                    <div style={{display: "flex", flexDirection: "row", padding: 7}}>
                        <input type="checkbox" id="Checkbox1" onChange={handleCheckbox1Change} checked={checkbox1}/>
                        <label htmlFor="Checkbox1" style={{padding: 5}}>Нажимая на кнопку, вы даёте свое согласие на
                            обработку<br/> персональных
                            данных и соглашаетесь с условиями<br/> политики конфиденциальности.</label>
                    </div>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <input type="checkbox" id="Checkbox2" onChange={handleCheckbox2Change} checked={checkbox2}/>
                        <label htmlFor="Checkbox2" style={{padding: 5}}>Я ознакомился с правилами форума
                            BaumanForum<br/> и
                            согласен с ними</label>
                    </div>
                </div>
                {error && <p>{error}</p>}
                {/*<Button style={{marginTop: 15}}*/}
                {/*        disabled={(form.hasError || !(checkbox1 && checkbox2) || !isFormValid)}*/}
                {/*        isActive={isFormValid && !form.hasError}*/}
                {/*        type="submit"*/}
                {/*>*/}
                {/*    Зарегистрироваться*/}
                {/*</Button>*/}
                <input style={{marginTop: 15}} type="submit" value="Зарегистрироваться" name="submit" autoComplete="on"/>
            </form>
        </div>
    )
}