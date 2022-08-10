import { useState } from "react"

const CreateBlog = ({postBlog}) =>{
    
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

console.log(title)
console.log(author)
console.log(url)

    const addBlog = (e) =>{
        e.preventDefault()

        const blogToAdd = {
            author: author,
            title: title,
            url: url
        }

        // postBlog(author, title, url)
        postBlog(blogToAdd)

        setTitle('')
        setAuthor('')
        setUrl('')

    }

    return(
        <div>
            <h2>Create new</h2>
            <form>
                Author: <input 
                type="text" 
                value={author}
                name='Author'
                onChange={e=>setAuthor(e.target.value)}
            />
                <br/>
                <br/>
                Title: <input
                type="text" 
                value={title}
                name='Title'
                onChange={e=>setTitle(e.target.value)}
                />
                <br/>
                <br/>
                URL: <input 
                type="text" 
                value={url}
                name='Url'
                onChange={e=>setUrl(e.target.value)}
                />
                <br/>
                <br/>
            </form>
                <button onClick={e=>addBlog(e)}>create</button>
        </div>
    )
}
export default CreateBlog