interface Country {
  name:{
    common:string,
    official:string
  } 
  area: number
  population: number
}

export default function CountryCard({ name, area, population }: Country) {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="font-bold">{name.common}</h3>
      <p>Área: {area} km²</p>
      <p>População: {population}</p>
    </div>
  )
}
