import React from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { CardContainer, CardMediaStyled } from './Card.styled';

function Card(props) {
  const { img, title, description, publishTime, id, onClick } = props;

  function handleClick() {
    onClick({
      img,
      title,
      description,
      publishTime,
      id,
    });
  }

  return (
    <CardContainer onClick={handleClick}>
      <CardActionArea>
        <CardMediaStyled image={img} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </CardContainer>
  );
}

export default Card;
