# ESP32 Sound Sensor

This sketch reads a digital sound sensor connected to **GPIO 27**.

## Wiring
- Sensor VCC -> ESP32 3.3V (or the voltage required by your sensor module)
- Sensor GND -> ESP32 GND
- Sensor DO -> ESP32 GPIO 27

## Serial Monitor
Set the baud rate to **115200**.

- `SOUND DETECTED` when GPIO 27 reads LOW
- `... quiet` when GPIO 27 reads HIGH

## File
`esp32/sound_sensor.ino`
