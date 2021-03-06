/**
 * Copyright 2015 Natural Intelligence Solutions
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Author: Michael Angelo Ruta (2015)
 *
 **/

module.exports = function(RED) {
    "use strict";

    var amazon = require('amazon-product-api');

    function AmazonAPINode(n) {
        RED.nodes.createNode(this,n);

        this.topic = n.topic;

        var node = this;

        var msg = {};
        msg.topic = this.topic;
        msg.payload = "Hello world !"

        var client = amazon.createClient({
          awsId: "aws ID",
          awsSecret: "aws Secret",
          awsTag: "aws Tag"
        });

        client.itemSearch({
          keywords: 'Quentin Tarantino',
          responseGroup: 'Reviews'
        }, function(err, results) {
          if (err) {
            console.log(err);
          } else {
            console.log(results);
          }
        });

        this.send(msg);

        this.on('input', function (msg) {
            node.warn("I saw a payload: "+msg.payload);
            node.send(msg);
        });

        this.on("close", function() {
        });
    }

    RED.nodes.registerType("amazon-spi",AmazonAPINode);

}
