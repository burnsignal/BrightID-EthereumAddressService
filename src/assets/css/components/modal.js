import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    '& a': {
      color: 'orange !important',
      cursor: 'pointer',
      '&:hover': {
        color: '#00e79a !important'
      }
    },
    '& .MuiDialog-paper': {
      margin: 0
    }
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default useStyles;
