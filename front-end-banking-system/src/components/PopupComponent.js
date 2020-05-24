import React from 'react';
import Popup from "reactjs-popup";
import Utilities from '../Utilities'

function PopupComponent(props){
  return (
    <Popup modal trigger= {<button className="btn deleteBtn">{Utilities.deleteIcon()}{'  '}Delete</button>}>
        {close => (
          <div>
            <div class="modalmsg">
              If you click yes, all the customer records will be removed.
              Are you sure you want to delete the customer record ?
            </div>
            <div className="container modalbtncontainer">
              <button className="btn btn-warning modalbtn" onClick={() => props.deleteCustomerClicked(props.customer.id)}>Yes</button>
              <button className="btn btn-primary modalbtn" onClick={() => close()}>No</button>
            </div>
          </div>
        )}
    </Popup>
  );
}

export default PopupComponent;
