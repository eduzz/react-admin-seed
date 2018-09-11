import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ValidationContext } from '@react-form-fields/material-ui';
import FieldText from '@react-form-fields/material-ui/components/Text';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import Snackbar from 'components/Shared/Snackbar';
import { WithStyles } from 'decorators/withStyles';
import React, { FormEvent, MouseEvent } from 'react';
import rxjsOperators from 'rxjs-operators';
import authService from 'services/auth';

interface IState extends IStateForm<{
  username: string;
  password: string;
}> {
  opened: boolean;
  loading: boolean;
}

interface IProps {
  classes?: any;
  onRecoveryAccess: (e: MouseEvent<HTMLElement>) => void;
}

@WithStyles(theme => ({
  buttons: {
    justifyContent: 'space-between'
  }
}))
export default class LoginDialogForm extends FormComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { ...this.state, opened: false, loading: false };
  }

  onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { model, loading } = this.state;

    if (loading) return;

    const isValid = await this.isFormValid();
    if (!isValid) return;

    this.setState({ loading: true });

    authService.login(model.username, model.password).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(() => {
      this.setState({ loading: false });
      this.resetForm();
    }, err => {
      Snackbar.error(err);
      this.setState({ loading: false });
    });
  }

  render() {
    const { model, loading } = this.state;
    const { classes, onRecoveryAccess } = this.props;

    return (
      <form onSubmit={this.onSubmit} noValidate>
        <ValidationContext ref={this.bindValidationContext}>

          <CardContent>

            <FieldText
              label='Email'
              type='email'
              disabled={loading}
              value={model.username}
              validation='required|email'
              onChange={this.updateModel((model, v) => model.username = v)}
              margin='dense'
            />

            <FieldText
              label='Senha'
              type='password'
              disabled={loading}
              value={model.password}
              validation='required'
              onChange={this.updateModel((model, v) => model.password = v)}
            />

          </CardContent>

          <CardActions className={classes.buttons}>
            <Button disabled={loading} size='small' onClick={onRecoveryAccess}>Recuperar Acesso</Button>
            <Button variant='raised' color='secondary' type='submit'>
              {!loading && 'Entrar'}
              {loading && <CircularProgress color='inherit' size={20} />}
            </Button>
          </CardActions>

        </ValidationContext>
      </form>
    );
  }
}