import sys
import time
import pychromecast

# List chromecasts on the network, but don't connect
services, browser = pychromecast.discovery.discover_chromecasts()
# Shut down discovery
pychromecast.discovery.stop_discovery(browser)

# Discover and connect to chromecasts named Living Room
chromecasts, browser = pychromecast.get_listed_chromecasts(friendly_names=["Living Room speaker"])
[cc.cast_info.friendly_name for cc in chromecasts]
['Living Room speaker']

cast = chromecasts[0]
# Start worker thread and wait for cast device to be ready
cast.wait()
print(cast.cast_info)

mc = cast.media_controller

mc.play_media('http://192.168.1.7/' + sys.argv[1], 'audio/mp3')
mc.block_until_active()
print(mc.status)