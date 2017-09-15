---
title: 'Robot Collection - Project 01: Fortuna - v1.0'
date: '2016-03-13 20:01:18'
categories:
  - Arduino
  - Robot
tags:
  - arduino_uno
  - breadboarding
  - edx
  - led
  - motor
  - robot
  - sensor
  - sound
excerpt: >-
  Welcome back to another episode of the Arduino series. Not only is this an
  Arduino episode but this is also an opening of a new series - Robot
  Collection. By the way, I do feel good to be back to Arduino.
---

Welcome back to another episode of the Arduino series. Not only is this an Arduino episode but this is also an opening of a new series - Robot Collection. By the way, I do feel good to be back to Arduino.

## **OVERVIEW:**

I have successfully built my first robot! The idea of this robot comes from the course [BerkeleyX: EE40LX Electronic Interfaces - Bridging the Physical and Digital Worlds](https://www.edx.org/course/electronic-interfaces-bridging-physical-uc-berkeleyx-ee40lx-0). However, my robot is a bit different from the original one of the course. During the project, I dealt with a lot of problems, so I named my robot **Fortuna** (the Roman goddess of luck).

First, let's take a look at my robot.

![front](/images/robot-collection-project-01/front.jpg)

![back](/images/robot-collection-project-01/back.jpg)

![left](/images/robot-collection-project-01/left.jpg)

![right](/images/robot-collection-project-01/right.jpg)

![up](/images/robot-collection-project-01/up.jpg)

![down](/images/robot-collection-project-01/down.jpg)

On the breadboard, there are two amplifiers, one voltage regulator, two photocells, one buzzer, one microphone, and two DC motors.

## **COMPONENTS:**

1. **Voltage regulator**:<br>
  Adjusts the 9-volt voltage into 3.3 V, which is suitable for the robot. Make sure to put the voltage regulator into the breadboard in a correct position. For this voltage regulator, the lead on the **right** is voltage input **9V**, while the **middle** one is voltage output **3.3V**, and the **left** lead is connected to **GND**. For more information, please refer to the [datasheet](https://github.com/philectron/robots/blob/master/fortuna/lm1086_voltage_regulator.pdf) of this regulator.<br>
  **Update June 29, 2017 - fortura v2.1:** Since the Arduino can take a direct 9V voltage as Vin and produce both 5V and 3.3V (unlike the MSP430 which can only take 3.3V as Vin and produce 3.3V), I don't need a voltage regulator anymore.<br>
  ![voltage-regulator](/images/robot-collection-project-01/voltage-regulator.png)

2. **Amplifiers**:<br>
  These are integrated circuits (IC). In order to use an IC (any IC) properly, we must read its [datasheet](https://github.com/philectron/robots/blob/master/fortuna/opa2344_amplifier.pdf) first. The datasheet shows what each lead of the IC does. Pay attention to the **notch**!<br>
  ![amplifier](/images/robot-collection-project-01/amplifier.png)

3. **Motors**:<br>
  Helps the robot move forward by rotating a small mass each side. I used two bottle caps as eccentricities for the motors. Sometimes, when the motor moves opposite to the direction we want it to move, just **swap the two leads and it will change the direction**. Because the motors require transistor to work properly, I will provide the [datasheet for the transistor](https://github.com/philectron/robots/blob/master/fortuna/pn2222a_transistor.pdf).<br>
  ![motor](/images/robot-collection-project-01/motor.jpg)

4. **Photocells**:<br>
  When the amount of light shining on the robot is under some threshold, the motors will stop. Otherwise, the motors will run, and the robot will move forward. However, when I cover one photocell, the motor on that side will stop moving. It is possible to stop the robot by covering both photocells. We used Wheatstone bridge to build the photocells sub-circuit.<br>
  ![photocell](/images/robot-collection-project-01/photocell.jpg)

5. **Buzzer**:<br>
  Makes noise for the robot. I failed the buzzer at first because of some bugs, or maybe it was because of the buzzer. Now, I've fixed it. **Watch out for plus and minus signs at the bottom of the buzzer** (if any).<br>
  ![buzzer](/images/robot-collection-project-01/buzzer.jpg)

6. **Microphone**:<br>
  Always listens to noise. If the noise is too loud, the buzzer will play a different sound, and both motors will move in a different way. Because the microphone is too small and easy to fall, I made a wire across it to hold it back. Important: **Do not connect the wire to anything on the board, that will mess everything up!**<br>
  ![microphone](/images/robot-collection-project-01/microphone.jpg)

The course built the frame of the robot by gluing 6 popsicle sticks together. I used cardboard, but the latter is not as strong as the former.

Things that distinguish my project with the course are the main board. I used the Arduino UNO board for my robot instead of the MSP430. Feel free to use both of them, although it was a challenge for me to get the robot running on Arduino UNO.

## **ISSUES ENCOUNTERED:**

This project also made me reinstalled my Operating System. I had upgraded to Windows 10 for about a month by the time I did this project. There were some errors with the USB port connection between the Arduino IDE and the Arduino microcontroller. I was pretty sure that was the OS compatibility. It took me a whole day to go back to Windows 8.1. **Do not rush to the latest version of OS.**

## **CIRCUIT LAYOUT:**

Based on the [modular schematic of the course](https://github.com/philectron/robots/blob/master/fortuna/schematic.pdf),

![course-schematic](/images/robot-collection-project-01/course-schematic.png)

I created a full schematic of my own using [Fritzing](http://fritzing.org/home/):

![fritzing-schematic](/images/robot-collection-project-01/fritzing-schematic.jpg)

Eh... I think my schematic isn't as beautiful as the course's schematic.

**Update June 29, 2017 - fortuna v2.1** I hope this EAGLE schematic will make things easier.

![schematic](/images/robot-collection-project-01/schematic.png)

And here is the virtual layout of my breadboard:

![breadboard-layout](/images/robot-collection-project-01/breadboard-layout.jpg)

These are available on [my GitHub](https://github.com/philectron/pcb/tree/master/fortuna).

## **CODE:**

See below for my robot code, or view it on [GitHub](https://github.com/philectron/robots/blob/master/fortuna/fortuna.ino).

<pre class="prettyprint c-html linenums:1">
/**
 * Project Name: Robot Collection - Project 01: Fortuna
 *
 * File Name: fortuna.ino
 *
 * Description: The robot...
 *   moves forward by two motors on its left and right wings (wings)
 *   automatically beeps when activating (mouth)
 *   flashes the LEDs like an airplane at night
 *   determines the ON-OFF status of the motors by two photocells (eyes)
 *   listens to loud noise and changes behaviors of mouth and wings (ear)
 *
 * Compatibility: Arduino UNO
 *
 * Version:
 *   1.0 (July 17, 2016)
 *   1.1 (January 07, 2017)
 *
 * Phi Luu
 * Portland, Oregon, United States
 * Created March 13, 2016
 * Updated January 15, 2017
 */

// Required hardware I/O connections
const int LEFT_PHOTO  = A0;    // left photocell connected to A0
const int MIC_INPUT   = A3;    // microphone connected to A3
const int RIGHT_PHOTO = A5;    // right photocell connected to A5
const int BUZZER      = 2;     // buzzer connected to 2
const int LEFT_MOTOR  = 5;     // left motor connected to ~5
const int RIGHT_MOTOR = 10;    // right motor connected to ~10

// Global constants
const int MOTOR_POWER   = 255; // 50% motor power
const int MIC_THRESHOLD = 550; // mic threshold, varies 0-1023

void setup() {
    pinMode(LEFT_MOTOR,  OUTPUT);
    pinMode(RIGHT_MOTOR, OUTPUT);
    pinMode(BUZZER,      OUTPUT);
}

void loop() {
    // turn off both motors
    analogWrite(LEFT_MOTOR,  0);
    analogWrite(RIGHT_MOTOR, 0);

    // beep a bunch of times
    for (int i = 1; i < 5; i++) {
        Beep(BUZZER, 1000, 100 * i);
        delay(100 * i);
    }

    // listen to the microphone for ~100 ms and get the loudest value
    int val;
    int maxVal = 0;

    for (int i = 1; i < 100; i++) {
        val = analogRead(MIC_INPUT);

        if (val > maxVal) {
            maxVal = val;
        }
        delay(1);
    }

    // if the largest voltage detected is above 1.77 V (3.3*550/1024),
    // commence the "beep dance" response
    if (maxVal > MIC_THRESHOLD) {
        // make the "siren" noise by alternating 1200 Hz and 800 Hz tones
        for (int i = 0; i < 5; i++) {
            Beep(BUZZER, 1200, 100);
            Beep(BUZZER, 800,  100);
        }

        // shake motors back and forth rapidly
        for (int i = 0; i < 3; i++) {
            analogWrite(RIGHT_MOTOR, MOTOR_POWER);
            delay(200);
            analogWrite(RIGHT_MOTOR, 0);
            analogWrite(LEFT_MOTOR,  MOTOR_POWER);
            delay(200);
            analogWrite(LEFT_MOTOR, 0);
        }

        // make a series of tones with increasing frequency from 300-100 Hz
        for (int i = 30; i < 100; i += 1) {
            Beep(BUZZER, 10 * i, 10);
        }

        // then come back down
        for (int i = 100; i > 30; i -= 1) {
            Beep(BUZZER, 10 * i, 10);
        }
    }

    // read the status of photocells and adjust motor output
    // delay briefly to allow comparator outputs to settle
    delayMicroseconds(20);

    // check each photocell/circuit output and determine
    if (digitalRead(LEFT_PHOTO)) {
        analogWrite(LEFT_MOTOR, MOTOR_POWER); // whether to run on the left motor...
    }

    if (digitalRead(RIGHT_PHOTO)) {           // ...or right motor
        analogWrite(RIGHT_MOTOR, MOTOR_POWER);
    }
    delay(500);                               // wait 500ms
}

/**
 * Generates a square wave at a given frequency for ms milliseconds
 *
 * @param  pin      the pin number corresponding to the buzzer
 * @param  freq     the frequency of the sound wave
 * @param  ms       duration
 */
void Beep(int pin, int freq, long ms) {
    long semi_period = (long)(1000000 / (freq * 2));
    long num_loops   = (long)((ms * 1000) / (semi_period * 2));

    for (int k = 0; k < num_loops; k++) {
        digitalWrite(pin, HIGH);        // set buzzer pin high
        delayMicroseconds(semi_period); // for half of the period
        digitalWrite(pin, LOW);         // set buzzer pin low
        delayMicroseconds(semi_period); // for the other half of the period
    }
}

</pre>

## **DEMONSTRATION:**

<div class="embedded-video">
  <iframe width="720" height="405" src="https://www.youtube.com/embed/9rSHqbnU-ng?list=PLt_UZum7NVtnirq3v-Cwd3gX46GBKcLPL" frameborder="0" allowfullscreen></iframe>
</div>
