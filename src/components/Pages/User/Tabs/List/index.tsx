import { LinearProgress, Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from 'material-ui';
import React, { PureComponent } from 'react';

interface IState {
  loading: boolean;
  page: number;
  pageSize: number;
  all: {}[];
  items: {}[];
}

export default class UserTabList extends PureComponent<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loading: true,
      page: 0,
      pageSize: 10,
      all: [],
      items: []
    };
  }

  paginate(page: number, pageSize: number, all: {}[]): void {
    this.setState({
      items: all.slice(10 * page, (10 * page) + pageSize),
      all,
      pageSize,
      loading: false,
      page
    });
  }

  render() {
    const { items, all, pageSize, page, loading } = this.state;

    return (
      <Paper>
        {loading && <LinearProgress color='secondary' />}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Titulo</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Dia</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(informative => null
              // <TablListItemeItem key={informative.id} informative={informative} />
            )}
          </TableBody>
        </Table>
        <TablePagination
          labelRowsPerPage='items por página'
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          component='div'
          count={all.length}
          rowsPerPage={pageSize}
          rowsPerPageOptions={[10, 25, 50]}
          page={page}
          onChangePage={(event, page) => this.paginate(page, pageSize, all)}
          onChangeRowsPerPage={(event) => this.paginate(page, Number(event.target.value), all)}
        />
      </Paper>
    );
  }
}