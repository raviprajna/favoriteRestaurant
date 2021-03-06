import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import StarIcon from "@material-ui/icons/StarRate";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import deepPurple from "@material-ui/core/colors/deepPurple";
import red from "@material-ui/core/colors/red";
import pink from "@material-ui/core/colors/pink";
import teal from "@material-ui/core/colors/teal";
import indigo from "@material-ui/core/colors/indigo";
import green from "@material-ui/core/colors/green";

const wrapText = {
  width: "50%",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
};

export default function RestaurantCard({
  restaurant,
  selected,
  index,
  parentProps
}) {
  const cardColor = [pink, teal, indigo, green, deepPurple, red];
  // This is to select random color
  const selectedColor = cardColor[Math.floor(Math.random() * cardColor.length)];

  index = index % cardColor.length;
  let createStars = () => {
    let stars = [];

    for (let i = 0; i < restaurant.stars; i++) {
      stars.push(<StarIcon fontSize="small" style={{ color: "orange" }} />);
    }
    return stars;
  };

  return (
    <ListItem
      style={{
        backgroundColor: selected ? `${cardColor[index][100]}` : "white"
      }}
      onClick={() => parentProps.selectRestaurant(restaurant.id)}
    >
      <Avatar style={{ backgroundColor: `${cardColor[index][700]}` }}>
        {restaurant.name.charAt(0).toUpperCase()}
      </Avatar>
      <ListItemText
        secondary={
          <Typography style={wrapText}> {restaurant.favoriteFood} </Typography>
        }
        primary={<Typography style={wrapText}> {restaurant.name} </Typography>}
      />
      <ListItemSecondaryAction>
        {/*<Checkbox disabled  checked={selected} />*/}
        <IconButton>
          {" "}
          {restaurant.stars && createStars().map(star => star)}{" "}
        </IconButton>
        <IconButton
          aria-label="Delete"
          onClick={() => parentProps.deleteRestaurant(restaurant.id)}
        >
          <DeleteIcon color="secondary" style={{ marginLeft: "5px" }} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

/*

<Card boxShadow="small"
  bg='lightMagenta'
  width={[ 1 ]}
  p={[1,2,3]}
  my={[1,2,3]}
  borderRadius={6}
  >
    <Flex alignItems="center"  >
       <Badge word={restaurant.name.charAt(0)} > </Badge>
       <Box>
        <Text fontSize={[ 1, 2, 3 ]} fontWeight='bold' color='dullBlack' > { restaurant.name } </Text>
        <Text  bg='orange' fontSize={[ 1, 2, 3 ]} width="50px" color='white' p={1} >{restaurant.stars} * </Text>
        <Text pt={[1,2,2]} fontSize={[ 1, 2, 3 ]} color='grey' >
         {restaurant.favoriteFood}
        </Text>
       </Box>
       <Button onClick={() => deleteRestaurant(restaurant.id) }> DELETE </Button>
    </Flex>
</Card>*/
