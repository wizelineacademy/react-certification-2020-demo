import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';

const LoginPromptAlert = styled(Alert)`
  margin-bottom: 1em;
`;

const LoginPromptTextField = styled(TextField)`
  margin-bottom: 1em;
`;

export { LoginPromptAlert, LoginPromptTextField };
