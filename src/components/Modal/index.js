import React from 'react'

const Modal = (props) => {

    // props quizOver
    // children => Props pour tout les element mits dans modal au niveau de quizOver on peut les avoir(= all)
    const { showModal, children, hideModal } = props

    if (showModal) {
        return (
        <div className='modalBackground' onClick={hideModal}>
            <div className='modalContainer'>
                {children}
            </div>
        </div>
        );
    }   
    
    return null; // Retourner null si showModal est faux
}

export default Modal