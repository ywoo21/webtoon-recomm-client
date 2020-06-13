import React, {useEffect, useState} from 'react';
import {GridLayout} from "@egjs/react-infinitegrid";

import {Row, Col, Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";

import { css } from "@emotion/core";

import RingLoader from "react-spinners/RingLoader";

function RecommList(props) {

    const webtoonList = props.webtoonList;

    const override = css`
          display: block;
          margin: 0 auto;
          border-color: red;
        `;

    const gridLayout =

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

            {
                webtoonList.length > 0 &&

                <Col key={0} style={{cursor: "pointer", marginTop: "0"}} lg="24" md="24">
                    <Row>
                        <div>
                            <img style={{border: "none", borderRadius: "10px", width : "200px", height : "200px"}}
                                 src={webtoonList[0].imageUrl}></img>
                            <span style={{ textAlign: "center" }}>{webtoonList[0].title}</span>
                        </div>
                    </Row>
                </Col>

                && webtoonList.map((webtoon, key) =>

                    <Col key={key} style={{cursor: "pointer", marginTop: "0"}} lg="24" md="24">
                        <Row>
                            <Col lg="12" md="12">
                                <a href={webtoon.url} target={"_sub"}>
                                    <img style={{border: "none", borderRadius: "10px", width : "100px", height : "100px"}}
                                         src={webtoon.imageUrl}></img>
                                </a>
                            </Col>
                        </Row>
                        <div style={{marginTop: "10px"}}>
                            <Row>
                                <Col lg="12" md="12">
                                    <span style={{ textAlign: "center" }}>{webtoon.title}</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="12" md="12">
                                    <span style={{ textAlign: "center" }}>유사도 거리 : {webtoon.score | 0}</span>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                )
            }

        </GridLayout>

    return (
        <div>
            <RingLoader
                css={override}
                size={150}
                color={"rgb(45, 180, 0)"}
                loading={webtoonList.length == 0}
            />
            {gridLayout}
        </div>
    );
}

export default RecommList;
