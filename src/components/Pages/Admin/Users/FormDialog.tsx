import { forwardRef, memo, useCallback } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slide from '@material-ui/core/Slide';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { tap } from 'rxjs/operators';

import useForm from '@eduzz/houston-forms/useForm';
import Button from '@eduzz/houston-ui/Button';
import Form from '@eduzz/houston-ui/Forms/Form';
import TextField from '@eduzz/houston-ui/Forms/Text';

import Toast from 'components/Shared/Toast';
import errorToast from 'helpers/rxjs-operators/errorToast';
import IUser from 'interfaces/models/user';
import userService from 'services/user';

interface IProps {
  opened: boolean;
  user?: IUser;
  onComplete: (user: IUser) => void;
  onCancel: () => void;
}

const useStyle = makeStyles({
  content: {
    width: 600,
    maxWidth: 'calc(95vw - 50px)'
  },
  heading: {
    marginTop: 20,
    marginBottom: 10
  }
});

const FormDialog = memo((props: IProps) => {
  const classes = useStyle(props);

  const form = useForm<IUser>({
    validationSchema: yup =>
      yup.object().shape({
        firstName: yup.string().required().min(3).max(50),
        lastName: yup.string().required().min(3).max(50),
        email: yup.string().required().email().max(150),
        roles: yup.array().required().min(1)
      }),
    onSubmit(model) {
      return userService.save(model).pipe(
        tap(user => {
          Toast.show(`${user.firstName} foi salvo${model.id ? '' : ', um email foi enviado com a senha'}`);
          props.onComplete(user);
        }),
        errorToast()
      );
    }
  });

  const handleEnter = useCallback(() => {
    form.setValues(props.user ?? {}, false);
  }, [form, props.user]);

  const handleExit = useCallback(() => {
    form.reset();
  }, [form]);

  return (
    <Dialog
      open={props.opened}
      disableBackdropClick
      disableEscapeKeyDown
      onEnter={handleEnter}
      onExited={handleExit}
      TransitionComponent={Transition}
    >
      {form.isSubmitting && <LinearProgress color='primary' />}

      <Form context={form}>
        <DialogTitle>{form.values.id ? 'Editar' : 'Novo'} Usuário</DialogTitle>
        <DialogContent className={classes.content}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label='Nome' name='firstName' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label='Sobrenome' name='lastName' />
            </Grid>
          </Grid>

          <TextField label='Email' name='email' type='email' />
        </DialogContent>
        <DialogActions>
          <Button variant='text' onClick={props.onCancel}>
            Cancelar
          </Button>
          <Button type='submit' disabled={form.isSubmitting}>
            Salvar
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
});

const Transition = memo(
  forwardRef((props: any, ref: any) => {
    return <Slide direction='up' {...props} ref={ref} />;
  })
);

export default FormDialog;
