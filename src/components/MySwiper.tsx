import {Dimensions, Pressable} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import {ImageCard} from './ImageCard';
import React, {forwardRef} from 'react';
import type {Evaluate} from '../api/evaluate';
import {postEvaluate} from '../api/evaluate';
const {width} = Dimensions.get('window');

interface Props {
  items: Evaluate[];
  setCards: React.Dispatch<React.SetStateAction<Evaluate[]>>;
  onSwipedTop: (cardIndex?: number) => void;
  onSwipedBottom: (cardIndex?: number) => void;
  navigatePostScreen: (id: number) => void;
  setDeleteCards: React.Dispatch<React.SetStateAction<Evaluate[]>>;
  deletedCards: Evaluate[];
}

export const MySwiper = forwardRef(
  (
    {
      items,
      setCards,
      onSwipedTop,
      onSwipedBottom,
      navigatePostScreen,
      setDeleteCards,
      deletedCards,
    }: Props,
    ref: React.LegacyRef<Swiper<Evaluate>>,
  ) => {
    if (items.length === 0) {
      return null;
    }
    return (
      <Swiper
        ref={ref}
        cards={items}
        cardStyle={{width: width, height: '100%'}}
        marginTop={0}
        marginBottom={0}
        cardVerticalMargin={0}
        cardHorizontalMargin={0}
        onSwipedTop={cardIndex => {
          onSwipedTop();
          postEvaluate('LIKE', items[cardIndex].id);
          setCards(prev => {
            const newCards = [...prev];
            const deleteCard = newCards.shift();
            if (deleteCard) {
              setDeleteCards(prev => [deleteCard, ...prev]);
            }
            return newCards;
          });
        }}
        swipeAnimationDuration={200}
        onSwipedBottom={cardIndex => {
          postEvaluate('DISLIKE', items[cardIndex].id);
          onSwipedBottom();
          setCards(prev => {
            const newCards = [...prev];
            const deleteCard = newCards.shift();
            if (deleteCard) {
              setDeleteCards(prev => [deleteCard, ...prev]);
            }
            return newCards;
          });
        }}
        key={items.length}
        containerStyle={{
          backgroundColor: 'transparent',
        }}
        onSwipedRight={() => {
          setCards(prev => {
            const newCards = [...prev];
            const deleteCard = newCards.shift();
            if (deleteCard) {
              setDeleteCards(deletePrev => [deleteCard, ...deletePrev]);
            }
            return newCards;
          });
        }}
        onSwipedLeft={() => {
          setCards(prev => {
            const newCards = [...prev];
            if (deletedCards.length) {
              newCards.unshift(deletedCards[0]);
              setDeleteCards(deletePrev => deletePrev.slice(1));
            }
            return newCards;
          });
        }}
        renderCard={item => {
          return (
            <Pressable style={{width: width, height: '100%'}}>
              <ImageCard
                title={item.title}
                imgs={item.imgs}
                goPostScreen={() => {
                  navigatePostScreen(item.id);
                }}
                postId={item.id}
              />
            </Pressable>
          );
        }}
      />
    );
  },
);
