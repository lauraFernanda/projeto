import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SearchProvider extends Component {

    state = {
        user: {},
        providerSearch: {},
        name: ""
    }

    componentDidMount() {
        this.loadUser();
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await localStorage.getItem("token")
            fetch('http://localhost:3000/indexProvider', {
                method: 'POST',
                body: JSON.stringify({
                    name: this.state.name
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(res => res.json())
                .then(data => { this.setState({ providerSearch: data }) })
                .catch(err => { console.log(err) })
            alert("Fornecedor Encontrado!")
        } catch (err) {
            alert("Fornecedor não encontrado!");
            console.log(err)
        }
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
            alert("Erro na Busca");
            console.log(err)
        }
    }

    showResult = (provider) => {
        return (
            <div className='information-search-user'>
                <div className='center'>
                    <div className='information-search'>
                        <p className='user-information'>Resultado</p>
                    </div>
                    <div className='informations-search'>
                        <div className='search-result'>
                            <img className='center-user-search space' src='/images/agency-icon.png' alt='' />
                            <p className='s-space'>{provider.agency}</p>
                        </div>
                        <div className='search-result'>
                            <img className='center-user-search space' src='/images/provider-icon.png' alt='' />
                            <p className='s-space'>{provider.cnpj}</p>
                        </div>
                    </div>
                    <Link to={'/userEdit'} className='delete-button'>
                        <img className='center-user-search' src='/images/delete-icon.png' alt='' />
                        <p>Excluir Fornecedor</p>
                    </Link>
                </div>
            </div>
        )
    }

    render() {
        console.log(this.state.providerSearch)
        this.showResult(this.state.providerSearch)
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
                                        <img className='logo-user menor' src='/images/search-icon.png' alt='' />
                                        <p className='user-information menos'>Buscar Fornecedor</p>
                                    </div>
                                    <form className='form-newUser'>
                                        <input type='String'
                                            placeholder='Nome para Busca'
                                            className="input-style search"
                                            value={this.state.name}
                                            onChange={e => this.setState({ name: e.target.value })} />
                                        <button type='submit'
                                            className='button-user button-search'
                                            onClick={this.handleSubmit}
                                        >Buscar</button>
                                    </form>
                                </div>
                                <div>
                                    {this.showResult(this.state.providerSearch)}
                                </div>
                            </div>
                        </div>
                        <div className='div-actions-user'>
                            <div className='apresentation-user'>
                                <img className='logo-user' src='/images/provider-icon.png' alt='' />
                                <p className='user-information'>
                                    <Link to={'/home'}>
                                        <img className='back' src='/images/back-icon.png' alt='' />
                                    </Link>
                                    Fornecedores
                                </p>
                            </div>
                            <div className='user-actions'>
                                <Link className='action' to={'/provider'}>
                                    <img className='user-action' src='/images/new-icon.png' alt='' />
                                    <p>Novo Fornecedor</p>
                                </Link>
                                <Link className='action' to={"/searchProvider"}>
                                    <img className='user-action' src='/images/search-icon.png' alt='' />
                                    <p>Buscar Fornecedor</p>
                                </Link>

                                <Link className='action' to={"/providerReport"}>
                                    <img className='user-action' src='/images/reports-ico.png' alt='' />
                                    <p>Relatório de Fornecedores</p>
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