# SSR Example

This application is an example isomoprhic SSR application. Think Next.js, but
more configurable

When users first make a request, they are served HTML. Thereafter, the client
downloads a javascript bundle that makes the application act as a
single-page-application, making requests to the server to obtain the props to
render as needed. These client-side transitions result in the same page being
rendered that would be served as HTML at that path (hence the isomorphism)

Requests are isomrphic with regards to content rendered on the page, redirect
behavoir, and headers.

Only props that have changed are fetched from the server, which allows for
faster response times, and elimninates unnecessary renders in the client
application
