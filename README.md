# SSR Example

This application is an example isomoprhic SSR application. Think Next.js, but more configurable

When users first make a request, they are served HTML. Thereafter, the client
downloads a javascript bundle that makes the application act as a single-page-application,
making requests to the server to obtain the props to render as needed. These client-side
transitions result in the same page being rendered that would be served as HTML at that path
(hence the isomorphism)

Currently, the application isolates "layout" and "page" props. This means the server will not
send the client layout props if it already has them (and similarly for page props), and that
the client will not rerender the layout if the layout props haven't changed (and again similarly
for page props)

## Improvements
- Support arbitrary nesting of layouts and pages, assuming each layout has a single child
  - A further extension is to support many different layers of nesting in the same application
- Support tree structures for layouts and pages, allowing each layout to have an arbitrary number of children
  - Similar extension to support dynamic tree structures that can expand, contract, change branching factors at runtime
- A laundry list of minor enhancements to make it more configurable and production-ready
