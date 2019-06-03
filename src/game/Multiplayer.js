import store from "../redux/store";
import {forceGameState} from "../redux/gameRedux";

let connection = null;
export let isConnectionOpen = false;
let unsubscribe = null;
export let isMaster = false;

export function startMultiplayer(onMove) {
    connection = new WebSocket('ws://192.168.25.25:9898');

    connection.onopen = () => {
        isConnectionOpen = true;
        connection.send('OPEN');
    };

    connection.onmessage = (data) => {
        data = JSON.parse(data.data);

        if(data.type){
            isMaster = data.type === 'MASTER';
            if(isMaster)                    connection.send('GAME\n' + JSON.stringify(store.getState().game));
        } else if(data.action){
            if(data.action === 'REFRESH')   connection.send('GAME\n' + JSON.stringify(store.getState().game));
        } else if(data.move) {
            onMove(data.move);
        } else if(data.gameData) {
            store.dispatch(forceGameState(data));
        }
    };

    connection.onError = () => {
        isConnectionOpen = false;
        isMaster = false;
    };

    connection.onClose = () => {
        isConnectionOpen = false;
        isMaster = false;
    };

    unsubscribe = store.subscribe(() => {
        if(isMaster) connection.send('GAME\n' + JSON.stringify(store.getState().game));
    });
}

export function multiplayerConsumesMove(dir){
    if(isConnectionOpen && connection){
        if(this.isMaster) {
            return false;
        } else {
            connection.send('MOVE\n' + JSON.stringify({move: dir}));
            return true;
        }
    } else {
        return false;
    }
}

export function stopMultiplayer() {
    if(unsubscribe){
        unsubscribe();
        unsubscribe = null;
    }

    if(connection){
        isConnectionOpen = false;
        isMaster = false;
        connection.close();
        connection = null;
    }
}
