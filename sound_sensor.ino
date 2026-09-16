#define SOUND_PIN 27

void setup() {
  Serial.begin(115200);
  pinMode(SOUND_PIN, INPUT);
}

void loop() {
  int soundState = digitalRead(SOUND_PIN);

  if (soundState == LOW) {
    Serial.println("SOUND DETECTED");
  } else {
    Serial.println("... quiet");
  }

  delay(100);
}
