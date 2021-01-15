import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    textAlign: 'center',
    alignItems: 'center',
    height: '25em'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    '& div:first-of-type':{
      marginRight: 10
    }
  },
  logo: {
    width: 200
  },
  address: {
    fontSize: '9px',
    fontWeight: 'bold',
  },
  list: {
    textAlign: 'left',
    '& ol': {
      marginBlock: 0,
      paddingInlineEnd: 20
    }
  }
}));

export default useStyles;
