'use strict';
var Alexa = require('alexa-sdk');
// Replace with your app ID (OPTIONAL).
// You can find this value on your skill's page on http://developer.amazon.com
var APP_ID = "amzn1.ask.skill.015704ae-9f78-4192-a393-c31c5ca96957";

var SKILL_NAME = "Repeat After Me";
var HELP_MESSAGE = "You are terrible at speaking. Hopeless.";
var HELP_REPROMPT = "Seriously, do you have a speech disability?";
var STOP_MESSAGE = "Whatever.";

// Array of possible responses from Alexa. Right now, selected at random.
var data = [
  'Herp derp, I am a squishy human. That is what you sound like.',
  'Are you still talking?',
  'No, you repeat after me.'
];

/**This is the function that AWS Lambda calls every time
 * Alexa uses the skill.
 * 
 * @param event - 
 * @param context - 
 * @param callback - 
 */
exports.handler = function(event, context, callback) {
    // Create an instance of the Alexa library and
    // pass it the requested command.
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {

    LaunchRequest() {
        this.emit('RepeatAfterMeIntent');
    },

  /**
   * This is what happens when the user says the SKILL_NAME.
   */
  RepeatAfterMeIntent() {
        let dataIndex = Math.floor(Math.random() * data.length);
        // Random entry from the data array.
        let randomResponse = data[dataIndex];
        this.emit(':tellWithCard', randomResponse, SKILL_NAME, randomResponse)
    },

	/**
	 * Repeat the number given by user. To invoke:
	 *  "Alexa, ask RepeatAfterMe to repeat the number {number}."
	 * 
	 * Slots:
   *  number
	 */
	RepeatNumberIntent() {
		let slots = this.event.request.intent.slots;
		let theNumber = slots.number.value;
		this.emit(':tell', `The number is ${theNumber}.`);
	},

  SetTimerIntent() {
	  let slots = this.event.request.intent.slots;
	  let time = slots.time.value;
    this.emit(':tell', `No. You set a timer for ${time}. Stupid.`);
  },

  'AMAZON.HelpIntent'() {
      var speechOutput = HELP_MESSAGE;
      var reprompt = HELP_REPROMPT;
      this.emit(':ask', speechOutput, reprompt);
  },

  'AMAZON.CancelIntent'() {
      // ':tell' is the main way to just have Alexa say something.
      this.emit(':tell', STOP_MESSAGE);
  },

  'AMAZON.StopIntent'() {
      this.emit(':tell', STOP_MESSAGE);
  }
};
