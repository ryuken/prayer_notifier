#!/bin/bash
amount=$1
echo $amount > /sys/class/backlight/10-0045/brightness
