import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    '& a': {
      color: '#e78a64 !important',
      cursor: 'pointer',
      '&:hover': {
        color: '#00e79a !important'
      }
    },
    '& .MuiDialog-paper': {
      width: '35em',
      margin: 0
    },
  },
  title: {
    margin: 0,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: '#cacaca',
    '& :hover': {
      color: '#e78a64'
    }
  },
  content: {
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(5),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4)
  }
}));

export default useStyles;
