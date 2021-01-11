import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 250,
  },
  image: {
    float: 'left'
  },
  list: {
    listStyle: 'none',
    float: 'right',
    '& li': {
      border: '2px solid #cacaca',
      padding: '7.5px 15px',
      cursor: 'pointer',
      borderRadius: 25,
      marginBottom: 5,
      '& img': {
        position: 'absolute',
        marginTop: -5,
        width: 25,
      },
      '& span': {
        marginLeft: 35
      },
      '&:hover': {
        borderColor: 'orange',
        transform: 'translateY(-.5px)'
      }
    },
    '& li:nth-of-type(2)': {
      '& img': {
        marginTop: 1,
      },
    }
  }
}));

export default useStyles;
