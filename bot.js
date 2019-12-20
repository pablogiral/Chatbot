// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
//const restify = require('restify');
//const axios = require("axios");
const { ActivityHandler } = require("botbuilder");



// axios.get("https://xz94zfs6u8.execute-api.eu-west-1.amazonaws.com/default/myBakery")
// .then((response) => {
//   console.log(response.data);
  
// }, (error) => {
//   console.log(error);
// });


class EchoBot extends ActivityHandler {
  constructor() {
    super();
    // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
    this.onMessage(async (context, next) => {
      let food = await fetch(
        "https://xz94zfs6u8.execute-api.eu-west-1.amazonaws.com/default/myBakery"
      ).then(response => response.json())

      await context.sendActivity(`${food}`);
      // await context.sendActivity(
      //   `You said ${food2}`
      // );
      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });

    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded;
      for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
        if (membersAdded[cnt].id !== context.activity.recipient.id) {
          await context.sendActivity("Hello and welcome!");
        }
      }
      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });
  }
}

module.exports.EchoBot = EchoBot;
