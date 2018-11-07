import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import AppRouter, { RouterContext } from 'components/Router';
import Confirm from 'components/Shared/Confirm';
import DropdownMenu from 'components/Shared/DropdownMenu';
import Toast from 'components/Shared/Toast';
import { WithStyles } from 'decorators/withStyles';
import { dateFormat } from 'formatters/date';
import { IBanner } from 'interfaces/models/banner';
import BullhornIcon from 'mdi-react/BullhornIcon';
import SquareEditOutlineIcon from 'mdi-react/SquareEditOutlineIcon';
import TrashCanIcon from 'mdi-react/TrashCanIcon';
import React, { PureComponent } from 'react';
import rxjsOperators from 'rxjs-operators';
import bannerService from 'services/banner';

interface IProps {
  classes?: any;
  banner: IBanner;
  router?: AppRouter;
  onDelete?: any;
}

@WithStyles({
  root: {
    borderTop: 'solid 1px #d5d5d5',
  }
})
class BannerItem extends PureComponent<IProps> {
  actions = [{
    text: 'Editar',
    icon: SquareEditOutlineIcon,
    handler: () => this.props.router.navigate(`/banner/${this.props.banner.id}/editar`),
  }, {
    text: 'Excluir',
    icon: TrashCanIcon,
    handler: () => this.handleDelete(),
  }];

  handleDelete = async () => {
    const { banner, onDelete } = this.props;

    const confirm = await Confirm.show(`Deseja excluir o certificado ${banner.title}?`);
    if (!confirm) return;

    bannerService.delete(banner.id).pipe(
      rxjsOperators.loader(),
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(() => {
      Toast.show('Certificado excluído com sucesso');

      onDelete && onDelete(banner.id);
    }, (err: any) => Toast.error(err));
  }

  render() {
    const { banner, classes } = this.props;

    return (
      <ListItem className={classes.root}>
        <Grid container spacing={16} alignItems='center'>
          <Grid item xs={false}>
            <BullhornIcon />
          </Grid>

          <Grid item xs={true}>
            <Typography variant='subtitle1'>{banner.title}</Typography>
          </Grid>

          <Grid item xs={false}>
            <Typography variant='caption'>Criado em</Typography>
            <Typography variant='caption'>{dateFormat(banner.created_at, 'dd/MM/yyyy')}</Typography>
          </Grid>

          <Grid item xs={false}>
            <DropdownMenu options={this.actions} />
          </Grid>
        </Grid>
      </ListItem>
    );
  }
}

export default React.forwardRef((props: IProps, ref: any) => (
  <RouterContext.Consumer>
    {router => <BannerItem {...props} {...ref} router={router} />}
  </RouterContext.Consumer>
));