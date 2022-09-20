const MosqueMarquer = (props) => {
    const relativeStyle =
        props.itemId == props.visibleItemId
        ? {position: 'absolute', tintColor: '#428947', color: '#fff', zIndex: 1}
        : {position: null, tintColor: '#fff', color: '#3c423d', zIndex: 0};
return (
    <ImageBackground
      resizeMode="contain"
      source={require('Resources/square_marker.png')}
      style={{
        ...styles.imageBackground,
         position: relativeStyle.position,
        zIndex: relativeStyle.zIndex,
      }}
      imageStyle={{tintColor: relativeStyle.tintColor}}>
      <Text style={{...styles.text, color: relativeStyle.color}}>
        {props.distance}m
      </Text>
    </ImageBackground>
  );
};
export default MosqueMarquer;

const styles = StyleSheet.create({
  imageBackground: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: common.FONT_SIZE_H38,
  },
});