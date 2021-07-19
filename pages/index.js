import React from 'react';
import nookies from 'nookies';
import jwt  from 'jsonwebtoken';
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


export default function Home(props) {
  // Funções importante ===============================================
  const githubUser = props.githubUser
  const comunityList = (item) => {
    return (
      <li key={item.title}>
        <a href={`/users/${item.title}`}>
          <img src={item.imageUrl} />
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
    title: 'Comunidade Padrao',
    imageUrl: 'http://placehold.it/300x300'
  }])
  
  //const githubUser = 'GustavoMont'
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

      fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
          'Authorization': '773546e46f7d552f9f077f84760bd4' ,
          'Content-Type': 'application/json',
          'Accept': 'application/json'        
        },
        body: JSON.stringify({ "query": `query { 
          allCommunities{ 
            id
            title 
            imageUrl
            creatorSlug
          } 
        }` })
      })
      .then((respostaServidor) => respostaServidor.json())
      .then((respostaCovertida) => {
        const allCommunities = respostaCovertida.data.allCommunities
        setComunidades(allCommunities)
      })
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
                title: dataForm.get('title'),
                imageUrl: dataForm.get('image'),
                creatorSlug: githubUser,
              }
              if(comunidade.title === '' || comunidade.imageUrl === '' || !comunidade.imageUrl.includes('http')){
                alert('Insira um Nome e uma URL válida')
                return;
              }
              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(comunidade) // Sempre temos que converter o objeto
              })
              .then(async (response) =>{
                  const dados = await response.json()
                  const comunidade = dados.newRecord;
                  setComunidades([...comunidades, comunidade])
                  console.log(dados)
              })

            }}>
              <div>
                <input id="title"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input id="image"
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


export async function getServerSideProps(context) {
  const redirect = () => {
    return {
        redirect: {
        destination: '/login',
        permanent: false,
    }
  }
};
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;

  if(!token)
  {
    return redirect();
  }

  const { githubUser } = jwt.decode(token)
  const isAuthenticated = await fetch(`https://api.github.com/users/${githubUser}`).then( async (resposta) => {
      const resultado = await resposta.json();
      console.log(resultado.message)
      return resultado.message === 'Not Found' ? false : true 
  })

  if(!isAuthenticated)
  {
     
    return redirect(); 
  }


  return {
    props: {
      githubUser: githubUser,
    }, // will be passed to the page component as props
  }
}