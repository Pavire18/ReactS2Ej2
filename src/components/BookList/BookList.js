import './BookList.css'
import React from 'react';
import { useDebounce } from 'use-debounce';

const API_URL="https://www.googleapis.com/books/v1/volumes?q=";

const BookList = () => {


  const [bookList, setBookList] = React.useState([]);

  const [filter, setFilter] = React.useState("");
  const [valid, setValid] = React.useState(false);
  const [filterWithTime] = useDebounce(filter, 1000);



  React.useEffect(() => {
    if(filterWithTime.length>=3){
        fetch(`${API_URL}${filterWithTime}`)
        .then((response) => response.json())
        .then((data) => {
          setBookList(data.items);
          setValid(true)
        });
    }else{
        setValid(false);
        setBookList("");
    }

  }, [filterWithTime]);
    return (
        <div>
            <h2>Bienvenidos a la tienda de libros de The Valley</h2>
            <p>Buscador de libros:</p>
            <input type="text" value={filter} onChange={(event) => setFilter(event.target.value)} />
            {!valid && <p>Es necesario introducir al menos tres caracteres</p>}
            <p>Listado de libros:</p>
            {
            bookList ?
            <table className="book-list__table">
                <thead>
                    <tr>
                        <th>Autores</th>
                        <th>Titulo</th>
                        <th>Portada</th>
                    </tr>
                </thead>
                <tbody>

                    { bookList.map((book) => (
                        <tr key={book.id}>
                            <td>{book.volumeInfo.authors ? book.volumeInfo.authors.join(" - ") : "Sin autores"}</td>
                             <td>{book.volumeInfo.title}</td>
                             <td>{book.volumeInfo.imageLinks?.thumbnail ? <img src={book.volumeInfo.imageLinks?.thumbnail}/> : "Sin imagen"}</td>
                         </tr>
                    ))
                }

                </tbody>
            </table>
            : valid && "Parece que no se encuentra ningún libro por esa búsqueda"
            }

        </div>
    )
}

export default BookList;