import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Toolbar from 'components/Layout/Toolbar';
import AppRouter, { RouterContext } from 'components/Router';
import ErrorMessage from 'components/Shared/ErrorMessage';
import { WithStyles } from 'decorators/withStyles';
import { IUpsellList } from 'interfaces/models/upsell';
import React, { Fragment, PureComponent } from 'react';
import rxjsOperators from 'rxjs-operators';
import upsellService from 'services/upsell';
import UpsellItem from './ListItem';
import FileDocumentIcon from 'mdi-react/FileDocumentIcon';
import Button from '@material-ui/core/Button';

interface IState {
  error?: any;
  upsells?: IUpsellList[];
  orderBy: string;
  orderDirection: 'asc' | 'desc';
}

interface IProps {
  classes?: any;
  router?: AppRouter;
}

@WithStyles(theme => ({
  loader: {
    textAlign: 'center',
  },
  icon: {
    fill: theme.palette.text.primary,
  },
  newOfferButton: {
    paddingLeft: theme.spacing.unit * 6,
    paddingRight: theme.spacing.unit * 6,
  },
  messageContainer: {
    paddingTop: theme.spacing.unit * 6,
  },
  messageTitle: {
    maxWidth: 400,
  },
  messageDescription: {
    maxWidth: 300,
  },
  messageButton: {
    marginTop: theme.spacing.unit,
  },
}))
class UpsellListPage extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      orderBy: 'title',
      orderDirection: 'asc'
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({ error: null, upsells: null });
    const { orderBy, orderDirection } = this.state;

    upsellService.list(orderBy, orderDirection).pipe(
      rxjsOperators.delay(1000),
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
    ).subscribe((upsells: any) => {
      this.setState({ upsells });
    }, (error: any) => this.setState({ error }));
  }

  handleChangeOrderBy = (orderBy: string) => {
    this.setState({ orderBy }, () => this.loadData());
  }

  toggleOrderDirection = () => {
    this.setState({ orderDirection: this.state.orderDirection === 'asc' ? 'desc' : 'asc' }, () => this.loadData());
  }

  handleDelete = (id: number | string) => {
    this.setState(state => ({
      upsells: state.upsells.filter((upsell: any) => upsell.id !== id),
    }));
  }

  handleNew = () => this.props.router.navigate('/upsell/novo');

  render() {
    const { classes } = this.props;
    const { upsells, error } = this.state;

    return (
      <Fragment>
        <Toolbar>
          <Grid container spacing={8} alignItems='center'>
            <Grid item>
              <FileDocumentIcon className={classes.icon} />
            </Grid>
            <Grid item>
              <Typography variant='h6'>Minhas Ofertas</Typography>
            </Grid>
          </Grid>
        </Toolbar>

        <Card>
          <CardContent>
            <Grid container alignItems='center'>
              <Grid item xs={true}>
                <Typography variant='subtitle2'>
                  Lista de Ofertas
                </Typography>
                <Typography variant='caption'>
                  Selecione um produto para ofertar
                </Typography>
              </Grid>

              <Grid item xs={false}>
                <Button variant='contained' size='small' color='secondary' className={classes.newOfferButton} onClick={this.handleNew}>
                  Nova Oferta
                </Button>
              </Grid>

            </Grid>
          </CardContent>

          {!error && !upsells &&
            <CardContent className={classes.loader}>
              <CircularProgress color='secondary' />
            </CardContent>
          }

          {!!error &&
            <CardContent>
              <ErrorMessage error={error} tryAgain={this.loadData} />
            </CardContent>
          }

          {!!upsells &&
            <CardContent>
              <List disablePadding>
                {upsells.map(upsell => (
                  <UpsellItem
                    key={upsell.id}
                    upsell={upsell}
                    onDelete={this.handleDelete}
                  />
                ))}
              </List>
            </CardContent>
          }

          {!!upsells && !upsells.length &&
            <CardContent className={classes.messageContainer}>
              <Grid container spacing={8} alignItems='center' direction='column'>
                <Grid item>
                  <Typography variant='h4' align='center' gutterBottom className={classes.messageTitle}>
                    Seja muito bem vindo às ofertas do Nutror
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='caption' align='center' className={classes.messageDescription}>
                    As ofertas do Nutror são ótimas decisões que impulsionam suas vendas!
                    Crie, edite, teste e acompanhe os resultados das suas ofertas
                  </Typography>
                </Grid>
                <Grid item>
                  <Button variant='contained' size='small' color='secondary' onClick={this.handleNew} className={classes.messageButton}>
                    Quero vender mais!
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          }

          {!!upsells && upsells.length && upsells.length < 3 &&
            <CardContent className={classes.messageContainer}>
              <Grid container spacing={8} alignItems='center' direction='column'>
                <Grid item>
                  <Typography variant='h4' align='center' gutterBottom>
                    Você Sabia?
                </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='subtitle2' align='center'>
                    Publicando mais ofertas seus ganhos aumentam!
                </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='caption' align='center' className={classes.messageDescription}>
                    Experimente pubicar mais ofertas na sua área de membros,
                    nossa plataforma está otimizada para mostrar as melhores ofertas que você publicar.
                </Typography>
                </Grid>
                <Grid item>
                  <Button variant='contained' size='small' color='secondary' onClick={this.handleNew} className={classes.messageButton}>
                    Publicar mais ofertas
                </Button>
                </Grid>
              </Grid>
            </CardContent>
          }
        </Card>
      </Fragment>
    );
  }
}

export default React.forwardRef((props: IProps, ref: any) => (
  <RouterContext.Consumer>
    {router => <UpsellListPage {...props} {...ref} router={router} />}
  </RouterContext.Consumer>
));