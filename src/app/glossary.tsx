import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { CryptoCan } from '@/components/crypto-can';
import { Screen } from '@/components/screen';
import { SpeechBubble } from '@/components/speech-bubble';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FontFamily, Spacing } from '@/constants/theme';
import { glossary } from '@/content/glossary';
import { useTheme } from '@/hooks/use-theme';

export default function GlossaryScreen() {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const needle = query.trim().toLowerCase();
  const terms = glossary.filter(
    ({ term, definition }) =>
      term.toLowerCase().includes(needle) || definition.toLowerCase().includes(needle),
  );

  return (
    <Screen>
      <View style={styles.hero}>
        <CryptoCan size={72} />
        <SpeechBubble style={styles.heroBubble}>
          <ThemedText type="smallBold" style={styles.term}>
            Stuck on a word? Look it up here.
          </ThemedText>
        </SpeechBubble>
      </View>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search terms"
        placeholderTextColor={theme.textSecondary}
        autoCorrect={false}
        style={[
          styles.search,
          { color: theme.text, borderColor: theme.border, backgroundColor: theme.backgroundElement },
        ]}
      />

      {terms.map(({ term, definition }) => (
        <ThemedView key={term} style={[styles.card, { borderColor: theme.border }]}>
          <ThemedText type="smallBold" style={styles.term}>
            {term}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {definition}
          </ThemedText>
        </ThemedView>
      ))}

      {terms.length === 0 && (
        <ThemedText themeColor="textSecondary">No terms match “{query.trim()}”.</ThemedText>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  heroBubble: {
    flex: 1,
  },
  search: {
    fontFamily: FontFamily.regular,
    borderWidth: 2,
    fontSize: 16,
    paddingVertical: Spacing.two + Spacing.half,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
  },
  card: {
    borderWidth: 2,
    gap: Spacing.one,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
  term: {
    fontSize: 16,
  },
});
