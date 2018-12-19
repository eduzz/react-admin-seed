import React, { PureComponent, SyntheticEvent } from 'react';
import { WithStyles } from 'decorators/withStyles';
import Grid from '@material-ui/core/Grid';
import { IUpsellProduct } from 'interfaces/models/upsell';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { UpsellFormContext, IUpsellFormContext } from '../../../Context';
import Loading from 'components/Shared/Loading';

const nutrorLogo = require('assets/svg/nutror-logo.svg');

interface IProps {
  classes?: any;
  product: IUpsellProduct;
}

interface IState {
  product: IUpsellProduct;
}

@WithStyles(theme => ({
  root: {
    border: '1px solid',
    borderColor: theme.variables.contentBorderColor,
    borderRadius: 4,
    padding: theme.spacing.unit,
    margin: 0,
    width: '100%',
  },
  avatar: {
    width: 73,
    height: 73,
    borderRadius: 2,
  },
  price: {
    color: theme.palette.secondary.light,
  },
  button: {
    transition: 'all 0.3s ease',
    backgroundColor: '#596375',
    color: '#fff',
    paddingLeft: theme.spacing.unit * 5,
    paddingRight: theme.spacing.unit * 5,
    '&:hover': {
      backgroundColor: '#596375',
      opacity: 0.7,
    },
  },
}))
export default class Product extends PureComponent<IProps, IState> {
  static contextType = UpsellFormContext;
  public context: IUpsellFormContext;

  constructor(props: IProps) {
    super(props);

    this.state = {
      product: {
        ...props.product,
        title: '',
        image: '',
      },
    };
  }

  static getDerivedStateFromProps(props: IProps, state: IState) {
    if (props.product && props.product !== state.product)
      return { ...props };
    return null;
  }

  handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = nutrorLogo;
  }

  handleClick = () => {
    this.context.updateModel(model => model.content_id = null)();
  }

  render() {
    const { classes } = this.props;
    const { product } = this.state;

    return (
      <Grid container className={classes.root} alignItems='center' spacing={16}>
        <Grid item>
          <Grid container>
            {product.image ?
              <img
                alt=''
                className={classes.avatar}
                src={product.image}
                // src={CDN_URL + upsell.small_image}
                onError={this.handleImageError}
                height={44}
              />
              :
              <Loading />
            }
          </Grid>
        </Grid>
        <Grid item xs={true}>
          <Typography variant='subtitle1'>{product.title}</Typography>
          {/* <Typography variant='subtitle1' noWrap className={classes.price}>R$ {product.price}</Typography> */}
        </Grid>
        <Grid item xs={false}>
          <Button variant='contained' className={classes.button} onClick={this.handleClick}>
            Redefinir produto
          </Button>
        </Grid>
      </Grid>
    );
  }
}