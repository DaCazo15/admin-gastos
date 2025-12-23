export const obtenerTasa = async () => {
  try {
    const respuesta = await fetch('https://ve.dolarapi.com/v1/dolares/paralelo')
    const data = await respuesta.json()
    return data.precio // valor del dólar paralelo en Bs
  } catch (error) {
    console.error('Error al obtener tasa paralela:', error)
    return null
  }
}