import React, { useState, useContext, useEffect } from 'react';

import {
   Dialog, DialogActions,DialogContent, DialogContentText, DialogTitle
 } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Clear';
import Typography from '@material-ui/core/Typography';

import useStyles from '../assets/css/components/modal'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modal({ active, children }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles()

  const handleClose = () => setOpen(false)

  function TitleDialog(props) {
    let { children, onClose, ...other } = props;

    return (
      <DialogTitle disableTypography className={classes.title} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }

  useEffect(() => {
    setOpen(active)
  }, [ , active ])

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      className={classes.root}
      keepMounted
    >
      <TitleDialog onClose={handleClose} />
      <DialogContent className={classes.content}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
