import Cookies from 'js-cookie';
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Button from "../Button/Button.jsx";

export default function TabHeader(){
    const [user, setUser] = useState("Вход")
    const cookie = Cookies.get("auth")

    return (
        <section style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
            {!cookie && (<>
                <Link to={'/register'}><Button style={{ marginLeft: 10}}>Регистрация</Button></Link>
                <Link to={user === "Вход" ? "/login" : "/profile"}>
                    <Button style={{ marginLeft: 10, marginRight: 10}}>{user}</Button>
                </Link>
            </>)}
            {cookie && (<>
                <Link to={'/askQuestion'}>
                    <Button style={{ marginLeft: 10, marginRight: 10}}>Задать вопрос</Button>
                </Link>
                <Link to={'/profile'}>
                    <Button style={{ marginLeft: 10, marginRight: 10}}>Профиль</Button>
                </Link>
            </>)}
        </section>
    )
}