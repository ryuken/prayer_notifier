"""
Example on how to use the Media Controller to play an URL.

"""

# pylint: disable=invalid-name

import argparse
import sys
import time

import pychromecast

# Enable deprecation warnings etc.
if not sys.warnoptions:
    import warnings

    warnings.simplefilter("default")

# Change to the friendly name of your Chromecast
CAST_NAME = "Living Room speaker"

# Change to an audio or video url
MEDIA_URL = "https://www.bensound.com/bensound-music/bensound-jazzyfrenchy.mp3"

parser = argparse.ArgumentParser(
    description="Example on how to use the Media Controller to play an URL."
)
parser.add_argument(
    "--cast", help='Name of cast device (default: "%(default)s")', default=CAST_NAME
)
parser.add_argument(
    "--known-host",
    help="Add known host (IP), can be used multiple times",
    action="append",
)
parser.add_argument(
    "--url", help='Media url (default: "%(default)s")', default=MEDIA_URL
)
args = parser.parse_args()

chromecasts, browser = pychromecast.get_listed_chromecasts(
    friendly_names=[args.cast], known_hosts=args.known_host
)
if not chromecasts:
    print(f'No chromecast with name "{args.cast}" discovered')
    sys.exit(1)

cast = chromecasts[0]
# Start socket client's worker thread and wait for initial status update
cast.wait()
print(f'Found chromecast with name "{args.cast}", attempting to play "{args.url}"')
mc = cast.media_controller
mc.play_media(args.url, "audio/mp3")
mc.block_until_active()

# Wait for player_state PLAYING
# player_state = None
# t = 30.0
# is_playing = True 

# while (is_playing):
#    print("Player state:", player_state)
#    # print("MC state:", mc.status)
#    try:
#        if player_state != mc.status.player_state:
#            player_state = mc.status.player_state
#
#        time.sleep(0.1)
#        t = t - 0.1
#    except KeyboardInterrupt:
#        break

# Shut down discovery
browser.stop_discovery()
