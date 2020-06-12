import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <link
          rel="shortcut icon"
          href="https://ddqol34nhllwe.cloudfront.net/favicon.ico"
          type="image/x-icon"
        />
        <link
          rel="icon"
          href="https://ddqol34nhllwe.cloudfront.net/favicon.ico"
          type="image/x-icon"
        />
        <link
          rel="stylesheet"
          href="https://d3tbpaf5tfzpa.cloudfront.net/buenos-aires.css"
        />
        <link
          rel="stylesheet"
          href="https://d3tbpaf5tfzpa.cloudfront.net/source-sans-pro.css"
        />
        <link
          rel="stylesheet"
          href="https://ddqol34nhllwe.cloudfront.net/reset.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
          rel="stylesheet"
        ></link>
        <title>ExhibiTM</title>
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
