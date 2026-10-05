import { useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

import { CryptoCan } from '@/components/crypto-can';
import { ThemedText } from '@/components/themed-text';
import { Fonts, Spacing } from '@/constants/theme';
import type { Visual } from '@/content/lessons';
import { useTheme } from '@/hooks/use-theme';

export type Tint = { soft: string; strong: string };

type Props<K extends Visual['kind']> = { visual: Extract<Visual, { kind: K }>; tint: Tint };

function Panel({ tint, children }: { tint: Tint; children: ReactNode }) {
  return <View style={[styles.panel, { backgroundColor: tint.soft }]}>{children}</View>;
}

function Scene({ visual, tint }: Props<'scene'>) {
  return (
    <Panel tint={tint}>
      <View style={styles.sceneRow}>
        {visual.emojis.map((emoji, index) => (
          <ThemedText key={index} style={emoji === '➡️' || emoji === '🟰' ? styles.sceneJoin : styles.sceneEmoji}>
            {emoji}
          </ThemedText>
        ))}
      </View>
      {visual.caption && <ThemedText type="smallBold">{visual.caption}</ThemedText>}
    </Panel>
  );
}

function Stat({ visual, tint }: Props<'stat'>) {
  return (
    <Panel tint={tint}>
      <ThemedText type="title" style={[styles.center, { color: tint.strong }]}>
        {visual.value}
      </ThemedText>
      <ThemedText type="smallBold" style={styles.center}>
        {visual.label}
      </ThemedText>
    </Panel>
  );
}

function Compare({ visual, tint }: Props<'compare'>) {
  return (
    <View style={styles.compare}>
      {[visual.left, visual.right].map((side) => (
        <View key={side.title} style={[styles.compareSide, { backgroundColor: tint.soft }]}>
          <ThemedText style={styles.compareEmoji}>{side.emoji}</ThemedText>
          <ThemedText type="smallBold" style={styles.compareTitle}>
            {side.title}
          </ThemedText>
          {side.points.map((point) => (
            <ThemedText key={point} type="small" style={styles.center}>
              {point}
            </ThemedText>
          ))}
        </View>
      ))}
    </View>
  );
}

function Flow({ visual, tint }: Props<'flow'>) {
  return (
    <Panel tint={tint}>
      <View style={styles.flow}>
        {visual.steps.map((step, index) => (
          <View key={step.label}>
            {index > 0 && <View style={[styles.flowLine, { backgroundColor: tint.strong }]} />}
            <View style={styles.flowStep}>
              <View style={[styles.flowDot, { borderColor: tint.strong }]}>
                <ThemedText style={styles.flowEmoji}>{step.emoji}</ThemedText>
              </View>
              <ThemedText type="smallBold" style={styles.flowLabel}>
                {step.label}
              </ThemedText>
            </View>
          </View>
        ))}
      </View>
    </Panel>
  );
}

// Points on a circle, used to lay out both little networks.
function ring(cx: number, cy: number, radius: number, count: number) {
  return Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  });
}

