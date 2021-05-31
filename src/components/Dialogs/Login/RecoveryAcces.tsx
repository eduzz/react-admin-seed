import { memo, MouseEvent } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

import { tap } from 'rxjs/operators';

import useForm from '@eduzz/houston-forms/useForm';
import Form from '@eduzz/houston-ui/Forms/Form';
import TextField from '@eduzz/houston-ui/Forms/Text';

import Toast from 'components/Shared/Toast';
import errorToast from 'helpers/rxjs-operators/errorToast';
import authService from 'services/auth';

interface IProps {
  onCancel: (e: MouseEvent<HTMLElement>) => void;
  onComplete: () => void;
}

const useStyle = makeStyles({
  buttons: {
    justifyContent: 'space-between'
  }
});

const LoginDialogRecoveryAccess = memo((props: IProps) => {
  const classes = useStyle(props);

  const form = useForm({
    initialValues: { email: '' },
    validationSchema: yup =>
      yup.object().shape({
        email: yup.string().required().email()
      }),
    onSubmit(model) {
      return authService.sendResetPassword(model.email).pipe(
        tap(() => {
          Toast.show('Foi enviado um link para seu email para podermos recuperar seu acesso.');
          props.onComplete();
          form.reset();
        }),
        errorToast()
      );
    }
  });

  return (
    <Form context={form}>
      <Card>
        <CardContent>
          <Typography gutterBottom>Iremos lhe enviar um email para recuperar seu acesso</Typography>

          <TextField label='Email' type='email' name='email' margin='none' />
        </CardContent>

        <CardActions className={classes.buttons}>
          <Button disabled={form.isSubmitting} size='small' onClick={props.onCancel}>
            Voltar
          </Button>
          <Button disabled={form.isSubmitting} color='primary' type='submit'>
            Enviar
          </Button>
        </CardActions>

        {form.isSubmitting && <LinearProgress color='primary' />}
      </Card>
    </Form>
  );
});

export default LoginDialogRecoveryAccess;
