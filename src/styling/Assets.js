// @flow

export const getAsset = (key : string) => {
  return assets[key];
};

export const getThemeAsset = (key : string, theme : string) => {
    return themes[theme][key];
};

const assets = {
};

const themes = {
    Minimalistic : {
        Player : require('../../assets/images/Minimalistic/Minimalistic-player.jpg'),
        PlayerRotation : false,
        Empty : require('../../assets/images/Minimalistic/Minimalistic-empty.jpg'),
        Wall : require('../../assets/images/Minimalistic/Minimalistic-wall.jpg'),
        Finish : require('../../assets/images/Minimalistic/Minimalistic-finish.jpg'),
       /* Background : require('../../assets/images/game-background-2.jpg'), */
        Button : require('../../assets/images/Minimalistic/uniformBlue.jpg'),
    },
    Car : {
        Player : require('../../assets/images/Car/red-car.png'),
        PlayerRotation : true,
       /* Empty : require('../../assets/images/transparant.png'),*/ // empty is hier weg zodat de achtergrond zichtbaar is
        Wall : require('../../assets/images/Car/brick-wall.jpg'),
        Finish : require('../../assets/images/Car/parking.jpg'),
        Background : require('../../assets/images/Car/game-background-2.jpg'),
        Button : require('../../assets/images/Car/redbutton.png'),
    }
};


