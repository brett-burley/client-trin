import { useContext } from 'react';
import LibraryContext from '../context/library/libraryContext';

const useLibrary = () =>
{
	return useContext(LibraryContext)
}

export default useLibrary;
