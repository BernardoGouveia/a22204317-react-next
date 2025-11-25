interface ProjetoProps{
    title: string;
    description: string;
    cclass:string;
    link: string;
}
export default function Projeto({title,description,cclass,link}: ProjetoProps) {

    return (
        <div className='p-3 m-3 rounded-xl shadow-md bg-white'>
          <p><strong><em>{title} - {cclass} </em></strong></p>
          <p>- {description}</p>
          <a 
            href={link} 
            target="_blank" 
          >
            <button style={{ padding: "8px 12px", backgroundColor: "purple", color: "white", borderRadius: "6px", border: "none" }}>
              Abrir Projeto
            </button>
          </a>
          <br />
        </div>
      )}