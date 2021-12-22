import React, { useEffect,useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import '../styles/modal.css';

function useOutsideAlerter(ref,props) {
	useEffect(
		() => {
			function handleClickOutside(event) {
				if (ref.current && !ref.current.contains(event.target)) {
                    //le di un click afuera
					// alert('You clicked outside of me!');
                    props.onClose();

				}
			}
			document.addEventListener('mousedown', handleClickOutside);
			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		},
		[ ref,props ]
	);
}
const Modal = (props) => {
	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef,props);
	const closeOnEscapeKeyDown = (e) => {
		if ((e.charCode || e.keyCode) === 27) {
			props.onClose();
		}
	};
	useEffect(() => {
		document.body.addEventListener('keydown', closeOnEscapeKeyDown);
		return function cleanup() {
			document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
		};
	});
	return (
		<CSSTransition 
        in={props.show} 
        unmountOnExit 
        timeout={{ enter: 0, exit: 300 }}>

			<div className="modal" id="modal-div" ref={wrapperRef} onClick={props.onClose}>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						<div className="modal-header">
							<h4 className="modal-title">{props.title}</h4>
						</div>
						<div className="modal-body">{props.children}</div>
						<div className="modal-footer">
							<button onClick={props.onClose} className="button">
								agregar +
							</button>
							<button onClick={props.onClose} className="button">
								eliminar -
							</button>
						</div>
					</div>
			</div>
		</CSSTransition>
	);
};
export default Modal;
