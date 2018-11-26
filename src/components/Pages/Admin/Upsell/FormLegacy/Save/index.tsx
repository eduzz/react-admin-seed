import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ContentSaveIcon from 'mdi-react/ContentSaveIcon';
import Hidden from '@material-ui/core/Hidden';
import { IUpsell } from 'interfaces/models/upsell';
import { WithStyles } from 'decorators/withStyles';

interface IProps {
  updateModel?: (handler: (model: Partial<IUpsell>, value: any) => void) => (value: any) => void;
  label: string;
  classes?: any;
}

@WithStyles({
  button: {
    backgroundColor: '#9e9e9e',
  },
})
export default class Save extends PureComponent<IProps> {
  render() {
    const { classes, updateModel } = this.props;

    return (
      <Grid container spacing={16} justify='flex-end'>
        <Grid item xs={false}>
          <Button className={classes.button} type='submit' color='primary' variant='contained'>
            <ContentSaveIcon />
            <Hidden implementation='css' xsDown>Salvar</Hidden>
          </Button>
        </Grid>
        <Grid item xs={false}>
          <Button type='submit' color='secondary' variant='contained' onClick={updateModel(m => m.published = true)}>
            <ContentSaveIcon />
            <Hidden implementation='css' xsDown>Salvar e Publicar</Hidden>
          </Button>
        </Grid>
      </Grid>
    );
  }
}