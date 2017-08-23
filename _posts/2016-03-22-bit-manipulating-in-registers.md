---
title: 'Bit Manipulating in Registers'
date: '2016-03-22 19:59:16'
categories:
  - TI-LaunchPad
tags:
  - embedded_systems
  - register
  - tiva_c_series
excerpt: >-
  I broke my LaunchPad, and now I’m waiting for a new LaunchPad to deliver. In
  the mean time, I would like to take time to provide a small tip.
---

[I broke my LaunchPad]({{ site.url }}{{ site.baseurl }}/ti-launchpad/2016/03/18/how-i-destroyed-my-launchpad), and now I'm waiting for a new LaunchPad to deliver. In the mean time, I would like to take time to provide a small tip. I'll take **Run Mode Clock Gating Control register (RCGCGPIO) in the Tiva C-Series** as an example for this post.

According to the data sheet, this register looks like:

![rcgcgpio-register](/images/bit-manipulating-in-register/rcgcgpio-register.jpg)

I choose clock gating control because we must unlock the clock before making any change in the corresponding port. Bit field [31:6] is reserved, which means we would be happier not to touch them. **We can only manipulate [5:0] corresponding to [PortF:PortA]**. So, in order to "unlock" the clock of a port (i.e. port B) and not to mess with others:

1. **Write:**<br>
  ![write](/images/bit-manipulating-in-register/write.jpg)

2. **Convert binary to hex:**<br>
  `B000010 = 0x02`

3. **Code:**<br>
  `SYSCTL_RCGC2_R |= 0x02;`

There are **two ways to manipulate a bit** in this course:

- **"Set" a bit**: To set a bit, we use bit-wise `OR`, notated `|`.<br>
  According to logic, `0 | b = b` and `1 | b = 1`.<br>
  ![set](/images/bit-manipulating-in-register/set.jpg)<br>
  Basically, because the **Reset state of the register is ALWAYS 0**, we only take the value we want it to be, in this case, `0x02`, and perform an `OR` operation, and then we will get `0x02` (recall that `0 | b = b`).

- **"Clear" a bit**: To clear a bit, we use bit-wise `AND`, notated `&`.<br>
  Similar to settinga bit, according to logic, `0 & b = 0` and `1 & b = b`.<br>
  ![clear](/images/bit-manipulating-in-register/clear.jpg)<br>
  If we want to clear all the bit no matter what is inside it, perform an `AND` operation with `0` and we will get all zeros.

**Using this strategy, we can unlock more clock since "1″ stands for "enable" and "0″ stands for "disable".**

That's all I got. I hope this helped.
