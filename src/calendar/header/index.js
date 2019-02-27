import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import XDate from 'xdate';
import PropTypes from 'prop-types';
import styleConstructor from './style';
import { weekDayNames } from '../../dateutils';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import 'moment/min/locales';

class CalendarHeader extends Component {
  static propTypes = {
    theme: PropTypes.object,
    hideArrows: PropTypes.bool,
    month: PropTypes.instanceOf(XDate),
    addMonth: PropTypes.func,
    showIndicator: PropTypes.bool,
    firstDay: PropTypes.number,
    renderArrow: PropTypes.func,
    hideDayNames: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.style = styleConstructor(props.theme);
    this.addMonth = this.addMonth.bind(this);
    this.substractMonth = this.substractMonth.bind(this);
    this.month = XDate.locales[XDate.defaultLocale].monthNamesShort
  }

  
  nextMonth(next){
      return next != 12 ? this.month[next] : this.month[0];
  }

  previousMonth(previous){
      return previous != 1 ? this.month[previous-2] : this.month[11];
  }

  addMonth() {
    this.props.addMonth(1);
  }

  substractMonth() {
    this.props.addMonth(-1);
  }

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.month.toString('yyyy MM') !==
      this.props.month.toString('yyyy MM')
    ) {
      return true;
    }
    if (nextProps.showIndicator !== this.props.showIndicator) {
      return true;
    }
    return false;
  }

  render() {
moment.locale('fr');

    let leftArrow = <View />;
    let rightArrow = <View />;
    let weekDaysNames = weekDayNames(this.props.firstDay);
    if (!this.props.hideArrows) {
      leftArrow = (
        <TouchableOpacity
          onPress={this.substractMonth}
          style={this.style.arrow}
        >
          {this.props.renderArrow
            ? this.props.renderArrow('left')
            : <Image
                source={require('../img/previous.png')}
                style={this.style.arrowImage}
              />}
        </TouchableOpacity>
      );
      rightArrow = (
        <TouchableOpacity onPress={this.addMonth} style={this.style.arrow}>
          {this.props.renderArrow
            ? this.props.renderArrow('right')
            : <Image
                source={require('../img/next.png')}
                style={this.style.arrowImage}
              />}
        </TouchableOpacity>
      );
    }
    let indicator;
    if (this.props.showIndicator) {
      indicator = <ActivityIndicator />;
    }
    return (
      <View style={{}}>
      <ImageBackground style={this.style.proBg} source={require('../img/proBgg.png')}>
        <View style={{flex:1,flexDirection:'row',alignSelf:'center',marginBottom:-25}}>
          {leftArrow}
          <Text style={this.style.previousMonthText}>
            {this.previousMonth(this.props.month.toString(this.props.monthFormat ? this.props.monthFormat : 'M'))}
          </Text>
          <Text style={this.style.monthText}>
            {this.props.month.toString(this.props.monthFormat ? this.props.monthFormat : 'MMM')}
          </Text>
          <Text style={this.style.nextMonthText}>
            {this.nextMonth(this.props.month.toString(this.props.monthFormat ? this.props.monthFormat : 'M'))}
          </Text>
          {rightArrow}
          <View style={{flexDirection:'column',flex:1}}>
            <View style={{alignSelf:'flex-end'}}>
              <Text style={{fontSize:18,alignSelf:'center',color:"#fff"}}>
                {moment().format("MMMM").toUpperCase()}
              </Text>
              <Text style={{fontSize:22,alignSelf:'center',color:"#fff"}}>
                {moment().format("DD, YYYY")}
              </Text>
              <View style={{width: 80, alignSelf:'center',height:80,borderRadius:40,backgroundColor:"white",borderRadius:40,borderWidth:5,borderColor:'rgba(193, 192, 192, 0.53)',justifyContent:'center'}}>
                <Icon size={42} name="ios-calendar" style={{ alignSelf:'center' }} />
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={{borderBottomWidth:1,borderColor:'#ECECEC',marginBottom:10,paddingBottom:10,backgroundColor:"#F9F9F9"}}>
        {
          !this.props.hideDayNames &&
          <View style={this.style.week}>
            {weekDaysNames.map((day, idx) => {
              if(moment().format("ddd") == day.toLocaleLowerCase()){
                return(
                  <View key={idx} style={{flexDirection:'column'}}>
                    <View style={{height:15,width:15,borderRadius:10,backgroundColor:"#E81B21",alignSelf:'center',borderWidth:2,borderColor:"#F6CDCE",marginBottom:10,paddingBottom:10}}></View>
                    <Text  style={[this.style.dayHeader,{color:"#E81B21"}]} numberOfLines={1}>{day.toUpperCase()}</Text>
                  </View>
                )
              }
              else {
                return(
                <View key={idx} style={{flexDirection:'column'}}>
                  <View style={{height:15,width:15,borderRadius:10,backgroundColor:"#BBBBBB",alignSelf:'center',marginBottom:10,paddingBottom:10}}></View>
                  <Text  style={[this.style.dayHeader,{color:"#626262"}]} numberOfLines={1}>{day.toUpperCase()}</Text>
                </View>
              )}
            })}
          </View>
        }
        </View>
      </View>
    );
  }
}

export default CalendarHeader;
