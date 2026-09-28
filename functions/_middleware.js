// Canonical-host redirects need request routing; Pages _redirects only matches paths.
export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname === 'www.rcorpssecurity.com' ||
      (url.hostname === 'rcorpssecurity.com' && url.protocol !== 'https:')) {
    url.hostname = 'rcorpssecurity.com';
    url.protocol = 'https:';
    url.port = '';
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}
