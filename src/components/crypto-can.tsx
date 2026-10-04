import { useEffect, useState } from 'react';
import { Animated, Easing, Platform } from 'react-native';
import Svg, { Circle, Ellipse, Path } from 'react-native-svg';

export type Mood = 'happy' | 'wave' | 'cheer' | 'sad';

const GREEN = '#32B950';
const DARK_GREEN = '#24903C';
const BLUE = '#1CA4F0';
const RED = '#F0524F';
const YELLOW = '#FFD23F';
const INK = '#263238';

const useNativeDriver = Platform.OS !== 'web';

/** Crypto Can, the parrot mascot. */
export function CryptoCan({ size = 140, mood = 'happy' }: { size?: number; mood?: Mood }) {
  const [bob] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, {
          toValue: 1,
          duration: mood === 'cheer' ? 350 : 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver,
        }),
        Animated.timing(bob, {
          toValue: 0,
          duration: mood === 'cheer' ? 350 : 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [bob, mood]);

  const translateY = bob.interpolate({
    inputRange: [0, 1],
    outputRange: [0, mood === 'cheer' ? -size * 0.08 : -size * 0.03],
  });

  const leftWingUp = mood === 'cheer';
  const rightWingUp = mood === 'cheer' || mood === 'wave';

  return (
    <Animated.View style={{ width: size, height: size * 1.05, transform: [{ translateY }] }}>
      <Svg width="100%" height="100%" viewBox="0 0 200 210">
        {/* tail */}
        <Ellipse cx={152} cy={180} rx={10} ry={26} fill={RED} transform="rotate(-50 152 180)" />
        <Ellipse cx={146} cy={190} rx={9} ry={22} fill={BLUE} transform="rotate(-32 146 190)" />

        {/* feet */}
        <Ellipse cx={82} cy={200} rx={13} ry={6} fill="#FFA91F" />
        <Ellipse cx={118} cy={200} rx={13} ry={6} fill="#FFA91F" />

        {/* wings */}
        <Ellipse
          cx={48}
          cy={144}
          rx={16}
          ry={34}
          fill={DARK_GREEN}
          transform={leftWingUp ? 'rotate(140 56 118)' : 'rotate(12 48 144)'}
        />
        <Ellipse
          cx={152}
          cy={144}
          rx={16}
          ry={34}
          fill={DARK_GREEN}
          transform={rightWingUp ? 'rotate(-140 144 118)' : 'rotate(-12 152 144)'}
        />

        {/* body */}
        <Ellipse cx={100} cy={142} rx={54} ry={58} fill={GREEN} />
        <Ellipse cx={100} cy={154} rx={34} ry={38} fill="#FFE98A" />

        {/* crest */}
        <Ellipse cx={86} cy={30} rx={6} ry={14} fill={YELLOW} transform="rotate(-25 86 30)" />
        <Ellipse cx={114} cy={30} rx={6} ry={14} fill={BLUE} transform="rotate(25 114 30)" />
        <Ellipse cx={100} cy={24} rx={7} ry={17} fill={RED} />

        {/* head */}
        <Circle cx={100} cy={76} r={46} fill={GREEN} />
        <Circle cx={63} cy={92} r={7} fill="#FF8FA3" opacity={0.7} />
        <Circle cx={137} cy={92} r={7} fill="#FF8FA3" opacity={0.7} />

        {/* eyes */}
        <Circle cx={80} cy={70} r={16} fill="#ffffff" />
        <Circle cx={120} cy={70} r={16} fill="#ffffff" />
        {mood === 'cheer' ? (
          <>
            <Path d="M71 73 Q80 61 89 73" stroke={INK} strokeWidth={4} strokeLinecap="round" fill="none" />
            <Path d="M111 73 Q120 61 129 73" stroke={INK} strokeWidth={4} strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            <Circle cx={83} cy={mood === 'sad' ? 76 : 71} r={8} fill={INK} />
            <Circle cx={117} cy={mood === 'sad' ? 76 : 71} r={8} fill={INK} />
            <Circle cx={86} cy={mood === 'sad' ? 73 : 68} r={2.5} fill="#ffffff" />
            <Circle cx={120} cy={mood === 'sad' ? 73 : 68} r={2.5} fill="#ffffff" />
          </>
        )}
        {mood === 'sad' && (
          <>
            <Path d="M64 60 L92 50" stroke={DARK_GREEN} strokeWidth={6} strokeLinecap="round" />
            <Path d="M136 60 L108 50" stroke={DARK_GREEN} strokeWidth={6} strokeLinecap="round" />
          </>
        )}

        {/* beak */}
        {(mood === 'cheer' || mood === 'wave') && (
          <Path d="M90 104 Q100 126 110 104 Z" fill="#D97800" />
        )}
        <Path d="M86 86 Q100 76 114 86 Q114 104 100 112 Q86 104 86 86 Z" fill="#FFA91F" />
      </Svg>
    </Animated.View>
  );
}
