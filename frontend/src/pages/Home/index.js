import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

// Importação do CSS
import './index.css'

export default class Home extends Component {

    state = {
        user: {},
        from: false,
        path: ""
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

    sair = async () => {
        alert(`${this.state.user.name}, você foi desconectada da aplicação!`)
        await localStorage.removeItem('token');
        await localStorage.removeItem('user-email');
        await localStorage.removeItem('user-name');
        this.setState({from: true, path: "/"})
        
    }
    render() {
        if (this.state.from) {
            return <Redirect to={this.state.path} />
        }
        console.log(this.state.user)
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
                    <div className='div-cards'>
                        <div className='card'>
                            <Link className='link' to={'/product'}>
                                <img className='card-logo' src='/images/products-ico.png' alt='' />
                                <p className='card-text'>Produtos</p>
                            </Link>
                        </div>
                        <div className='card'>
                            <Link className='link' to={'/provider'}>
                                <img className='card-logo' src='/images/provider-icon.png' alt='' />
                                <p className='card-text'>Fornecedores</p>
                            </Link>
                        </div>
                        <div className='card'>
                            <Link className='link' to={'/users'}>
                                <img className='card-logo' src='/images/user-icon.png' alt='' />
                                <p className='card-text'>Usuários</p>
                            </Link>
                        </div>
                        <div className='card'>
                            <Link className='link' onClick={this.sair}>
                                <img className='card-logo' src='/images/logout-icon.png' alt='' />
                                <p className='card-text'>Sair</p>
                            </Link>
                        </div>
                    </div>
                    <div className='footer'>
                        <p className='footer-text'>© Laura's Coffee</p>
                    </div>
                </div>
            </div>
        )
    }
}