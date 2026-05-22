import { AppText, Button, Card } from '@/src/components/ui';
import { colors, radii, shadows, spacing } from '@/src/theme';
import { router } from 'expo-router';
import { Check, ChevronLeft, Delete, Sparkles, Timer, X, Zap } from 'lucide-react-native';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Pressable, Vibration, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

type Difficulty = 'Easy' | 'Medium' | 'Hard';
type Feedback = 'idle' | 'correct' | 'wrong';

type MathQuestion = {
  equation: string;
  answer: number;
  difficulty: Difficulty;
  hint: string;
};

const TIMER_SECONDS = 30;
const RING_SIZE = 142;
const RING_STROKE = 12;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(items: T[]) {
  return items[randomInt(0, items.length - 1)];
}

function generateEasyQuestion(): MathQuestion {
  const type = pick(['add', 'subtract', 'multiply', 'divide'] as const);

  if (type === 'add') {
    const a = randomInt(4, 24);
    const b = randomInt(3, Math.min(24, 49 - a));
    return { equation: `${a} + ${b} = ?`, answer: a + b, difficulty: 'Easy', hint: 'Quick addition' };
  }

  if (type === 'subtract') {
    const answer = randomInt(4, 42);
    const b = randomInt(3, 28);
    return { equation: `${answer + b} - ${b} = ?`, answer, difficulty: 'Easy', hint: 'No negative answers' };
  }

  if (type === 'multiply') {
    let a = randomInt(2, 9);
    let b = randomInt(2, 9);
    while (a * b >= 50) {
      a = randomInt(2, 9);
      b = randomInt(2, 9);
    }
    return { equation: `${a} × ${b} = ?`, answer: a * b, difficulty: 'Easy', hint: 'Times table warm-up' };
  }

  const answer = randomInt(2, 9);
  const divisor = randomInt(2, 9);
  return { equation: `${answer * divisor} ÷ ${divisor} = ?`, answer, difficulty: 'Easy', hint: 'Clean division only' };
}

function generateMediumQuestion(): MathQuestion {
  const type = pick(['add', 'subtract', 'multiply', 'divide', 'mixed'] as const);

  if (type === 'add') {
    const a = randomInt(35, 89);
    const b = randomInt(18, Math.min(60, 149 - a));
    return { equation: `${a} + ${b} = ?`, answer: a + b, difficulty: 'Medium', hint: 'Answer stays under 150' };
  }

  if (type === 'subtract') {
    const answer = randomInt(35, 120);
    const b = randomInt(14, 62);
    return { equation: `${answer + b} - ${b} = ?`, answer, difficulty: 'Medium', hint: 'Clean subtraction' };
  }

  if (type === 'multiply') {
    const a = randomInt(11, 18);
    const b = randomInt(3, 8);
    return { equation: `${a} × ${b} = ?`, answer: a * b, difficulty: 'Medium', hint: '2-digit mental multiply' };
  }

  if (type === 'divide') {
    const answer = randomInt(10, 18);
    const divisor = randomInt(4, 9);
    return { equation: `${answer * divisor} ÷ ${divisor} = ?`, answer, difficulty: 'Medium', hint: 'Integer answer guaranteed' };
  }

  const a = randomInt(6, 12);
  const b = randomInt(4, 9);
  const c = randomInt(8, 34);
  const answer = a * b + c;
  return { equation: `${a} × ${b} + ${c} = ?`, answer, difficulty: 'Medium', hint: 'Multiply first, then add' };
}

function generateHardQuestion(): MathQuestion {
  const type = pick(['mixedAdd', 'mixedSubtract', 'largeDivide', 'twoStep'] as const);

  if (type === 'mixedAdd') {
    const a = randomInt(11, 16);
    const b = randomInt(6, 9);
    const c = randomInt(12, 38);
    const answer = a * b + c;
    return { equation: `${a} × ${b} + ${c} = ?`, answer, difficulty: 'Hard', hint: 'Still mental, still clean' };
  }

  if (type === 'mixedSubtract') {
    const a = randomInt(12, 18);
    const b = randomInt(6, 9);
    const subtract = randomInt(9, 30);
    const answer = a * b - subtract;
    return { equation: `${a} × ${b} - ${subtract} = ?`, answer, difficulty: 'Hard', hint: 'No negative answers' };
  }

  if (type === 'largeDivide') {
    const answer = randomInt(12, 24);
    const divisor = randomInt(6, 9);
    return { equation: `${answer * divisor} ÷ ${divisor} = ?`, answer, difficulty: 'Hard', hint: 'Clean division, no decimals' };
  }

  const a = randomInt(40, 86);
  const b = randomInt(17, 49);
  const c = randomInt(8, 27);
  const answer = a + b - c;
  return { equation: `${a} + ${b} - ${c} = ?`, answer, difficulty: 'Hard', hint: 'Fast two-step focus' };
}

