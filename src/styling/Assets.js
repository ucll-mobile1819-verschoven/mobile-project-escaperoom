// @flow

export const getAsset = (key : string) => {
  return assets[key];
};

export const getThemeAsset = (key : string, theme : string) => {
    return themes[theme][key];
};

const assets = {
    Hand : require('../../assets/images/hand-icon.png'),
    Star : require('../../assets/images/star.png'),
    StarYellow : require('../../assets/images/yellow-star.png'),
    StarRed : require('../../assets/images/red-star.png'),
};

const themes = {
    Minimalistic : {
        Player : require('../../assets/images/Minimalistic/Minimalistic-player.jpg'),
        PlayerRotation : false,
        Wall : require('../../assets/images/Minimalistic/Minimalistic-wall.jpg'),
        Finish : require('../../assets/images/Minimalistic/Minimalistic-finish.jpg'),
       /* Background : require('../../assets/images/game-background-2.jpg'), */
        Button : require('../../assets/images/Minimalistic/uniformBlue.jpg'),
        win : require('../../assets/images/Minimalistic/SimpleWin.png'),
        winBackground : require('../../assets/images/Minimalistic/winbackground.png'),
        ConstrastColor: 'black',
    },
    Car : {
        Player : require('../../assets/images/Car/red-car.png'),
        PlayerRotation : true,
        Wall : require('../../assets/images/Car/brick-wall.jpg'),
        Finish : require('../../assets/images/Car/parking.jpg'),
        Background : require('../../assets/images/Car/game-background-2.jpg'),
        Button : require('../../assets/images/Car/redbutton.png'),
        win : require('../../assets/images/Car/Win.png'),
        winBackground : require('../../assets/images/Wood/woodwinbackground.png'),
        ConstrastColor: 'white',
    },
    Wood : {
        Player : require('../../assets/images/Car/red-car.png'),
        PlayerRotation : true,
        Wall : require('../../assets/images/Wood/blockade.png'),
        Finish : require('../../assets/images/Car/parking.jpg'),
        Background : require('../../assets/images/Wood/WoodenBackground.png'),
        Button : require('../../assets/images/Wood/button.png'),
        win : require('../../assets/images/Wood/Win.png'),
        winBackground : require('../../assets/images/Wood/woodwinbackground.png'),
        ConstrastColor: 'white',
    }
};


