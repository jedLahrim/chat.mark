export class Constant {
    // Path to your greeting audio files
    static FIRST_VISIT_AUDIO_URL = '/audio/welcome-greeting.mp3'; // Played only on first visit ever
    static RECURRING_AUDIO_URL = '/audio/welcome-greeting-12h.mp3'; // Played every 12 hours

// Storage keys
    static FIRST_VISIT_KEY = 'user_first_visit_completed';
    static LAST_GREETING_TIMESTAMP_KEY = 'last_greeting_timestamp';

// Time constants (in milliseconds)
    static TWELVE_HOURS = 2000; // 12 hours in milliseconds
}
