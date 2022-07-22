import {useEffect, useState} from 'react';
import './FilterTable.css';
import PokemonList from '../PokemonList/PokemonList.jsx';

const FilterTable = () => {
	const [pokemon, setPokemon] = useState([]);
	
	const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
	
	const getAPI = () => {
		let list = [];
		fetch(`${BASE_URL}`)
			.then(response => response.json())
			.then(data => {
				data.results.map(
					(item) => {
						fetch(`${item.url}`)
							.then(response => response.json())
							.then(data => {
								list.push(data);
								setPokemon([...list]);
							})
							.catch(error => console.log(error));
					}
				);
			});
	};
	useEffect(() => {
		getAPI();
	}, []);
	
	
	return (
		<div className='FilterTable'>
			<PokemonList pokemon={pokemon} />
		</div>
	);
};

export default FilterTable;