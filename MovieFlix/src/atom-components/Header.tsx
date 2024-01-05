import {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  VirtualizedList,
  ScrollView,
} from 'react-native';
import {fetchGenreList} from '../api/apiCall';

export function Header({getSelectedId}) {
  useEffect(() => {
    const getGenre = async () => {
      let response = await fetchGenreList();
      let initAllObj = {id: 'All', name: 'All', isCheck: true};
      setFilterList([initAllObj, ...makeDefaultfilter(response.genres)]);
    };
    getGenre();
  }, []);

  const makeDefaultfilter = data => {
    let genreObj = {};

    data.map(item => {
      genreObj[item.id] = item.name;
      item['isCheck'] = false;
      return item;
    });
    return [...data];
  };

  const [filters, setFilterList] = useState<Array<string>>([]);
  //   const [selectedFilter, setselelectedFilter] = useState('ALL');
  const selectedFilterAdd = (index: number) => {
    let copyarr = [...filters];
    let arr = [];
    copyarr[index]['isCheck'] = !copyarr[index]['isCheck'];

    if (!index && copyarr[index]['isCheck']) {
      let data = makeDefaultfilter(copyarr);
      data[0]['isCheck'] = true;
      arr = data;
    } else {
      const idx = copyarr.findIndex((item, idx: number) => {
        return item.isCheck && idx;
      });

      copyarr[0]['isCheck'] = idx > -1 ? false : true;
      arr = copyarr;
    }
    getSelectedId(
      arr
        .filter(item => item.isCheck)
        .map(x => x.id)
        .join(','),
    );
    setFilterList(arr);
  };

  return (
    <View
      style={{
        height: 130,
        backgroundColor: 'black',
      }}>
      <View
        style={{
          marginHorizontal: 8,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 20, fontWeight: '600', color: 'red'}}>
          MOVIEFLIX
        </Text>
        {/*search functionality is in progress since its a bonus point*/}
        <TextInput
          placeholder="search movies"
          style={{
            borderColor: 'red',
            borderWidth: 1,
            paddingLeft: 7,
            borderRadius: 10,
            width: 130,
            marginVertical: 6,
          }}
        />
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{flexDirection: 'row', height: 50, alignItems: 'center'}}>
          {filters.map((item: any, index: number) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  selectedFilterAdd(index);
                }}
                key={item.id}
                style={{
                  backgroundColor: item.isCheck ? 'red' : 'gray',
                  margin: 5,
                  padding: 9,
                  borderRadius: 5,
                }}>
                <Text>{item?.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
