import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
} from "pure-react-carousel"
import "pure-react-carousel/dist/react-carousel.es.css"
import theme from "@totallymoney/ui/theme"
import Grid from "@totallymoney/ui/components/Grid"
import Heading from "@totallymoney/ui/components/Heading"
import Text from "@totallymoney/ui/components/Text"
import Chevron from "@totallymoney/ui/icons/Chevron"
import { useCookies } from "react-cookie"

const Container = styled.div`
  background: white;

  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: ${theme.spacingL} 0;
`

const CarouselContainer = styled.div`
  grid-column: 3 / 11;
  grid-row: 1 / 3;
  &:focus {
    outline: none;
  }

  .carousel {
    position: relative;
  }
  *:focus {
    outline: none;
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
    height: 30px;
    width: 30px;
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
const Description = styled(Text)`
  grid-column: 1 / 13;
  grid-row: 3
  text-align: center;
  justify-self: center;
`

const Logo = styled.div`
  grid-column: 1 / 3;
  grid-row: 1;
  justify-self: flex-start;
  height: 120px;
  width: 120px;
  background-image: url(/img/logo.png);
  background-size: contain;
  background-repeat: no-repeat;
`
const ButtonsWrapper = styled.div`
  grid-column: 1 / 3;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  justify-content: center;
`

const Vote = styled.button`
  display: flex;
  cursor: ${props => (props.disabled ? "auto" : "pointer")};
  border-radius: 5px;
  padding: ${theme.spacingXS};
  border: 2px solid #928cc8;
  transition: all 0.2s ease-out;
  background-color: white;
  max-width: 120px;
  display: grid;
  margin-top: ${theme.spacingS};
  grid-template-columns: 33% 33% 33%;
  justify-content: center;

  > img {
    justify-self: center;
  }

  &:focus {
    outline: none;
    background-color: #251991;
    border-color: #251991;
  }

  &:hover {
    outline: none;
    background-color: #251991;
    border-color: #251991;

    > img {
      /* filter: brightness(0.7); */
      /* transition: filter 0.2s ease-out; */
    }
  }

  &:disabled {
     {
      outline: none;
      background-color: #928cc8;

      > img {
        filter: brightness(0.12) saturate(21);
        transition: filter 0.2s ease-out;
      }
    }
  }
`

const Gallery = () => {
  const [cookies, setCookie] = useCookies(["cookie-name"])
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
      setImageArray(res)
    }

    fetchImages()
  }, [])

  const doVote = async stars => {
    const data = { guid: imageArray[currentSlide].Guid, stars }

    const response = await fetch(
      "https://990o6qask6.execute-api.eu-west-2.amazonaws.com/dev/vote",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "exhibiTM-hackday-api-key",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      }
    )
    const res = await response
    return res.ok
  }

  const on1StarClick = () => {
    if (doVote(1)) {
      setCookie("oneStar", "true", { maxAge: 1814400 }) // 3 weeks
      setHasVoted1(true)
    }
  }
  const on2StarClick = () => {
    if (doVote(2)) {
      setCookie("twoStar", "true", { maxAge: 1814400 }) // 3 weeks
      setHasVoted2(true)
    }
  }
  const on3StarClick = () => {
    if (doVote(3)) {
      setCookie("threeStar", "true", { maxAge: 1814400 }) // 3 weeks
      setHasVoted3(true)
    }
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
      <Grid>
        <Logo />
        <CarouselContainer>
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={70}
            totalSlides={imageArray.length}
            dragEnabled={false}
            touchEnabled={false}
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
        {imageArray[currentSlide] && (
          <Description>{imageArray[currentSlide]?.Description}</Description>
        )}
        <ButtonsWrapper>
          <Heading variant="h6">Cast your vote</Heading>
          <Vote onClick={on1StarClick} disabled={hasVoted1}>
            <img src="/img/star.svg" />
          </Vote>
          <Vote onClick={on2StarClick} disabled={hasVoted2}>
            <img src="/img/star.svg" />
            <img src="/img/star.svg" />
          </Vote>
          <Vote onClick={on3StarClick} disabled={hasVoted3}>
            <img src="/img/star.svg" />
            <img src="/img/star.svg" />
            <img src="/img/star.svg" />
          </Vote>
        </ButtonsWrapper>
      </Grid>
    </Container>
  )
}

export default Gallery
