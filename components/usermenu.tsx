import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import * as css from '../styles/app.scss';

const GET_CURRENTUSER = gql`
    {
        currentUser {
            _id
            username
        }
    }
`;

const UserMenu = () => {
    const { loading, error, data } = useQuery(GET_CURRENTUSER);
    if(typeof error !== 'undefined') {
        console.log("alds");
        console.log(error.message);
    }
    if (loading) return <div className={css.usermenu}>Loading...</div>;
    if (error) return <div className={css.usermenu}>`Error! ${error.message}`</div>;

    return (
        <div className={css.usermenu}></div>
    );
}

export default UserMenu