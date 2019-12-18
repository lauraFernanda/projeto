import React, { Component } from 'react';

export default class ListProvider extends Component {

    render() {
        const { provider } = this.props;
        console.log(provider)
        return (
            <div className="users-card">
                <p className='user'>
                    {provider.name}
                </p>
                <p className='user'>
                    {provider.agency}
                </p>
                <p className='user'>
                    {provider.cnpj}
                </p>
                <p className='user'>
                    {provider.email}
                </p>
            </div>
        );
    }
}