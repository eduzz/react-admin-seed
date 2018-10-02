import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { Overrides } from '@material-ui/core/styles/overrides';

const defaultTheme = createMuiTheme();

const overrides: Overrides = {
  MuiButton: {
    root: {
      borderRadius: 30,
      paddingLeft: 20,
      paddingRight: 20
    },
    sizeSmall: {
      paddingLeft: 15,
      paddingRight: 15
    }
  },
  MuiFormLabel: {
    root: {
      transform: 'none !important',
      fontSize: 12,
    },
  },
  MuiInput: {
    root: {
      borderRadius: 4,
      backgroundColor: defaultTheme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 14,
      padding: '7px 10px',
      transition: defaultTheme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
      '&:before': {
        display: 'none'
      }
    },
    inputMultiline: {
      height: 100
    }
  },
  MuiTablePagination: {
    input: {
      padding: 0,
      marginLeft: 7,
      marginRight: 32
    },
    selectRoot: {
      marginLeft: 0,
      marginRight: 0
    },
    select: {
      paddingRight: 20
    }
  },
  MuiExpansionPanel: {
    expanded: {
      marginTop: 0,
      marginBottom: 0
    }
  },
  MuiExpansionPanelDetails: {
    root: {
      display: 'block'
    }
  }
};

export default overrides;