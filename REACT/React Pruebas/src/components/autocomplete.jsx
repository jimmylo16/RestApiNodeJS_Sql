import React, { Component, Fragment } from 'react';
import '../styles/styles.css';
import ciudades from '../json/Ciudades.json';

class Autocomplete extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeSuggestion: 0,
			filteredSuggestions: [],
			showSuggestions: false,
			userInput: ''
		};
	}
	onChange = (e) => {
		//Convertir palabras con tilde a sin tilde
		function eliminarDiacriticos(text) {
			return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
		}
		const arrayUbicacion = [];
		ciudades.forEach((element, i) => {
			arrayUbicacion[i] = `${element.city} (${element.iata}), ${element.country} (${element.countryCode})`;
		});
		const suggestions = arrayUbicacion;
		const userInput = e.currentTarget.value;

		const filteredSuggestions = suggestions
			.filter((cityDiacriticos) => {
				const city = eliminarDiacriticos(cityDiacriticos);
				const text = eliminarDiacriticos(userInput).replace(/[{()}]/g, '');
				const regex = new RegExp(`${text}`, 'gi');
				return city.match(regex); //buscar coincidencias con o sin tilde
			})
			.splice(0, 8); //definimos el numero maximo de sugerencias 8

		this.setState({
			activeSuggestion: 0,
			filteredSuggestions,
			showSuggestions: true,
			userInput,
		});
	};
	onClick = (e) => {
		this.setState({
			activeSuggestion: 0,
			filteredSuggestions: [],
			showSuggestions: false,
			userInput: e.currentTarget.innerText
		});
	};
	onKeyDown = (e) => {
		const { activeSuggestion, filteredSuggestions } = this.state;
		if (e.keyCode === 13) {
			//tecla enter
			this.setState({
				activeSuggestion: 0,
				showSuggestions: false,
				userInput: filteredSuggestions[activeSuggestion]
			});
		} else if (e.keyCode === 38) {
			//flecha hacia arriba
			if (activeSuggestion === 0) {
				return;
			}
			this.setState({ activeSuggestion: activeSuggestion - 1 });
		} else if (e.keyCode === 40) {
			//flecha hacia abajo
			if (activeSuggestion - 1 === filteredSuggestions.length) {
				return;
			}
			this.setState({ activeSuggestion: activeSuggestion + 1 });
		}
	};
	render() {
		const {
			onChange,
			onClick,
			onKeyDown,
			state: { activeSuggestion, filteredSuggestions, showSuggestions, userInput }
		} = this;
		const {name,inputE1}=this.props;
		let suggestionsListComponent;
		if (showSuggestions && userInput.length >= 2) { //En caso de reducir el numero minimo de la consulta
			if (filteredSuggestions.length) {
				//si hay sugerencias
				suggestionsListComponent = (
					<ul className="suggestions">
						{filteredSuggestions.map((suggestion, index) => {
							let className;
							//resaltar la sugerencia activa modificando el className
							if (index === activeSuggestion) {
								className = 'suggestion-active';
							}
							return (
								<li className={className} key={suggestion} onClick={onClick}>
									{suggestion}
								</li>
							);
						})}
					</ul>
				);
			} else {
				//si no hay sugerencias
				suggestionsListComponent = (
					<div className="no-suggestions">
						<em>No hay sugerencias disponibles</em>
					</div>
				);
			}
		}
		return (
			<Fragment>
				<input type="text" onChange={onChange} onKeyDown={onKeyDown} value={userInput} name={name} id={name} ref={inputE1}/>
				{suggestionsListComponent}
			</Fragment>
		);
	}
}

export default Autocomplete;
