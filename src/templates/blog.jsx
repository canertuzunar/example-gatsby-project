import React from 'react'

export default function Blog({pageContext: {frontmatter, html}}) {
    return(
        <>
            <h1>{frontmatter.title}</h1>
            <p>{frontmatter.date}</p>
            <div dangerouslySetInnerHTML={{__html: html}}></div>
        </>
    )
}