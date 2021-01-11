import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '20em'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    height: '20em',
    '& p': {
      '& span': {
        color: '#999999',
        fontSize: 20
      }
    }
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    textAlign: 'center',
    alignItems: 'center',
  },
  copyright: {
    color: '#e78a64',
    fontWeight: 600
  },
  logo: {
    width: 225,
  },
  image: {
    float: 'left'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    '& div:first-of-type':{
      marginRight: 20
    }
  },
  list: {
    listStyle: 'none',
    float: 'right',
    textAlign: 'left',
    fontSize: 18,
    '& li': {
      border: '2px solid #cacaca',
      color: '#666666',
      padding: '10px 25px',
      cursor: 'pointer',
      borderRadius: 25,
      marginBottom: 10,
      '& img': {
        position: 'absolute',
        marginTop: -3,
        width: 25,
      },
      '& span': {
        marginLeft: 35
      },
      '&:hover': {
        borderColor: '#e78a64',
        transform: 'translateY(-1px)'
      }
    },
    '& li:nth-of-type(2)': {
      '& img': {
        marginTop: 1,
      },
    },
    '& li:nth-of-type(3)': {
      '& img': {
        marginTop: -2.5,
      },
    }
  }
}));

export default useStyles;
