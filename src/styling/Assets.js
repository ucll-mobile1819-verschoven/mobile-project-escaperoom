// @flow

import {settings} from "../utilities/Settings";

export const getThemeAsset = (key : string) => {
    return themes[settings.theme][key];
};

const themes = {
    minimalistic : {
        Player : require('../../assets/images/Minimalistic/Minimalistic-player.jpg'),
        PlayerRotation : false,
        Empty : require('../../assets/images/Minimalistic/Minimalistic-empty.jpg'),
        Wall : require('../../assets/images/Minimalistic/Minimalistic-wall.jpg'),
        Finish : require('../../assets/images/Minimalistic/Minimalistic-finish.jpg'),
    },
    car : {
        Player : require('../../assets/images/Car/red-car.png'),
        PlayerRotation : true,
        Empty : require('../../assets/images/Minimalistic/Minimalistic-empty.jpg'),
        Wall : require('../../assets/images/Car/brick-wall.jpg'),
        Finish : require('../../assets/images/Car/parking.jpg')
    }
};
