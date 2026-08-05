#!/bin/bash
amount=$1
echo $amount > /sys/class/backlight/11-0045/brightness
