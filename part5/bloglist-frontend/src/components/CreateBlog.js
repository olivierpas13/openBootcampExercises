const CreateBlog = ({createBlog, setAuthor, author, setTitle, title, setUrl, url}) =>{
    
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
            <button onClick={e=>createBlog(e, author, url, title)}>create</button>
        </div>
    )
}
export default CreateBlog