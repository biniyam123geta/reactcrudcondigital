import React, {Component} from 'react'
import toastr from 'cogo-toast';
import Create from './Create'
import Edit from './Edit'

class Index extends Component
{
	constructor() {
		super();
		//--- Declare state variable for this component ---//
		this.state = {
			users     : [
			
			],
			editUser : {}
		}
		//--- Declare method for this component ---//
		this.handleUpdateState = this.handleUpdateState.bind(this);
	}
	//--- Update state variable while any user insert or update ---//
	handleUpdateState(data, operation) {
		//--- 'operation==1' means update user ---//
		if(operation === 1) {
			this.setState(prevState => ({
				users : prevState.users.filter(user => {
					if(user.id === data.id)
						return Object.assign(user, data);
					else
						return user;
				})
			}))
			return;
		}
		//--- 'operation==0' means insert user ---//
		var new_users = this.state.users.concat(data);
		this.setState({
			users : new_users
		})
	}
	//--- Find editable user and update state variable ---//
	handleEditUser(userId) {
		this.setState({
			editUser : this.state.users.find(x => x.id === userId)
		})
	}
	//--- Delete user and update state ---//
	handleDeleteUser(id) {
		this.setState(prevState => ({
			users : prevState.users.filter((user, i) => {
				return i !== id;
			})
		}))

		let requestOptions = {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		  };
		  console.log("id",id);
		  try {
			const response =  fetch(`http://127.0.0.1:7000/crud/delete/${id}` , requestOptions);
			toastr.success('New user delete successfully!', {position : 'top-right', heading: 'Done'});
		  } catch (e) {
		console.log("errorr");
		  }
	}

	componentDidMount() {
		console.log("inside handleGetJson");
        const requestOptions = {
     	method: 'GET',
	    headers: { 'Content-Type': 'application/json' ,
	  'Accept': 'application/json'}
	
     };
   fetch('http://127.0.0.1:7000/crud/read', requestOptions)
	.then(response => response.json())
	.then((json) =>    this.setState({
		users: json,
		DataisLoaded: true
	}));
	  }


    render() {
      return(
          	<div className="card mt-4">
			    <div className="card-header">
			        <h4 className="card-title"> Users </h4>
			        <button type="button" className="btn btn-primary btn-sm pull-right" data-toggle="modal" data-target="#addModal"> Add User </button>
			    </div>
			    <div className="card-body">
			        <div className="col-md-12">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th> Id </th>
                                    <th>  Name </th>
                                    <th> Age </th>
                                    <th> Email </th>
                                
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.users.map((user, i) => (
                                <tr key={i}>
                                    <td> {user.id} </td>
                                    <td> {user.name} </td>
                                    <td> {user.age} </td>
                                    <td> {user.email} </td>
                                    <td>
                                        <button className="btn btn-info btn-sm mr-2" onClick={this.handleEditUser.bind(this, user.id)} data-toggle="modal" data-target="#editModal"> Edit </button>
                                        <button className="btn btn-danger btn-sm" onClick={this.handleDeleteUser.bind(this, user.id)}> Delete </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
			        </div>
			    </div>
			    <Create updateState = {this.handleUpdateState} />
			    <Edit updateState = {this.handleUpdateState} user = {this.state.editUser} />
			</div>
        )
    }
}
export default Index