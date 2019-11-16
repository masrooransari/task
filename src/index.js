import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
const PictureInfo = ({ pictures }) => {  
  return (
    pictures && pictures.length ? pictures.map((item, index) => {
      return (
        <div key={item + index}>
          {item.FolderName}
          <button onClick={() => this.handleClick(item.FolderName)}> {item.FolderName}</button>
        </div>
      )
    }) : null
  )
}
class Apps extends React.Component {
  constructor(props) {
    // makes this refer to this component
    super(props);
    // set local state
    this.state = {
      date: new Date(),
      seconds: 0,
      pictures: [],
      taskinfo: []
    };
    //    this.handleClick = this.handleClick.bind(this);
  }
  handleClick = async (name) => {
    let selectedWord = name;
    let that = this;
    fetchAPI(selectedWord).then(function (result) {
      that.setState({ taskinfo: result });
    });
  };
  tick() {
    this.setState(prevState => ({
      seconds: prevState.seconds + 1,
      date: new Date()
    }));
  }
  componentDidMount() {
    fetch('http://13.74.177.187:8585/api/Task/GetSubFolders')
      .then(results => {
        console.log(results)
        return results.json();
      }).then(data => {
        console.log("State", data);
        this.setState({ pictures: data });

      })

    this.interval = setInterval(() => this.tick(), 1000);
  }
  getPictureInfo = (pictures) => {
    return (
      pictures && pictures.length ? pictures.map((item, index) => {
        return (
          <div key={item + index}>
            {item.FolderName}
            <button onClick={() => this.handleClick(item.FolderName)}> {item.FolderName}</button>
          </div>
        )
      }) : null
    )
  }
  getTaskInfo = (taskinfo) => {
    return (
      taskinfo && taskinfo.length ? taskinfo.map((item, index) => {
        return (
          <div key={item + index}>
            {item.name}     ,  {item.lastRunTime}, {item.nextRunTime}      {item.state}
            <button onClick={() => this.handleClick(item.name)}> {item.name}  </button>
          </div>
        )
      }) : null
    )
  }
  render() {
    const { pictures, taskinfo } = this.state
    return <h1>
      It is {this.state.date.toDateString()} {this.state.date.toLocaleTimeString()}
       {this.getPictureInfo(pictures)} 
      {/* <PictureInfo pictures = {pictures} {...this} /> */}
      {this.getTaskInfo(taskinfo)}
     
    </h1>
  }
}
function fetchAPI(param) {
  return fetch("http://13.74.177.187:8585/api/Task/GetTaskInfo?FolderName=" + param)
    .then(response => {
      if (!response.ok) {
        this.handleResponseError(response);
      }
      return response.json();
    })
    .then(item => {
      // item["link"] = item._links.self.href;
      console.log(item);
      return item;
    }
    )
    .catch(error => {
      this.handleError(error);
    });
}
// function fetchAPI(param) {
//   // param is a highlighted word from the user before it clicked the button
//   return fetch("http://13.74.177.187:8585/api/Task/GetSubFolders?FolderName=" + param).then(results => {
//     if(results.ok){
//       console.log(results.json()); //first consume it in console.log
//      return results.json(); //then consume it again, the error happens

//  }
//     return results.json();
//   }).then(data => {

//   })
// }
ReactDOM.render(<div><Apps /></div>, document.getElementById('root'));
// serviceWorker.unregister();
