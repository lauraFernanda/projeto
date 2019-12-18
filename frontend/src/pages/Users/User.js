import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Importação do CSS
import './index.css'

export default class User extends Component {

    state = {
        user: {}
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser = async (e) => {

        try {
            const name = await localStorage.getItem("user-name")
            const token = await localStorage.getItem("token")
            fetch('http://localhost:3000/index', {
                method: 'POST',
                body: JSON.stringify({
                    name: name
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(res => res.json())
                .then(data => { this.setState({ user: data }) })
                .catch(err => { console.log(err) })

        } catch (err) {
            alert("Erro no Login");
            console.log(err)
        }
    }

    render() {
        console.log(this.state.user)
        return (
            <div className='container-user'>
                <div className='filter-user'>
                    <div className='header'>
                        <div className='commerce-info'>
                            <p className='commerce-name'>Laura's Coffee</p>
                            <img className='commerce-ico' src='/images/coffe-icon1.png' alt=''></img>

                        </div>
                        <div className='users-info'>
                            <p className='user-name'>Olá, {this.state.user.name}!</p>
                            <img className='user-ico' src='/images/user-icon.png' alt=''></img>
                        </div>
                    </div>
                    <div className='container-user-information'>
                        <div className='div-user'>
                            <div className='information-user'>
                                <div className='center'>
                                    <div className='informations'>
                                        <p className='user-information'>Usuário Atual</p>
                                    </div>
                                    <div className='informations'>
                                        <img className='center-user space' src='/images/user-icon.png' alt='' />
                                        <p>{this.state.user.name}</p>
                                    </div>
                                    <div className='informations'>
                                        <img className='center-user space' src='/images/mail-icon.png' alt='' />
                                        <p>{this.state.user.email}</p>
                                    </div>
                                    <Link to={'/userEdit'} className='action'>
                                        <img className='center-user space space-top' src='/images/edit-icon.png' alt='' />
                                        <p className='top'>Editar</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='div-actions-user'>
                            <div className='apresentation-user'>
                                <img className='logo-user' src='/images/user-icon.png' alt='' />
                                <p className='user-information'>
                                    <Link to={'/home'}>
                                        <img className='back' src='/images/back-icon.png' alt='' />
                                    </Link>
                                    Usuários
                                </p>
                            </div>
                            <div className='user-actions'>
                                <Link className='action' to={'/newUser'}>
                                    <img className='user-action' src='/images/new-icon.png' alt='' />
                                    <p>Novo Usuário</p>
                                </Link>
                                <Link className='action' to={"/searchUser"}>
                                    <img className='user-action' src='/images/search-icon.png' alt='' />
                                    <p>Buscar Usuário</p>
                                </Link>

                                <Link className='action' to={"/userReport"}>
                                    <img className='user-action' src='/images/reports-ico.png' alt='' />
                                    <p>Relatório de Usuários</p>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='footer-user'>
                    <p className='footer-text'>© Laura's Coffee</p>
                </div>
            </div >
        )
    }
}