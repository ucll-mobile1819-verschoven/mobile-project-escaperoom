// @flow

export const getAsset = (key : string) => {
  return assets[key];
};

export const getThemeAsset = (key : string, theme : string) => {
    return themes[theme][key];
};

const assets = {
    Back : require('../../assets/images/back.png'),
    Hand : require('../../assets/images/hand-icon.png'),
    Mask : require('../../assets/images/mask.png'),
    Center : require('../../assets/images/center.png'),
    Exit : require('../../assets/images/exit.png'),
    Info : require('../../assets/images/information.png'),

    Star : require('../../assets/images/star.png'),
    StarYellow : require('../../assets/images/yellow-star.png'),
    StarRed : require('../../assets/images/red-star.png'),
    Flashlight : require('../../assets/images/flashlight.png'),
    FlashlightYellow : require('../../assets/images/flashlightYellow.png'),
    FlashlightRed : require('../../assets/images/flashlightRed.png'),
};

const themes = {
    Minimalistic : {
        Player : require('../../assets/images/Minimalistic/Minimalistic-player.jpg'),
        PlayerRotation : false,

        Wall : require('../../assets/images/Minimalistic/Minimalistic-wall.jpg'),
        Finish : require('../../assets/images/Minimalistic/Minimalistic-finish.jpg'),
        LeftArrow : require('../../assets/images/Minimalistic/left-arrow.png'),
        RightArrow : require('../../assets/images/Minimalistic/right-arrow.png'),
        UpArrow : require('../../assets/images/Minimalistic/up-arrow.png'),
        DownArrow : require('../../assets/images/Minimalistic/down-arrow.png'),

        Button : require('../../assets/images/Minimalistic/uniformBlue.jpg'),
        win : require('../../assets/images/Minimalistic/SimpleWin.png'),
        winBackground : require('../../assets/images/Minimalistic/winbackground.png'),
        ContrastColor: 'black',
    },
    Car : {
        Player : require('../../assets/images/Car/red-car.png'),
        PlayerRotation : true,

        Wall : require('../../assets/images/Car/brick-wall.jpg'),
        Finish : require('../../assets/images/Car/parking.jpg'),
        LeftArrow : require('../../assets/images/Minimalistic/left-arrow.png'),
        RightArrow : require('../../assets/images/Minimalistic/right-arrow.png'),
        UpArrow : require('../../assets/images/Minimalistic/up-arrow.png'),
        DownArrow : require('../../assets/images/Minimalistic/down-arrow.png'),

        Background : require('../../assets/images/Car/background.png'),
        Button : require('../../assets/images/Car/redbutton.png'),
        win : require('../../assets/images/Car/Win.png'),
        winBackground : require('../../assets/images/Car/winbackground.png'),
        ContrastColor: 'black',
    },
    Wood : {
        Player : require('../../assets/images/Wood/car.png'),
        PlayerRotation : true,

        Wall : require('../../assets/images/Wood/blockade.png'),
        Finish : require('../../assets/images/Car/parking.jpg'),
        LeftArrow : require('../../assets/images/Wood/left-arrow.png'),
        RightArrow : require('../../assets/images/Wood/right-arrow.png'),
        UpArrow : require('../../assets/images/Wood/up-arrow.png'),
        DownArrow : require('../../assets/images/Wood/down-arrow.png'),

        Background : require('../../assets/images/Wood/WoodenBackground.png'),
        Button : require('../../assets/images/Wood/button.png'),
        win : require('../../assets/images/Wood/Win.png'),
        winBackground : require('../../assets/images/Wood/woodwinbackground.png'),
        ContrastColor: 'white',
    }
};


