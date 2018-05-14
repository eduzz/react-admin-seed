import { Card, CardContent, Typography } from '@material-ui/core';
import Alert from 'components/Alert';
import Toolbar from 'components/Toolbar';
import { IAppRoute } from 'interfaces/route';
import React, { Fragment, PureComponent } from 'react';

export default class DashboardIndexPage extends PureComponent {
  public static routes: IAppRoute[] = [];

  componentDidMount() {
    Alert.show('óola');
  }

  render() {
    return (
      <Fragment>
        <Toolbar title='Dashboard' />

        <Card>
          <CardContent>
            <Typography>Content</Typography>
          </CardContent>
        </Card>
      </Fragment>
    );
  }
}