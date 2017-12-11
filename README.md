# social-login

## What is this ?
It contains basic code required for implementing token based authentication and autherization using <strong>googleapis<strong>
  
### get client Id and secret key for google auth
#### 1) Go to the Google API Console(https://console.developers.google.com/projectselector/apis/library?supportedpurview=project)
#### 2) From the project drop-down, select an existing project  , or create a new one by selecting Create a new project.
#### 3) In the sidebar under "APIs & Services", select Credentials, then select the OAuth consent screen tab .Choose an Email Address, specify a Product Name, and press Save.
#### 4) In the Credentials tab, select the Create credentials drop-down list, and choose OAuth client ID.
#### 5) Under Application type, select Web application. Register the origins from which your app is allowed to access the Google APIs, as follows. An origin is a unique combination of protocol, hostname, and port.
###### In the Authorized JavaScript origins field, enter the origin for your app. You can enter multiple origins to allow for your app to run on different protocols, domains, or subdomains. You cannot use wildcards. In the example below, the second URL could be a production URL.
###### http://localhost:8080

###### http://localhost:8000/auth/google/callback

###### The Authorized redirect URI field does not require a value. Redirect URIs are not used with JavaScript APIs.
Press the Create button.
###### 6) From the resulting OAuth client dialog box, copy the Client ID . The Client ID lets your app access enabled Google APIs.



