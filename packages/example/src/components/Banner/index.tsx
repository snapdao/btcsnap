import React from "react"
import banner from './banner.png'
import { Container } from "semantic-ui-react"


const Banner = () => {
    return (
        <Container className="Banner-container">
            <img src={banner} alt="" className="Img-box"/>
        </Container>
    )
}

export default Banner