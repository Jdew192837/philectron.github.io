---
title: 'A Glance at the Delay Function'
date: '2016-03-24 22:45:10'
categories:
  - TI-LaunchPad
tags:
  - embedded_systems
  - timer
  - tiva_c_series
excerpt: >-
  Delay function is an important part of a program, especially in embedded
  systems. Thus, understanding and being capable of programming a delay function
  is vital for coders, specifically beginners (like me).
---

Delay function is an important part of a program, especially in embedded systems. Thus, understanding and being capable of programming a delay function is vital for coders, specifically beginners (like me).

The first thing we should know is the formula for the delay time:

<p align="center">
  <font face="consolas">
    DELAY_TIME = NUMBER_OF_LOOPS * NUMBER_OF_CYCLES_PER_LOOPS * TIME_PER_CYCLE;
  </font>
</p>

`DELAY_TIME`: how long we want the program to delay (in **seconds**)<br>
`NUMBER_OF_LOOPS`: how many loops needed to delay (in **loops**)<br>
`NUMBER_OF_CYCLES_PER_LOOPS`: how many cycles the loop needs (in **cycles/loop**)<br>
`TIME_PER_CYCLE`: how long it takes to complete one clock cycle (in **seconds/cycle**)

<p align="center">
  <font face="consolas">
    TIME_PER_CYCLE = 1 / CLOCK_FREQUENCY;
  </font>
</p>

We set our clock frequency to be 80 MHz, so `TIME_PER_CYCLE = 1.25e-8`.

However, we've already had `DELAY_TIME` (we've decided how long the program will delay), `NUMBER_OF_CYCLES_PER_LOOPS` (according to the microcontroller's datasheet, equals `5`), and `TIME_PER_CYCLE` (calculated to be `1.25e-8`). As a result, in order to delay 1 milliseconds,

<p align="center">
  <font face="consolas">
    NUMBER_OF_LOOPS = 0.001 / 5 / 1.25e-8 = 16000
  </font>
</p>

Finally, here is my implementation of the `Delay()` function:

```c
/**
 * Delays in units of milliseconds
 *
 * @param  ms   Number of milliseconds to delay
 *
 * @assumption  80-MHz clock
 */
void Delay(unsigned long ms) {
    unsigned long count;

    while (ms) {
        count = 16000;  // approximately 16000 to delay 1 ms

        while (count) {
            count--;
        }
        ms--;
    }
}
```