function generateQuestion(difficulty: Difficulty) {
  if (difficulty === 'Easy') return generateEasyQuestion();
  if (difficulty === 'Medium') return generateMediumQuestion();
  return generateHardQuestion();
}

function TimerRing({ remaining }: { remaining: number }) {
  const progress = remaining / TIMER_SECONDS;
  const dashOffset = RING_CIRCUMFERENCE * (1 - progress);

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg height={RING_SIZE} width={RING_SIZE}>
        <Circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          fill="transparent"
          r={RING_RADIUS}
          stroke="rgba(255,255,255,0.72)"
          strokeWidth={RING_STROKE}
        />
        <Circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          fill="transparent"
          r={RING_RADIUS}
          stroke={remaining <= 8 ? colors.coral : colors.primaryDeep}
          strokeDasharray={`${RING_CIRCUMFERENCE} ${RING_CIRCUMFERENCE}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          strokeWidth={RING_STROKE}
          transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
        />
      </Svg>
      <View style={{ alignItems: 'center', position: 'absolute' }}>
        <Timer color={remaining <= 8 ? colors.coral : colors.primaryDeep} size={24} />
        <AppText variant="display" tone={remaining <= 8 ? 'danger' : 'accent'}>{remaining}</AppText>
        <AppText variant="caption" tone="secondary">seconds</AppText>
      </View>
    </View>
  );
}

function KeyButton({ label, onPress, tone = 'number' }: { label: string; onPress: () => void; tone?: 'number' | 'delete' | 'submit' }) {
  const backgroundColor = tone === 'submit' ? colors.primaryDeep : tone === 'delete' ? colors.surfacePeach : colors.surface;
  const textTone = tone === 'submit' ? 'inverse' : 'accent';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        alignItems: 'center',
        backgroundColor,
        borderColor: tone === 'number' ? colors.border : 'transparent',
        borderRadius: radii.xl,
        borderWidth: 1,
        flex: 1,
        justifyContent: 'center',
        minHeight: 64,
        opacity: pressed ? 0.78 : 1,
        transform: [{ scale: pressed ? 0.97 : 1 }],
        ...shadows.soft,
      })}>
      <AppText variant="titleSmall" tone={textTone}>{label}</AppText>
    </Pressable>
  );
}

export default function ChallengeScreen() {
  const [difficulty, setDifficulty] = useState<Difficulty>('Easy');
  const [question, setQuestion] = useState(() => generateQuestion('Easy'));
  const [answerText, setAnswerText] = useState('');
  const [feedback, setFeedback] = useState<Feedback>('idle');
  const [remaining, setRemaining] = useState(TIMER_SECONDS);
  const [score, setScore] = useState(0);
  const shake = useRef(new Animated.Value(0)).current;

  const keypad = useMemo(() => ['1', '2', '3', '4', '5', '6', '7', '8', '9'], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          setFeedback('wrong');
          return TIMER_SECONDS;
        }
        return current - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const resetQuestion = (nextDifficulty = difficulty) => {
    setQuestion(generateQuestion(nextDifficulty));
    setAnswerText('');
    setFeedback('idle');
    setRemaining(TIMER_SECONDS);
  };

  const chooseDifficulty = (nextDifficulty: Difficulty) => {
    setDifficulty(nextDifficulty);
    resetQuestion(nextDifficulty);
  };

  const submitAnswer = () => {
    if (!answerText) return;

    const isCorrect = Number(answerText) === question.answer;
    setFeedback(isCorrect ? 'correct' : 'wrong');
    Vibration.vibrate(isCorrect ? 30 : [0, 35, 45, 35]);

    if (isCorrect) {
      setScore((current) => current + 1);
      setTimeout(() => resetQuestion(), 520);
      return;
    }

    Animated.sequence([
      Animated.timing(shake, { duration: 55, toValue: -10, useNativeDriver: true }),
      Animated.timing(shake, { duration: 55, toValue: 10, useNativeDriver: true }),
      Animated.timing(shake, { duration: 55, toValue: -6, useNativeDriver: true }),
      Animated.timing(shake, { duration: 55, toValue: 0, useNativeDriver: true }),
    ]).start();
    setTimeout(() => setFeedback('idle'), 700);
  };

  const appendDigit = (digit: string) => {
    if (answerText.length >= 4) return;
    setFeedback('idle');
    setAnswerText((current) => `${current}${digit}`);
  };

  const deleteDigit = () => {
    setFeedback('idle');
    setAnswerText((current) => current.slice(0, -1));
  };

  const feedbackColor = feedback === 'correct' ? colors.success : feedback === 'wrong' ? colors.coral : colors.primaryDeep;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1, padding: spacing[5], gap: spacing[4] }}>
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Pressable
            onPress={() => router.back()}
            style={{ alignItems: 'center', backgroundColor: colors.surface, borderRadius: radii.full, height: 46, justifyContent: 'center', width: 46, ...shadows.soft }}>
            <ChevronLeft color={colors.primaryDeep} size={24} />
          </Pressable>
          <View style={{ alignItems: 'center' }}>
            <AppText variant="label" tone="accent">Wake-up Math</AppText>
            <AppText variant="caption" tone="secondary">Whole numbers only</AppText>
          </View>
          <View style={{ alignItems: 'center', backgroundColor: colors.surfaceGold, borderRadius: radii.full, height: 46, justifyContent: 'center', width: 46 }}>
            <Zap color={colors.primaryDeep} size={22} />
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: spacing[2] }}>
          {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map((item) => {
            const active = item === difficulty;
            return (
              <Pressable
                key={item}
                onPress={() => chooseDifficulty(item)}
                style={{
                  alignItems: 'center',
                  backgroundColor: active ? colors.primaryDeep : colors.surface,
                  borderColor: active ? colors.primaryDeep : colors.border,
                  borderRadius: radii.full,
                  borderWidth: 1,
                  flex: 1,
                  paddingVertical: spacing[2],
                }}>
                <AppText variant="caption" tone={active ? 'inverse' : 'accent'}>{item}</AppText>
              </Pressable>
            );
          })}
        </View>

        <Card elevated tonal="lavender" style={{ alignItems: 'center', gap: spacing[5], overflow: 'hidden', padding: spacing[5] }}>
          <View pointerEvents="none" style={{ backgroundColor: colors.surfaceGold, borderRadius: radii.full, height: 86, opacity: 0.7, position: 'absolute', right: -24, top: -28, width: 86 }} />
          <View pointerEvents="none" style={{ backgroundColor: colors.surface, borderRadius: radii.full, bottom: -30, height: 100, left: -34, opacity: 0.58, position: 'absolute', width: 100 }} />
          <Sparkles color={colors.primaryDeep} size={20} style={{ position: 'absolute', right: spacing[5], top: spacing[5] }} />

          <TimerRing remaining={remaining} />

          <View style={{ alignItems: 'center', gap: spacing[2] }}>
            <AppText variant="caption" tone="secondary">{question.hint}</AppText>
            <Animated.View style={{ transform: [{ translateX: shake }] }}>
              <AppText align="center" variant="hero" style={{ color: feedbackColor }}>{question.equation}</AppText>
            </Animated.View>
          </View>

          <View
            style={{
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.72)',
              borderColor: feedback === 'wrong' ? colors.coral : feedback === 'correct' ? colors.success : colors.border,
              borderRadius: radii.xl,
              borderWidth: 1,
              minHeight: 76,
              justifyContent: 'center',
              paddingHorizontal: spacing[5],
              width: '100%',
            }}>
            <AppText variant="display" tone={answerText ? 'default' : 'muted'}>{answerText || 'Answer'}</AppText>
          </View>

          <View style={{ alignItems: 'center', flexDirection: 'row', gap: spacing[2] }}>
            <View style={{ alignItems: 'center', backgroundColor: colors.surface, borderRadius: radii.full, flexDirection: 'row', gap: spacing[1], paddingHorizontal: spacing[3], paddingVertical: spacing[2] }}>
              <Check color={colors.success} size={16} />
              <AppText variant="caption" tone="secondary">No decimals</AppText>
            </View>
            <View style={{ alignItems: 'center', backgroundColor: colors.surface, borderRadius: radii.full, flexDirection: 'row', gap: spacing[1], paddingHorizontal: spacing[3], paddingVertical: spacing[2] }}>
              <X color={colors.coral} size={16} />
              <AppText variant="caption" tone="secondary">No fractions</AppText>
            </View>
          </View>
        </Card>

        <View style={{ gap: spacing[2] }}>
          {[0, 3, 6].map((start) => (
            <View key={start} style={{ flexDirection: 'row', gap: spacing[2] }}>
              {keypad.slice(start, start + 3).map((digit) => (
                <KeyButton key={digit} label={digit} onPress={() => appendDigit(digit)} />
              ))}
            </View>
          ))}
          <View style={{ flexDirection: 'row', gap: spacing[2] }}>
            <KeyButton label="0" onPress={() => appendDigit('0')} />
            <KeyButton label="⌫" onPress={deleteDigit} tone="delete" />
            <KeyButton label="Go" onPress={submitAnswer} tone="submit" />
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: spacing[3] }}>
          <Card style={{ alignItems: 'center', flex: 1, padding: spacing[3] }}>
            <AppText variant="label" tone="accent">Score</AppText>
            <AppText variant="titleSmall">{score}</AppText>
          </Card>
          <Card style={{ alignItems: 'center', flex: 1, padding: spacing[3] }}>
            <AppText variant="label" tone="accent">Answer Type</AppText>
            <AppText variant="titleSmall">Integer</AppText>
          </Card>
        </View>

        <Button fullWidth onPress={() => resetQuestion()}>New clean question</Button>
      </View>
    </SafeAreaView>
  );
}
