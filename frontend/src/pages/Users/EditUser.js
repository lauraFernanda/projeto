import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Importação do CSS
import './index.css'

export default class EditUser extends Component {

    state = {
        user: {},
        email: "",
        name: ""
    }

    componentDidMount() {
        this.loadUser();
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (this.state.name === "" ||
                this.state.email === "") {
                return alert("Há campos obrigatórios em branco!")
            }

            const token = await localStorage.getItem("token")
            fetch('http://localhost:3000/updateUser', {
                method: 'PUT',
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(res => res.json())
                .then(data => { console.log(data) })
                .catch(err => { console.log(err) })
            alert("Usuário atualizado com sucesso!")

        } catch (err) {
            alert("Erro ao Atualizar Usuário, Tente Novamente!");
            console.log(err)
        }
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
            alert("Erro na Busca");
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
                            <p className='commerce-name'>Laura's Coffe</p>
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
                                    <div className='apresentation-user space-bottom'>
                                        <img className='logo-user' src='/images/edit-icon.png' alt='' />
                                        <p className='user-information'>Editar Usuário</p>
                                    </div>
                                    <form className='form-newUser'>
                                        <input type='String'
                                            placeholder={this.state.user.name}
                                            className="input-style"
                                            value={this.state.name}
                                            onChange={e => this.setState({ name: e.target.value })} />
                                        <input type='email'
                                            placeholder={this.state.user.email}
                                            className="input-style"
                                            value={this.state.email}
                                            onChange={e => this.setState({ email: e.target.value })} />
                                        <button type='submit'
                                            className='button-user'
                                            onClick={this.handleSubmit}
                                        >Atualizar</button>
                                    </form>
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
                    <p className='footer-text'>© Laura's Coffe</p>
                </div>
            </div >
        )
    }
}