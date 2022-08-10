import { useState } from "react"

const Filter = ({blogs, setBlogs}) =>{

// const [filter, setFilter]= useState(0)

const sortByLessLikes = (e) =>{
    e.preventDefault()
    const newList = blogs.sort((a, b)=> a.likes-b.likes)
    console.log(newList)
    setBlogs([...newList])
}


const sortByMostLikes = (e) =>{
    e.preventDefault()
    const newList = blogs.sort((a, b)=> b.likes-a.likes)
    console.log(newList)
    setBlogs([...newList])
}


    return(
        <div>
            <h3>Sort blogs by likes</h3>
            <button onClick={e=> sortByLessLikes(e)}>Ascending order</button>
            <br/>
            <button onClick={e=> sortByMostLikes(e)}>Descending order</button>
        </div>
    )
}

export default Filter