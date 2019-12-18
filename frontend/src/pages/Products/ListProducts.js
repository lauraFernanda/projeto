import React, { Component } from 'react';

export default class ListProduct extends Component {

    render() {
        const { product } = this.props;
        console.log(product)
        return (
            <div className="users-card">
                <p className='user'>
                    {product.code}
                </p>
                <p className='user'>
                    {product.description}
                </p>
                <p className='user'>
                    {product.uniqueValue}
                </p>
                <p className='user'>
                    {product.type}
                </p>
            </div>
        );
    }
}