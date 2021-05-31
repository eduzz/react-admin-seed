import { forwardRef, memo, useMemo } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import makeStyles from '@material-ui/core/styles/makeStyles';

import useObservable from '@eduzz/houston-hooks/useObservable';

import loaderService from 'services/loader';

const useStyle = makeStyles(theme => ({
  loader: {
    width: 70,
    height: 70,
    color: theme.palette.secondary.light
  },
  paper: {
    boxShadow: 'none',
    outline: 'none',
    backgroundColor: 'transparent'
  }
}));

const Loader = memo((props: Record<string, never>) => {
  const classes = useStyle(props);
  const [visible] = useObservable(() => loaderService.shouldShow(), []);

  const paperProps = useMemo(() => ({ className: classes.paper }), [classes.paper]);

  return (
    <Dialog open={visible || false} TransitionComponent={Transition} PaperProps={paperProps}>
      <CircularProgress className={classes.loader} size='large' color='inherit' />
    </Dialog>
  );
});

const Transition = memo(
  forwardRef((props: any, ref: any) => {
    return <Slide direction='up' {...props} ref={ref} />;
  })
);

export default Loader;
