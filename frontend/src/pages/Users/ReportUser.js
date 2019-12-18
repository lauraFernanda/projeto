import React, { Component } from 'react';

// Importação do CSS
import './index.css'

import ListUser from './ListUser'

export default class ReportUser extends Component {

    state = {
        user: {},
        users: [{}]
    }

    componentDidMount() {
        this.loadUser();
        this.loadUsers();
    }

    loadUser = async () => {
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
    loadUsers = async (e) => {

        try {
            const token = await localStorage.getItem("token")
            fetch('http://localhost:3000/listUsers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(res => res.json())
                .then(data => { this.setState({ users: data }) })
                .catch(err => { console.log(err) })

        } catch (err) {
            alert("Erro no Login");
            console.log(err)
        }
    }

    render() {
        console.log(this.state.user)
        console.log(this.state.users)
        return (
            <div className='container-home'>
                <div className='filter-home'>
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
                    <div className='card-reports'>
                        <div className='div-logo'>
                            <img className='card-logo' src='/images/user-icon.png' alt='imagem de logo' />
                            <p className='page-identificator'>Relatório de Usuários</p>
                        </div>
                        <div className="users-card">
                            <p className='user'>Nome de Usuário</p>
                            <p className='user'>Email</p>
                        </div>
                        {this.state.users.map(user => (<ListUser key={user._id} user={user} />))}
                    </div>
                    <div className='footer'>
                        <p className='footer-text'>© Laura's Coffee</p>
                    </div>
                </div>
            </div >
        )
    }
}