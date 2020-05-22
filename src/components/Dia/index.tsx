import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PaperComponent(props: any) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function Dia({ show, cshow, title, children, maxWidth }: any) {
  return (
    <div>
      <Dialog
        open={show}
        PaperComponent={PaperComponent}
        TransitionComponent={Transition}
        keepMounted
        maxWidth={maxWidth}
        fullWidth={true}
        onClose={() => cshow(false)}
        aria-labelledby="draggable-dialog-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="draggable-dialog-title">{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={() => cshow(false)} color="primary">
            取消
          </Button>
          <Button
            onClick={() => cshow(false)}
            color="primary"
            variant="contained"
            disableElevation
          >
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}