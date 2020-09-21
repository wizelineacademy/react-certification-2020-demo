import styled from 'styled-components';
import Alert from '@material-ui/lab/Alert';

const LoaderWrapper = styled.div`
  width: fit-content;
  margin: 100px auto;
`;

const AppAlert = styled(Alert)`
  margin: 1em;
`;

export { LoaderWrapper, AppAlert };
