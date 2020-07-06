import React, {Component} from 'react';

import {withRouter} from 'react-router-dom';

import MaterialTable from "material-table"; 
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Loading from "./loading.js"

import Footer from "./../components/footer.js"
import Header from "../components/header.js"

import {transactionTimeout} from "../components/utils.js"
import './search.css';

const API_KEY = 'AIzaSyBx1jcRmz_e1n7sXZnK0yitFfVsoTN7F1M';


/* global gapi */


class Search extends Component {

    constructor(props) {
        super(props);

        this.columns = [
            {
                title: 'Title',
                field: 'title',
                sortable: true
            }, {
                title: 'Description',
                field: 'description',
                sortable: true,
                grouping: false
            },{
                title: 'Youtube Link',
                field: 'youtubelink',

                render: rowData => <a target='_blank' href={rowData.youtubelink}>Video Link</a>,
                grouping: false
            }
        ];


        this.state = {
            error: null,
            isLoaded: false,
            dataList:[],
            gapiReady:false,
            pageToken:null,
            totalItems:0,
            overlayNeeded: true
        };

    }

    loadYoutubeApi() {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/api.js";
    
        script.onload = () => {
          gapi.load('client', () => {
            gapi.client.setApiKey(API_KEY);
            gapi.client.load('youtube', 'v3', () => {
              this.setState({ gapiReady: true,overlayNeeded:false });
            });
          });
        };
    
        document.body.appendChild(script);
    }

    ySearch = function(event) {
            console.log("ySearch");
            console.log(event.target.value);
            var queryString=event.target.value;
            let {pageToken,totalItems,dataList}=this.state;
            let items, resultHTML=null;
            return gapi.client.youtube.search.list({
                "part": "snippet",
                "maxResults": 50,
                "type":'video',	
                "pageToken":this.state.pageToken,
                "q": queryString
            })
                .then(function(response){
                        // Handle the results here (response.result has the parsed body).
                        dataList=[];

                        pageToken=response.result.nextPageToken;
                        totalItems=response.result.pageInfo.totalResults;
                        items=response.result.items;
                        resultHTML="";
                        let dataItem={};
                        for (var key in items)
                        {
                            dataItem={};
                            var videoid = items[key].id.hasOwnProperty('videoId')?items[key].id.videoId:items[key].id.playlistId;
                              dataItem.title=items[key].snippet.title;
                              dataItem.description=items[key].snippet.description
                              dataItem.youtubelink= "https://www.youtube.com/watch?v=" + videoid ;
                              ;
                              dataList.push(dataItem);
                        }
                        console.log(dataList);
                        this.setState({dataList:dataList});
                    }.bind(this),
                    function(err) { console.error("Execute error", err); });
    }.bind(this)

    componentDidMount() {
        this.setState({overlayNeeded: true})
        this.loadYoutubeApi();
    }

    render() {

        const title="ARR covers"
        if (this.state.gapiReady) {

            return (
                <div>
                    <Header title={title}></Header>
                        <div className="container">

                        <Loading overlayNeeded={this.state.overlayNeeded}>
                            </Loading>

                            <div className="toolbar">
                                <Button variant="contained" color="primary" onClick={this.saveScreens}>
                                    Save
                                </Button>

                                <Button variant="contained" >
                                    Cancel
                                </Button>
                            </div>
                            <TextField id="searchTerm" label="Search Youtube" variant="standard" onBlur={this.ySearch} className="searchInput"/>

                            <MaterialTable
                                columns={this.columns}
                                data={this.state.dataList}
                                title=" "
                                options={{
                                    pageSize:20,
                                    exportButton: true,
                                }}
                            ></MaterialTable>

                        </div>
                        <Footer></Footer>
                </div>
            )
        } else {
            return (
            <div>
            <Header title={title}></Header>
                <div className="container">

                <Loading overlayNeeded={this.state.overlayNeeded}>
                    </Loading>
                    </div>
            </div>
            )
        }
    }
}

export default withRouter(Search);
