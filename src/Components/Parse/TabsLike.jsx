import Button from "../Button/Button.jsx"
import like from "../Images/like.svg";
import React from "react";

export default function TabsLike({ active, onChange }) {
    return (
        <section style={{ marginBottom: '1rem', display: 'flex', flexDirection:'row'}}>
            <Button style={{padding: 10, margin: 5}} isActive={active === 'like'} onClick={() => onChange('like')}>
                <img style={{float: 'right'}} src={like} alt=""/>
            </Button>
            <Button style={{padding: 10, margin: 5}} isActive={active === 'dislike'} onClick={() => onChange('dislike')}>
                <img style={{float: 'right',transform: 'rotate(180deg)'}} src={like} alt=""/>
            </Button>
        </section>
    )
}