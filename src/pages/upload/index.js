import React, { useState } from "react"
import styled from "styled-components"
import ImageUploading from "react-images-uploading"
import theme from "@totallymoney/ui/theme"
import TextField from "@totallymoney/ui/components/TextField"
import Button from "@totallymoney/ui/components/Button"
import Grid from "@totallymoney/ui/components/Grid"
import { saveAs } from "file-saver"

const Wrapper = styled.div`
  grid-column: 1 / 13;
  width: 50%;
  margin: 0 auto;
  padding: ${theme.spacingM};
  border-radius: 20px;
  display: flex;
  background-color: white;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  box-shadow: 3px 3px 5px #0000000a;
  > * + * {
    margin-top: ${theme.spacingL};
  }
`
const Container = styled.div`
  background-color: ${theme.neutral};
  height: 100vh;
  display: flex;
  align-items: center;
`

const Image = styled.img`
  max-height: 200px;
  width: auto;
`

const Upload = () => {
  const maxMbFileSize = 5 * 1024 * 1024 // 5Mb
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState("")
  const [author, setAuthor] = useState("")
  const url =
    "https://990o6qask6.execute-api.eu-west-2.amazonaws.com/dev/upload"

  const onImageChange = imageList => {
    console.log(imageList[0])
    setImage(imageList[0].file)
  }

  const onDescriptionChange = e => {
    console.log(e.currentTarget.value)
    setDescription(e.currentTarget.value)
  }
  const onAuthorChange = e => {
    console.log(e.currentTarget.value)
    setAuthor(e.currentTarget.value)
  }

  const submit = async () => {
    const data = {
      description: { description },
      author: { author },
    }
    console.log({ image })

    //TODO fix cors issue

    // const response = await fetch(url, {
    //   method: "POST", // *GET, POST, PUT, DELETE, etc.
    //   mode: "cors", // no-cors, *cors, same-origin
    //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //   credentials: "same-origin", // include, *same-origin, omit
    //   headers: {
    //     "Content-Type": "application/json",
    //     "x-api-key": "exhibiTM-hackday-api-key",
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: JSON.stringify(data), // body data type must match "Content-Type" header
    // })
    // console.log(response.json())
    saveAs(image, "bbb.jpg", { autoBom: true })
  }

  return (
    <ImageUploading
      onChange={onImageChange}
      maxFileSize={maxMbFileSize}
      acceptType={["jpg"]}
    >
      {({ imageList, onImageUpload, onImageRemoveAll }) => (
        // write your building UI
        <Container>
          <Grid>
            <Wrapper>
              {imageList.map(img => (
                <Image src={img.dataURL} />
              ))}
              <Button variant="secondary" onClick={onImageUpload}>
                Upload image
              </Button>
              <TextField
                labelText="Description"
                name="ex-description"
                type="text"
                placeholder="Thames sunset"
                onChange={onDescriptionChange}
              />
              <TextField
                labelText="Author"
                name="ex-author"
                type="text"
                placeholder="Bojack Horseman"
                onChange={onAuthorChange}
              />
              <Button
                variant="secondary"
                onClick={submit}
                disabled={!image || author === "" || description === ""}
              >
                Submit
              </Button>
            </Wrapper>
          </Grid>
        </Container>
      )}
    </ImageUploading>
  )
}

export default Upload
