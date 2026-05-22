import { AppText, Button, Card, Toggle } from '@/src/components/ui';
import { useAlarmStore } from '@/src/state/alarmStore';
import { colors, radii, spacing, shadows } from '@/src/theme';
import { AlarmClock, BellRing, CheckCircle2, Flame, Send, Volume2, XCircle } from 'lucide-react-native';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

function buildRandomWrongAnswers(answer: number) {
  const values = new Set<number>();
  while (values.size < 3) {
    const offset = Math.floor(Math.random() * 16) - 8 || 4;
    const next = Math.max(0, answer + offset);
    if (next !== answer) values.add(next);
  }
  return Array.from(values);
}

export function WakeUpOverlay() {
  const { triggeredAlarm, dismissTriggeredAlarm, snoozeTriggeredAlarm } = useAlarmStore();
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [memeChoice, setMemeChoice] = useState('');
  const [pulseOn, setPulseOn] = useState(false);

  useEffect(() => {
    if (!triggeredAlarm) return;
    setAnswer('');
    setFeedback('idle');
    setMemeChoice('');
    const pulse = setInterval(() => setPulseOn((value) => !value), 420);
    return () => clearInterval(pulse);
  }, [triggeredAlarm]);

  const mathChoices = useMemo(() => {
    if (!triggeredAlarm) return [];
    return [...buildRandomWrongAnswers(triggeredAlarm.mathQuestion.answer), triggeredAlarm.mathQuestion.answer].sort(() => Math.random() - 0.5);
  }, [triggeredAlarm?.triggeredAt]);

  if (!triggeredAlarm) return null;

  const alarm = triggeredAlarm.alarm;
  const resolvedChallenge = alarm.challengeType === 'Random' ? 'Math' : alarm.challengeType;
  const noChallenge = resolvedChallenge === 'None';

  const validateMath = (value = answer) => {
    const parsed = Number(value);
    if (Number.isInteger(parsed) && parsed === triggeredAlarm.mathQuestion.answer) {
      setFeedback('correct');
      setTimeout(dismissTriggeredAlarm, 420);
      return;
    }
    setFeedback('wrong');
    setTimeout(() => setFeedback('idle'), 500);
  };

  const validateMeme = (choice: string) => {
    setMemeChoice(choice);
    if (choice === triggeredAlarm.memeQuestion.answer) {
      setFeedback('correct');
      setTimeout(dismissTriggeredAlarm, 420);
      return;
    }
    setFeedback('wrong');
    setTimeout(() => setFeedback('idle'), 500);
  };

  return (
    <View style={styles.overlay}>
      <View pointerEvents="none" style={[styles.ring, pulseOn ? styles.ringOn : null]} />
      <View pointerEvents="none" style={[styles.ringSmall, pulseOn ? styles.ringSmallOn : null]} />
      <View style={[styles.sheet, feedback === 'wrong' ? styles.wrongShake : null]}>
        <View style={{ alignItems: 'center', gap: spacing[3] }}>
          <View style={[styles.alarmIcon, pulseOn ? { transform: [{ rotate: '-4deg' }, { scale: 1.04 }] } : { transform: [{ rotate: '4deg' }, { scale: 1 }] }]}>
            <BellRing color={colors.white} size={38} />
          </View>
          <AppText variant="label" tone="inverse">ALARM RINGING</AppText>
          <AppText variant="hero" tone="inverse" style={{ textAlign: 'center' }}>{alarm.label}</AppText>
          <AppText variant="bodyLarge" tone="inverse" style={{ opacity: 0.82, textAlign: 'center' }}>{alarm.sound} • {alarm.vibration ? 'Vibration on' : 'Silent vibration'}</AppText>
        </View>

        <Card style={{ gap: spacing[4], width: '100%' }}>
          {noChallenge ? (
            <View style={{ alignItems: 'center', gap: spacing[3] }}>
              <AlarmClock color={colors.primaryDeep} size={36} />
              <AppText variant="titleSmall" style={{ textAlign: 'center' }}>No challenge selected</AppText>
              <AppText variant="bodySmall" tone="secondary" style={{ textAlign: 'center' }}>Tap dismiss to stop this preview/alarm.</AppText>
              <Button fullWidth onPress={dismissTriggeredAlarm}>Dismiss Alarm</Button>
            </View>
          ) : resolvedChallenge === 'Meme' ? (
            <View style={{ gap: spacing[4] }}>
              <View style={{ alignItems: 'center', gap: spacing[2] }}>
                <Flame color={colors.primaryDeep} size={30} />
                <AppText variant="titleSmall" style={{ textAlign: 'center' }}>{triggeredAlarm.memeQuestion.prompt}</AppText>
                <AppText variant="caption" tone="secondary">Pick the correct Gen Z wake-up response.</AppText>
              </View>
              {triggeredAlarm.memeQuestion.options.map((option) => (
                <Pressable key={option} onPress={() => validateMeme(option)} style={[styles.memeOption, memeChoice === option ? styles.memeOptionSelected : null]}>
                  <AppText variant="bodyLarge" tone={memeChoice === option ? 'accent' : 'default'}>{option}</AppText>
                </Pressable>
              ))}
            </View>
          ) : (
            <View style={{ gap: spacing[4] }}>
              <View style={{ alignItems: 'center', gap: spacing[2] }}>
                <Volume2 color={colors.primaryDeep} size={28} />
                <AppText variant="label" tone="accent">Solve to dismiss</AppText>
                <AppText variant="hero" style={{ textAlign: 'center' }}>{triggeredAlarm.mathQuestion.prompt}</AppText>
                <AppText variant="caption" tone="secondary">Integer answers only. No decimals. No fractions.</AppText>
              </View>
              <View style={{ flexDirection: 'row', gap: spacing[2] }}>
                <TextInput
                  keyboardType="number-pad"
                  onChangeText={setAnswer}
                  placeholder="Answer"
                  placeholderTextColor={colors.textMuted}
                  value={answer}
                  style={styles.answerInput}
                />
                <Pressable onPress={() => validateMath()} style={styles.sendButton}><Send color={colors.white} size={20} /></Pressable>
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2] }}>
                {mathChoices.map((choice) => (
                  <Pressable key={choice} onPress={() => validateMath(String(choice))} style={styles.choiceButton}>
                    <AppText variant="bodyLarge" tone="accent">{choice}</AppText>
                  </Pressable>
                ))}
              </View>
            </View>
          )}
        </Card>

        {feedback !== 'idle' ? (
          <View style={[styles.feedback, feedback === 'correct' ? styles.feedbackCorrect : styles.feedbackWrong]}>
            {feedback === 'correct' ? <CheckCircle2 color={colors.white} size={18} /> : <XCircle color={colors.white} size={18} />}
            <AppText variant="bodySmall" tone="inverse">{feedback === 'correct' ? 'Challenge cleared' : 'Nope. Wake up and try again.'}</AppText>
          </View>
        ) : null}

        {alarm.snooze && !noChallenge ? (
          <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
            <Toggle value={false} label="5 min snooze after challenge" onValueChange={snoozeTriggeredAlarm} />
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: 'rgba(45, 32, 66, 0.96)',
    justifyContent: 'center',
    padding: spacing[5],
    zIndex: 1000,
  },
  ring: {
    borderColor: 'rgba(255,255,255,0.18)',
    borderRadius: radii.full,
    borderWidth: 2,
    height: 340,
    position: 'absolute',
    width: 340,
  },
  ringOn: {
    borderColor: 'rgba(255,211,159,0.64)',
    transform: [{ scale: 1.08 }],
  },
  ringSmall: {
    borderColor: 'rgba(255,255,255,0.16)',
    borderRadius: radii.full,
    borderWidth: 2,
    height: 230,
    position: 'absolute',
    width: 230,
  },
  ringSmallOn: {
    borderColor: 'rgba(202,183,255,0.76)',
    transform: [{ scale: 0.94 }],
  },
  sheet: {
    alignItems: 'center',
    gap: spacing[5],
    maxWidth: 440,
    width: '100%',
  },
  wrongShake: {
    transform: [{ translateX: -6 }],
  },
  alarmIcon: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radii.full,
    height: 84,
    justifyContent: 'center',
    width: 84,
    ...shadows.glow,
  },
  answerInput: {
    backgroundColor: colors.surfaceSoft,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    color: colors.text,
    flex: 1,
    fontFamily: 'Angelone',
    fontSize: 22,
    minHeight: 56,
    paddingHorizontal: spacing[4],
  },
  sendButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radii.full,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  choiceButton: {
    alignItems: 'center',
    backgroundColor: colors.surfaceLavender,
    borderRadius: radii.full,
    flex: 1,
    minWidth: 86,
    paddingVertical: spacing[3],
  },
  memeOption: {
    backgroundColor: colors.surfaceSoft,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: spacing[4],
  },
  memeOptionSelected: {
    backgroundColor: colors.surfaceLavender,
    borderColor: colors.primary,
  },
  feedback: {
    alignItems: 'center',
    borderRadius: radii.full,
    flexDirection: 'row',
    gap: spacing[2],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  feedbackCorrect: {
    backgroundColor: colors.sage,
  },
  feedbackWrong: {
    backgroundColor: colors.coral,
  },
});
