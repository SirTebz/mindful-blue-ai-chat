# Message Limit System Documentation

## Overview

A message limit system has been implemented to prevent abuse and encourage users to seek professional help when needed. Users are limited to **50 messages per session**.

## Features Implemented

### 1. Database Tracking
- **Table**: `user_sessions` in Supabase
- **Fields**:
  - `session_id`: Unique identifier stored in browser localStorage
  - `message_count`: Number of messages sent in the session
  - `created_at`: Session creation timestamp
  - `last_message_at`: Last message timestamp
  - `is_blocked`: Flag when limit is reached

### 2. User Awareness
- **Message Counter**: Displayed in chat header showing remaining messages
- **Color-coded Badge**:
  - Green when >10 messages remain
  - Amber/Yellow when ≤10 messages remain
- **Warning Display**: Shows when 10 or fewer messages remain

### 3. Limit Enforcement
- **Input Disabled**: Text input is disabled when limit is reached
- **Send Button Disabled**: Cannot send messages after limit
- **Clear Feedback**: Placeholder text shows "Message limit reached"

### 4. Professional Help Guidance
When the limit is reached, users see:
- **Crisis Hotline**: 0800 456 789 (with click-to-call link)
- **Crisis Text Line**: Text HOME to 741741
- **Clear messaging** explaining the importance of professional support
- **Refresh instruction**: Users can refresh the page to start a new session

### 5. Reset Functionality
- **Reset Button**: Clears conversation and refreshes message limit
- **Success Notification**: Toast message confirms reset
- **Updated Dialog**: Reset dialog mentions message limit refresh

## Technical Implementation

### Hook: `useMessageLimit`
Located in `src/hooks/useMessageLimit.ts`

**Returns:**
- `messageCount`: Current number of messages sent
- `remainingMessages`: Messages left (50 - messageCount)
- `isLimitReached`: Boolean indicating if limit hit
- `isLoading`: Loading state for initial fetch
- `incrementMessageCount()`: Function to increment count
- `resetSession()`: Function to reset the session

### Component: `MessageLimitWarning`
Located in `src/components/MessageLimitWarning.tsx`

**Props:**
- `remainingMessages`: Number of messages left
- `isLimitReached`: Whether limit has been reached

**Behavior:**
- Shows nothing when >10 messages remain
- Shows warning when ≤10 messages remain
- Shows full alert with hotline info when limit reached

### Integration Points

1. **ChatInterface.tsx**:
   - Imports and uses `useMessageLimit` hook
   - Increments count on each user message
   - Disables input when limit reached
   - Displays counter in header
   - Resets session on chat reset

2. **Database Migration**:
   - Located in database migrations
   - Creates `user_sessions` table
   - Implements Row Level Security (RLS)
   - Allows anonymous users to manage their sessions

## User Flow

1. **First Visit**:
   - Session ID generated and stored in localStorage
   - Database record created with 0 messages
   - User sees "50 messages left" in green badge

2. **During Chat**:
   - Counter decrements with each message
   - Badge turns amber when ≤10 messages remain
   - Warning appears below chat with hotline info

3. **Limit Reached**:
   - Input field disabled with clear message
   - Full alert shows with professional help resources
   - Crisis hotline prominently displayed

4. **Reset Options**:
   - Click "Reset" button to refresh limit and start new chat
   - Or refresh browser page to start completely fresh session

## Security Considerations

- **RLS Enabled**: All sessions protected by Row Level Security
- **Anonymous Access**: Users don't need authentication
- **Client-side Session ID**: Stored in localStorage for persistence
- **No Personal Data**: Only session metadata stored

## Preventing Abuse

- **Session-based Limits**: Each browser session gets one limit
- **No Easy Bypass**: Session ID persists in localStorage
- **Database-enforced**: Server-side validation prevents manipulation
- **Professional Redirection**: Encourages seeking proper help

## Configuration

To change the message limit, update the constant in `useMessageLimit.ts`:

```typescript
const MESSAGE_LIMIT = 50; // Change this value
```

## Testing Recommendations

1. Test sending exactly 50 messages
2. Verify counter updates correctly
3. Confirm input disables at limit
4. Test reset functionality
5. Check warning appears at 10 messages
6. Verify hotline information displays correctly
