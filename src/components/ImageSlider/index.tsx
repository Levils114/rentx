import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, ViewToken } from 'react-native';
import { PhotosProps } from '../../@types/Car';
import { CurrentIndexIndicator } from '../CurrentIndexIndicator';

import {
   Container,
   CarImageWrapper,
   CarImage,
   ImageIndexes,
} from './styles'

interface ImagesSliderProps{
   imagesUrl: PhotosProps[];
}

interface OnScrollInfoProps{
   viewableItems: ViewToken[];
   changed: ViewToken[];
}

export default function ImageSlider({ imagesUrl }: ImagesSliderProps){
   const [currentIndex, setCurrentIndex] = useState(0);
   
   const onScroll = useRef((info: OnScrollInfoProps) => {
      setCurrentIndex(info.viewableItems[0].index);
   }).current;

   return(
      <Container>
         <ImageIndexes>
            {imagesUrl.map((image, index) => (
               <CurrentIndexIndicator key={image.id} active={index === currentIndex}/>
            ))}
         </ImageIndexes>

         <CarImageWrapper>
            <FlatList 
               data={imagesUrl}
               showsHorizontalScrollIndicator={false}
               horizontal
               onViewableItemsChanged={onScroll}
               decelerationRate="fast"
               bounces={false}
               snapToInterval={Dimensions.get("window").width}
               keyExtractor={item => item.id}
               renderItem={({ item }) => (
                  <CarImage 
                     source={{ uri: item.photo }}
                     resizeMode="contain"
                  />
               )}
            />
         </CarImageWrapper>
      </Container>
   );
}