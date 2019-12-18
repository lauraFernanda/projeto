import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../../services/api'

import './index.css'

export default class Login extends Component {

    state = {
        email: '',
        password: '',
        from: false,
        path: ''
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = this.state;

        if (email === '' || password === '')
            return alert('Há campos obrigatórios em branco!');

        try {
            const response = await api.post('/login', {
                email: this.state.email,
                password: this.state.password
            })

            console.log(response)
            await localStorage.setItem('token', response.data.token);
            await localStorage.setItem('user-name', response.data.user.name);
            await localStorage.setItem('user-email', response.data.user.email)

            this.setState({ path: "/home", from: true });
            alert('Autenticado com sucesso!')

        } catch (err) {
            alert("Erro no Login");
            console.log(err)
        }
    }

    render() {
        if (this.state.from) {
            return <Redirect to={this.state.path} />
        }
        return (
            <div className='container-login'>
                <div className='recuo'>
                    <div className='div-login'>
                        <div className='filter'></div>
                    </div>
                    <div className='div-form-login'>
                        <div className='apresentation-commerce'>
                            <img className='logo' src='/images/coffe-icon1.png' alt='' />
                            <p className='commerce-name-login'>Laura's Coffee</p>
                        </div>
                        <form className='form'>
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
                                className='button'
                                onClick={this.handleSubmit}
                            >Entrar</button>
                        </form>
                    </div>
                </div>
            </div >
        )
    }
}