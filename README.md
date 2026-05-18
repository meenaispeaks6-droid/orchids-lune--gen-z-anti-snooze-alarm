# LUNE - AI Build Context

## App Summary

**App Name:** LUNE

**Goal:** Build a Gen Z-focused alarm app that prevents users from endlessly snoozing and helps them wake up with intentional routines.

LUNE should feel like a warm, minimal, premium mobile product: calm enough for night use, but strong enough to push users out of bed in the morning.

## Product Vision

LUNE is not just an alarm clock. It is a wake-up discipline app with smart dismiss challenges, sleep insights, habit tracking, and personalized wake-up modes.

Primary user:
- Gen Z users and young professionals
- People who oversleep or repeatedly snooze
- Users who want better sleep/wake consistency
- Users who like clean, aesthetic, premium-feeling apps

Primary promise:
> Wake up on time without relying on snooze.

## Tech Stack

### Frontend
- React Native
- Expo-compatible architecture preferred
- Mobile-first UI
- Native device features where needed:
  - Accelerometer for shake dismiss
  - Local notifications for alarms
  - Background-safe alarm behavior where possible

### Backend
- Node.js
- REST or lightweight API architecture
- Handles user data, analytics, alarm sync, and sleep history

### Database
Use one of:
- Supabase
- Firebase

Preferred data areas:
- Users
- Alarms
- Alarm dismiss attempts
- Sleep sessions
- Wake-up analytics
- Notification preferences

## Design Direction

### Style
Warm minimal premium UI.

### Palette
Use a calm cream and beige-based color system.

Suggested colors:
- Background: `#F8F1E7`
- Surface/Card: `#FFF9F0`
- Primary Text: `#2E241B`
- Secondary Text: `#7A6A5A`
- Accent: `#D9A86C`
- Soft Accent: `#EBD7BD`
- Success: `#8FAF8F`
- Warning: `#D9825B`

### UI Shape Language
- Rounded cards
- Large soft spacing
- Premium shadows, subtle borders
- Calm typography
- Friendly Gen Z microcopy
- Avoid harsh neon or overly corporate styling

### UX Feel
- Night-friendly
- Minimal friction for setting alarms
- Clear urgency during alarm dismissal
- Delightful but not childish
- Premium wellness app feel

## Module-Wise Build Plan

## 1. Onboarding Module

Purpose:
Introduce LUNE and configure the user's wake-up preferences.

Screens:
- Welcome screen
- Sleep goal setup
- Wake-up difficulty preference
- Notification permission request
- Optional account setup

Key Features:
- Ask typical wake time
- Ask sleep target duration
- Ask how hard it is for the user to wake up
- Explain anti-snooze concept
- Request notification permissions clearly

## 2. Authentication Module

Purpose:
Allow users to save alarms, history, and analytics across devices.

Options:
- Email/password
- Social auth if supported later
- Guest mode optional

Data:
- User profile
- Wake preferences
- Sleep goal
- Timezone

## 3. Smart Alarms Module

Purpose:
Create, manage, and trigger alarms with anti-snooze behavior.

Screens:
- Alarm list
- Create/edit alarm
- Alarm detail
- Repeat schedule picker
- Alarm sound picker

Core Fields:
- Alarm name
- Time
- Repeat days
- Enabled/disabled
- Wake-up mode
- Dismiss challenge type
- Snooze setting disabled or restricted by design

Behavior:
- Alarms should be easy to create
- Active alarms appear as rounded premium cards
- Next alarm should be prominent on home screen
- Snooze should either be unavailable or require a challenge

## 4. Math Dismiss Module

Purpose:
Force cognitive engagement before dismissing an alarm.

Challenge Types:
- Simple arithmetic
- Medium arithmetic
- Multi-step math

Rules:
- User must solve correctly to dismiss
- Wrong answers should keep alarm active
- Difficulty can depend on wake-up mode
- Track attempts for analytics

UX:
- Large readable question
- Number keypad
- Calm but urgent visual tone
- Avoid tiny buttons

## 5. Shake Dismiss Module

Purpose:
Force physical movement before dismissing an alarm.

Device Feature:
- Accelerometer

Behavior:
- User must shake phone a required number of times
- Show progress indicator
- Difficulty can control required shake count
- Prevent accidental completion from small movement

UX:
- Big progress ring or warm progress bar
- Clear instruction: "Shake to prove you're awake"
- Haptic feedback optional

## 6. Wake-Up Modes Module

Purpose:
Offer different wake-up intensity levels.

Suggested Modes:

### Gentle Mode
- Softer alarm tone
- Easier challenge
- Lower shake count

