# Cloud Foundry Checkins App

## Getting Started

Clone the source and install the dependencies. You'll also need to download and start MongoDB if you're planning to develop this thing locally. If you want to push the app to Cloud Foundry, you'll need an account there and the `vmc` tools.

Get the app

    $ git clone http://github.com/crcsmnky/cloudfoundry-checkins.git
    $ cd cloudfoundry-checkins
    $ npm install -d

Download and install MongoDB
[http://www.mongodb.org/downloads](http://www.mongodb.org/downloads).

Start the app

    $ node app.js

And checkin like crazy

    $ curl -d "comment=hello world" -d "lat=50&lon=50" http://localhost:3000/checkin

To push the app to Cloud Foundry, [install the Cloud Foundry CLI](http://start.cloudfoundry.com/tools/vmc/installing-vmc.html) and [deploy an app](http://start.cloudfoundry.com/tools/deploying-apps.html).

## Background

This is just a *really* simple app I built to go along with my talk about MongoDB at the [Cloud Foundry Open Tour](http://opentour.cloudfoundry.com/2012/austin) in Austin on April 5th.