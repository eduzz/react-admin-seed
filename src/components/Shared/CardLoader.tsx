import { makeStyles } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import React, { memo } from 'react';

const useStyle = makeStyles({
  container: {
    height: 5
  }
});

const CardLoader = memo((props: { show: boolean }) => {
  const classes = useStyle(props);
  return <div className={classes.container}>{props.show && <LinearProgress color='secondary' />}</div>;
});

export default CardLoader;
