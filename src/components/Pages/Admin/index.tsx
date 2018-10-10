import AppWrapper from 'components/Layout/AppWrapper';
import { IAppRoute } from 'interfaces/route';
import CertificateIcon from 'mdi-react/CertificateIcon';
// import BullhornIcon from 'mdi-react/BullhornIcon';
import * as React from 'react';
import rxjsOperators from 'rxjs-operators';
import authService from 'services/auth';

import CertificateIndexPage from './Certificate';
import DashboardIndexPage from './Dashboard';
import UpsellIndexPage from './Upsell';

interface IState {
  routes: IAppRoute[];
}

export default class AdminModule extends React.PureComponent<{}, IState>  {
  static routes: IAppRoute[] = [
    {
      path: '/',
      // sideDrawer: { display: 'Dashboard', order: 0, icon: ViewDashboardIcon },
      exact: true,
      roles: [],
      component: DashboardIndexPage
    },
    {
      path: '/certificados',
      sideDrawer: { display: 'Certificados', order: 1, icon: CertificateIcon },
      roles: [],
      component: CertificateIndexPage
    },
    {
      path: '/upsell',
      // sideDrawer: { display: 'Upsell', order: 2, icon: BullhornIcon },
      roles: [],
      component: UpsellIndexPage,
    }
  ];

  constructor(props: {}) {
    super(props);
    this.state = { routes: [] };
  }

  componentDidMount() {
    authService.getUser().pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(user => {
      if (!user) {
        this.setState({ routes: [] });
        return;
      }

      this.setState({
        routes: AdminModule.routes.filter(route => user.canAccess(...route.roles))
      });
    });
  }

  render() {
    const { routes } = this.state;

    return (
      <AppWrapper routes={routes}>
        {this.props.children}
      </AppWrapper>
    );
  }
}
