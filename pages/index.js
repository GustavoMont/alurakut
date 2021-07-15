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
          <div className="spanBG" >
            <span>{item.title}</span>
          </div>
        </a>
      </li>
    )
  }
  const followersList = (item) => {
    return (
      <li key={item.login}>
        <a href={`/users/${item.login}`} key={item.login}>
          <img src={`https://github.com/${item.login}.png`} />
          <div className="spanBG">
            <span>{item.login}</span>
          </div>
        </a>
      </li>
    )
  } 
  const friendsList = (item) => {
    return (
      <li key={item}>
        <a href={`/users/${item}`} key={item}>
          <img src={`https://github.com/${item}.png`} />
          <div className="spanBG">
            <span>{item}</span>
          </div>
        </a>
      </li>
    )
  }
  
  // Listas e outras informações ===============================================
  const [comunidades, setComunidades] = React.useState([{
    id: "902u03u04393oi34",
    title: 'Stackoverflow: salvando vidas desde 2008',
    image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hebergementwebs.com%2Fdivers%25C3%25A3o%2Fprimeiro-de-abril-de-2021-as-melhores-piadas-da-web&psig=AOvVaw38sy3Z0GOoCUQxnL1BwntV&ust=1626448969151000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCOijsvWw5fECFQAAAAAdAAAAABAD'
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
            <RelationList title={`Comunidade`} content={comunityList} list={comunidades} />
          </ProfileRelationsBoxWrapper>
          
          <ProfileRelationsBoxWrapper>
            <RelationList title={`Pessoas da Comunidade`} content={friendsList} list={misAmi} />
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <RelationList title={`Seguidores`} content={followersList} list={seguidores} />
          </ProfileRelationsBoxWrapper>
        

        </div>

      </MainGrid>
    </>
  )
}
