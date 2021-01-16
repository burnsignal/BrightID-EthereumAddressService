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
    height: '18em',
    '& p': {
      '& span': {
        color: '#999999',
        fontSize: 18
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
    color: 'rgba(231, 138,	100, 0.875)',
    position: 'absolute',
    marginTop: -20,
    fontWeight: 600
  },
  logo: {
    width: 225,
    marginTop: -10
  },
  image: {
    float: 'left'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    '& div:first-of-type':{
      marginRight: 20
    },
    paddingBottom: 10
  },
  list: {
    listStyle: 'none',
    float: 'right',
    textAlign: 'left',
    fontSize: 16,
    '& li': {
      border: '2px solid #cacaca',
      color: '#666666',
      padding: '10px 25px !important',
      marginBlock: 0,
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
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
