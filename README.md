# Repeat After Me

Tinkering around with and learning the Alexa Skills Kit (ASK) so I can eventually take control of Alexa and train her to do everything for me.

# Setup

Start with [this link](https://developer.amazon.com/alexa-skills-kit/tutorials/fact-skill-1?&sc_channel=SEM&sc_campaign=Fact-Skill&sc_detail=Branded&sc_segment=Alexa-Dev&sc_publisher=Google&sc_country=WW&sc_medium=SEM_Fact-Skill_Branded_Alexa-Dev_Google_WW_0007&sc_trackingcode=0007&gclid=EAIaIQobChMIgbLNnZXk1QIVgS-BCh0-WQPoEAAYASAAEgL2U_D_BwE) to get to the tutorial.

The main components in making a skill:

1. __Voice User Interface (VUI)__: define which code should be exected when specific commands are uttered. Seems to be mainly the _Interaction Model_ tab that matters here.
2. __Lambda Functions__: the actual code for the skill.

# Fact Skill Tutorial

A condensed version of [this tutorial](https://developer.amazon.com/alexa-skills-kit/tutorials/fact-skill-1) for me to review when I forget stuff.

## Step 1: Developer Portal (VUI)

[developer.amazon.com](https://developer.amazon.com). Go to/make your skill and you'll be at the screen with the following tabs on the left:
 - Skill Information
 - Interaction Model. Here's where you add new __Intents__. 
 - Configuration
 - Test
 - Publishing Information
 - Privacy & Compliance
 
 ## Step 2: Lambda Functions with AWS

Quick facts to remember:
- Creating a new function: Click "Create a Lambda function". Choose a blueprint/template file (e.g. alexa-nodejs-template). Configure your trigger -- choose "Alexa Skills Kit". 
- Copy the ARN from the top right corner of the screen. You'll need it in the next step.

Links: 
- [Lambda Console Home Page](https://console.aws.amazon.com/lambda/)
- [AWS Lambda Info](https://aws.amazon.com/lambda/)

## Step 3: Connect VUI to Lambda Function [[Link]](https://developer.amazon.com/alexa-skills-kit/tutorials/fact-skill-3)

Go to the "Configuration" tab of the developer console. Select "AWS Lambda ARN" option for your endpoint. Paste your Lambda's ARN into the textbox (should have from the end of step 2).

## Step 4: Testing your Alexa Skill [[Link]](https://developer.amazon.com/alexa-skills-kit/tutorials/fact-skill-4)

The "Test" tab of the developer console. Here you'll find:
- Voice simulator.
- Service Simulator.

## Step 5: Customization [[Link]](https://developer.amazon.com/alexa-skills-kit/tutorials/fact-skill-5)

The scripting part. 


# My Questions and Answers


### How do I know which functions get which parameters?

You can actually define these via the "intent" JSON, with things like slots. A simple example from [here](https://github.com/alexa/alexa-cookbook/blob/master/labs/Day-1/3-number-facts%20(Built-in%20Slots)/src/index.js
):

```js

// ... within "handlers" object.
// Corresponds to entry in the "intents" (json):
// {
//    "intent": "GetNewFactAboutIntent",
//    "slots": [
//          {
//            "name": "number",
//            "type": "AMAZON.NUMBER"
//          }
//        ]
//  },
'GetNewFactAboutIntent': function () {
        var theNumber = this.event.request.intent.slots.number.value;
        var speechOutput = "You said the number " + theNumber;
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, speechOutput)
    },

```

### How does Alexa handle multiple intent functions?

- It looks like intents are activated by the user saying their name? Don't understand why only the "main" intent is emitted from `LaunchRequest`.
- One way is assigning the `samples` key (within the intent) to an array of allowed utterance samples.

### What SSML Do I Care About?

[speak](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference#speak). Root element of an SSML doc. 
```
<speak>
    This is what Alexa sounds like without any SSML.
</speak>
```

[say-as](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference#say-as). Describes how the text should be interpreted. 
```
<say-as interpret-as='spell-out'>hello</say-as>
```


# Useful Resources

__Tutorials__:

- [Quiz skill](https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/1-voice-user-interface.md)
- [Labs](https://github.com/alexa/alexa-cookbook/blob/master/labs/README.md)
    - [Super useful README](https://github.com/alexa/alexa-cookbook/blob/master/labs/HelloWorld/README.md)
