import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import { types } from '../types/types';
import Swal from 'sweetalert2';

export const startLogin = ( email, password ) => {
    return async( dispatch ) => {
        
        const resp = await fetchSinToken( 'auth', { email, password }, 'POST' );
        const body = await resp.json();
        console.log(email, password)

        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                name: body.name,
                email: body.email,
                urlimage: body.urlimage,
                rol: body.rol
            }) )
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startRegister = ( email, password, name, urlimage = 'https://res.cloudinary.com/dcsutpqkl/image/upload/v1637004026/User_uyabac.png' ) => {
    return async( dispatch ) => {

        const resp = await fetchSinToken( 'auth/new', { email, password, name, urlimage }, 'POST' );
        const body = await resp.json();

        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                name: body.name,
                email: body.email,
                urlimage: body.urlimage,
                rol: body.rol
            }) )
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startChecking = () => {
    return async(dispatch) => {
        
        const resp = await fetchConToken( 'auth/renew' );
        const body = await resp.json();
        
        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( login({
                uid: body.uid,
                name: body.name,
                email: body.email,
                urlimage: body.urlimage,
                rol: body.rol
            }) )
        } else {
            dispatch( checkingFinish() );
        }
    }
}

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});

const checkingFinish = () => ({ type: types.authCheckingFinish });