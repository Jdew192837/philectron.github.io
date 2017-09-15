---
title: 'DIY Arduino - Project 01: Letter P'
date: '2015-09-29 22:29:26'
categories:
  - Arduino
  - DIY
tags:
  - arduino_uno
  - breadboarding
  - led
excerpt: >-
  Today, I made my first DIY project. The idea was that I saw people make
  beautiful LED banners, so I wanted to make my own initial on LEDs.
---

Today, I made my first DIY project. The idea was that I saw people make beautiful LED banners for the stores, so I want to make my own first initial on LEDs.

## **PREPARATION:**

- 1 x Arduino UNO

![arduino-uno](/images/arduino-uno.jpg)

- 1 x Breadboard

![breadboard](/images/breadboard.jpg)

- 6 x LEDs
- 6 x 220-ohm resistors
- 8 x Jumper wires

![parts](/images/diy-arduino-project-01/parts.jpg)

## **BUIDING THE CIRCUIT:**

Below are my schematic and breadboard layout. [View and download them on GitHub](https://github.com/philectron/pcb/tree/master/arduino_repo/letter_p)

![schematic](/images/diy-arduino-project-01/schematic.png)

![breadboard-layout](/images/diy-arduino-project-01/breadboard-layout.jpg)

I didn't use **POWER** in this project. If I connected the LEDs to POWER, they would turn on all the time since the the power bus constantly supplied energy to them without any configuration from software. Therefore, I used **DIGITAL** because I could control it through Arduino code.

This is my circuit building:

![build](/images/diy-arduino-project-01/build.jpg)

## **THE CODE:**

In this project, I used `pinMode()`, `digitalWrite()`, and `delay()`.

<p align="center"><font face="consolas"><b>delay(time_ms);</b></font></p>

The function `delay()` is self-explanatory. It delays the code for an interval of time. `time_ms` is the **how long in milliseconds** we want the Arduino to delay the code. `delay()` is useful when it is used to blink an LED, in which it defines how long between the events where the LED is on and the LED is off.

To make things neater, I also used the `for()` loop. Be careful with the order of the LEDs. An example of a `for()` loop is

```c
for (int i = 0; i < n; i++) {
    statement;
    statement;
    ...;
}
```

Inside the `for()` loop, initializes the iterative variable `i` to 0\. Whenever the condition is true (in this case, `i < n`, in which `n` is some integer), keeps looping (in this case, `i++`, which increase the value of i by 1) and executes the `statements` inside the curly braces.

See below for my code, and see more on [GitHub](https://github.com/philectron/arduino/tree/master/letter_p/letter_p.ino).

<pre class="prettyprint c-html linenums:1">
/**
 * Project Name: DIY Arduino - Project 01: Letter P
 *
 * File Name: letter_p.ino
 *
 * Description: Makes a beautiful effect of letter P
 * LEDs arrangement.
 *    LED_4 LED_5
 *    LED_3 LED_6
 *    LED_2
 *    LED_1
 *
 * Author: Phi Luu
 * Location: Portland, Oregon, United States
 * Created: September 29, 2015
 * Updated: June 22, 2017
 */

// Required hardware I/O connections
const byte LED_1 = 2;          // connect LED 1 to 2
const byte LED_2 = 3;          // connect LED 2 to ~3
const byte LED_3 = 4;          // connect LED 3 to 4
const byte LED_4 = 5;          // connect LED 4 to ~5
const byte LED_5 = 6;          // connect LED 5 to ~6
const byte LED_6 = 7;          // connect LED 6 to 7

// Global constants
const unsigned int TIME = 100; // time to blink between LEDs

void setup() {
    for (byte pin = LED_1; pin <= LED_6; pin++) {
        pinMode(pin, OUTPUT);
    }
}

void loop() {
    // turn off all LEDs
    for (byte pin = LED_1; pin <= LED_6; pin++) {
        digitalWrite(pin, LOW);
    }
    // start with LED_1
    digitalWrite(LED_1, HIGH);
    delay(TIME);

    // create a "running" effect on LEDs
    for (byte pin = LED_1; pin <= LED_5; pin++) {
        digitalWrite(pin,     LOW);  // turn off this LED
        digitalWrite(pin + 1, HIGH); // and turn on next LED
        delay(TIME);                 // turn on for TIME milliseconds
    }
    // when completes letter P, go straight down and repeat it again
    digitalWrite(LED_6, LOW);
    digitalWrite(LED_3, HIGH);
    delay(TIME);
    digitalWrite(LED_3, LOW);
    digitalWrite(LED_2, HIGH);
    delay(TIME);
    digitalWrite(LED_2, LOW);
    digitalWrite(LED_1, HIGH);
}

</pre>

## **USING:**

There was no human control needed. The effect went through LED by LED to make the letter P. Click on the image to watch my demo on YouTube:

<div class="embedded-video">
  <iframe width="720" height="405" src="https://www.youtube.com/embed/0pdcLAo-sFM?list=PLt_UZum7NVtmFEVMdv4XH8TgXzJvzd78x" frameborder="0" allowfullscreen></iframe>
</div>

## **WRAP UP:**

This is my first DIY Project by Arduino. It's quite simple, isn't it?
