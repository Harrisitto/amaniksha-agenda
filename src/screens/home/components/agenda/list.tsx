import React, { useCallback } from 'react';
import { FlatList, Pressable, Text, View, StyleSheet } from 'react-native';
import type { AgendaItem } from '../../../../hook/sqlite/models';
import RenderAgendaItem from './item';
import colors from '../../../../theme/colors';

type Props = {
  data: AgendaItem[];
  onPressItem: (item: AgendaItem) => void;
};

export default function AgendaList({ data, onPressItem }: Props) {
  const renderItem = useCallback(
    ({ item }: { item: AgendaItem }) => (
      <RenderAgendaItem item={item} onPress={onPressItem} />
    ),
    [onPressItem]
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(i) => String(i.id)}
      removeClippedSubviews
      initialNumToRender={10}
    />
  );
}