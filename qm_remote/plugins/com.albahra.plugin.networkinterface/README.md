Network Interface
=================

Network interface information plugin for Cordova/PhoneGap that supports Android, Blackberry 10, iOS, and Windows Phone 8.

## PhoneGap Build

To include the Network Interface plugin in your PhoneGap Build application, add this to your config.xml:

    <gap:plugin name="com.albahra.plugin.networkinterface" />

## Command Line Install

    phonegap local plugin add https://github.com/salbahra/NetworkInterfacePlugin

## Usage

The plugin creates the object `networkinterface` with the methods `getIPAddress(onSuccess, onError)`.

Example:

	networkinterface.getIPAddress(function (ip) { alert(ip); });

## License

The MIT License (MIT)

Copyright (c) 2013 Albahra.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
