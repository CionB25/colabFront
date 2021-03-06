import React from 'react'
import {Button} from 'semantic-ui-react'
import RequestModal from './requestModal'
// import UserShow from './userShow'

const RepositoryDetail = (props) => {
  // console.log("this is the username:", props.user.user)
  // console.log(props.repo);
  // console.log(props);
let button
const handleRequest = () => {
  let url = "http://localhost:3000/api/v1/request_repo"
  let headers = {'Content-Type':'application/json','Accept':'application/json'}
  let body = JSON.stringify({username: props.user.user, reponame: props.repo.name})
  let config = {method:"POST",body:body,headers:headers}
    // console.log(props.user.user)
    // console.log(props.repo.name);
    return fetch(url, config)
    .then(res => res.json())
    .then(res => {
      if (!localStorage.token) {
        props.user.history.push('/signin');
      }
      // console.log(localStorage)
    })
  }

// const handleRequest = () => {
//   // if (localStorage.token) {
//   //   alert("Request Received")
//   // } else {
//   //   // console.log(res.error)
//     props.user.history.push('/signin');
//   // }
// }

  if (localStorage.token) {
    button = <RequestModal handleRequest={handleRequest}/>
  } else {
    button = <Button basic onClick={handleRequest} color='blue'>Request To Collaborate</Button>
  }


  // console.log(repositories)
  // console.log(currentUser);
  //
  // handleClick() {
  //   console.log()
  // }
  return (

    <div className="ui grey card">
      <div className="content">
      <div className="header">{props.repo.name}</div>
      <div className="raised">Username: {props.repo.owner_username}</div>
      <div className="description">{props.repo.description}</div>
      <div className="meta">  {props.repo.primaryLanguage} </div>
        <div className='ui two buttons'>

          {button}

        </div>
      </div>
    </div>
  )
}
export default RepositoryDetail;
// <Button basic onClick={handleRequest} color='blue'>Request To Collaborate</Button>
