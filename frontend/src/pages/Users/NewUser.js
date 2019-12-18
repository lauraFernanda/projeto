import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Importação do CSS
import './index.css'

export default class User extends Component {

    state = {
        user: {},
        email: "",
        name: "",
        password: ""
    }

    componentDidMount() {
        this.loadUser();
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (this.state.name === "" ||
                this.state.email === "" ||
                this.state.password === "") {
                return alert("Há campos obrigatórios em branco!")
            }

            const token = await localStorage.getItem("token")
            fetch('http://localhost:3000/user', {
                method: 'POST',
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(res => res.json())
                .then(data => { console.log(data) })
                .catch(err => { console.log(err) })
            alert('Usuário Criado com Sucesso!')

        } catch (err) {
            alert("Erro ao Criar Usuário, Tente Novamente!");
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
                                    <div className='apresentation-user space-bottom'>
                                        <img className='logo-user' src='/images/new-icon.png' alt='' />
                                        <p className='user-information'>Novo Usuário</p>
                                    </div>
                                    <form className='form-newUser'>
                                        <input type='String'
                                            placeholder='Nome de Usuário'
                                            className="input-style"
                                            value={this.state.name}
                                            onChange={e => this.setState({ name: e.target.value })} />
                                        <input type='email'
                                            placeholder='E-mail'
                                            className="input-style"
                                            value={this.state.email}
                                            onChange={e => this.setState({ email: e.target.value })} />
                                        <input type='password'
                                            placeholder='Password'
                                            className="input-style padding"
                                            value={this.state.password}
                                            onChange={e => this.setState({ password: e.target.value })} />
                                        <button type='submit'
                                            className='button-user'
                                            onClick={this.handleSubmit}
                                        >Cadastrar</button>
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
                                <Link className='action'>
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