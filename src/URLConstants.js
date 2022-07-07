let ngrokLink =
  'https://4d00-2406-3003-206f-4ac0-813b-76c9-8c1c-51f7.ap.ngrok.io';

export const databaseURLs = {
  buyer: ngrokLink + '/routes/buyer',
  signIn: ngrokLink + '/routes/account/signin',
  signUp: ngrokLink + '/routes/account/signup',
  passwordUpdate: ngrokLink + '/routes/account/edit'
};
