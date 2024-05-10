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

parser = argparse.ArgumentParser(
    description="Example on how to use the Media Controller to play an URL."
)
parser.add_argument(
    "--cast", help='Name of cast device (default: "%(default)s")', default=CAST_NAME
)

args = parser.parse_args()

chromecasts, browser = pychromecast.get_listed_chromecasts(
    friendly_names=[args.cast]
)
if not chromecasts:
    print(f'No chromecast with name "{args.cast}" discovered')
    sys.exit(1)

cast = chromecasts[0]
# Start socket client's worker thread and wait for initial status update
cast.wait()
print(f'Found chromecast with name "{args.cast}"')

cast.quit_app()

# Shut down discovery
browser.stop_discovery()
