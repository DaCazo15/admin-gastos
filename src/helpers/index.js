export const formatearCadena = (cantidad) => {
    return Number(cantidad).toLocaleString('en-US',{
        style: 'currency',
        currency: 'USD'
    })
}
export const formatearCantidad = (cantidad) => {
  return cantidad > 10000 ? '+9,999.99' : formatearCadena(cantidad);
};
export const opciones = {
    'ahorro':'Ahorro', 
    'comida':'Comida', 
    'casa':'Casa',
    'salud':'Salud', 
    'educacion':'Educación', 
    'deporte':'Deporte', 
    'ropa':'Ropa', 
    'gastos':'Gastos varios', 
    'ocio':'Ocio', 
    'transporte':'Transporte', 
    'suscripciones':'Suscripciones'
};
export const generarID = () => {
    const fecha = Date.now().toString(36);
    const id = Math.random().toString(36).substring(2,10);
    return fecha + id;
} 
export const formatearFecha = fecha =>{
    const fechaNueva = new Date(fecha);
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }
    return fechaNueva.toLocaleDateString('es-ES', opciones)
}
