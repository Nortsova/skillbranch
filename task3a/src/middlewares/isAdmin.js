/**
 * Created by anastasia on 13.11.16.
 */


export default (req, res, next) => {
  if(req.headers.user === 'admin') {
    return next();
  }
  return next('access error');
}
