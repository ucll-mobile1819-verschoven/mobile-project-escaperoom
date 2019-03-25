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
        let x = -1, y = -1;
        const w = this.props.grid.width();
        const h = this.props.grid.height();
        const squareSize = Math.floor(Math.min(window.width / w, window.height / h));
        const width = squareSize * w;
        const height = squareSize * h;

        return (
            <PlayerSquare style={styles.gameFieldBorder} squareSize={squareSize}>

                <View style={{ width: width, height: height}}>
                    {this.props.grid._data.map( row => {
                            y++;
                            x = -1;
                            return row.map( type => {
                                    x++;
                                    return (type !== 'Empty') &&
                                    <FieldSquare
                                        style={{position: "absolute", left: x * squareSize, top: y * squareSize}}
                                        key={x + y * w}
                                        type={type}
                                        size={squareSize}/>;
                                }
                            )
                        }
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

