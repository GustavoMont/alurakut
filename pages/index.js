import styled from 'styled-components'
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu } from '../src/lib/AluraCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';



function ProfileSideBar(props) {
  return (
    <Box >
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: "8px" }} />
    </Box>
  )
}


export default function Home() {
  const githubUser = 'GustavoMont'
  const misAmi = [
    'omariosouto',
    'filipedeschamps',
    'juunegreiros',
    'peas',
    'felipefialho',
    'marcobrunodev'
  ]
  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>Bem Vindo</Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'relationsArea' }}>

          <ProfileRelationsBoxWrapper>


            <h2 className="smallTitle">Pessoas da Comunidade({misAmi.length})</h2>
            <ul>
              {misAmi.map((itemAtual) => {
                return (
                  <li>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>

          </ProfileRelationsBoxWrapper>
        </div>

      </MainGrid>
    </>
  )
}