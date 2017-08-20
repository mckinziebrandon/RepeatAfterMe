'use strict';
var Alexa = require('alexa-sdk');

// Replace with your app ID (OPTIONAL).  
// You can find this value on your skill's page on http://developer.amazon.com
var APP_ID = "amzn1.ask.skill.015704ae-9f78-4192-a393-c31c5ca96957";

var SKILL_NAME = "Repeat After Me";
var GET_FACT_MESSAGE = "Okay: ";
var HELP_MESSAGE = "You are terrible at speaking. Hopeless.";
var HELP_REPROMPT = "Seriously, do you have a speech disability?";
var STOP_MESSAGE = "Whatever.";

// TODO: Replace this data with your own.  
// You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
var data = [
    'Herp derp, I am a squishy human. That is what you sound like.',
    'Are you still talking?'
];


// ========================================================
// Editing anything below this line might break your skill.  
// ========================================================

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

    RepeatAfterMeIntent() {
        var factArr = data;
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];
        var speechOutput = GET_FACT_MESSAGE + randomFact;
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },

	/*  
	 * Repeat the number given by user.
	 * 
	 * Slots:
	 * 	- number
	 *
	 */
	RepeatNumberIntent() {
		let slots = this.event.request.intent.slots;
		var theNumber = slots.number.value;
		this.emit(':tell', `The number is ${theNumber}.`);
	},

    AMAZON.HelpIntent() {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },

    AMAZON.CancelIntent() {
        // ':tell' is the main way to just have Alexa say something.
        this.emit(':tell', STOP_MESSAGE);
    },

    AMAZON.StopIntent() {
        this.emit(':tell', STOP_MESSAGE);
    }
};
