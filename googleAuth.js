var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

//crediantials refer read me(in this repository) to get them
var oauth2Client = new OAuth2(
  YOUR_CLIENT_ID, YOUR_CLIENT_SECRET, YOUR_REDIRECT_URL 
);
 
//scopes contains permission that the user will need to approve to get there gmail Info
var scopes = [
  // 'https://mail.google.com/',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email'
];

// generate a url that asks permissions for Google+ and Google Calendar scopes
var url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',
  scope: scopes,
});

var auth = {
  //redirect user on this url 
  getUrl: function(req, res){
      res.send(url)
      res.end()    
  },
  
  //this called back will be called (defined in oauth2Client) on autenticated by google
  oauthcallback: function(req, res){
        var code = req.query.code.replace('#','')
        
        oauth2Client.getToken(code, function (err, tokens) {
          if (!err) {
            oauth2Client.setCredentials(tokens);

            var oauth2 = google.oauth2({
                auth: oauth2Client,
                version: 'v1'
            });

            oauth2.userinfo.get(
                function(err, response) {
                    if (err){
                        res.send("Error getting permissions")
                        res.end()
                    }else {
                        //here response contains all data received by gmail line firstname, lastname, gmailId, fullName etc.
                        //you can create session for user and redirect it to home page
                        res.redirect('/')
                    }
                }
            );
            
          }else{
            res.send("Error logging")
            res.end()
          }

        });

    },
  
}

module.exports = auth;
   
