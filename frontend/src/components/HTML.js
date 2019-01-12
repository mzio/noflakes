import React from "react";

const HTML = props => (
  <html>
    <head>
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>NoFlakes</title>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
        crossOrigin="anonymous"
      />
    </head>

    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: props.html }} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__SERIALIZED_STATE__ =
              JSON.stringify(${props.serverState})`
        }}
      />
      <script type="application/javascript" src="/bundle.js" />
    </body>
  </html>
);

export default HTML;
