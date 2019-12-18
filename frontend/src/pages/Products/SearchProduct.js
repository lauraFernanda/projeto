import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SearchProduct extends Component {

    state = {
        user: {},
        productSearch: {},
        name: ""
    }

    componentDidMount() {
        this.loadUser();
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await localStorage.getItem("token")
            fetch('http://localhost:3000/indexProduct', {
                method: 'POST',
                body: JSON.stringify({
                    code: this.state.code
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(res => res.json())
                .then(data => { this.setState({ productSearch: data }) })
                .catch(err => { console.log(err) })
            alert("Produto Encontrado!")

        } catch (err) {
            alert("Produto não encontrado!");
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

    showResult = (product) => {
        return (
            <div className='information-search-user'>
                <div className='center'>
                    <div className='information-search'>
                        <p className='user-information'>Resultado</p>
                    </div>
                    <div className='informations-search'>
                        <div className='search-result'>
                            <img className='center-user-search space' src='/images/code-icon.png' alt='' />
                            <p className='s-space'>{product.code}</p>
                        </div>
                        <div className='search-result'>
                            <img className='center-user-search space' src='/images/description-icon.png' alt='' />
                            <p className='s-space'>{product.description}</p>
                        </div>
                    </div>
                    <Link to={'/userEdit'} className='delete-button'>
                        <img className='center-user-search' src='/images/delete-icon.png' alt='' />
                        <p>Excluir Produto</p>
                    </Link>
                </div>
            </div>
        )
    }

    render() {
        this.showResult(this.state.productSearch)
        console.log(this.state.productSearch)
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
                                        <p className='user-information menos'>Buscar Produto</p>
                                    </div>
                                    <form className='form-newUser'>
                                        <input type='String'
                                            placeholder='Código para Busca'
                                            className="input-style search"
                                            value={this.state.code}
                                            onChange={e => this.setState({ code: e.target.value })} />
                                        <button type='submit'
                                            className='button-user button-search'
                                            onClick={this.handleSubmit}
                                        >Buscar</button>
                                    </form>
                                </div>
                                <div>
                                    {this.showResult(this.state.productSearch)}
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
                                <Link className='action' to={'/product'}>
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
                    <p className='footer-text'>© Laura's Coffee</p>
                </div>
            </div >
        )
    }
}