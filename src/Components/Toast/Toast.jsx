import React from 'react';
import Snackbar from 'material-ui/Snackbar';

const Toast = (props) => {
  return (
    <Snackbar
      open={props.toastOpen}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      onClose={props.onToastClose}
      autoHideDuration={3000}
      SnackbarContentProps={{
        'aria-describedby': 'message-id'
      }}
      message={<span id="message-id">{props.message}</span>}
    />
  );
};
export default Toast;