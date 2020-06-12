import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  CarouselContext,
  Image,
} from "pure-react-carousel"
import "pure-react-carousel/dist/react-carousel.es.css"
import theme from "@totallymoney/ui/theme"
import Grid from "@totallymoney/ui/components/Grid"
import Chevron from "@totallymoney/ui/icons/Chevron"
import { CookiesProvider, useCookies } from "react-cookie"

const Container = styled.div`
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(90, 92, 106, 1) 0%,
    rgba(32, 45, 58, 1) 81.3%
  );

  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: ${theme.spacingL} 0;
`

const CarouselContainer = styled.div`
  grid-column: 1 / 13;

  .carousel {
    position: relative;
  }

  .imgDiv {
    background-size: contain !important; // ¯\_(ツ)_/¯ it's a hack day
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
  }

  .carousel__next-button,
  .carousel__back-button {
    background: #ffffffaa;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: none;
    position: absolute;
    top: 50%;
    transition: background-color 0.2s ease-out;
    display: flex;
    align-items: center;
    justify-content: center;

    &:focus {
      outline: none;
    }

    &:hover {
      background-color: white;
    }

    &:disabled {
      background: #ffffff60;
      cursor: auto;
    }
  }

  .carousel__next-button {
    right: ${theme.spacingL};
  }
  .carousel__back-button {
    left: ${theme.spacingL};
  }

  .carousel__dot {
    background: red;
  }
`

const LogoWrapper = styled.div``

const Logo = styled.div`
  grid-column: 5 / 10;
  height: 30px;
  background-image: url(/assets/new-project-5-.png);
  background-size: contain;
  background-repeat: no-repeat;
`
const ButtonsWrapper = styled.div`
  grid-column: 4 / 10;
  display: flex;
  justify-content: space-around;
`

const Vote = styled.button`
  background: transparent;
  border: 1px solid;
  border-color: ${props => props.color};
  cursor: ${props => (props.disabled ? "auto" : "pointer")};
  border-radius: 50%;
  height: 70px;
  width: 70px;
  opacity: ${props => (props.disabled ? ".1" : "1")};

  &:focus {
    outline: none;
  }
`

const Gallery = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"])

  console.log({ cookies })

  const [hasVoted1, setHasVoted1] = useState(!!cookies.oneStar)
  const [hasVoted2, setHasVoted2] = useState(!!cookies.twoStar)
  const [hasVoted3, setHasVoted3] = useState(!!cookies.threeStar)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imageArray, setImageArray] = useState([])

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(
        "https://990o6qask6.execute-api.eu-west-2.amazonaws.com/dev/images/list",
        {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "exhibiTM-hackday-api-key",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      const res = await response.json()
      console.log({ res })
      setImageArray(res)
    }

    fetchImages()
  }, [])

  const on1StarClick = () => {
    console.log({ guid: imageArray[currentSlide], stars: 1 })
    setCookie("oneStar", "true", { maxAge: 1814400 }) // 3 weeks
    setHasVoted1(true)
  }
  const on2StarClick = () => {
    console.log({ guid: imageArray[currentSlide], stars: 2 })

    setCookie("twoStar", "true", { maxAge: 1814400 }) // 3 weeks
    setHasVoted2(true)
  }
  const on3StarClick = () => {
    console.log({ guid: imageArray[currentSlide], stars: 3 })

    setCookie("threeStar", "true", { maxAge: 1814400 }) // 3 weeks
    setHasVoted3(true)
  }

  const clickNext = () => {
    setCurrentSlide(currentSlide + 1)

    console.log(imageArray)
  }
  const clickBack = () => {
    setCurrentSlide(currentSlide - 1)
  }

  return (
    <Container>
      <Grid style={{ gridRowGap: theme.spacingS }}>
        <Logo />
        <CarouselContainer>
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={40}
            totalSlides={imageArray.length}
          >
            <Slider>
              {imageArray.map((img, index) => (
                <Slide index={index}>
                  <Image
                    src={`/assets/${img.Guid}.jpg`}
                    hasMasterSpinner={true}
                    className="imgDiv"
                    tag="div"
                    isBgImage
                  ></Image>
                </Slide>
              ))}
            </Slider>
            <ButtonBack onClick={clickBack}>
              <Chevron direction="left" />
            </ButtonBack>
            <ButtonNext onClick={clickNext}>
              <Chevron />
            </ButtonNext>
          </CarouselProvider>
        </CarouselContainer>
        <h1>{imageArray[currentSlide].Description}</h1>
        <ButtonsWrapper>
          <Vote color="#cd7f32" onClick={on1StarClick} disabled={hasVoted1}>
            <img src="/img/bronze.svg" />
          </Vote>
          <Vote color="#c0c0c0" onClick={on2StarClick} disabled={hasVoted2}>
            <img src="/img/silver.svg" />
          </Vote>
          <Vote color="#ffd700" onClick={on3StarClick} disabled={hasVoted3}>
            <img src="/img/gold.svg" />
          </Vote>
        </ButtonsWrapper>
      </Grid>
    </Container>
  )
}

export default Gallery
