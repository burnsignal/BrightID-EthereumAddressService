import React from 'react'

import { styled, useTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const Restyled = styled(Button)({
  border: '2px solid #cacaca',
  borderRadius: 5,
  padding: '.5em 2.25em',
  color: 'black !important',
  '&:hover': {
    borderColor: '#e78a64',
    outlineColor: '#e78a64'
  },
  '& :active': {
    borderColor: '#e78a64',
    outlineColor: '#e78a64'
  },
  '& :focus': {
    borderColor: '#e78a64',
    outlineColor: '#e78a64'
   }
});

export default Restyled;
