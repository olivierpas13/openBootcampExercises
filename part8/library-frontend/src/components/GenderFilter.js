
const GenderFilter = ({books, setFilter}) =>{

    const genresFromBooks = (books?.map(book=> book.genres))
    
    const listOfGenres = (genresFromBooks.flatMap(genre=>genre))

    let unique = [...new Set(listOfGenres)]

    return(
        <div>
            <br/>
            {unique.map(genre=> <button key={genre} onClick={(e)=>{setFilter(genre)}} >{genre}</button>)}
            <button onClick={()=> {setFilter(null)}}>ALL GENRES</button>
        </div>
        )

}

export default GenderFilter