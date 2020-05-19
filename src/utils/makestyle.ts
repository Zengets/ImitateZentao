import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    '& .MuiInputBase-root': {
      width: '100%',
    },
    '& .Mui-focused': {
      color: '#000',
    },
    '& .Mui-error': {
      color: '#ff5000',
    },
    '& .MuiOutlinedInput-root': {
      color: '#333',
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#666',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#333',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#333',
    },
  },
});

export default useStyles;
