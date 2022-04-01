import React, {Component} from 'react'
import toastr from 'cogo-toast';

class Edit extends Component
{
	constructor() {
		super();
		//--- Declare method for this component ---//
		this.state = {
			errors    : [],
			id   : '',
			name  : '',
			age : '',
			email 	  : ''
		}
		//--- Declare method for this component ---//
		this.baseState = this.state
		this.hasErrorFor = this.hasErrorFor.bind(this);
		this.renderErrorFor = this.renderErrorFor.bind(this);
		this.handleUpdateUser = this.handleUpdateUser.bind(this);
		this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
	}
	//--- Receive props while update modal open ---//
	UNSAFE_componentWillReceiveProps(user_data) {
		this.setState({
			id   : user_data.user.id,
			name  : user_data.user.name,
			age : user_data.user.age,
			email     : user_data.user.email
		})
	}
	//--- Update state variable value while input field change ---//
	handleInputFieldChange(e) {
		this.setState({
			[e.target.name] : e.target.value
		})
	}
	//--- Update state users variable by props method ---//
	handleUpdateUser(e) {
		e.preventDefault()
		//--- Declare state variable for this component ---//
		const data = {
			id        : this.state.id,
			name  : this.state.name,
			age : this.state.age,
			email     : this.state.email
		}
		if( !this.checkValidation(data) ) {
			this.reset();
			this.props.updateState(data, 1);
			document.getElementById("closeEditModal").click();
			
		}

		let requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		  };
		  try {
			const response =  fetch('http://127.0.0.1:7000/crud/update', requestOptions);
			toastr.warn('User data updated successfully!', {position : 'top-right', heading: 'Done'});
		  } catch (e) {
		console.log("errorr");
		  }


	}
    //--- Validate all input field ---//
    checkValidation(fields) {
    	var error = {};
    	if(fields.name.length === 0) {
    		error.name = ['This field is required!'];
    	}
    	if(fields.age.length === 0) {
    		error.age = ['This field is required!'];
    	}
    	if(fields.email.length === 0) {
    		error.email = ['This field is required!'];
    	}
		this.setState({
			errors : error
		})
		if(fields.name.length === 0 || fields.age.length === 0 || fields.email.length === 0) {
			return true;
		} else {
			return false;
		}
    }
    //--- Reset all state variable while update user ---//
	reset() {
        this.setState(this.baseState);
    }
    //--- Check that any validation errors occure for input field ---//
	hasErrorFor(fieldName) {
		return !!this.state.errors[fieldName];
	}
	//--- Render error for specific validation fail input field ---//
	renderErrorFor(fieldName) {
    	if (this.hasErrorFor(fieldName)) {
	        return (
	        	<em className="error invalid-feedback"> {this.state.errors[fieldName][0]} </em>
	        )
      	}
    }

    render() {
      return(
			<div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  	<div className="modal-dialog" role="document">
			    	<div className="modal-content">
			      		<div className="modal-header">
			        		<h5 className="modal-title">Update user information</h5>
			        		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          			<span aria-hidden="true">&times;</span>
			        		</button>
			      		</div>
			        <form onSubmit={this.handleUpdateUser}>
			      		<div className="modal-body">
			          		<div className="form-group">
			            		<label htmlFor="name" className="col-form-label"> name:</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('username') ? 'is-invalid' : ''}`}
			            		 id="name" name="name" placeholder="name" onChange={this.handleInputFieldChange} value={this.state.name}/>
			            		{this.renderErrorFor('name')}
			         	 	</div>
			          		<div className="form-group">
			            		<label htmlFor="age" className="col-form-label">age:</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('age') ? 'is-invalid' : ''}`}
			            		 id="age" name="age" placeholder="age" onChange={this.handleInputFieldChange} value={this.state.age}/>
			            		{this.renderErrorFor('age')}
			          		</div>
			          		<div className="form-group">
			            		<label htmlFor="email" className="col-form-label">Email:</label>
			            		<input type="email" className={`form-control form-control-sm ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
			            		 id="email" name="email" placeholder="Email" onChange={this.handleInputFieldChange} value={this.state.email}/>
			            		{this.renderErrorFor('email')}
			          		</div>
			      		</div>
			      		<div className="modal-footer">
			        		<button type="button" id="closeEditModal" className="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
			        		<button type="submit" className="btn btn-primary btn-sm">Save Changes</button>
			      		</div>
			   		</form>
			    	</div>
			  	</div>
			</div>
        )
    }
}
export default Edit