function Network({ tint }: Props<'network'>) {
  const theme = useTheme();
  const customers = ring(75, 70, 52, 5);
  const peers = ring(225, 70, 52, 6);

  return (
    <Panel tint={tint}>
      <Svg width="100%" height={150} viewBox="0 0 300 140">
        {customers.map((point, index) => (
          <Line key={index} x1={75} y1={70} x2={point.x} y2={point.y} stroke={theme.textSecondary} strokeWidth={2} />
        ))}
        {customers.map((point, index) => (
          <Circle key={index} cx={point.x} cy={point.y} r={9} fill={theme.textSecondary} />
        ))}
        <Circle cx={75} cy={70} r={18} fill={tint.strong} />

        {peers.flatMap((from, a) =>
          peers.slice(a + 1).map((to, b) => (
            <Line key={`${a}-${b}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={tint.strong} strokeWidth={2} opacity={0.4} />
          )),
        )}
        {peers.map((point, index) => (
          <Circle key={index} cx={point.x} cy={point.y} r={11} fill={tint.strong} />
        ))}
      </Svg>
      <View style={styles.networkLabels}>
        <ThemedText type="smallBold" style={styles.networkLabel}>
          🏦 One bank in charge
        </ThemedText>
        <ThemedText type="smallBold" style={styles.networkLabel}>
          🌐 Everyone keeps a copy
        </ThemedText>
      </View>
    </Panel>
  );
}

const FINGERPRINTS = ['a3f', '7c1', 'e90', '4b2'];

function Chain({ tint }: Props<'chain'>) {
  const theme = useTheme();
  const [tampered, setTampered] = useState<number | null>(null);

  return (
    <Panel tint={tint}>
      <View style={styles.chainRow}>
        {FINGERPRINTS.map((fingerprint, index) => {
          const changed = tampered === index;
          const broken = tampered !== null && index > tampered;
          return (
            <View key={fingerprint} style={styles.chainItem}>
              {index > 0 && (
                <ThemedText type="smallBold" style={{ color: broken ? theme.danger : tint.strong }}>
                  {broken ? '✕' : '—'}
                </ThemedText>
              )}
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Block ${index + 1}`}
                onPress={() => setTampered(changed ? null : index)}
                style={({ pressed }) => [
                  styles.block,
                  {
                    backgroundColor: changed ? theme.dangerSoft : theme.background,
                    borderColor: changed || broken ? theme.danger : tint.strong,
                  },
                  pressed && styles.pressed,
                ]}>
                <ThemedText style={styles.blockEmoji}>{changed ? '✏️' : '📄'}</ThemedText>
                <ThemedText type="code" style={changed && { color: theme.danger }}>
                  {changed ? 'z8k' : fingerprint}
                </ThemedText>
              </Pressable>
            </View>
          );
        })}
      </View>
      <ThemedText type="smallBold" style={styles.center}>
        {tampered === null
          ? 'All four fingerprints match. The chain is healthy.'
          : tampered === FINGERPRINTS.length - 1
            ? 'Its fingerprint changed, so every other computer rejects your copy.'
            : 'Its fingerprint changed, so the blocks after it no longer link up. Everyone rejects your copy.'}
      </ThemedText>
    </Panel>
  );
}

const SEED_WORDS = ['apple', 'river', 'candle', 'tiger', 'ocean', 'violin', 'maple', 'rocket', 'garden', 'silver', 'puzzle', 'window'];

function Seed({ tint }: Props<'seed'>) {
  const theme = useTheme();
  return (
    <Panel tint={tint}>
      <View style={styles.seedGrid}>
        {SEED_WORDS.map((word, index) => (
          <View key={word} style={[styles.seedWord, { backgroundColor: theme.background }]}>
            <ThemedText type="small" themeColor="textSecondary">
              {index + 1}
            </ThemedText>
            <ThemedText type="smallBold">{word}</ThemedText>
          </View>
        ))}
      </View>
      <ThemedText type="small" themeColor="textSecondary">
        Made-up example
      </ThemedText>
    </Panel>
  );
}

