import React, { Component } from 'react';

export default class ListUser extends Component {

    render() {
        const { user } = this.props;
        console.log(user)
        return (
            <div className="users-card">
                <p className='user'>
                    {user.name}
                </p>
                <p className='user'>
                    {user.email}
                </p>
            </div>
        );
    }
}