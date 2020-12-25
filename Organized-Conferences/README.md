App Engine application for the Udacity training course.

## App ID - organized-conferences

## Products
- [App Engine][1]

## Language
- [Python][2]

## APIs
- [Google Cloud Endpoints][3]

## Front-End
https://organized-conferences.appspot.com/#/

## API Explorer
https://organized-conferences.appspot.com/_ah/api/explorer

## Setup Instructions
1. Update the value of `application` in `app.yaml` to the app ID you
   have registered in the App Engine admin console and would like to use to host
   your instance of this sample.
1. Update the values at the top of `settings.py` to
   reflect the respective client IDs you have registered in the
   [Developer Console][4].
1. Update the value of CLIENT_ID in `static/js/app.js` to the Web client ID
1. (Optional) Mark the configuration files as unchanged as follows:
   `$ git update-index --assume-unchanged app.yaml settings.py static/js/app.js`
1. Run the app with the devserver using `dev_appserver.py DIR`, and ensure it's running by visiting your local server's address (by default [localhost:8080][5].)
1. (Optional) Generate your client library(ies) with [the endpoints tool][6].
1. Deploy your application.

## Session Implementation
The Conference Sessions were implemented with the following arguments:
session name, highlights, speaker, duration(in minutes), type of session, date(YY-MM-DD), start time(in 24 hour notation so it could be ordered), max attendees and location

The name field is required.

The speakers name happens to be a string, which could lead to inconsistencies as the same speaker could create sessions as "R. Pike", "Robert Pike" and "Rob Pike". I decided against creating a separate entity for speakers as that would require speakers to already have an existing account on the site and for the organizer to know their IDs.

Sessions are created as children of the Conference objects stored within Googles NDB data store in a parent-child relationship. This is useful as it enables one to query by the parent conference.

I also decided to additionally add a property for the seats available as, typically, sessions are limited in terms of size of a lecture hall, or classroom, and there is usually an upper limit to how many people can attend. This could also be used internally to determine where a session is to be held within the premises.

The location field would also be beneficial, especially for larger conferences with numerous sessions across numerous buildings, as it could be indicative of building as well as room numbers.

## Query Implementation
getTBDSessions - gets all sessions that do not have a speaker currently
This would be useful to the organizer of a conference to determine what speakers they need for what sessions

getHackathonSessions - gets all hackathon sessions
This would be beneficial as it will get all sessions of the type, instead of just per conference, and many people are now starting to want to participate in hackathons 

getEarlyNonWorkshops - gets all non-workshop sessions prior to 7PM
The problem in implementing this query is that Google's NDB data store only allows one to query by one field. Possible s to such an issue include running both queries individually and then matching up the proper results in the Python itself or running a single query and then doing further sorting in Python.

In the implementation, it runs the query to find all sessions without a type of "workshop", and then loops through all the sessions. While doing so, it adds all the sessions that occur prior to 19:00:00 into another array, which is then outputted in using SessionForms.

## Featured Speaker Implementation
The featured speaker is found by checking if the speaker has spoken in more than one session. The last speaker to have to have created a session and also have spoken in more than session is the featured speaker.

[1]: https://developers.google.com/appengine
[2]: http://python.org
[3]: https://developers.google.com/appengine/docs/python/endpoints/
[4]: https://console.developers.google.com/
[5]: https://localhost:8080/
[6]: https://developers.google.com/appengine/docs/python/endpoints/endpoints_tool
