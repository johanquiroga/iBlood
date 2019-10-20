import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { LineChart, Path } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { Line } from 'react-native-svg';

import { Block, Text } from './components';

import * as theme from './theme';

import * as mocks from './mocks';

class App extends React.Component {
  state = { fontsLoaded: false };

  async componentDidMount() {
    await this.loadFonts();
    this.setState({ fontsLoaded: true });
  }

  renderChart = () => {
    const { chart } = this.props;
    const LineShadow = ({ line }) => (
      <Path
        d={line}
        fill="none"
        stroke={theme.colors.primary}
        strokeWidth={7}
        strokeOpacity={0.07}
      />
    );
    return (
      <LineChart
        yMin={0}
        yMax={10}
        data={chart}
        style={{ flex: 1 }}
        curve={shape.curveMonotoneX}
        svg={{ stroke: theme.colors.primary, strokeWidth: 1.25 }}
        contentInset={{ left: theme.sizes.base, right: theme.sizes.base }}
      >
        <LineShadow />
        <Line
          belowChart
          key="zero-axis"
          x1="0%"
          x2="100%"
          y1="50%"
          y2="50%"
          stroke={theme.colors.gray}
          strokeDasharray={[2, 10]}
          strokeWidth={1}
        />
      </LineChart>
    );
  };

  loadFonts = async () =>
    Font.loadAsync({
      'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
      'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
      'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
      'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
    });

  renderHeader = () => {
    const { user } = this.props;
    return (
      <Block flex={0.42} column style={{ paddingHorizontal: 15 }}>
        <Block flex={false} row style={{ paddingVertical: 15 }}>
          <Block center>
            {/* avatar width + margin */}
            <Text h3 white style={{ marginRight: -(25 + 5) }}>
              Blood Requests
            </Text>
          </Block>
          <Image style={styles.avatar} source={user.avatar}></Image>
        </Block>
        <Block card shadow color="white" style={styles.headerChart}>
          <Block row space="between" style={{ paddingHorizontal: 30 }}>
            <Block flex={false} row center>
              <Text h1>291</Text>
              <Text caption bold tertiary style={{ paddingHorizontal: 10 }}>
                -12%
              </Text>
            </Block>

            <Block flex={false} row center>
              <Text caption bold primary style={{ paddingHorizontal: 10 }}>
                +49%
              </Text>
              <Text h1>481</Text>
            </Block>
          </Block>

          <Block
            flex={0.5}
            center
            row
            space="between"
            style={{ paddingHorizontal: 30 }}
          >
            <Text caption light>
              Available
            </Text>
            <Text caption light>
              Requests
            </Text>
          </Block>

          <Block flex={1}>{this.renderChart()}</Block>
        </Block>
      </Block>
    );
  };

  renderRequest = request => (
    <Block row card shadow color="white" style={styles.request}>
      <Block
        flex={0.25}
        card
        column
        color="secondary"
        style={styles.requestStatus}
      >
        <Block flex={0.25} middle center color={theme.colors.primary}>
          <Text small white style={{ textTransform: 'uppercase' }}>
            {request.priority}
          </Text>
        </Block>
        <Block flex={0.7} center middle>
          <Text h2 white bold>
            {request.bloodType}
          </Text>
        </Block>
      </Block>
      <Block flex={0.75} column middle>
        <Text h3 bold style={{ paddingVertical: 8 }}>
          {request.name}
        </Text>
        <Text caption semibold>
          {request.age} &nbsp;&bull;&nbsp; {request.gender} &nbsp;&bull;&nbsp;
          {request.distance}
          Km &nbsp;&bull;&nbsp; {request.time}hrs
        </Text>
      </Block>
    </Block>
  );

  renderRequests = () => {
    const { requests } = this.props;
    return (
      <Block flex={0.64} column color="gray2" style={styles.requests}>
        <Block flex={false} row space="between" style={styles.requestsHeader}>
          <Text light>Recent Updates</Text>
          <TouchableOpacity activeOpacity={0.8}>
            <Text semibold>View All</Text>
          </TouchableOpacity>
        </Block>
        <ScrollView>
          {requests.map(request => (
            <TouchableOpacity activeOpacity={0.8} key={request.id}>
              {this.renderRequest(request)}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Block>
    );
  };

  render() {
    const { fontsLoaded } = this.state;
    if (!fontsLoaded) {
      return <AppLoading />;
    }
    return (
      <SafeAreaView style={styles.safe}>
        {this.renderHeader()}
        {this.renderRequests()}
      </SafeAreaView>
    );
  }
}

App.defaultProps = {
  user: mocks.user,
  requests: mocks.requests,
  chart: mocks.chart,
};

export default App;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  headerChart: {
    paddingTop: 30,
    paddingBottom: 30,
    zIndex: 1,
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    marginRight: 5,
  },
  requests: {
    marginTop: -55,
    paddingTop: 55 + 20,
    paddingHorizontal: 15,
    zIndex: -1,
  },
  requestsHeader: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  request: {
    marginBottom: 15,
    padding: 20,
  },
  requestStatus: {
    overflow: 'hidden',
    height: 100,
    marginRight: 20,
  },
});
