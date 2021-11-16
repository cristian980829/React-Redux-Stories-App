import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Modal from 'react-modal';

import { uiCloseModal } from '../../actions/ui';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1,'hours');

const initStorie = {
    title: '',
    description: '',
    registrationDate: now.toDate(),
}

export const StorieModal = () => {

    const { modalOpen } = useSelector( state => state.ui );
    const { activeStorie } = useSelector( state => state.storie );
    const dispatch = useDispatch();

    const [ titleValid, setTitleValid ] = useState(true);
    
    const [formValues, setFormValues] = useState( initStorie );

    const { description, title } = formValues;

    useEffect(() => {
        if ( activeStorie ) {
            setFormValues( activeStorie );
        } else {
            setFormValues( initStorie );
        }
    }, [activeStorie, setFormValues])



    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }


    const closeModal = () => {
        dispatch( uiCloseModal() );
        //TODO: CLEAR ACTIVE STORIE
        setFormValues( initStorie );
    }
    

    const handleSubmitForm = (e) => {
        e.preventDefault();

        if ( title.trim().length < 2 ) {
            return setTitleValid(false);
        }

        console.log(formValues);

        //add or update storie

        setTitleValid(true);
        closeModal();
        
    }

    return (
        <Modal
          isOpen={ modalOpen }
          onRequestClose={ closeModal }
          style={ customStyles }
          closeTimeoutMS={ 200 }
          className="modal"
          overlayClassName="modal-fondo"
        >
            <h1> { (activeStorie)? 'Edita history': 'New history' } </h1>
            <hr />
            <form 
                className="container"
                onSubmit={ handleSubmitForm }
            >

                <hr />
                <div className="form-group">
                    <input 
                        type="text" 
                        className={ `form-control ${ !titleValid && 'is-invalid' } `}
                        placeholder="Title"
                        name="title"
                        autoComplete="off"
                        value={ title }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Description"
                        rows="5"
                        name="notes"
                        value={ description }
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <span> Save</span>
                </button>

            </form>

        </Modal>
    )
}
