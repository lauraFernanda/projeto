import React, { Component } from 'react';

import ListProvider from './ListProvider'

export default class ReportProvider extends Component {

    state = {
        user: {},
        providers: [{}]
    }

    componentDidMount() {
        this.loadUser();
        this.loadProviders();
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
    loadProviders = async (e) => {

        try {
            const token = await localStorage.getItem("token")
            fetch('http://localhost:3000/listProvider', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(res => res.json())
                .then(data => { this.setState({ providers: data }) })
                .catch(err => { console.log(err) })

        } catch (err) {
            alert("Erro no Login");
            console.log(err)
        }
    }

    render() {
        console.log(this.state.user)
        console.log(this.state.providers)
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
                            <img className='card-logo' src='/images/provider-icon.png' alt='imagem de logo' />
                            <p className='page-identificator'>Relatório de Fornecedores</p>
                        </div>
                        <div className="users-card">
                            <p className='user'>Nome do Fornecedor</p>
                            <p className='user'>Empresa do Fornecedor</p>
                            <p className='user'>CNPJ da Empresa</p>
                            <p className='user'>Email da Empresa</p>
                        </div>
                        {this.state.providers.map(provider => (<ListProvider key={provider._id} provider={provider} />))}
                    </div>
                    <div className='footer'>
                        <p className='footer-text'>© Laura's Coffee</p>
                    </div>
                </div>
            </div >
        )
    }
}