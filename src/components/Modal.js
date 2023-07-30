import React from 'react'
import { useDispatch } from 'react-redux'
import { closeModal } from '../redux/features/modal/modalSlice';
import { clearCart } from '../redux/features/cart/cartSlice';

const Modal = () => {
  const dispatch = useDispatch();
  return (
    <aside className='modal-container'>
        <div className="modal">
            <h4>Remove all items frm your shopping cart?</h4>
            <div className="btn-container">
                <button className="btn confirm-btn" type='button' onClick={()=>{
                  dispatch(clearCart());
                  dispatch(closeModal())
                  }
                }>Confirm</button>
                <button className="btn clear-btn" type='button' onClick={()=>{
                  dispatch(closeModal())
                  }
                }>Cancel</button>
            </div>
        </div>
    </aside>
  )
}

export default Modal