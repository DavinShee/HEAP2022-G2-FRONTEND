let ngrokLink =
  'https://1910-101-78-113-236.ap.ngrok.io';

export const databaseURLs = {
  buyer: ngrokLink + '/routes/buyer',
  signIn: ngrokLink + '/routes/account/signin',
  signUp: ngrokLink + '/routes/account/signup',
  passwordUpdate: ngrokLink + '/routes/account/edit'
};
