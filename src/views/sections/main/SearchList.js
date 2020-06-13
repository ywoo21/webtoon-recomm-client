import React, {useEffect, useState} from 'react';
import {GridLayout} from "@egjs/react-infinitegrid";

import {Row, Col, Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";

function SearchList(props) {

    const getSearchedWebtoons = props.getSearchedWebtoons;

    const setLeftFocus = props.setLeftFocus;
    const leftFocus = props.leftFocus;

    const webtoonList = props.webtoonList;

    const setWebtoonSelected = props.setWebtoonSelected;
    const setSelectedWebtoon = props.setSelectedWebtoon;

    return (
            <div>
                <div style={{padding: "0 15% 2.5% 15%"}}>
                    <InputGroup className={leftFocus ? "input-group-focus" : ""}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fa fa-search"></i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input style={{height: "60px", fontSize: "30px"}}
                               defaultValue=""
                               placeholder=""
                               type="text"
                               onChange={(e)=>{getSearchedWebtoons(e.target.value)}}
                               onFocus={() => setLeftFocus(true)}
                               onBlur={() => setLeftFocus(false)}
                        ></Input>
                    </InputGroup>
                </div>
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

                        <Col key={key} style={{cursor: "pointer", marginTop: "0"}} lg="24" md="24">
                            <Row>
                                <Col lg="12" md="12">
                                    <img style={{border: "none", borderRadius: "10px", width : "100px", height : "100px"}}
                                         src={webtoon.imageUrl}
                                    onClick={()=>{
                                        setSelectedWebtoon(webtoon);
                                        setWebtoonSelected(true);
                                    }}></img>
                                </Col>
                            </Row>
                            <div style={{marginTop: "10px"}}>
                                <Row>
                                    <Col lg="12" md="12">
                                        <span style={{ textAlign: "center" }}>{webtoon.title}</span>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    )}
                </GridLayout>
            </div>
    );
}

export default SearchList;
