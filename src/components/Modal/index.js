import React from "react";

const Modal = (props) => {
  const { showModal, children } = props;

  if (showModal) {
    return (
      <div className="modalBackground">
        <div className="modalContainer">{children}</div>
      </div>
    );
  }

  return null;
};

export default Modal;
