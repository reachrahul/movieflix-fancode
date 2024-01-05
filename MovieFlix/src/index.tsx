import React, {useEffect, useRef, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  Dimensions,
  View,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {Header} from './atom-components/Header';
import {fetchMovies} from './api/apiCall';
import {renderMovieItem} from './atom-components/MovieListCards';

export default function MyApp() {
  const {width, height} = Dimensions.get('window');
  // const [theme, setTheme] = useState<themeProps>(lightTheme);
  // [{
  // year:2012
  // movies: [{},{},{}]
  // }]
  const [isloading, setLoader] = useState<boolean>(false);
  const [movieList, setMovieList] = useState<any>([]);
  const [pagination, setPage] = useState<{
    page: number;
    selectedFilter: string;
  }>({
    page: 2012,
    selectedFilter: 'All',
  });
  const listref = useRef<FlatList>({});

  const getSelectedId = (val: string) => {
    setPage({page: 2012, selectedFilter: val});
  };

  useEffect(() => {
    const getMovies = async () => {
      let response = await fetchMovies(pagination);
      // API is not returning data of 2024, using 2023 constant limit
      if (pagination.page !== 2023) {
        let arr = [...movieList];
        // list-data based on year conditions
        if (pagination.page > 2012) {
          arr.push({year: pagination.page, movies: response.results});
          setMovieList(arr);
          setLoader(false);
        } else if (pagination.page < 2012) {
          listref?.current.scrollToOffset({animated: true, offset: 1}); // to track up-scroll at default position
          arr.unshift({year: pagination.page, movies: response.results});
          setMovieList(arr);
          setLoader(false);
        } else if (pagination.page == 2012) {
          listref.current.scrollToOffset({animated: true, offset: 1});
          setMovieList([{year: pagination.page, movies: response.results}]);
        }
      }
    };
    getMovies();
  }, [pagination]);

  const renderSingleYearList = (item: any) => {
    return (
      <View style={{alignSelf: 'center'}}>
        {item.item.movies.length ? (
          <Text
            style={{
              margin: 6,
              fontSize: 20,
              fontWeight: '600',
              fontFamily: 'sans-serif',
            }}>
            {item.item.year}
          </Text>
        ) : (
          <Text
            style={{
              margin: 6,
              fontSize: 20,
              fontWeight: '600',
              fontFamily: 'sans-serif',
            }}>
            {item.item.year}: 0 movies
          </Text>
        )}

        <View
          style={{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
          }}>
          {renderMovieItem(item.item.movies, width)}
        </View>
      </View>
    );
  };

  const loadBottomMore = () => {
    setPage({
      page: movieList[movieList.length - 1]['year'] + 1,
      selectedFilter: pagination.selectedFilter,
    });
    setLoader(true);
  };
  const loadTopMore = e => {
    if (e.nativeEvent.contentOffset.y == 0) {
      setPage({
        page: movieList[0]['year'] - 1,
        selectedFilter: pagination.selectedFilter,
      });
    }
  };

  const renderMovieList = () => {
    return (
      <FlatList
        ref={listref}
        keyExtractor={(_, year) => {
          return year.toString();
        }}
        onScroll={e => loadTopMore(e)}
        data={movieList}
        renderItem={item => renderSingleYearList(item)}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        onEndReached={() => loadBottomMore()}
        refreshing={false}
      />
    );
  };

  return (
    <SafeAreaView>
      <View style={{backgroundColor: '#262626'}}>
        <Header getSelectedId={getSelectedId} />
        <View style={{height: height - 130}}>
          {renderMovieList()}
          {/* bottom loader */}
          {isloading ? <ActivityIndicator size="large" color="red" /> : null}
        </View>
      </View>
    </SafeAreaView>
  );
}
