import React, { PureComponent, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { FieldText } from '@react-form-fields/material-ui';
import { IForm } from '..';
import { WithStyles } from 'decorators/withStyles';

interface IProps {
  form: IForm;
  classes?: any;
}

@WithStyles({
  fieldText: {
    marginTop: 8,
  },
})
export default class Title extends PureComponent<IProps> {
  render() {
    const { form, classes } = this.props;

    return (
      <Fragment>
        <Typography variant='subtitle1' color='inherit' noWrap>Descrição Curta</Typography>
        <FieldText
          value={form.model.short_description}
          name='short_description'
          onChange={form.updateModel((model, v) => model.short_description = v)}
          variant='outlined'
          helperText={`Digitados ${form.model.short_description.length} de 150`}
          fullWidth
          multiline
          rows={3}
          rowsMax={150}
          classes={{
            root: classes.fieldText,
          }}
          InputProps={{
            style: {
              backgroundColor: '#fff',
            },
          }}
          inputProps={{
            maxLength: 150,
          }}
          FormHelperTextProps={{
            style: {
              marginLeft: 0,
            },
          }}
        />
      </Fragment>
    );
  }
}