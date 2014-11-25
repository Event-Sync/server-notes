[![Build Status](https://travis-ci.org/Event-Sync/server-notes.svg?branch=master)](https://travis-ci.org/Event-Sync/server-notes)

I'm In!
==============================

We started with an idea for an app that managed simple events.

I'm In! seeks to make inviting small groups to events simple.

==============================

Written by Brent Parrish and Jacob Shafer
Thanks to Matthew Brightbill and Sam Wong

Only the user is required to have the app, and when the user creates an event he simply enters each person he wishes to invite and pushes create.  I'm In! will send automated text messages to each invitee with a dynamic message based on information about the event including event name, time, place the unique event id. The invitee simply needs to respond with the event id and 'y' or 'n' to confirm if they are going.  Once they have, our users event updates with the status of each invitee.

I'm In! uses an express server to supply JSON data pulled from a Mongo db hosted on heroku.  Users and Events are saved as seperate schemas and are created and destroyed dynamically based on user interactions. We've created 10 seperate routes for user interaction which covers the basic use of events and users.

Additional features we would like to add are the ability to send push notifications if invitees have the app, the ability to pull invitees directley from contacts list, link to other social apps that incorporate events (Facebook, Meetups, etc), and add options for more responses (running late, maybe attending, etc.).

We used Waffle.io to organize as a group which integrates nicely with github.

We utilized gitter to communicate regularly and to pass around info.




