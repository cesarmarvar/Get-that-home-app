import styled from "@emotion/styled";
import { colors, fonts, typography } from "../styles";
import Button from "../components/Button/button";
import { PropertyCard } from "../components/Card/card";
import { ReactComponent as GithubIcon } from "../assets/github.svg";
import { ReactComponent as LinkedinIcon } from "../assets/linkedin.svg";
import MultiSelect from "../components/MultiSelect";  
import { LandingSelect } from "../components/select-option/landing-select";
import { useEffect, useState } from "react";
import { getProperties } from "../services/properties-service";
import { useNavigate } from "react-router-dom";




/* ===== Main section que muestra la barra de busqueda de propiedades =====*/

const SearchSection = styled.main`
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  align-items: center;
  height: 600px;
  gap: 60px;
  background-image: url("assets/illustration.svg");
  // // background-position: top;
  // background-repeat: no-repeat;
  // background-size: contain;
  background-attachment: fixed;
`

const Introduction = styled.div`
  font-family: ${fonts.secundary};
  ${typography.headline.h5};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 8px;
`

const Title = styled.h2` // este podria reemplazarse por el typography.headline.h2 pero falta corregir unos datos
  font-weight: 300;
  font-size: 64px;
  line-height: 88px;
`

const SearchBar = styled.form`
  display: flex;
  flex-direction: row;
  max-width: 800px;
  max-height: 72px;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`
const Division = styled.div` // linea divisora entre select/options
  width: 0px;
  height: 56px;
  border: 1px solid ${colors.background.regular};
`
/* ===== Seccion que muestra ejemplos de depas =====*/

const ExamplesSection = styled.section`
  height: 604px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
`

const TextsContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 1rem;
  ${typography.subtitle.s2};
  font-family: ${fonts.secundary};
`
const H4heading = styled.h4`
  ${typography.headline.h4};
  font-family: ${fonts.secundary};
  color: ${colors.pink.dark}

`
const ExampleCardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
`

/* ===== Seccion rosada con link al SignUp =====*/

const SignupSection = styled.section`
  height: 312px;
  width: 100%;
  background: rgba(244, 143, 177, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 32px;
`

/* ===== Seccion 'Meet the team' =====*/

const TeamSection = styled.section`
  height: 486px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 26px;
`

const TeamContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
`

const TeamMemberCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const MemberPic = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 100px;
`

const IconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 50px;
`

// style={{border: "2px solid brown"}} ====> debug

export function LandingPage() {

  const [ properties, setProperties ] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    getProperties().then(setProperties).catch(console.log)
  }, [])

  const photos = {
    cesar: "https://avatars.githubusercontent.com/u/95256297?v=4",
    lucho: "https://avatars.githubusercontent.com/u/91627176?v=4",
    diego: "https://avatars.githubusercontent.com/u/99460094?v=4",
    enmanuel: "https://avatars.githubusercontent.com/u/94902863?v=4"
  }

  return(
    <>
      <SearchSection>
        <Introduction>
          <Title>Meet your new Home</Title>
          <p>The easiest way to find where you belong</p>
        </Introduction>
        <SearchBar>
          <div>
            <LandingSelect 
            label="I'M LOOKING FOR"
            name="property_type"
            options={["house", "apartment"]}
            />
          </div>
          <Division />
          <div>
            <LandingSelect
            label="I WANT TO"
            name="contract"
            options={["rent", "buy"]}
            />
          </div>
          <Division />
          <MultiSelect 
          withBorder={false}
          options={
            properties.map((property) => {
            return {label: property.address, value: property.address}
          })}
          />
          <Division />
          <Button>search</Button>
        </SearchBar>
      </SearchSection>
      <ExamplesSection>
        <TextsContainer>
          <p>Find an Apartment you Love</p>
          <H4heading>Homes for rent at the best prices</H4heading>
        </TextsContainer>
        <ExampleCardsContainer>
          {properties.map((property, index) => {
            return <PropertyCard key={index} user="homeseeker" data={property}/>
          })}
        </ExampleCardsContainer>
      </ExamplesSection>
      <SignupSection>
        <H4heading style={{color: "black", width: "826px"}}>Getting someone to rent your apartment has never been this easy</H4heading>
        <Button 
          size="lg"
          onClick={() => navigate("/register")}
        >
          Create an account now
        </Button>
      </SignupSection>
      <TeamSection>
        <H4heading>Meet the team</H4heading>
        <TeamContainer>
          <TeamMemberCard >
              <MemberPic src={photos.cesar} />
            <div>
              <p style={{textAlign: "center"}}>Cesar Martinez</p>
            </div>
            <IconsContainer>
              <a 
                style={{cursor: "pointer"}} 
                href="https://github.com/cesarmarvar"
                target="_blank"
                rel="noreferrer">
                <GithubIcon />
              </a>
              <a 
                style={{cursor: "pointer"}}
                href="https://www.linkedin.com/in/cesarmartinezvargas/"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedinIcon />  
              </a>            
            </IconsContainer>
          </TeamMemberCard>
          <TeamMemberCard >
            <MemberPic src={photos.enmanuel}/>
            <div>
              <p style={{textAlign: "center"}}>Enmanuel Chipana</p>
            </div>
            <IconsContainer>
              <a 
                style={{cursor: "pointer"}}
                href="https://github.com/emachipana"
                target="_blank"
                rel="noreferrer"
              >
                <GithubIcon />
              </a>
              <a 
                style={{cursor: "pointer"}}
                href="https://www.linkedin.com/in/enmanuel-chipana-araujo-44aa5a226/"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedinIcon />  
              </a>
            </IconsContainer>
          </TeamMemberCard>
          <TeamMemberCard >
            <MemberPic src={photos.diego} />
            <div>
              <p style={{textAlign: "center"}}>Diego Manrique</p>
            </div>
            <IconsContainer>
              <a 
                style={{cursor: "pointer"}}
                href="https://github.com/Diego12996"
                target="_blank"
                rel="noreferrer"
              >
                <GithubIcon />
              </a>              
              <a 
                style={{cursor: "pointer"}}
                href="https://www.linkedin.com/in/diego-manrique-machaca/"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedinIcon />  
              </a>
            </IconsContainer>
          </TeamMemberCard>
          <TeamMemberCard >
            <MemberPic src={photos.lucho} />
            <div>
              <p style={{textAlign: "center"}}>Luis Zelada</p>
            </div>
            <IconsContainer>
              <a 
                style={{cursor: "pointer"}}
                href="https://github.com/luzelcas96"
                target="_blank"
                rel="noreferrer"  
              >
                <GithubIcon />
              </a>              
              <a 
                style={{cursor: "pointer"}}
                href="https://www.linkedin.com/in/luis-zelada/"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedinIcon />  
              </a>
            </IconsContainer>
          </TeamMemberCard>
        </TeamContainer>
      </TeamSection>
    </>
  )

}