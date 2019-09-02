#!/bin/bash
amount=$1
echo $amount > /sys/class/backlight/rpi_backlight/brightness
