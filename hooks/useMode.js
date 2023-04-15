import { useContext } from 'react';
import ModeContext from '../context/mode/modeContext';

const useMode = () =>
{
	return useContext(ModeContext)
}

export default useMode;
