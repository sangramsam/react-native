/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import formateTime from 'minutes-seconds-milliseconds';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

export default class stopwatch extends Component {
    constructor() {
        super();
        this.state = {
            timeElased:null,
            running:false,
            startTime:null,
            laps:[]
        }
    }

    startStopButton() {
        var style=this.state.running ? styles.stopButton :styles.startButton;
        return <TouchableHighlight
            underlayColor="gray"
            onPress={this.handleStartPress.bind(this)}
            style={[styles.button,style]}
        >
            <Text>
                {this.state.running ?'Stop':'Start'}
            </Text>
        </TouchableHighlight>
    }

    handleStartPress() {
        console.log("Start is pressed");
        if(this.state.running){
            clearInterval(this.interval);
            this.setState({running:false});
            return ;
        }
        var startTime = new Date();
        this.setState({startTime:new Date()})
;        this.interval=setInterval(() => {
            this.setState({
                timeElased: new Date() - this.state.startTime,
                running:true
            });
        },1)
    }
    handlehandlelapPress(){
        var lap=this.state.timeElased;

        this.setState({
            startTime:new Date(),
            laps:this.state.laps.concat([lap])
        })
    }

    lapButton() {
        return <TouchableHighlight
            underlayColor="gray"
            onPress={this.handlehandlelapPress.bind(this)}
            style={[styles.button]}
        >
            <Text>
                Lap
            </Text>
        </TouchableHighlight>
    }

    border(color) {
        return {
            borderColor: color,
            borderWidth: 4
        }
    }
    laps(){
        return this.state.laps.map(function (time,index) {
           return <View style={styles.lap}>
               <Text style={styles.lapText} >
                   Lap #{index+1}
               </Text>
               <Text style={styles.lapText}>
                   Lap #{formateTime(time)}
               </Text>
           </View>
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.timerWrapper}>
                        <Text style={styles.timer} >
                            {formateTime(this.state.timeElased)}
                        </Text>
                    </View>
                    <View style={styles.buttonWrapper}>
                        {this.startStopButton()}
                        {this.lapButton()}
                    </View>
                </View>
                <View style={[styles.footer]}>

                        {this.laps()}

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, //for entire screen
        alignItems: 'stretch'
    },
    header: {
        flex: 1
    },
    footer: {
        flex: 1
    },
    timerWrapper: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonWrapper: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    timer:{
        fontSize:60
    },
    button:{
        borderWidth:2,
        height:100,
        width:100,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center'
    },
    startButton:{
        borderColor:"#00CC00"
    },stopButton:{
        borderColor:"#CC0000"
    },lap:{
            justifyContent:'space-around',
            flexDirection:'row'
    },
    lapText:{
        fontSize:30
    }
});

AppRegistry.registerComponent('stopwatch', () => stopwatch);
