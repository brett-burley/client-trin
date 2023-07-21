import { useContext } from 'react';
import ErrorContext from '../context/error/errorContext';

const useError = () =>
{
	return useContext(ErrorContext)
}

export default useError;
