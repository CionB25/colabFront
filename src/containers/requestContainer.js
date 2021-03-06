import React from 'react';
import User from '../components/user';
import RequestedList from '../components/requestedList'
import RequestingList from '../components/requestingList';
import {Grid, Divider} from 'semantic-ui-react';

class RequestContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      requested: [],
      requesting: []
    }
  }

  componentDidMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/signin');
    } else {
      this.getCurrentUser().then(user => {
        if (user.error) {
          this.props.history.push('/signin');
        } else {
          console.log(user.username)
          if (user.username) {
            console.log(this.props.user.username);
            this.handleUser(user.username)
          } else {
            return null
          }
        }
      })
    }
  }

  getCurrentUser = () => {
   const token = localStorage.getItem("token")
   return fetch('http://localhost:3000/api/v1/current_user', {headers: {
     'Content-Type': 'application/json',
     Accepts: 'application/json',
     Authorization:token}})
   .then(res => res.json());
 }

  handleUser = (thing) => {
      // console.log("Nah")
      let url = "http://localhost:3000/api/v1/my_requests"
      let headers = {'Content-Type':'application/json','Accept':'application/json'}
      let body = JSON.stringify({username: thing})
      let config = {method:"POST",body:body,headers:headers}
        console.log(this.props.user)
        // console.log(this.props.repo.name);
        return fetch(url, config)
        .then(res => res.json())
        .then(res => {
          console.log(res)
          this.setState({
            requesting: res.mine,
            requested: res.theirs
          })
          console.log(res.mine)
        })
    }


  render() {
    console.log(this.props);
    // console.log(this.props.user.username);
    return (
      <Grid celled >
        <Grid.Column width={3}>
        <User userData={this.props}/>
        </Grid.Column>

        <Grid.Column width={13}>
        <RequestedList repos={this.state.requested}/>
        <Divider hidden/>
        <RequestingList repos={this.state.requesting}/>
        </Grid.Column>
      </Grid>
    )
  }

}

export default RequestContainer;
