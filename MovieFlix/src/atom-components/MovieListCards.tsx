import {Text, ImageBackground, Alert, TouchableOpacity} from 'react-native';

export const renderMovieItem = (item: any, width: number) => {
  return item.map((item: any, index: number) => {
    return (
      <TouchableOpacity
        onPress={() => Alert.alert(item.title, item.overview)}
        key={index}
        style={{
          elevation: 1,
        }}>
        <ImageBackground
          source={{
            uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path,
          }}
          style={{
            height: 250,
            width: width / 2.2,
            margin: 6,
            justifyContent: 'flex-end',
          }}
          imageStyle={{opacity: 0.8}}>
          <Text style={{fontSize: 18, color: 'azure', fontWeight: '300'}}>
            {item.title}
          </Text>
          <Text
            style={{
              color: 'lightgreen',
              fontWeight: 'bold',
              shadowColor: 'white',
            }}>
            {item.popularity}
          </Text>
          <Text
            style={{backgroundColor: 'rgba(12,32,4,0.4)'}}
            numberOfLines={2}>
            {item.overview}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  });
};