### Focus Mode
- Medium alarm tone
- Medium challenge
- No easy snooze

### Beast Mode
- Loud alarm tone
- Harder math
- Higher shake count
- Multiple-step dismiss possible

Each mode should affect:
- Alarm volume behavior where possible
- Challenge difficulty
- Dismiss requirements
- Visual urgency

## 7. Sleep Tracking Module

Purpose:
Help users understand sleep consistency.

MVP Approach:
- Manual sleep start/stop
- Estimate sleep based on alarm schedule
- Track bedtime and wake time

Future Approach:
- Wearable integration
- Automatic sleep detection

Screens:
- Sleep session summary
- Weekly sleep trend
- Sleep goal progress

Data:
- Bedtime
- Wake time
- Duration
- Sleep goal met/not met
- Linked alarm id if applicable

## 8. Analytics Module

Purpose:
Show users how well they are waking up.

Metrics:
- Wake-up success rate
- Average dismiss time
- Number of failed dismiss attempts
- Sleep duration trend
- Streaks
- Most difficult wake-up days
- Snooze prevention score

Screens:
- Analytics dashboard
- Weekly summary
- Streak card
- Alarm performance detail

Design:
- Rounded cards
- Simple charts
- Warm visual hierarchy
- Positive, motivating copy

## 9. Notifications Module

Purpose:
Trigger alarms and reminders reliably.

Notification Types:
- Alarm notification
- Bedtime reminder
- Sleep goal reminder
- Weekly wake-up report

Requirements:
- Request permissions during onboarding
- Allow notification preference management
- Schedule local notifications for alarms
- Sync notification state with alarm changes

Important:
Mobile alarm behavior differs by platform. Implement the best available native/local notification strategy and document limitations clearly.

## 10. Home Dashboard Module

Purpose:
Give the user a quick view of their wake-up plan.

Main Elements:
- Greeting
- Next alarm card
- Sleep goal card
- Wake streak card
- Quick add alarm button
- Today's wake-up mode

Tone:
- Calm at night
- Motivational in the morning

## 11. Settings Module

Purpose:
Let users control app preferences.

Settings:
- Profile
- Wake-up difficulty
- Default wake-up mode
- Alarm sounds
- Notification preferences
- Sleep goal
- Theme options if needed
- Account/logout

## Data Model Draft

### users
- id
- email
- display_name
- sleep_goal_minutes
- default_wake_mode
- wake_difficulty
- timezone
- created_at

### alarms
- id
- user_id
- title
- time
- repeat_days
- enabled
- wake_mode
- dismiss_type
- sound
- created_at
- updated_at

### alarm_events
- id
- alarm_id
- user_id
- triggered_at
- dismissed_at
- dismiss_duration_seconds
- dismiss_type
- attempts
- success

### sleep_sessions
- id
- user_id
- started_at
- ended_at
- duration_minutes
- source
- alarm_id

### notification_preferences
- id
- user_id
- alarm_notifications
- bedtime_reminders
- weekly_reports
- updated_at

## MVP Priority

Build in this order:

1. Warm premium React Native shell
2. Home dashboard
3. Alarm list and create/edit alarm
4. Local notification scheduling
5. Alarm ringing screen
6. Math dismiss
7. Shake dismiss
8. Wake-up modes
9. Basic sleep tracking
10. Analytics dashboard
11. Settings
12. Backend/database sync

## Non-Negotiables

- The app must make snoozing difficult or unavailable.
- Alarm dismissal must require real user action.
- UI must stay warm, minimal, premium, and mobile-first.
- Cards should be rounded and spacious.
- Avoid cluttered dashboards.
- Use Gen Z-friendly language without becoming gimmicky.
- Keep flows simple and fast.

## Suggested App Navigation

- Home
- Alarms
- Sleep
- Analytics
- Settings

Alarm active/dismiss screen should appear as a focused full-screen experience.

## Example Microcopy

- "No more fake wake-ups."
- "Prove you're awake."
- "Your next wake-up is set."
- "Small wins before sunrise."
- "Shake it off. Literally."
- "Math first, snooze never."

## Success Criteria

The MVP is successful when a user can:
- Complete onboarding
- Create a smart alarm
- Receive an alarm notification
- Dismiss alarm with math or shake challenge
- Track basic sleep duration
- View wake-up analytics
- Manage notification preferences

## Future Enhancements

- AI-based smart wake window
- Spotify/Apple Music alarm tones
- Friend accountability mode
- Wake-up streak sharing
- Wearable sleep sync
- Adaptive challenge difficulty
- Paid premium themes and sounds
