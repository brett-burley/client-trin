import { useContext } from 'react';
import LineContext from '../context/line/lineContext';

const useLine = () =>
{
	return useContext(LineContext)
}

export default useLine;
