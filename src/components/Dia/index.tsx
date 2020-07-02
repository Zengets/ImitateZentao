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
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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
function PaperComponents(props: any) {
  return <Paper {...props} />;
}

export default function Dia({
  show,
  cshow,
  title,
  children,
  maxWidth,
  footer,
  onOk,
  fullScreen,
}: any) {
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={show}
        PaperComponent={fullScreen ? PaperComponents : PaperComponent}
        TransitionComponent={Transition}
        keepMounted
        maxWidth={maxWidth}
        fullWidth={true}
        onClose={() => cshow(false)}
        aria-labelledby="draggable-dialog-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div
          style={{ backgroundColor: fullScreen ? '#f0f0f0' : '#fff', flex: 1 }}
        >
          <DialogTitle id="draggable-dialog-title">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: 16,
              }}
            >
              {title}
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => cshow(false)}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent>{children}</DialogContent>
          {footer ? (
            footer
          ) : (
            <DialogActions>
              <Button onClick={() => cshow(false)} color="primary">
                取消
              </Button>
              <Button
                onClick={() => onOk()}
                color="primary"
                variant="contained"
                disableElevation
              >
                确定
              </Button>
            </DialogActions>
          )}
        </div>
      </Dialog>
    </div>
  );
}
