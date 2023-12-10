import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { THEME_COLOR } from "../../helpers/colors";
import Warning from "./Warning";
import CFWButton from "../form/CFWButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: "16px 24px",
  outline: "none",
  borderRadius: "1rem",
  position: "relative",
};

const DeleteConfirmation = ({ open, setOpen, setConfirm, title }) => {
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    setConfirm(true);
    handleClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style} className='modal__box'>
        <div className='modal__box__nav'>
          <h3></h3>
          <i
            className='fa-solid fa-x'
            style={{ color: THEME_COLOR, cursor: "pointer" }}
            onClick={handleClose}
          ></i>
        </div>
        <div className='modal__box__nav__text'>
          <h3>Delete Flight?</h3>
          <span>Are you sure you want to delete "{title}"?</span>
        </div>
        <Warning title={title} />
        <CFWButton
          title='Confirm'
          style={{ marginTop: "1rem", background: "#E12D39" }}
          onClick={handleDelete}
        />
      </Box>
    </Modal>
  );
};

export default DeleteConfirmation;
