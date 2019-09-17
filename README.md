Mean Labs 2 and 3 made user of express, hbs, and express session to refactor a page of our capstone and add user register/login/logout functionality.

My teams landing page has the 3 drop down lists dynamically created (filtering not implemented yet), as well as the team cards (links to team pages, not yet implemented).


![enter image description here](https://lh3.googleusercontent.com/s3tj1FDvzVbYR67jBFXHuQ32_NQKgoY-v6E2kyk3d5Fs6g1DLSlfy_FwPDZ7dFWdsK5Cz4KXDoA "Index page")

![enter image description here](https://lh3.googleusercontent.com/PDGcQCZQAVNgf3HqrEJxD7X0v20he0588W4Qef8NkSRacpEIT9d8Q-RSZE5Oy4i-XHZgk7VBjNE "Teams page")

## Starting the app
### Install Module

```
$ npm install express-generator -g
```

### Generate the App

```
$ cd A_WORKING_DIR_OF_YOUR_CHOICE

$ express --view=hbs demo

   create : demo
   create : demo/package.json
   create : demo/app.js
   create : demo/public
   create : demo/routes
   create : demo/routes/index.js
   create : demo/routes/users.js
   create : demo/views
   create : demo/views/index.hbs
   create : demo/views/layout.hbs
   create : demo/views/error.hbs
   create : demo/bin
   create : demo/bin/www
   create : demo/public/javascripts
   create : demo/public/images
   create : demo/public/stylesheets
   create : demo/public/stylesheets/style.css

   install dependencies:
     $ cd demo && npm install

   run the app:
     $ DEBUG=demo:* npm start


$ cd demo
$ npm install
npm notice created a lockfile as package-lock.json. You should commit this file.
added 83 packages in 5.319s

$ npm start
```

### Launch App

Load [http://localhost:3000/](http://localhost:3000/) in your browser

