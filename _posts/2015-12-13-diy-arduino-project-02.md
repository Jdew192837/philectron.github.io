---
title: 'DIY Arduino - Project 02: Dark Room'
date: '2015-12-13 12:10:05'
categories:
  - Arduino
  - DIY
tags:
  - arduino_uno
  - breadboarding
  - led
  - sensor
excerpt: Today I'll demonstrate my second DIY project. I call it **Dark Room**.
---

Today I'll demonstrate my second DIY project. I call it **Dark Room**. But first, I want to talk about the idea of this project. When people come home late in the evening, they struggle to find the light switch because it's too dark in their room. They can't leave the light on all day either since it will be a waste of energy during the day. Therefore, they need a smaller light that automatically turns on whenever the room gets dark enough. With an Arduino UNO, a photocell, and an LED, that need is totally achievable.

## **PREPARATION:**

- 1 x Arduino UNO

![arduino-uno](/images/arduino-uno.jpg)

- 1 x Breadboard

![breadboard](/images/breadboard.jpg)

- 6 x Jumper wires
- 1 x 10-kilohm resistor
- 1 x LED
- 1 x Photocell

![parts](/images/diy-arduino-project-02/parts.jpg)

## **BUILDING THE CIRCUIT:**

The photocell reads the amount of light it receives, and the LED will turn on if the amount of light reaches the threshold. The circuit has the same configuration like the fourth project of the book, but this time we only use one non-PWM LED.

Here goes the schematic:

![schematic](/images/diy-arduino-project-02/schematic.png)

Here is the breadboard layout:

![breadboard-layout](/images/diy-arduino-project-02/breadboard-layout.jpg)

As always, both of them are available on [my GitHub](https://github.com/philectron/pcb/tree/master/arduino_repo/dark_room). And here is the real circuit:

![build](/images/diy-arduino-project-02/build.jpg)

## **THE CODE:**

There is nothing new here. I use the knowledge that I have learned from previous projects to program this circuit.

See below for my code, or view it on [my GitHub](https://github.com/philectron/arduino/blob/master/dark_room/dark_room.ino).

<pre class="prettyprint c-html linenums:1">
/**
 * Project Name: DIY Arduino - Project 02: Dark Room
 *
 * File Name: dark_room.ino
 *
 * Description: Automatically turns on the LED when it's dark.
 *
 * Author: Phi Luu
 * Location: Portland, Oregon, United States
 * Created: December 13, 2015
 * Updated: June 22, 2017
 */

// Required hardware I/O connections
const byte PHOTO_PIN = A0; // connect photocell to A0
const byte LED_PIN   = 2;  // connect LED to 2

// Global constants
const unsigned short THRESHOLD = 100;

void setup() {
    pinMode(LED_PIN, OUTPUT);
}

void loop() {
    int photo_val = analogRead(PHOTO_PIN);

    // toggle the light based on the threshold of light
    if (photo_val < THRESHOLD) {
        digitalWrite(LED_PIN, HIGH);
    } else {
        digitalWrite(LED_PIN, LOW);
    }
}

</pre>

## **USING:**

<div class="embedded-video">
  <iframe width="720" height="405" src="https://www.youtube.com/embed/D3xIicfMc8k?list=PLt_UZum7NVtmFEVMdv4XH8TgXzJvzd78x" frameborder="0" allowfullscreen></iframe>
</div>

The way I used it was pretty awkward. I assembled the circuit and complete the code the night before, but I didn't have time to record a demo. I should have used it when the room gets dark (and I could have done it by turning on/off the desk lamp). Thanks for reading!
