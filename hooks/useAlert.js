import { useContext } from 'react';
import AlertContext from '../context/alert/alertContext';

const useAlert = () =>
{
	return useContext(AlertContext)
}

export default useAlert;
