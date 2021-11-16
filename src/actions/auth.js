import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import { types } from '../types/types';
import Swal from 'sweetalert2';
import { storieLogout } from './storie';

export const startLogin = ( email, password ) => {
    return async( dispatch ) => {
        Swal.fire({
            text:'Wait...',
            showConfirmButton: false,
            allowOutsideClick: false
            });
        Swal.showLoading();
        
        try {
            const resp = await fetchSinToken( 'auth', { email, password }, 'POST' );
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
                Swal.close();
            } else {
                Swal.close();
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            Swal.close();
            Swal.fire('Error', 'There was an error connecting to the server', 'error');
        }
    }
}

export const startRegister = ( email, password, name, urlimage = 'https://res.cloudinary.com/dcsutpqkl/image/upload/v1637004026/User_uyabac.png' ) => {
    return async( dispatch ) => {
        Swal.fire({
            text:'Wait...',
            showConfirmButton: false,
            allowOutsideClick: false
            });
        Swal.showLoading();

        try {
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
                Swal.close();
            } else {
                Swal.close();
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            Swal.close();
            Swal.fire('Error', 'There was an error connecting to the server', 'error');
        }
    }
}

export const startChecking = () => {
    return async(dispatch) => {

        try {
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
        } catch (error) {
            Swal.close();
            dispatch( checkingFinish() );
            dispatch( setServerError() );
        }
    }
        
}

const setServerError = () => ({ type: types.authSetServerError });

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});

const checkingFinish = () => ({ type: types.authCheckingFinish });

export const startLogout = () => {
    return ( dispatch ) => {

        localStorage.clear();
        dispatch( storieLogout() );
        dispatch( logout() );
    }
}

const logout = () => ({ type: types.authLogout })