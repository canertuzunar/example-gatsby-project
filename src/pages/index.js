import React from 'react'
import { graphql, Link } from 'gatsby'
export default function IndexPage({data}) {
    return(
        <>
            <h1>Gatsby Blog</h1>
            <h3>this project created for provide resource to this <a href="https://www.notion.so/tuzunarcaner/Statik-Web-Sitesi-ve-Gatsby-JS-f2a902d281b04c8cb3b0ac97ef49fdf5">
                article
            </a></h3>
            <ul>
                {
                    data.allMarkdownRemark.edges.map(({node}) => {
                        return <li>
                            <Link to={node.fields.slug}> {node.frontmatter.title} </Link>
                        </li>
                    })
                }
            </ul>
        </>
    )
}

export const query = graphql`
query HomeQuery {
  allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/blog/"}}) {
    edges {
      node {
        fields {
            slug
        }
        frontmatter{
            title
        }
      }
    }
  }
}
`