function Reveal({ visual, tint }: Props<'reveal'>) {
  const theme = useTheme();
  const [revealed, setRevealed] = useState<number[]>([]);

  return (
    <View style={styles.list}>
      {visual.items.map((item, index) => {
        const open = revealed.includes(index);
        return (
          <Pressable
            key={item.label}
            accessibilityRole="button"
            onPress={() => setRevealed(open ? revealed.filter((i) => i !== index) : [...revealed, index])}
            style={({ pressed }) => [
              styles.row,
              { backgroundColor: open ? (item.good ? theme.successSoft : theme.dangerSoft) : tint.soft },
              pressed && styles.pressed,
            ]}>
            <ThemedText style={styles.rowEmoji}>{item.emoji}</ThemedText>
            <View style={styles.rowText}>
              <ThemedText type="smallBold" style={styles.rowLabel}>
                {item.label}
              </ThemedText>
              {open && <ThemedText type="small">{item.verdict}</ThemedText>}
            </View>
            <ThemedText type="smallBold" style={{ color: open ? (item.good ? theme.success : theme.danger) : tint.strong }}>
              {open ? (item.good ? '✓' : '✕') : 'Tap'}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

function Choice({ visual, tint }: Props<'choice'>) {
  const theme = useTheme();
  const [picked, setPicked] = useState<number | null>(null);
  const answer = picked === null ? undefined : visual.options[picked];

  return (
    <View style={styles.list}>
      {visual.options.map((option, index) => {
        const selected = index === picked;
        return (
          <Pressable
            key={option.label}
            accessibilityRole="button"
            onPress={() => setPicked(index)}
            style={({ pressed }) => [
              styles.row,
              { backgroundColor: selected ? (option.good ? theme.successSoft : theme.dangerSoft) : tint.soft },
              pressed && styles.pressed,
            ]}>
            <ThemedText type="smallBold" style={[styles.rowLabel, styles.rowText]}>
              {option.label}
            </ThemedText>
          </Pressable>
        );
      })}
      {answer && (
        <View style={styles.reply}>
          <CryptoCan size={64} mood={answer.good ? 'cheer' : 'happy'} />
          <ThemedText type="smallBold" style={[styles.rowLabel, styles.rowText]}>
            {answer.reply}
          </ThemedText>
        </View>
      )}
    </View>
  );
}

function Takeaways({ visual, tint }: Props<'takeaways'>) {
  return (
    <View style={styles.list}>
      {visual.items.map((item) => (
        <View key={item.text} style={[styles.row, { backgroundColor: tint.soft }]}>
          <ThemedText style={styles.rowEmoji}>{item.emoji}</ThemedText>
          <ThemedText type="smallBold" style={[styles.rowLabel, styles.rowText]}>
            {item.text}
          </ThemedText>
        </View>
      ))}
    </View>
  );
}

export function LessonVisual({ visual, tint }: { visual: Visual; tint: Tint }) {
  switch (visual.kind) {
    case 'scene':
      return <Scene visual={visual} tint={tint} />;
    case 'stat':
      return <Stat visual={visual} tint={tint} />;
    case 'compare':
      return <Compare visual={visual} tint={tint} />;
    case 'flow':
      return <Flow visual={visual} tint={tint} />;
    case 'network':
      return <Network visual={visual} tint={tint} />;
    case 'chain':
      return <Chain visual={visual} tint={tint} />;
    case 'seed':
      return <Seed visual={visual} tint={tint} />;
    case 'reveal':
      return <Reveal visual={visual} tint={tint} />;
    case 'choice':
      return <Choice visual={visual} tint={tint} />;
    case 'takeaways':
      return <Takeaways visual={visual} tint={tint} />;
  }
}

const RADIUS = 24;

const styles = StyleSheet.create({
  panel: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 180,
    borderRadius: RADIUS,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  center: {
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  sceneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  sceneEmoji: {
    fontFamily: Fonts.sans,
    fontSize: 52,
    lineHeight: 64,
  },
  sceneJoin: {
    fontFamily: Fonts.sans,
    fontSize: 22,
    lineHeight: 64,
  },
  compare: {
    flexDirection: 'row',
    gap: Spacing.two + Spacing.one,
  },
  compareSide: {
    flex: 1,
    alignItems: 'center',
    borderRadius: RADIUS,
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.two + Spacing.one,
    gap: Spacing.two,
  },
  compareEmoji: {
    fontFamily: Fonts.sans,
    fontSize: 40,
    lineHeight: 50,
  },
  compareTitle: {
    fontSize: 17,
    lineHeight: 22,
    textAlign: 'center',
  },
  flow: {
    alignSelf: 'stretch',
  },
  flowStep: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  flowDot: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flowEmoji: {
    fontFamily: Fonts.sans,
    fontSize: 24,
    lineHeight: 32,
  },
  flowLine: {
    width: 2,
    height: Spacing.three,
    marginLeft: 25,
  },
  flowLabel: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
  networkLabels: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  networkLabel: {
    flex: 1,
    textAlign: 'center',
  },
  chainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  chainItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: Spacing.one,
  },
  block: {
    flex: 1,
    maxWidth: 64,
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: Spacing.three,
    paddingVertical: Spacing.two,
    gap: Spacing.half,
  },
  blockEmoji: {
    fontFamily: Fonts.sans,
    fontSize: 22,
    lineHeight: 28,
  },
  seedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  seedWord: {
    flexDirection: 'row',
    gap: Spacing.one,
    width: '30%',
    borderRadius: Spacing.two,
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
  },
  list: {
    gap: Spacing.two + Spacing.one,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    borderRadius: Spacing.four - Spacing.one,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
  },
  rowEmoji: {
    fontFamily: Fonts.sans,
    fontSize: 28,
    lineHeight: 36,
  },
  rowText: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 16,
    lineHeight: 22,
  },
  reply: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingTop: Spacing.one,
  },
});
