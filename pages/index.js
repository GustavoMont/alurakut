import styled from 'styled-components'
import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import RelationList from '../src/components/ProfileRelations/RealationList';


function ProfileSideBar(props) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: "8px" }} />

      <hr />

      <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
        @{props.githubUser}
      </a>
      <hr />

      <AlurakutProfileSidebarMenuDefault />

    </Box>
  )
}


export default function Home() {
  // Funções importante ===============================================
  
  const comunityList = (item) => {
    return (
      <li key={item.id}>
        <a href={`/users/${item.title}`}>
          <img src={item.image} />
          <span>{item.title}</span>
        </a>
      </li>
    )
  }
  const followersList = (item) => {
    return (
      <li key={item.login}>
        <a href={`/users/${item.login}`} key={item.login}>
          <img src={`https://github.com/${item.login}.png`} />
          <span>{item.login}</span>
        </a>
      </li>
    )
  } 
  const friendsList = (item) => {
    return (
      <li key={item}>
        <a href={`/users/${item}`} key={item}>
          <img src={`https://github.com/${item}.png`} />
          <span>{item}</span>
        </a>
      </li>
    )
  }
  
  // Listas e outras informações ===============================================
  const [comunidades, setComunidades] = React.useState([{
    id: "902u03u04393oi34",
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }])
  const githubUser = 'GustavoMont'
  const misAmi =
    [
      'omariosouto',
      'filipedeschamps',
      'juunegreiros',
      'peas',
      'felipefialho',
      'marcobrunodev'
    ]
    const [seguidores, setSeguidores] = React.useState([])
    
    React.useEffect(() => {
      fetch('https://api.github.com/users/gustavomont/followers')
      .then( respostaServidor => respostaServidor.json())
      .then( respostaConvertida => {setSeguidores(respostaConvertida)})
    }, [])

  return (
    <>
      <AlurakutMenu githubUser={githubUser}/>
      <MainGrid className="mainGrid">
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem Vindo</h1>
            <OrkutNostalgicIconSet></OrkutNostalgicIconSet>
          </Box>

          <Box>
            <h2 className="subTitle">O que deseja fazer?</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const dataForm = new FormData(e.target);
              const comunidade =
              {
                id: new Date().toISOString(),
                title: dataForm.get('title'),
                image: dataForm.get('image'),
               }
              setComunidades([...comunidades, comunidade])
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>
              <button>Criar Comunidade</button>
            </form>
          </Box>

        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'relationsArea' }}>
          
          <ProfileRelationsBoxWrapper>
            <RelationList title={`Seguidores`} content={followersList} list={seguidores} />
          </ProfileRelationsBoxWrapper>
        
          <ProfileRelationsBoxWrapper>
            <RelationList title={`Pessoas da Comunidade`} content={friendsList} list={misAmi} />
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <RelationList title={`Comunidade`} content={comunityList} list={comunidades} />
          </ProfileRelationsBoxWrapper>
        </div>

      </MainGrid>
    </>
  )
}
