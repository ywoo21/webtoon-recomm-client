import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {GridLayout} from "@egjs/react-infinitegrid";

import { Container, Row, Col } from "reactstrap";

function PaginationSection() {

    const [webtoonList, setWebtoonList] = useState([]);

    useEffect(() => {

        getRandomWebtoons();

    }, []);

    const getRandomWebtoons = () => {

        axios.get('http://localhost:8080')

            .then(function (response) {
                setWebtoonList(response.data);
            })

            .catch(function (error) {
                console.log(error);
            });
    }

    const getRecommendedWebtoons = () => {

        axios.post('http://localhost:8080/search',

            {
                "id": "155",
                "imageUrl": "https://shared-comic.pstatic.net/thumb/webtoon/736989/thumbnail/thumbnail_IMAG10_dc639e95-a787-49bd-9bb6-b835909a764d.jpg",
                "title": "더 복서"
            })

            .then(function (response) {
                setWebtoonList(response.data);
            })

            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <div className="section section-pagination">
                <GridLayout

                    className="gridlayout container"

                    options={{
                        isOverflowScroll: false,
                        useFit: true,
                        useRecycle: true,
                        horizontal: false,
                    }}

                    layoutOptions={{
                        margin: 50,
                        align: "center",
                    }}>

                    {webtoonList.length > 0 && webtoonList.map((webtoon, key) =>

                        <Col key={key} style={{cursor: "pointer", marginTop: "5vh"}} lg="24" md="24">
                            <Row>
                                <Col lg="12" md="12">
                                    <img style={{border: "none", borderRadius: "10px"}}
                                         src={webtoon.imageUrl}></img>
                                </Col>
                            </Row>
                            <div style={{marginTop: "20px"}}>
                                <Row>
                                    <Col lg="12" md="6">
                                        <span style={{textAlign : "center"}}>{webtoon.title}</span>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    )}
                </GridLayout>
            </div>
        </>
    );
}

export default PaginationSection;
