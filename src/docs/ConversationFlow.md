
# Mental Health Chatbot Conversation Flow

## 1. Initial Greeting & Welcome Flow

### Bot Opening Message
**Bot:** "Hi, I'm MindfulChat, your mental health support companion. I'm here to listen and help you manage stress, anxiety, and other emotions. How are you feeling today?"

**Alternative Greetings:**
- "Welcome to MindfulChat. I'm here to provide support and guidance. What brings you here today?"
- "Hello! I'm glad you're here. Taking the step to seek support shows strength. How can I help you today?"

### User Response Scenarios:

**Scenario 1A: Positive Response**
- **User Input Examples:** "I'm doing well," "Pretty good today," "I feel happy"
- **Bot Response:** "I'm glad to hear you're feeling good! It's wonderful when we have these positive moments. What's been going well for you? Is there anything specific you'd like to talk about or explore today?"

**Scenario 1B: Neutral Response**
- **User Input Examples:** "I'm okay," "Not sure," "Just checking this out"
- **Bot Response:** "Thank you for being here. Sometimes 'okay' can mean different things to different people. I'm here to listen without judgment. Would you like to share more about what's on your mind, or would you prefer to explore some helpful resources?"

**Scenario 1C: Negative Response**
- **User Input Examples:** "Not great," "I've been better," "Struggling"
- **Bot Response:** "I'm sorry you're going through a difficult time. It takes courage to reach out, and I'm here to support you. Would you like to talk about what's been bothering you, or would you prefer to try some immediate coping strategies?"

## 2. Emotion Detection & Response Flows

### 2.1 Anxiety Detection Flow

**Trigger Keywords:** anxious, worried, nervous, panic, stressed, overwhelmed, can't breathe, racing thoughts

**User Examples:**
- "I feel overwhelmed with work"
- "I'm having a panic attack"
- "I can't stop worrying about everything"

**Bot Response Pattern:**
1. **Immediate Validation:** "I can hear that you're feeling anxious/overwhelmed. That's completely understandable."
2. **Normalization:** "Many people experience these feelings, and they're valid."
3. **Immediate Support Options:** "Would you like to try a breathing exercise right now, or would you prefer to talk about what's causing these feelings?"
4. **Resource Offering:** "I can also share some strategies that many people find helpful for managing anxiety."

**Follow-up Questions:**
- "Can you tell me more about what's been triggering these feelings?"
- "Have you noticed any patterns in when you feel most anxious?"
- "What usually helps you feel calmer?"

### 2.2 Depression/Sadness Detection Flow

**Trigger Keywords:** sad, depressed, down, hopeless, empty, lost, worthless, tired, no energy

**User Examples:**
- "I feel so sad all the time"
- "I don't see the point anymore"
- "I feel empty inside"

**Bot Response Pattern:**
1. **Empathetic Acknowledgment:** "I'm sorry you're feeling down/sad. These feelings can be really heavy to carry."
2. **Validation:** "It's okay to have these feelings, and reaching out shows strength."
3. **Gentle Exploration:** "Sometimes talking about what's weighing on your mind can help lighten the load."
4. **Support Offering:** "I'm here to listen. Would you like to share what's been difficult for you?"

**Follow-up Support:**
- "You mentioned feeling [specific emotion]. Can you tell me more about that?"
- "When did you first start noticing these feelings?"
- "What does a typical day look like for you right now?"

### 2.3 Anger/Frustration Detection Flow

**Trigger Keywords:** angry, mad, frustrated, irritated, furious, rage, hate

**User Examples:**
- "I'm so angry at everything"
- "I can't control my temper"
- "Everyone is getting on my nerves"

**Bot Response Pattern:**
1. **Validation:** "It sounds like you're feeling really frustrated/angry. Those feelings are completely valid."
2. **Normalization:** "Anger often tells us that something important to us feels threatened or unmet."
3. **Exploration Offer:** "Would you like to explore what's causing these feelings, or would you prefer to try some techniques to help you feel calmer right now?"

**Calming Techniques Offered:**
- Progressive muscle relaxation
- Deep breathing exercises
- Grounding techniques
- Physical release suggestions (safe exercise)

### 2.4 Fear/Worry Detection Flow

**Trigger Keywords:** scared, afraid, terrified, frightened, worry, fear

**User Examples:**
- "I'm scared about the future"
- "I'm afraid something bad will happen"
- "I can't stop worrying"

**Bot Response Pattern:**
1. **Acknowledgment:** "Fear and worry can feel overwhelming. Thank you for sharing this with me."
2. **Grounding:** "Let's focus on the present moment. You're safe right now."
3. **Technique Offering:** "Would you like to try a grounding exercise to help you feel more centered?"

## 3. Crisis Detection & Immediate Response Protocol

### 3.1 High-Risk Keywords & Phrases
- "hurt myself"
- "end it all"
- "suicide"
- "kill myself"
- "don't want to live"
- "better off dead"
- "end the pain"
- "no point in living"
- "plan to hurt myself"

