import React from 'react'

import { styled, useTheme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const Restyled = styled(TextField)({
  borderWidth: 2,
  '& input:valid + fieldset': {
    borderWidth: 2,
  },
  '& input:valid:focus + fieldset': {
    borderWidth: 2,
    borderColor: '#e78a64'
  },
  '& input:valid:active + fieldset': {
    borderColor: '#e78a64',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderWidth: 2,
  },
  '& .MuiOutlinedInput-root.Mui-error': {
     '&  .MuiOutlinedInput-notchedOutline': {
       borderWidth: 2,
       borderColor: 'red'
     }
  },
  '& .MuiOutlinedInput-root.Mui-focused': {
     '&  .MuiOutlinedInput-notchedOutline': {
       borderWidth: 2,
       borderColor: '#e78a64'
     }
  }
});

export default Restyled;
