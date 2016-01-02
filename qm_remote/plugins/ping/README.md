<!---
 license: Licensed to the Apache Software Foundation (ASF) under one
         or more contributor license agreements.  See the NOTICE file
         distributed with this work for additional information
         regarding copyright ownership.  The ASF licenses this file
         to you under the Apache License, Version 2.0 (the
         "License"); you may not use this file except in compliance
         with the License.  You may obtain a copy of the License at

           http://www.apache.org/licenses/LICENSE-2.0

         Unless required by applicable law or agreed to in writing,
         software distributed under the License is distributed on an
         "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
         KIND, either express or implied.  See the License for the
         specific language governing permissions and limitations
         under the License.
-->

# ping

```
var url = "http://google.nl:80";

ping.ping(
    url,
    100,
    function(message) // message is 0 or 1
    {
        if(0 == parseInt(message))
        {
            console.log("Url is not reachable");
        }
        else if(1 == parseInt(message))
        {
            console.log("Url pinged successfully");
        }
    },
    function(err)
    {
        console.log(err);
    }
);
```
