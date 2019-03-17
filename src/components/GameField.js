// @flow

import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

import {styles} from "../styling/Style";
import {window} from "../styling/Layout";
import FieldSquare from "./FieldSquare";
import PlayerSquare from "./PlayerSquare";

class GameField extends Component<any, void> {
    render() {
        let id = 0;
        const w = this.props.grid.width();
        const h = this.props.grid.height();
        const squareSize = Math.floor(Math.min(window.width / w, window.height / h));
        const width = squareSize * w;

        return (
            <PlayerSquare style={styles.gameFieldBorder} squareSize={squareSize}>

                <View style={[{ width: width}, styles.gameField ]}>
                    {this.props.grid._data.map(
                        row => row.map(
                            x =>
                                <FieldSquare
                                    key={id++}
                                    type={x}
                                    size={squareSize}/>
                        )
                    )}
                </View>

            </PlayerSquare>
        );
    }
}

const mapStateToProps = state => ({
    grid: state.game.gameData.grid,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(GameField);

