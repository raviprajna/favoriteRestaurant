import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import StarIcon from '@material-ui/icons/StarRate';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Checkbox from '@material-ui/core/Checkbox';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';

export default function RestaurantCard({restaurant, selected, deleteRestaurant }){

 let createStars = () => {
    let stars = []

    for (let i = 0; i < restaurant.stars; i++) {
      stars.push(<StarIcon fontSize="small" style={{ color : "orange"}}/>)
    }
    return stars;
  }

return(
      <ListItem style={{ backgroundColor : selected ? deepPurple[100] : "white" }}>
        <Avatar style={{ backgroundColor : deepPurple[700] }}>
        {restaurant.name.charAt(0).toUpperCase()}
        </Avatar>
        <ListItemText secondary={ restaurant.favoriteFood }  primary={restaurant.name} />
        <ListItemSecondaryAction>
                                {/*<Checkbox disabled  checked={selected} />*/}
                               <IconButton> {restaurant.stars && createStars().map(star => star )} </IconButton>
                              <IconButton aria-label="Delete" onClick={() => deleteRestaurant(restaurant.id) } >
                                <DeleteIcon color="secondary" style={{marginLeft : "5px" }}/>
                              </IconButton>
                            </ListItemSecondaryAction>
      </ListItem>

)
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
