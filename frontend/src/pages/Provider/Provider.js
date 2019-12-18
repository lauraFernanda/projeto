import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Provider extends Component {

    state = {
        user: {},
        name: "",
        agency: "",
        cnpj: "",
        address: "",
        phone: "",
        email: ""
    }

    componentDidMount() {
        this.loadUser();
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (this.state.name === "" ||
                this.state.agency === "" ||
                this.state.cnpj === "" ||
                this.state.address === "" ||
                this.state.phone === ""||
                this.state.email === "") {
                return alert("Há campos obrigatórios em branco!")
            }

            const token = await localStorage.getItem("token")
            fetch('http://localhost:3000/provider', {
                method: 'POST',
                body: JSON.stringify({
                    name: this.state.name,
                    agency: this.state.agency,
                    cnpj: this.state.cnpj,
                    address: this.state.address,
                    phone: this.state.phone,
                    email: this.state.email
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(res => res.json())
                .then(data => { console.log(data) })
                .catch(err => { console.log(err) })
            alert("Fornecedor Cadastrado com Sucesso!")

        } catch (err) {
            alert("Erro ao Criar Fornecedor, Tente Novamente!");
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
                                        <p className='user-information'>Novo Fornecedor</p>
                                    </div>
                                    <form className='form-newUser'>
                                        <input type='String'
                                            placeholder='Nome do Fornecedor'
                                            className="input-style product"
                                            value={this.state.name}
                                            onChange={e => this.setState({ name: e.target.value })} />
                                        <input type='String'
                                            placeholder='Empresa'
                                            className="input-style product"
                                            value={this.state.agency}
                                            onChange={e => this.setState({ agency: e.target.value })} />
                                        <input type='String'
                                            placeholder='CNPJ'
                                            className="input-style product"
                                            value={this.state.cnpj}
                                            onChange={e => this.setState({ cnpj: e.target.value })} />
                                        <input type='String'
                                            placeholder='Endereço'
                                            className="input-style product"
                                            value={this.state.address}
                                            onChange={e => this.setState({ address: e.target.value })} />
                                        <input type='String'
                                            placeholder='Telefone'
                                            className="input-style product"
                                            value={this.state.phone}
                                            onChange={e => this.setState({ phone: e.target.value })} />
                                        <input type='email'
                                            placeholder='Email'
                                            className="input-style product"
                                            value={this.state.email}
                                            onChange={e => this.setState({ email: e.target.value })} />
                                        <button type='submit'
                                            className='button-user'
                                            onClick={this.handleSubmit}>
                                            Cadastrar
                                        </button>
                                    </form>
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
                                    Fornecedor
                                </p>
                            </div>
                            <div className='user-actions'>
                                <Link className='action'>
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