import { useContext } from 'react';
import BookContext from '../context/book/bookContext';

const useBook = () =>
{
	return useContext(BookContext)
}

export default useBook;
