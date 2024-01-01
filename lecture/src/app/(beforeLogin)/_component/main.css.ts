import {globalStyle, style} from '@vanilla-extract/css';
import { global } from '../../globalTheme.css';
export const container = style({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: global.background.color,
  width: '100dvw',
  height: '100dvh',
  padding: 36,
  '@media': {
    '(min-width: 1000px)': {
      flexDirection: 'row',
      padding: 0,
    },
  }
})

export const left = style({
  display: 'flex',
  alignItems: 'center',
  '@media': {
    '(min-width: 1000px)': {
      flex: 1,
      justifyContent: 'center',
    }
  }
});

globalStyle(`${left} img`, {
  width: 55,
  height: 65,
  '@media': {
    '(min-width: 1000px)': {
      width: 450,
      height: 550,
    }
  },
})

export const right = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  '@media': {
    '(min-width: 1000px)': {
      justifyContent: 'center',
    }
  },
})

globalStyle(`${right} > h1`, {
  fontWeight: 'bold',
  fontSize: 40,
  margin: '48px 0',
  '@media': {
    '(min-width: 1000px)': {
      fontSize: 64,
    }
  },
})

globalStyle(`${right} > h2`, {
  fontWeight: 'bold',
  fontSize: 31,
  marginBottom: 32,
})

globalStyle(`${right} > h3`, {
  fontWeight: 'bold',
  fontSize: 17,
  marginBottom: 20,
  marginTop: 40,
})

export const signup = style({
  width: 300,
  height: 40,
  borderRadius: 20,
  padding: '0 16px',
  fontSize: 15,
  backgroundColor: 'rgb(29, 155, 240)',
  color: 'white',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ':hover': {
    backgroundColor: 'rgb(26, 140, 216)',
  }
});

export const login = style({
  width: 300,
  height: 40,
  borderRadius: 20,
  padding: '0 16px',
  fontSize: 15,
  color: 'rgb(29, 155, 240)',
  border: '1px solid rgb(207, 217, 222)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ':hover': {
    backgroundColor: 'rgba(29,155,240,0.1)',
  }
});
