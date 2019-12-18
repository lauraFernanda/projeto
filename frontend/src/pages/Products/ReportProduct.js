import React, { Component } from 'react';

import ListProduct from './ListProducts'

export default class ReportProvider extends Component {

    state = {
        user: {},
        products: [{}]
    }

    componentDidMount() {
        this.loadUser();
        this.loadProducts();
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
    loadProducts = async (e) => {

        try {
            const token = await localStorage.getItem("token")
            fetch('http://localhost:3000/listProducts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(res => res.json())
                .then(data => { this.setState({ products: data }) })
                .catch(err => { console.log(err) })

        } catch (err) {
            alert("Erro no Login");
            console.log(err)
        }
    }

    render() {
        console.log(this.state.user)
        console.log(this.state.products)
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
                            <img className='card-logo' src='/images/products-ico.png' alt='imagem de logo' />
                            <p className='page-identificator'>Relatório de Produtos</p>
                        </div>
                        <div className="users-card">
                            <p className='user'>Código do Produto</p>
                            <p className='user'>Descrição do Produto</p>
                            <p className='user'>Valor Unitário</p>
                            <p className='user'>Tipo do Produto</p>
                        </div>
                        {this.state.products.map(product => (<ListProduct key={product._id} product={product} />))}
                    </div>
                    <div className='footer'>
                        <p className='footer-text'>© Laura's Coffee</p>
                    </div>
                </div>
            </div >
        )
    }
}