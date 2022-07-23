const NGROKLINK = 'http://localhost:3000';

export const databaseURLs = {
  search: NGROKLINK + '/routes/buyer',
  signIn: NGROKLINK + '/routes/account/signin',
  signUp: NGROKLINK + '/routes/account/signup',
  passwordUpdate: NGROKLINK + '/routes/account/edit',
  downloadHist: NGROKLINK + '/routes/downloadHistory',
  upload: NGROKLINK + '/routes/buyer',
  img: NGROKLINK + '/routes/seller',
  rating: NGROKLINK + '/routes/rating'
};
