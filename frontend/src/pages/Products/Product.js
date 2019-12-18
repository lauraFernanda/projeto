import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Product extends Component {

    state = {
        user: {},
        type: "",
        description: "",
        uniqueValue: "",
        code: ""
    }

    componentDidMount() {
        this.loadUser();
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (this.state.description === "" ||
                this.state.uniqueValue === "" ||
                this.state.type === "" ||
                this.state.code === "") {
                return alert("Há campos obrigatórios em branco!")
            }

            const token = await localStorage.getItem("token")
            fetch('http://localhost:3000/product', {
                method: 'POST',
                body: JSON.stringify({
                    code: this.state.code,
                    description: this.state.description,
                    uniqueValue: this.state.uniqueValue,
                    type: this.state.type
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(res => res.json())
                .then(data => { console.log(data) })
                .catch(err => { console.log(err) })
            alert("Produto Cadastrado com Sucesso!")

        } catch (err) {
            alert("Erro ao Criar Produto, Tente Novamente!");
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
                                        <p className='user-information'>Novo Produto</p>
                                    </div>
                                    <form className='form-newUser'>
                                        <input type='String'
                                            placeholder='Código do Produto'
                                            className="input-style product"
                                            value={this.state.code}
                                            onChange={e => this.setState({ code: e.target.value })} />
                                        <input type='String'
                                            placeholder='Descrição do Produto'
                                            className="input-style product"
                                            value={this.state.description}
                                            onChange={e => this.setState({ description: e.target.value })} />
                                        <input type='String'
                                            placeholder='Valor Unitário'
                                            className="input-style product"
                                            value={this.state.uniqueValue}
                                            onChange={e => this.setState({ uniqueValue: e.target.value })} />
                                        <select className="input-style product-select"
                                            value={this.state.type}
                                            onChange={e => this.setState({ type: e.target.value })}>
                                            <option>Tipo de Produto</option>
                                            <option>Café</option>
                                            <option>Cappucino</option>
                                            <option>Doce</option>
                                            <option>Outros</option>
                                        </select>
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
                                <img className='logo-user' src='/images/products-ico.png' alt='' />
                                <p className='user-information'>
                                    <Link to={'/home'}>
                                        <img className='back' src='/images/back-icon.png' alt='' />
                                    </Link>
                                    Produtos
                                </p>
                            </div>
                            <div className='user-actions'>
                                <Link className='action'>
                                    <img className='user-action' src='/images/new-icon.png' alt='' />
                                    <p>Novo Produto</p>
                                </Link>
                                <Link className='action' to={"/searchProduct"}>
                                    <img className='user-action' src='/images/search-icon.png' alt='' />
                                    <p>Buscar Produto</p>
                                </Link>

                                <Link className='action' to={"/productReport"}>
                                    <img className='user-action' src='/images/reports-ico.png' alt='' />
                                    <p>Relatório de Produtos</p>
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