import React, { Component} from 'react'
import Modal from './modal';

class Hoteles extends Component {
    constructor(props){
        super(props);
        this.state={
            show: false,
            adulto:1,
            niño:0,
        }
    }  
    onChange=(e)=>{}
    render(){
        const {
            onChange,
            state:{show,adulto,niño,
        }}=this;
        const {refPasajeros}=this.props;
       
        let disabledMenosAdultos=true;
        let disabledMasAdultos=false;
        let disabledMenosNiños=true;
        let disabledMasNiños=false;

        
        if (adulto===9) {disabledMasAdultos=true};
        if (adulto>=1) {disabledMenosAdultos=false};
        if (niño===4) {disabledMasNiños=true};
        if (niño>=1) {disabledMenosNiños=false};

    
        const masClickAdulto =()=>this.setState({adulto:adulto+1});
        const menosClickAdulto =()=>this.setState({adulto:adulto-1});
        const masClickNiño =()=>this.setState({niño:niño+1});
        const menosClickNiño =()=>this.setState({niño:niño-1});

        
        let string=adulto+niño+' pasajeros';

        if(adulto===0 && niño===0 ){
            console.log('tiene que haber por lo menos un pasajero'); // validacion en caso de que haya menos de una pasajero
        }

        
        return (
            <>
                <input onClick={() => this.setState({show:true})} onChange={onChange} value={string} ref={refPasajeros}></input>
                <Modal  onClose={() => this.setState({show:false})} show={show}>
                <div className='PasajerosOpcion'>
                    <h1>{adulto} Adultos</h1>
                    <button onClick={menosClickAdulto} disabled={disabledMenosAdultos}>-</button>
                    <button onClick={masClickAdulto} disabled={disabledMasAdultos}>+</button>
                </div>
                <div className='PasajerosOpcion'>
                    <h1>{niño} Niños</h1>
                    <button onClick={menosClickNiño} disabled={disabledMenosNiños}>-</button>
                    <button onClick={masClickNiño} disabled={disabledMasNiños}>+</button>
                </div>
                </Modal>
            </>
        )

    }
}
export default Hoteles;
