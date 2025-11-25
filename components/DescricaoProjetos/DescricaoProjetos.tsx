import projetos from '@/app/data/projetos.json';
import Projeto from "@/components/Projeto/Projeto";

export default function DescricaoProjetos() {
    return(
    <>
    <h2>Projetos</h2>
    <p>Aqui você encontra uma coleção de projetos.</p>

  <br></br>
    {projetos.map((projeto,index) => (
    <Projeto
        key={index}
        title={projeto.title}
        description={projeto.description}
        cclass={projeto.class}
        link={projeto.link}
    />
    ))}

<br></br>

    <div style={{ textAlign: "center" }}>
      <a 
        href="https://github.com/BernardoGouveia" 
        target="_blank" 
        style={{ color: "purple", fontSize: "1.2rem", fontWeight: "bold" }}
      >
        https://github.com/BernardoGouveia
      </a>
    </div>
    </>

)
}