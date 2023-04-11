
import { DataTable, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { TouchableOpacity, Animated, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { View } from 'react-native';


export default function Table({head, data, buttons, filter}){

    const theme= useSelector((state)=>state.themeReducer.back)
    const front= useSelector((state)=>state.themeReducer.front)
    const chart= useSelector((state)=>state.themeReducer.chart)
    const optionsPerPage = [5, 10, 15];
    const [filtre, setFiltre] = useState(filter);
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[1]);
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, data.length);
    const n= Math.ceil(data.length / itemsPerPage)

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme,
        },
        text:{
            color: front,
            fontSize: 30,
            textAlign:"center",
            justifyContent: 'center',
        },
        btn: {
            alignItems:"center", 
            flexDirection:"row", 
            justifyContent:"center",
            marginTop: 100
        },
        swipe: {
            //backgroundColor: '#ff8303', 
            justifyContent: 'center', 
            alignItems: 'center', 
            display:'flex',
            flexDirection: "row"
        }
    });


    useEffect(() => {
        setPage(0); 
        setFiltre(filter);
        console.log((new Date("2023-10-10")) >  Date.now());
    }, [itemsPerPage, filter]);

    const rightSwipeActions = (id) => {
        return (
            <View
                style={styles.swipe}>
                {buttons.map((but,i)=>{
                    return( 
                    <TouchableOpacity onPress={()=>but.action(id)} key={i} style={{ fontWeight: '40'}}>
                        <MaterialCommunityIcons name={ but.label } color={but.color} size={40}  />
                    </TouchableOpacity>
                    )
                })}
            </View>
        );
      };

    return (
        <DataTable style={{backgroundColor: theme==="white" ? "": chart}}>
            <DataTable.Header >
                {head.map((h,j)=>{
                    return (<DataTable.Title key={h}>{h}</DataTable.Title>)
                })}
                {/*<DataTable.Title>action</DataTable.Title>*/}
            </DataTable.Header>
            {data.slice(from, to).map((dt, i)=>{
                return (
                    <Swipeable shouldCancelWhenOutside cancelsTouchesInView
                        renderRightActions={()=>rightSwipeActions(dt.id)}>
                        <DataTable.Row key={i}> 
                            {head.map((h,j)=>{
                                return (<DataTable.Cell key={h}>{dt[h]}</DataTable.Cell>)
                            })}
                        </DataTable.Row>
                    </Swipeable>
                )
            })}

            <DataTable.Pagination
                page={page} numberOfPages={n} showFastPaginationControls
                onPageChange={(page) => setPage(page)} label={(page+1)+" sur "+n}
                optionsPerPage={optionsPerPage} itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                showFastPagination optionsLabel={'Rows per page'}
                numberOfItemsPerPageList={optionsPerPage}
            />
        </DataTable>
    );
    }