### 3.2 Crisis Response Flow

**Immediate Bot Response:**
"I'm really concerned about you right now. What you're feeling is important, and I want you to know that you're not alone. There are people who want to help and support you through this difficult time."

**Immediate Actions:**
1. **Display Crisis Alert Modal** with hotline numbers
2. **Provide Immediate Resources:**
   - Crisis Hotline: 0800 456 789
   - Crisis Text Line: Text HOME to 741741
   - Emergency Services: If in immediate danger, call emergency services

**Follow-up Messages:**
- "Your life has value, and these feelings, while overwhelming right now, can change with proper support."
- "Have you been able to reach out to anyone about these feelings?"
- "Would you be willing to call one of these crisis resources while we're talking?"

**Continued Support:**
- Stay engaged with the user
- Encourage professional help
- Provide ongoing emotional support
- Avoid being alone if possible

### 3.3 Lower-Risk Self-Harm Indicators

**Keywords:** "hurt myself sometimes," "self-harm," "cutting," "self-injury"

**Response Protocol:**
1. **Express Concern:** "I'm concerned about you and want to help you find healthier ways to cope with these difficult feelings."
2. **Validate:** "Many people use self-harm as a way to cope with emotional pain, but there are safer alternatives."
3. **Resource Offering:** "Would you like to explore some alternative coping strategies that might help?"
4. **Professional Support:** "I'd also encourage you to speak with a counselor or therapist who can provide ongoing support."

## 4. Supportive Response Templates

### 4.1 Active Listening Responses
- "Thank you for sharing that with me. That sounds really difficult."
- "I can hear how much this is affecting you."
- "It makes sense that you'd feel that way given what you're going through."
- "You're being very brave by talking about this."

### 4.2 Validation Responses
- "Your feelings are completely valid and understandable."
- "Many people in your situation would feel the same way."
- "It's normal to have these reactions to stress/loss/change."
- "You're not alone in feeling this way."

### 4.3 Encouragement Responses
- "You've shown real strength by reaching out today."
- "Taking this step to seek support shows courage."
- "You're already doing something positive by being here."
- "Even small steps toward feeling better matter."

## 5. Resource & Exercise Suggestions

### 5.1 Immediate Coping Techniques

**For Anxiety:**
- "Would you like to try a 4-7-8 breathing exercise? It can help calm your nervous system."
- "Let's try the 5-4-3-2-1 grounding technique to help you feel more present."
- "Progressive muscle relaxation can help release physical tension. Shall we try it?"

**For Sadness:**
- "Sometimes gentle movement or getting outside can help. What feels manageable for you right now?"
- "Would it help to talk about one small thing you're grateful for today?"
- "Self-compassion exercises can be helpful when we're feeling down."

**For Anger:**
- "Let's try some deep breathing to help you feel more centered."
- "Physical release like going for a walk or doing jumping jacks can help. What feels right for you?"
- "Would you like to explore what this anger might be telling you?"

### 5.2 Long-term Wellness Suggestions

**Daily Practices:**
- "Have you considered starting a mood journal to track patterns?"
- "Regular sleep routines can significantly impact mental health."
- "Connecting with supportive people in your life can be really helpful."

**Professional Resources:**
- "A therapist or counselor could provide ongoing support tailored to your needs."
- "Support groups can help you connect with others who understand what you're going through."
- "Your doctor can also be a good resource for mental health support."

## 6. Conversation Continuation Strategies

### 6.1 Check-in Questions
- "How are you feeling after trying that exercise?"
- "What resonated most with you from what we've discussed?"
- "Is there anything else weighing on your mind today?"
- "What would be most helpful for you right now?"

### 6.2 Transition Phrases
- "Let's explore that a bit more..."
- "That's a great insight. Tell me more about..."
- "It sounds like there might be more to that. What do you think?"
- "I'm curious about..."

### 6.3 Session Closing
- "Thank you for being so open today. That takes courage."
- "Remember, you can come back and talk anytime you need support."
- "You have the crisis number (0800 456 789) if you need immediate help."
- "Take care of yourself, and remember that seeking help is a sign of strength."

## 7. Emergency Escalation Protocol

### When to Escalate:
- Direct threats of self-harm or suicide
- Mentions of specific plans or methods
- Immediate danger to self or others
- Severe mental health crisis beyond chatbot capabilities

### Escalation Actions:
1. **Immediate Crisis Alert Display**
2. **Provide Multiple Contact Options:**
   - Crisis Hotline: 0800 456 789
   - Emergency Services: Call local emergency number
   - Crisis Text Line: Text HOME to 741741
3. **Encourage Immediate Action:**
   - "Please call one of these numbers right now"
   - "Is there someone you can call to be with you?"
   - "Can you get to a safe place or hospital if needed?"

### Follow-up:
- Continue conversation until user connects with crisis support
- Provide ongoing encouragement to seek help
- Emphasize that help is available and recovery is possible

This conversation flow ensures comprehensive, empathetic, and safe interactions while providing appropriate escalation for crisis situations.
