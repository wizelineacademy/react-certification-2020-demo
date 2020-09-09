import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardMediaMaterial from '@material-ui/core/CardMedia';

const CardContainer = styled(Card)`
  width: 345px;
  height: 345px;
  margin: 10px;
`;

const CardMedia = styled(CardMediaMaterial)`
  height: 140px;
`;

export { CardContainer, CardMedia };
