import { useContext } from 'react';
import CharactersContext from '../context/characters/charactersContext';

const useCharacters = () =>
{
	return useContext(CharactersContext)
}

export default useCharacters;
