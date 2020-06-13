import React, {useEffect, useState} from 'react';
import axios from 'axios';

import CORE_SERVER_ENDPOINT from "../../../configurations/serverEndpoints";
import SearchList from "./SearchList";
import RecommList from "./RecommList";

function WebtoonAll() {

    const [searchedWebtoonList, setSearchedWebtoonList] = useState([]);

    const [recommWebtoonList, setRecommWebtoonList] = useState([]);

    const [leftFocus, setLeftFocus] = useState(false);

    const [webtoonSelected, setWebtoonSelected] = useState(false);

    const [selectedWebtoon, setSelectedWebtoon] = useState({});

    useEffect(() => {

        getRandomWebtoons();

    }, []);

    useEffect(() => {

        if(selectedWebtoon !== {}){
            getRecommendedWebtoons();
        }

    }, [selectedWebtoon]);

    const getRandomWebtoons = () => {

        axios.get(CORE_SERVER_ENDPOINT + "/random")

            .then(function (response) {

                let mappedList = response.data;
                mapJson(mappedList);

                setSearchedWebtoonList(mappedList);
            })

            .catch(function (error) {
                console.log(error);
            });
    }

    const getSearchedWebtoons = (keyword) => {

        if (keyword !== "") {
            axios.get(CORE_SERVER_ENDPOINT + "/search?keyword=" + keyword)

                .then(function (response) {
                    let mappedList = response.data;
                    mapJson(mappedList);

                    setSearchedWebtoonList(mappedList);
                })

                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    const getRecommendedWebtoons = () => {

        axios.post(CORE_SERVER_ENDPOINT + "/recomm", selectedWebtoon)

            .then(function (response) {
                let mappedList = response.data;
                mapJson(mappedList);

                setRecommWebtoonList(mappedList);
            })

            .catch(function (error) {
                console.log(error);
            });
    }

    const mapJson = (targetList) => {
        targetList.forEach( (json, i) => {

            const webtoon = {
                id : "",
                imageUrl : "",
                title : "",
                url : "",
                platform : "",
                type : "",
                score : 0,
            }

            webtoon.id = json.image_id;
            webtoon.imageUrl = json.imageUrl;
            webtoon.title = json.title;
            webtoon.url = json.url;
            webtoon.platform = json.platform;
            webtoon.type = json.type;
            webtoon.score = json.score;

            targetList[i] = webtoon;
        })
    }

    return (


        <div className="section section-pagination" style={{minHeight : "100vh"}}>
            {
                    webtoonSelected === false?

                    <SearchList setLeftFocus={setLeftFocus}
                                leftFocus = {leftFocus}
                                webtoonList={searchedWebtoonList}
                                setWebtoonSelected = {setWebtoonSelected}
                                setSelectedWebtoon = {setSelectedWebtoon}
                                getSearchedWebtoons = {getSearchedWebtoons}></SearchList>

                    : <RecommList webtoonList = {recommWebtoonList}></RecommList>

            }
        </div>
    )
}

export default WebtoonAll;
