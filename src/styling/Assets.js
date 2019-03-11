// @flow

import {settings} from "../utilities/Settings";

export const getAsset =(key:string) => {
  return assets[key];
};

export const getThemeAsset = (key : string) => {
    return themes[settings.theme][key];
};

const assets = {
};

const themes = {
    minimalistic : {
        Player : require('../../assets/images/Minimalistic/Minimalistic-player.jpg'),
        PlayerRotation : false,
        Empty : require('../../assets/images/Minimalistic/Minimalistic-empty.jpg'),
        Wall : require('../../assets/images/Minimalistic/Minimalistic-wall.jpg'),
        Finish : require('../../assets/images/Minimalistic/Minimalistic-finish.jpg'),
        StartScreenBackground : require('../../assets/images/game-background-2.jpg'),
        redbutton : require('../../assets/images/redbutton.png'),
    },
    car : {
        Player : require('../../assets/images/Car/red-car.png'),
        PlayerRotation : true,
       /* Empty : require('../../assets/images/transparant.png'),*/ // empty is hier weg zodat de achtergrond zichtbaar is
        Wall : require('../../assets/images/Car/brick-wall.jpg'),
        Finish : require('../../assets/images/Car/parking.jpg'),
        StartScreenBackground : require('../../assets/images/game-background-2.jpg'),
        redbutton : require('../../assets/images/redbutton.png'),
    }
};


