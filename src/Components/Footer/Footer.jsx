import { styled } from 'styled-components'
import React from 'react'
import Button from "../Button/Button.jsx";
import { useState } from 'react'

const FooterContainer = styled.footer`
    background: #fafafa;
    padding: 0.3rem;
    left: 0;
    bottom: 0;
    width: 100%;
    flex: 0 0 auto;
    border-bottom: 1px solid #f0f;
    display: flex;
`

export default function Footer() {
    return (
        <FooterContainer>
            <div style={{marginLeft: 20, width: '35%', fontSize: 10, fontFamily: 'DM Sans'}}>
                <h3 style={{color: '#2D5BFF', marginBottom: 0}}>О проекте</h3>
                <p style={{paddingTop:2}}>В течение обучения у студентов часто возникают вопросы в ходе решения задач по техническим
                    дисциплинам, получить ответы на которые не всегда является возможным от преподавателя,
                    одногруппников или платного специалиста. Данная платформа дает возможность студентам обменяться
                    знаниями и наталкивать друг друга на решение задач.</p>
            </div>
            <div style={{marginLeft: 300, width: '20%', fontSize: 10, fontFamily: 'DM Sans', textAlign: "center"}}>
                <h3 style={{color: '#2D5BFF', marginBottom: 0}}>Разработчики</h3>
                <p style={{padding: 1}}>Арина Федотова</p>
                <p style={{padding: 1}}>Ульяна Бочеева</p>
                <p style={{padding: 1}}>Марченко Андрей</p>
            </div>
        </FooterContainer>
    )
}