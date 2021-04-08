const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode =({ node, getNode, actions}) => {
    const { createNodeField } = actions
    if(node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode, basePath: `pages`})
        createNodeField({
            node,
            name: `slug`,
            value: slug
        })
    }
}

exports.createPages = async ({graphql, actions, reporter}) => {
    const { createPage } = actions
    //olusturdugumuz blog sayfasinda kullanmak uzere sorgu hazirliyoruz
    const result = await graphql(`
        {
            allMarkdownRemark(limit:1000) {
                edges{
                    node{
                        fields{
                            slug
                        }
                        frontmatter{
                            title
                            date
                        }
                        html
                        rawMarkdownBody
                    }
                }
            }            
        }
    `)

    //Olusabilecek hatalari gormek icin reporter kullaniyoruz
    if(result.errors){
        reporter.panicOnBuild(`Graphql Sorgusunda bir hata olustu. ${result.errors}`)
    }

    //Olusturulan her post dosyasi icin blog sayfasi olusturuyoruz
    const blogPostTemplate = path.resolve(`./src/templates/blog.jsx`)
    result.data.allMarkdownRemark.edges.forEach( ({node}) => {
        const path = node.fields.slug
        createPage({
            path,
            component: blogPostTemplate,
            context: {
                pagePath: path,
                html: node.html,
                frontmatter: node.frontmatter,
                markDown: node.rawMarkdownBody
            }
        })
    })
}